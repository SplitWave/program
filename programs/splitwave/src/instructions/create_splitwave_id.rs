use anchor_lang::prelude::*;

use crate::state::{SIZE_OF_SPLITWAVE_ID, SEED_SPLITWAVE_ID, SplitwaveId};

#[derive(Accounts)]
pub struct CreateSplitwaveId<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + SIZE_OF_SPLITWAVE_ID,
        seeds = [SEED_SPLITWAVE_ID],
        bump
    )]
    splitwave_id: Box<Account<'info, SplitwaveId>>,

    #[account(mut)]
    payer: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CreateSplitwaveId>) -> Result<()> {
    let splitwave_id = &mut ctx.accounts.splitwave_id;
    splitwave_id.bump = *ctx.bumps.get("splitwave_id").unwrap();
    // splitwave_id.count = 1;
    splitwave_id.splitwave_id = 1;
    // splitwave_id.splitwave_id = "1".to_string();

    Ok(())
}