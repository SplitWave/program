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
     * Create Splitwave Id
     */
    pub fn create_splitwave_id(ctx: Context<CreateSplitwaveId>) -> Result<()> {
        create_splitwave_id::handler(ctx)
    }

    /*
     * Create Splitwave  
     */
    pub fn create_splitwave(ctx: Context<CreateSplitwave>, total_amount_to_recipient: u64, participants: Vec<PartSplit>) -> Result<()> {
        create_splitwave::handler(ctx, total_amount_to_recipient, participants)
        // create_splitwave::handler(ctx, total_amount_to_recipient)
    }

    /*
     * Pay Splitwave
     */
    pub fn pay_splitwave(ctx:Context<PaySplitwave>, split: u64 ) -> Result<()> {
        pay_splitwave::handler(ctx, split)
    }

    /*
     * disburse splitwave from program authority's ATA to recipient's ATA
     */
    pub fn disburse_splitwave(ctx: Context<DisburseSplitwave>) ->
    // Result<clockwork_sdk::state::ThreadResponse> {
    Result<()> {
        disburse_splitwave::handler(ctx)
    }

    /*
     * update splitwave     
     */
    pub fn update_splitwave(ctx: Context<UpdateSplitwave>, total_amount_to_recipient: Option<u64>, participants: Vec<PartSplit> ) -> Result<()> {
        update_splitwave::handler(ctx, total_amount_to_recipient, participants)
    }

}
