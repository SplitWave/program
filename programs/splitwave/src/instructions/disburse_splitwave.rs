use {
    crate::{
        state::*,
        errors::SplitwaveError,
    },
    anchor_lang::prelude::*,
    // clockwork_sdk::{
    //     state::{Thread, ThreadAccount, ThreadResponse},
    // },
};

#[derive(Accounts)]
pub struct DisburseSplitwave<'info> {
    /// CHECK: The authority is validated by the splitwave account
    #[account(address = splitwave.authority)]
    pub authority: AccountInfo<'info>,
    
    #[account(mut)]
    pub splitwave: Account<'info, Splitwave>,
    }

// pub fn handler(ctx: Context<DisburseSplitwave>) -> Result<ThreadResponse> {
pub fn handler(ctx: Context<DisburseSplitwave>) -> Result<()> {
    Ok(())
    // Ok(ThreadResponse::default())
}
