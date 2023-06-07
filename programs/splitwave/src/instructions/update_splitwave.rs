use {
    crate::{
        state::*, 
        errors::SplitwaveError,
    }, 
    anchor_lang::prelude::*,
    std::collections::HashSet,
};

#[derive(Accounts)]
#[instruction(total_amount_to_recipient: Option<u64>, participants: Vec<SplitParticipant>)]
pub struct UpdateSplitwave<'info> {
    #[account(address = splitwave.authority)]
    pub authority: Signer<'info>,

    #[account(mut,
        seeds = [
            SEED_SPLITWAVE, 
            splitwave.splitwave_id.to_le_bytes().as_ref(),
        ],
        bump = splitwave.bump,
        )]
    pub splitwave: Box<Account<'info, Splitwave>>,

}

pub fn handler<'info>(ctx: Context<UpdateSplitwave>, total_amount_to_recipient: Option<u64>, participants: Vec<SplitParticipant>) -> Result<()> {
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
        total_split += part_split.participant_split_amount;
    }

    // check if authority is one of the participants and see if he has paid
    let mut authority_paid = false;
    for part_split in participants.iter() {
        if part_split.participant_token_account == *ctx.accounts.authority.key {
            authority_paid = part_split.paid;
        }
    }
    if authority_paid {
        //TODO: transfer back the tokens or sol received to splitwave account back to the authority

    }

    if total_split != splitwave.total_amount_to_recipient {
        splitwave.participants = vec![];
        splitwave.total_participants = 0;
        splitwave.total_amount_to_recipient = 0;
            return err!(SplitwaveError::InvalidSplit);
    }
    
    let mut participants = participants;
    let unique_participants: HashSet<&Pubkey> = participants.iter().map(|part_split| &part_split.participant_token_account).collect();
    if unique_participants.len() != participants.len() {
        return Err(SplitwaveError::DuplicateParticipants.into());
    }

    participants.iter_mut().for_each(|participant| participant.paid = false);
    participants.sort_by_key(|part_split| part_split.participant_token_account);
    participants.dedup_by_key(|part_split| part_split.participant_token_account);
    let total_participants = participants.len();
    if total_participants  == 0 {
        return err!(SplitwaveError::EmptyParticipants);
    }

    if total_participants > usize::from(u8::MAX) {
        return err!(SplitwaveError::MaxParticipantsReached);
    }
    
    splitwave.participants = participants;
    splitwave.total_participants = total_participants as u64;
    Ok(())
}
