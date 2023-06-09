use {
    crate::{
        state::*,
        errors::SplitwaveError,
        utils::{
            create_program_token_account_if_not_present, 
            make_ata, 
            assert_is_ata, 
            assert_keys_equal,
        },
    },
    anchor_lang::prelude::*,
    anchor_spl::{
        associated_token::AssociatedToken,
        token::{self, Mint},
    },
    std::collections::HashSet,
};

#[derive(Accounts)]
#[instruction(total_amount_to_recipient: u64, participants: Vec<SplitParticipant>, splitwave_treasury_bump: u8)]
pub struct CreateSplitwave<'info> {
    /// Key paying SOL fees for setting up the Splitwave instance.
    /// Authority key for the Splitwave instance.
    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK: user can use whatever they want for the recipient
    #[account()]
    pub recipient: UncheckedAccount<'info>,

    /// CHECK: user can use whatever they want for the recipient
    /// CHECK: recipient token account is an ATA and belongs to the recipient if SPL Token
    ///  SOL or SPL token account to receive the final amount. 
    ///  If treasury mint is native this will be the same as the `recipient`.
    #[account(mut)]
    pub recipient_token_account: UncheckedAccount<'info>,

    /// splitwave instance
    #[account(
        init,
        payer = authority,
        seeds = [
            SEED_SPLITWAVE, 
            splitwave_id.splitwave_id.to_le_bytes().as_ref(),
        ],
        bump,
        space = 8 + SIZE_OF_SPLITWAVE + SIZE_OF_PARTSPLIT * participants.len(),
    )]
    pub splitwave: Box<Account<'info, Splitwave>>,

    /// Splitwave instance's treasury account
    /// CHECK: Not dangerous. Account seeds checked in constraint.
    #[account(mut, seeds = [SEED_SPLITWAVE_TREASURY, splitwave.key().as_ref()],bump)]
    // #[account(mut, seeds = [SEED_SPLITWAVE_TREASURY, splitwave.key().as_ref()],bump = splitwave_treasury_bump)]
    pub splitwave_treasury: UncheckedAccount<'info>,

    /// splitwave_mint Mint account, either native SOL mint or a SPL token mint.
    #[account()]
    pub splitwave_mint: Box<Account<'info, Mint>>,

    /// splitwave_id instance
    /// constant address but the splitwave_id increments sequentially
    #[account(mut, seeds = [SEED_SPLITWAVE_ID],bump = splitwave_id.bump)]
    pub splitwave_id: Box<Account<'info, SplitwaveId>>,
    
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,

}

pub fn handler(
    ctx: Context<CreateSplitwave>, 
    total_amount_to_recipient: u64, 
    participants: Vec<SplitParticipant>, 
    splitwave_treasury_bump: u8
)-> Result<()> {
    let authority = &ctx.accounts.authority;
    let recipient = &ctx.accounts.recipient;
    let recipient_token_account = &ctx.accounts.recipient_token_account;
    let splitwave = &mut ctx.accounts.splitwave;
    let splitwave_id = &mut ctx.accounts.splitwave_id;
    let splitwave_mint = &ctx.accounts.splitwave_mint;
    let splitwave_treasury = &mut ctx.accounts.splitwave_treasury;
    let rent = &ctx.accounts.rent;
    let system_program = &ctx.accounts.system_program;
    let token_program = &ctx.accounts.token_program;
    let associated_token_program = &ctx.accounts.associated_token_program;

    if total_amount_to_recipient == 0 {
        return Err(SplitwaveError::ZeroAmount.into());
    }

    if participants.is_empty() {
        return Err(SplitwaveError::EmptyParticipants.into());
    }

    msg!("splitwave_treasury_bump: {}", splitwave_treasury_bump);
    let bump_from_account = *ctx.bumps.get("splitwave_treasury").ok_or(SplitwaveError::BumpSeedNotInHashMap)?;
    msg!("bump_from_account: {}", bump_from_account);
    if splitwave_treasury_bump != bump_from_account {
        return Err(SplitwaveError::BumpSeedNotInHashMap.into());
    }
    
    let authority_is_participant = participants.iter().any(|part_split| part_split.participant_token_account == authority.key());
    if !authority_is_participant {
        return Err(SplitwaveError::AuthorityNotParticipant.into());
    }

    let total_split: u64 = participants.iter().map(|part_split| part_split.participant_split_amount).sum();
    if total_split != total_amount_to_recipient {
        return Err(SplitwaveError::InvalidSplit.into());
    }


    let mut participants = participants;
    let unique_participants: HashSet<&Pubkey> = participants.iter().map(|part_split| &part_split.participant_token_account).collect();
    if unique_participants.len() != participants.len() {
        return Err(SplitwaveError::DuplicateParticipants.into());
    }

    let total_participants = participants.len();
    
    if total_participants > usize::from(u8::MAX) {
        return err!(SplitwaveError::MaxParticipantsReached);
    }

    participants.iter_mut().for_each(|participant| participant.paid = false);
    participants.sort_by_key(|part_split| part_split.participant_token_account);
    participants.dedup_by_key(|part_split| part_split.participant_token_account);
    
    let is_native = splitwave_mint.key() == spl_token::native_mint::id();

    let splitwave_key = splitwave.key();

    let splitwave_treasury_seeds = [
        SEED_SPLITWAVE_TREASURY,
        splitwave_key.as_ref(),
        &[splitwave_treasury_bump],
    ];

    create_program_token_account_if_not_present(
        splitwave_treasury,
        system_program,
        authority,
        token_program,
        splitwave_mint,
        &splitwave.to_account_info(),
        rent,
        &splitwave_treasury_seeds,
        &[],
        is_native,
    )?;

    if !is_native {
        if recipient_token_account.data_is_empty() {
            make_ata(
                recipient_token_account.to_account_info(),
                recipient.to_account_info(),
                splitwave_mint.to_account_info(),
                authority.to_account_info(),
                associated_token_program.to_account_info(),
                token_program.to_account_info(),
                system_program.to_account_info(),
                rent.to_account_info(),
                &[],
            )?;
        }

        let recipient_token_account_ata_ret = assert_is_ata(
            &recipient_token_account.to_account_info(),
            &recipient.key(),
            &splitwave_mint.key(),
        );
        if !recipient_token_account_ata_ret.is_ok() {
            return Err(SplitwaveError::InvalidAssociatedTokenAccount.into());
        }

        let splitwave_treasury_ata_ret = assert_is_ata(
            &splitwave_treasury.to_account_info(),
            &splitwave.key(),
            &splitwave_mint.key(),
        );

        if !splitwave_treasury_ata_ret.is_ok() {
            return Err(SplitwaveError::InvalidAssociatedTokenAccount.into());
        }
    } else {
        assert_keys_equal(
            recipient_token_account.key(),
            recipient.key(),
        )?;
        msg!("recipient is recipient_token_account")
    }
    
    msg!("Initializing splitwave account...");
    
    let bump = *ctx.bumps.get("splitwave").unwrap();
    splitwave.bump = bump;
    splitwave.splitwave_id = splitwave_id.splitwave_id;
    splitwave.total_amount_to_recipient = total_amount_to_recipient;
    splitwave.amount_paid_to_splitwave_account = 0;
    splitwave.total_participants = total_participants as u64;
    splitwave.participants_paid_to_splitwave = 0;
    splitwave.authority = authority.key();
    splitwave.recipient_token_account = recipient_token_account.key();
    splitwave.splitwave_mint = splitwave_mint.key();
    splitwave.splitwave_treasury = splitwave_treasury.key();
    splitwave.splitwave_treasury_bump = splitwave_treasury_bump;
    splitwave.splitwave_disbursed = 0;
    splitwave.participants = participants;
    msg!("Splitwave account initialized");

    splitwave_id.splitwave_id += 1;
    msg!("Splitwave id incremented");
    
    Ok(())
}
