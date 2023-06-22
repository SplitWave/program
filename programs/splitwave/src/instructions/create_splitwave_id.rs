use crate::state::{SplitwaveEvent, SplitwaveIxType};

use {
    anchor_lang::prelude::*,
    crate::state::{
        SIZE_OF_SPLITWAVE_ID, 
        SEED_SPLITWAVE_ID, 
        SplitwaveId
    }
};

#[derive(Accounts)]
pub struct CreateSplitwaveId<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + SIZE_OF_SPLITWAVE_ID,
        seeds = [SEED_SPLITWAVE_ID],
        bump
    )]
    pub splitwave_id: Box<Account<'info, SplitwaveId>>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<CreateSplitwaveId>) -> Result<()> {
    let splitwave_id = &mut ctx.accounts.splitwave_id;
    splitwave_id.bump = *ctx.bumps.get("splitwave_id").unwrap();
    // splitwave_id.count = 1;
    splitwave_id.splitwave_id = 1;
    // splitwave_id.splitwave_id = "1".to_string();
    emit!(SplitwaveEvent { 
        ix_type: SplitwaveIxType::CreateSplitwaveId, 
        splitwave_id: splitwave_id.splitwave_id, 
        splitwave_disbursed: 0,
        total_amount_to_recipient: 0, 
        amount_paid_to_splitwave_account: 0,
        total_participants: 0, 
        participants_paid_to_splitwave: 0, 
        authority: Pubkey::default(), 
        recipient: Pubkey::default(), 
        recipient_token_account: Pubkey::default(),
        splitwave_mint: Pubkey::default(), 
        participants : vec![],
    });

    Ok(())
}