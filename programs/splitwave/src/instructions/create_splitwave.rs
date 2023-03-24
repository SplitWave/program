use {
    crate::state::*,
    crate::errors::SplitwaveError,
    anchor_lang::{
        prelude::*,
        solana_program::{system_program, sysvar},
    },
    anchor_spl::{
        associated_token::AssociatedToken,
        token::{self, Mint},
    },
};

#[derive(Accounts)]
#[instruction(total_amount_to_recipient: u64, participants: Vec<PartSplit>)]
pub struct CreateSplitwave<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account()]
    pub mint: Account<'info, Mint>,

    /// CHECK: the recipient is validated by the seeds of the splitwave account
    #[account()]
    pub recipient: AccountInfo<'info>,

    #[account(
        init,
        payer = authority,
        seeds = [
            SEED_SPLITWAVE, 
            splitwave_id.splitwave_id.to_le_bytes().as_ref(),
            // splitwave_id.splitwave_id.as_bytes(),
        ],
        bump,
        space = 8 + SIZE_OF_SPLITWAVE + SIZE_OF_PARTSPLIT * participants.len(),
    )]
    pub splitwave: Account<'info, Splitwave>,

    #[account(mut, seeds = [SEED_SPLITWAVE_ID],bump = splitwave_id.bump)]
    pub splitwave_id: Account<'info, SplitwaveId>,
    
    #[account(address = sysvar::rent::ID)]
    pub rent: Sysvar<'info, Rent>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,

    #[account(address = anchor_spl::token::ID)]
    pub token_program: Program<'info, token::Token>,

    #[account(address = anchor_spl::associated_token::ID)]
    pub associated_token_program: Program<'info, AssociatedToken>,

}

pub fn handler<'info>(ctx: Context<CreateSplitwave>, total_amount_to_recipient: u64, participants: Vec<PartSplit>) -> Result<()> {
// pub fn handler<'info>(ctx: Context<CreateSplitwave>, total_amount_to_recipient: u64) -> Result<()> {
    // Get accounts.
    let authority = &ctx.accounts.authority;
    let mint = &ctx.accounts.mint;
    let recipient = &ctx.accounts.recipient;
    let splitwave = &mut ctx.accounts.splitwave;
    let splitwave_id = &mut ctx.accounts.splitwave_id;

    // let splitwave_token_account = &mut ctx.accounts.splitwave_token_account;

    // Validate total_amount_to_recipient
    if total_amount_to_recipient == 0 {
        return Err(SplitwaveError::ZeroAmount.into());
    }

    // Validate participants length
    if participants.is_empty() {
        return Err(SplitwaveError::EmptyParticipants.into());
    }
    
    // Check if all the splits sum up to the total amount
    let total_split: u64 = participants.iter().map(|part_split| part_split.split).sum();
    if total_split != total_amount_to_recipient {
        return Err(SplitwaveError::InvalidSplit.into());
    }

    msg!("Initializing splitwave account...");

    let mut participants = participants;
    participants.iter_mut().for_each(|participant| participant.paid = false);
    participants.sort_by_key(|part_split| part_split.participant);
    participants.dedup_by_key(|part_split| part_split.participant);
    
    let total_participants = participants.len();
    
    // make sure we don't exceed u8 on first call
    if total_participants > usize::from(u8::MAX) {
        return err!(SplitwaveError::MaxParticipantsReached);
    }
    
    let bump = *ctx.bumps.get("splitwave").unwrap();

    // Initialize the splitwave account.
    splitwave.bump = bump;
    splitwave.splitwave_id = splitwave_id.splitwave_id;
    // splitwave.splitwave_id = splitwave_id.splitwave_id.clone();
    splitwave.total_amount_to_recipient = total_amount_to_recipient;
    splitwave.amount_paid_to_splitwave = 0;
    splitwave.total_participants = total_participants as u64;
    splitwave.participants_paid_to_splitwave = 0;
    splitwave.authority = authority.key();
    splitwave.mint = mint.key();
    splitwave.recipient = recipient.key();
    splitwave.amount_disbursed_to_recipient = false;
    splitwave.participants = participants;
    // splitwave.splitwave_token_account = splitwave_token_account.key();
    msg!("Splitwave account initialized");
    // splitwave_id.count += 1;
    splitwave_id.splitwave_id += 1;
    msg!("Splitwave id incremented");
    
    Ok(())
}
