use anchor_spl::token::Mint;

use crate::errors::SplitwaveError;

use {crate::state::*, anchor_lang::prelude::*};

#[derive(Accounts)]
#[instruction(total_amount_to_recipient: Option<u64>)]
pub struct UpdateSplitwave<'info> {
    #[account(mut, address = splitwave.authority)]
    pub authority: Signer<'info>,

    #[account(address = splitwave.mint)]
    pub mint: Account<'info, Mint>,
    
    /// CHECK: the recipient is validated by the seeds of the splitwave account
    #[account(address = splitwave.recipient)]
    pub recipient: AccountInfo<'info>,

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

pub fn handler<'info>(ctx: Context<UpdateSplitwave>, total_amount_to_recipient: Option<u64>, participants: Vec<PartSplit>) -> Result<()> {
    // Get accounts
    let splitwave = &mut ctx.accounts.splitwave;

    // Update the splitwave total_amount_to_recipient.
    if let Some(total_amount_to_recipient) = total_amount_to_recipient {
        if total_amount_to_recipient == 0 {
            return err!(SplitwaveError::ZeroAmount)
        }
        splitwave.total_amount_to_recipient = total_amount_to_recipient;
    }

    //check if all the splits sum up to the total amount
    let mut total_split = 0;
    for part_split in participants.iter() {
        total_split += part_split.split;
    }
    if total_split != splitwave.total_amount_to_recipient {
        return err!(SplitwaveError::InvalidSplit);
    }
    

    let mut participants = participants;
    participants.sort_by_key(|part_split| part_split.participant);
    participants.dedup_by_key(|part_split| part_split.participant);
    let total_participants = participants.len();
    if total_participants  == 0 {
        return err!(SplitwaveError::EmptyParticipants);
    }

    // make sure we don't exceed u8 on first call
    if total_participants > usize::from(u8::MAX) {
        return err!(SplitwaveError::MaxParticipantsReached);
    }
    
    splitwave.participants = participants;
    splitwave.total_participants = total_participants as u64;
    Ok(())
}
