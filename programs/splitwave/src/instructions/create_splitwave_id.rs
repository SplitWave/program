use {
    anchor_lang::prelude::*,
    crate::state::{
        SIZE_OF_SPLITWAVE_ID, 
        SplitwaveId
    }
};

#[derive(Accounts)]
pub struct CreateSplitwaveId<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + SIZE_OF_SPLITWAVE_ID
    )]
    pub splitwave_id: Box<Account<'info, SplitwaveId>>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CreateSplitwaveId>) -> Result<()> {
    let splitwave_id = &mut ctx.accounts.splitwave_id;
    splitwave_id.next_id = 1;

    Ok(())
}