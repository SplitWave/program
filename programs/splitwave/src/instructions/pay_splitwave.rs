use anchor_spl::token::Transfer;

use {
    crate::state::*,
    anchor_lang::{
        prelude::*,
        solana_program::{system_program, sysvar},
    },
    anchor_spl::{
        associated_token::AssociatedToken,
        token::{self, Mint, TokenAccount},
    },
};

#[derive(Accounts)]
#[instruction(split: u64)]
pub struct PaySplitwave<'info> {
    #[account(address = anchor_spl::associated_token::ID)]
    pub associated_token_program: Program<'info, AssociatedToken>,

    #[account(mut)]
    pub participant: Signer<'info>,
    /// CHECK: the participant is validated by the seeds of the splitwave account
    pub authority: AccountInfo<'info>,

    #[account(
        mut, 
        associated_token::authority = participant,
        associated_token::mint = mint,
    )]
    pub participant_token_account: Account<'info, TokenAccount>,

    #[account()]
    pub mint: Account<'info, Mint>,

    #[account(
        mut, 
        seeds = [
            SEED_SPLITWAVE, 
            authority.key().as_ref(), 
            mint.key().as_ref(),
            recipient.key().as_ref(), 
        ],
        bump = splitwave.bump,
        has_one = mint,
        has_one = recipient,
        has_one = splitwave_token_account,
        has_one = authority,
        constraint = splitwave.participants.iter().any(|p| p.split == split && p.participant == participant.key())
    )]
    pub splitwave: Account<'info, Splitwave>,
    #[account(
        mut, 
        associated_token::authority = splitwave,
        associated_token::mint = mint,
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

pub fn handler<'info>(ctx: Context<PaySplitwave>, split: u64) -> Result<()> {
    // Get accounts.
    let participant = &ctx.accounts.participant;
    let participant_token_account = &mut ctx.accounts.participant_token_account;
    let token_program = &ctx.accounts.token_program;
    let splitwave_token_account = &mut ctx.accounts.splitwave_token_account;

    // Transfer the tokens to the splitwave account.
    let cpi_accounts = Transfer {
        from: participant_token_account.to_account_info(),
        to: splitwave_token_account.to_account_info(),
        authority: participant.to_account_info(),
    };
    let cpi_program = token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, split)?;

    Ok(())
}
