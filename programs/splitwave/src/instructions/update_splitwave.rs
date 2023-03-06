use {crate::state::*, anchor_lang::prelude::*};

#[derive(Accounts)]
#[instruction(amount: Option<u64>)]
pub struct UpdateSplitwave<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [
            SEED_SPLITWAVE,
            splitwave.authority.key().as_ref(),
            splitwave.mint.key().as_ref(),
            splitwave.recipient.key().as_ref(),
        ],
        bump,
        has_one = authority,
    )]
    pub splitwave: Account<'info, Splitwave>,
}

pub fn handler<'info>(ctx: Context<UpdateSplitwave>, amount: Option<u64>, participants: Option<Vec<PartSplit>>) -> Result<()> {
    // Get accounts
    let splitwave = &mut ctx.accounts.splitwave;

    // Update the splitwave amount.
    if let Some(amount) = amount {
        splitwave.amount = amount;
    }

    if let Some(participants) = participants {
        splitwave.participants = participants;
    }
    Ok(())
}
