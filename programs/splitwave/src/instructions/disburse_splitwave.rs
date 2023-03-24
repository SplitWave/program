use crate::errors::SplitwaveError;

use {
    crate::state::*,
    anchor_lang::{prelude::*, solana_program::{system_program, sysvar}},
    anchor_spl::{ 
        associated_token::AssociatedToken,
        token::{self, Mint, TokenAccount, Transfer}
    },
    // clockwork_sdk::{
    //     state::{Thread, ThreadAccount, ThreadResponse},
    // },
};

#[derive(Accounts)]
pub struct DisburseSplitwave<'info> {
    /// CHECK: The authority is validated by the splitwave account
    #[account(address = splitwave.authority)]
    pub authority: AccountInfo<'info>,
    
    #[account(address = splitwave.mint)]
    pub mint: Box<Account<'info, Mint>>,
    
    /// CHECK: The recipient is validated by the splitwave account
    #[account(address = splitwave.recipient)]
    pub recipient: AccountInfo<'info>,
    
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
    )]
    pub splitwave: Account<'info, Splitwave>,
    
    #[account(
        mut, 
        associated_token::authority = splitwave,
        associated_token::mint = mint,
    )]
    pub splitwave_token_account: Account<'info, TokenAccount>,

    // #[account(
    //     signer, 
    //     address = thread.pubkey(),
    //     constraint = thread.authority.eq(&splitwave.authority),
    // )]
    // pub thread: Box<Account<'info, Thread>>,

    #[account(mut)]
    pub payer: Signer<'info>,

    #[account( 
        init_if_needed,
        payer = payer,
        associated_token::authority = recipient,
        associated_token::mint = mint,
    )]
    pub recipient_token_account: Box<Account<'info, TokenAccount>>,

    #[account(address = sysvar::rent::ID)]
    pub rent: Sysvar<'info, Rent>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,

    #[account(address = anchor_spl::token::ID)]
    pub token_program: Program<'info, anchor_spl::token::Token>,

    #[account(address = anchor_spl::associated_token::ID)]
    pub associated_token_program: Program<'info, AssociatedToken>,
}

// pub fn handler(ctx: Context<DisburseSplitwave>) -> Result<ThreadResponse> {
pub fn handler(ctx: Context<DisburseSplitwave>) -> Result<()> {
    // Get accounts.
    let splitwave_token_account = &mut ctx.accounts.splitwave_token_account;
    let splitwave = &mut ctx.accounts.splitwave;
    let recipient_token_account = &ctx.accounts.recipient_token_account;
    let token_program = &ctx.accounts.token_program;

    // Check if the splitwave has already been disbursed.
    if splitwave.amount_disbursed_to_recipient {
        return err!(SplitwaveError::SplitwaveAlreadyDisbursed);
    }
  
    // check if every participant has paid
    for participant in splitwave.participants.iter() {
        if !participant.paid {
            return err!(SplitwaveError::SplitwaveNotFullyPaid);
        }
    }

    // Check if total_participants is equal to total_participants_paid.
    if splitwave.total_participants != splitwave.participants_paid_to_splitwave {
        return err!(SplitwaveError::SplitwaveNotFullyPaid);
    }

    // Check if the splitwave has been fully paid.
    if splitwave.amount_paid_to_splitwave < splitwave.total_amount_to_recipient {
        return err!(SplitwaveError::SplitwaveNotFullyPaid);
    }

    
    // Transfer tokens from splitwav's ATA to recipient's ATA.
    
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
    token::transfer(
        CpiContext::new_with_signer(
            token_program.to_account_info(), 
            Transfer {
                from: splitwave_token_account.to_account_info(),
                to: recipient_token_account.to_account_info(),
                authority: splitwave.to_account_info(),
            },             
            splitwave_signer
        ),
        splitwave.total_amount_to_recipient,
    )?;

    // Update splitwave state.
    splitwave.amount_disbursed_to_recipient = true;
    Ok(())
    // Ok(ThreadResponse::default())
}
