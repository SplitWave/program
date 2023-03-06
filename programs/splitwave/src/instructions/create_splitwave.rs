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
#[instruction(amount: u64)]
pub struct CreateSplitwave<'info> {
    #[account(address = anchor_spl::associated_token::ID)]
    pub associated_token_program: Program<'info, AssociatedToken>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account()]
    pub mint: Account<'info, Mint>,

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
        associated_token::authority = splitwave,
        associated_token::mint = mint,
        payer = authority,
    )]
    pub splitwave_token_account: Account<'info, TokenAccount>,

    /// CHECK: the recipient is validated by the seeds of the splitwave account
    #[account()]
    pub recipient: AccountInfo<'info>,

    #[account(address = sysvar::rent::ID)]
    pub rent: Sysvar<'info, Rent>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,

    #[account(address = anchor_spl::token::ID)]
    pub token_program: Program<'info, token::Token>,
}

pub fn handler<'info>(ctx: Context<CreateSplitwave>, amount: u64, participants: Vec<PartSplit>) -> Result<()> {
    // Get accounts.
    let authority = &ctx.accounts.authority;
    let mint = &ctx.accounts.mint;
    let splitwave = &mut ctx.accounts.splitwave;
    let recipient = &ctx.accounts.recipient;
    let splitwave_token_account = &mut ctx.accounts.splitwave_token_account;

    if amount == 0 {
        return err!(SplitwaveError::ZeroAmount)
    }

    let mut participants = participants;
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
    splitwave.new(
        bump,
        amount,
        authority.key(),
        mint.key(),
        recipient.key(),
        participants,
        splitwave_token_account.key(),
    )?;

    Ok(())
}
