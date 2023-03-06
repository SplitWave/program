pub mod id;
pub mod state;
pub mod errors;

pub mod instructions;

pub use id::ID;
pub use state::PartSplit;
pub use anchor_lang::prelude::*;
pub use instructions::*;

#[program]
pub mod splitwave {
    use super::*;

    /*
     * Create Splitwave Approval
     */
    pub fn create_splitwave(ctx: Context<CreateSplitwave>, amount: u64, participants: Vec<PartSplit>) -> Result<()> {
        create_splitwave::handler(ctx, amount, participants)
    }

    /*
     * disburse splitwave from program authority's ATA to recipient's ATA
     */
    pub fn disburse_splitwave(ctx: Context<DisburseSplitwave>) ->
    Result<clockwork_sdk::state::ThreadResponse> {
        disburse_splitwave::handler(ctx)
    }

    /*
     * update disbursement amount
     */
    pub fn update_splitwave(ctx: Context<UpdateSplitwave>, amount: Option<u64>, participants: Option<Vec<PartSplit>> ) -> Result<()> {
        update_splitwave::handler(ctx, amount, participants)
    }

    pub fn pay_splitwave(ctx:Context<PaySplitwave>, split: u64 ) -> Result<()> {
        pay_splitwave::handler(ctx, split)
    }
}
