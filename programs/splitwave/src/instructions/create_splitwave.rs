use {
    crate::{
        state::*,
        errors::SplitwaveError,
    },
    anchor_lang::{
        prelude::*,
        solana_program::{
            system_program, 
            sysvar,
            program_pack::Pack,
        },
    },
    anchor_spl::{
        associated_token::{self, AssociatedToken},
        token::{self},
    },
    std::collections::HashSet,
};

#[derive(Accounts)]
#[instruction(total_amount_to_recipient: u64, participants: Vec<SplitParticipant>)]
pub struct CreateSplitwave<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK: recipient is validated by the seeds of the splitwave account
    #[account()]
    pub recipient: AccountInfo<'info>,

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
    pub splitwave: Account<'info, Splitwave>,


    #[account(mut, seeds = [SEED_SPLITWAVE_ID],bump = splitwave_id.bump)]
    pub splitwave_id: Account<'info, SplitwaveId>,
    
    #[account(address = sysvar::rent::ID)]
    pub rent: Sysvar<'info, Rent>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,

    #[account(address = anchor_spl::token::ID)]
    pub token_program: Program<'info, token::Token>,

    #[account(address = anchor_spl::associated_token::ID)]
    pub associated_token_program: Program<'info, AssociatedToken>,

    // remaining accounts could be passed in this order
    // - splitwave_mint
    // - splitwave_token_account

}

pub fn handler<'key, 'accounts, 'remaining, 'info>(ctx: Context<'key, 'accounts, 'remaining, 'info, CreateSplitwave<'info>>, total_amount_to_recipient: u64, participants: Vec<SplitParticipant>) -> Result<()> {
    // Get accounts.
    let authority = &ctx.accounts.authority;
    let recipient = &ctx.accounts.recipient;
    let splitwave = &mut ctx.accounts.splitwave;
    let splitwave_id = &mut ctx.accounts.splitwave_id;

    // Validate total_amount_to_recipient
    if total_amount_to_recipient == 0 {
        return Err(SplitwaveError::ZeroAmount.into());
    }

    // Validate participants length
    if participants.is_empty() {
        return Err(SplitwaveError::EmptyParticipants.into());
    }

    // check if authority is one of the participant, otherwise throw an error
    let authority_is_participant = participants.iter().any(|part_split| part_split.participant == authority.key());
    if !authority_is_participant {
        return Err(SplitwaveError::AuthorityNotParticipant.into());
    }

    // Check if all the splits sum up to the total amount
    let total_split: u64 = participants.iter().map(|part_split| part_split.participant_split_amount).sum();
    if total_split != total_amount_to_recipient {
        return Err(SplitwaveError::InvalidSplit.into());
    }

    msg!("Initializing splitwave account...");


    let mut participants = participants;
    let unique_participants: HashSet<&Pubkey> = participants.iter().map(|part_split| &part_split.participant).collect();
    if unique_participants.len() != participants.len() {
        return Err(SplitwaveError::DuplicateParticipants.into());
    }

    participants.iter_mut().for_each(|participant| participant.paid = false);
    participants.sort_by_key(|part_split| part_split.participant);
    participants.dedup_by_key(|part_split| part_split.participant);
    
    let total_participants = participants.len();
    
    // make sure we don't exceed u8 on first call
    if total_participants > usize::from(u8::MAX) {
        return err!(SplitwaveError::MaxParticipantsReached);
    }

    
    let bump = *ctx.bumps.get("splitwave").unwrap();
    splitwave.bump = bump;
    splitwave.splitwave_id = splitwave_id.splitwave_id;
    splitwave.total_amount_to_recipient = total_amount_to_recipient;
    splitwave.amount_paid_to_splitwave_account = 0;
    splitwave.total_participants = total_participants as u64;
    splitwave.participants_paid_to_splitwave = 0;
    splitwave.authority = authority.key();
    splitwave.recipient = recipient.key();
    splitwave.splitwave_disbursed = false;
    splitwave.participants = participants;
    msg!("Splitwave account initialized");
    
    let mut remaining_accounts_iter = ctx.remaining_accounts.iter();
    if let (Some(splitwave_mint), Some(splitwave_token_account)) = (remaining_accounts_iter.next(), remaining_accounts_iter.next()) {
        let splitwave_mint_data = &splitwave_mint.try_borrow_mut_data()?;
        let splitwave_mint_data = spl_token::state::Mint::unpack(&splitwave_mint_data)?;
        if splitwave_mint_data.is_initialized != true {
            return Err(SplitwaveError::InvalidMintInitialized.into());
        }
        if splitwave_mint_data.supply != 0 && splitwave_mint_data.supply != 1 {
            return Err(SplitwaveError::InvalidMintSupply.into());
        }

        let splitwave_token_account_data = &splitwave_token_account.try_borrow_mut_data()?;
        let splitwave_token_account_data = spl_token::state::Account::unpack(&splitwave_token_account_data)?;
        if splitwave_token_account_data.mint != splitwave_mint.key() {
            return Err(SplitwaveError::InvalidMint.into());
        }
       
        let cpi_accounts = associated_token::Create {
            payer: authority.to_account_info(),
            associated_token: splitwave_token_account.to_account_info(),
            authority: splitwave.to_account_info(),
            mint: splitwave_mint.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            token_program: ctx.accounts.token_program.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
        associated_token::create(cpi_context)?;
        splitwave.splitwave_mint = Some(*splitwave_mint.key);
        splitwave.splitwave_token_account = Some(*splitwave_token_account.key);
    }
    
    splitwave_id.splitwave_id += 1;
    msg!("Splitwave id incremented");
    
    Ok(())
}
