use {
    crate::state::*,
    crate::errors::SplitwaveError,
    anchor_lang::{
        prelude::*,
        solana_program::{system_program, sysvar},
    },
    anchor_spl::{
        associated_token::AssociatedToken,
        token::{self, Mint, TokenAccount},
    },
    std::mem::size_of,
};

#[derive(Accounts)]
#[instruction(total_amount_to_recipient: u64)]
pub struct CreateSplitwave<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account()]
    pub mint: Account<'info, Mint>,

    /// CHECK: the recipient is validated by the seeds of the splitwave account
    #[account()]
    pub recipient: AccountInfo<'info>,

    #[account(
        init,
        payer = authority,
        seeds = [
            SEED_SPLITWAVE, 
            authority.key().as_ref(), 
            mint.key().as_ref(),
            recipient.key().as_ref(), 
        ],
        bump,
        space = 8 + size_of::<Splitwave>(),
    )]
    pub splitwave: Account<'info, Splitwave>,
    #[account(
        init_if_needed,
        token::authority = splitwave,
        token::mint = mint,
        payer = authority,
    )]
    pub splitwave_token_account: Account<'info, TokenAccount>,

    #[account(address = sysvar::rent::ID)]
    pub rent: Sysvar<'info, Rent>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,

    #[account(address = anchor_spl::token::ID)]
    pub token_program: Program<'info, token::Token>,

    #[account(address = anchor_spl::associated_token::ID)]
    pub associated_token_program: Program<'info, AssociatedToken>,

}

pub fn handler<'info>(ctx: Context<CreateSplitwave>, total_amount_to_recipient: u64, participants: Vec<PartSplit>) -> Result<()> {
    // Get accounts.
    let authority = &ctx.accounts.authority;
    let mint = &ctx.accounts.mint;
    let recipient = &ctx.accounts.recipient;
    let splitwave = &mut ctx.accounts.splitwave;
    let splitwave_token_account = &mut ctx.accounts.splitwave_token_account;

    if total_amount_to_recipient == 0 {
        return err!(SplitwaveError::ZeroAmount)
    }

    //check if all the splits sum up to the total amount
    let mut total_split = 0;
    for part_split in participants.iter() {
        total_split += part_split.split;
    }
    if total_split != total_amount_to_recipient {
        return err!(SplitwaveError::InvalidSplit);
    }


    let mut participants = participants;
    participants.iter_mut().for_each(|participant| participant.paid = false);
    participants.sort_by_key(|part_split| part_split.participant);
    participants.dedup_by_key(|part_split| part_split.participant);
    let total_participants = participants.len();
    if total_participants  == 0 {
        return err!(SplitwaveError::EmptyParticipants);
    }

    // make sure we don't exceed u8 on first call
    if total_participants > usize::from(u8::MAX) {
        return err!(SplitwaveError::MaxParticipantsReached);
    }
    let bump = *ctx.bumps.get("splitwave").unwrap();

    // Initialize the splitwave account.
    splitwave.bump = bump;
    splitwave.total_amount_to_recipient = total_amount_to_recipient;
    splitwave.amount_paid_to_splitwave = 0;
    splitwave.total_participants = total_participants as u64;
    splitwave.participants_paid_to_splitwave = 0;
    splitwave.authority = authority.key();
    splitwave.mint = mint.key();
    splitwave.recipient = recipient.key();
    splitwave.amount_disbursed_to_recipient = false;
    splitwave.participants = participants;
    splitwave.splitwave_token_account = splitwave_token_account.key();
    
    Ok(())
}
