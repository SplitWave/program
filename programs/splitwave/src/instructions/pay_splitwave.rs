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
    /// CHECK: the participant is validated by the seeds of the splitwave account
    #[account(address = splitwave.authority)]
    pub authority: AccountInfo<'info>,

    #[account(address = splitwave.mint)]
    pub mint: Account<'info, Mint>,

    /// CHECK: the recipient is validated by the seeds of the splitwave account
    #[account(address = splitwave.recipient)]
    pub recipient: AccountInfo<'info>,

    #[account( 
        init_if_needed,
        payer = participant,
        associated_token::authority = recipient,
        associated_token::mint = mint,
    )]
    pub recipient_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub splitwave: Account<'info, Splitwave>,

    #[account(
        init_if_needed,
        payer = participant,
        associated_token::authority = splitwave,
        associated_token::mint = mint,
    )]
   pub splitwave_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub participant: Signer<'info>,
    
    #[account(
        mut, 
        associated_token::authority = participant,
        associated_token::mint = mint,
    )]
    pub participant_token_account: Account<'info, TokenAccount>,

    #[account(address = sysvar::rent::ID)]
    pub rent: Sysvar<'info, Rent>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,

    #[account(address = anchor_spl::token::ID)]
    pub token_program: Program<'info, token::Token>,

    #[account(address = anchor_spl::associated_token::ID)]
    pub associated_token_program: Program<'info, AssociatedToken>,
}

pub fn handler<'info>(ctx: Context<PaySplitwave>, split: u64) -> Result<()> {
    // Get accounts.
    let participant = &ctx.accounts.participant;
    let participant_token_account = &mut ctx.accounts.participant_token_account;
    let token_program = &ctx.accounts.token_program;
    let splitwave_token_account = &mut ctx.accounts.splitwave_token_account;
    let recipient_token_account = &mut ctx.accounts.recipient_token_account;

    // Transfer the tokens to the splitwave account.
    let cpi_accounts = Transfer {
        from: participant_token_account.to_account_info(),
        to: splitwave_token_account.to_account_info(),
        authority: participant.to_account_info(),
    };
    let cpi_program = token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, split)?;

    // Update the splitwave state.
    let splitwave = &mut ctx.accounts.splitwave;
    splitwave.participants.iter_mut().for_each(|p| {
        if p.split == split && p.participant == participant.key() {
            p.paid = true;
        }
    });
    splitwave.splitwave_token_account = splitwave_token_account.key();
    splitwave.participants_paid_to_splitwave += 1;
    splitwave.amount_paid_to_splitwave += split;

    // disburse the splitwave if all participants have paid
    if splitwave.participants_paid_to_splitwave as usize == splitwave.participants.len() {
        // Transfer the tokens to the recipient.
        let splitwave_seeds = &[
            SEED_SPLITWAVE, 
            splitwave.authority.as_ref(),
            splitwave.mint.as_ref(),  
            splitwave.recipient.as_ref(),
            &[splitwave.bump]
        ];
        
        let splitwave_signer = &[&splitwave_seeds[..]];
        let cpi_accounts = Transfer {
            from: splitwave_token_account.to_account_info(),
            to: recipient_token_account.to_account_info(),
            authority: splitwave.to_account_info(),
        };
        let cpi_program = token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts).with_signer(splitwave_signer);
        token::transfer(cpi_ctx, splitwave.total_amount_to_recipient)?;
    }

    Ok(())
}
