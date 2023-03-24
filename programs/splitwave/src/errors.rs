use anchor_lang::prelude::*;

#[error_code]
pub enum SplitwaveError {
    #[msg("Zero Amount to be Split by Authority")]
    ZeroAmount,
    #[msg("Max Aprtiiccpants in a Split Reached")]
    MaxParticipantsReached,
    #[msg("No partipants created by Authority")]
    EmptyParticipants,
    #[msg("Invalid Split of the total amount")]
    InvalidSplit,
    #[msg("Splitwave already disbursed total_amount_to_recipient to recipient")]
    SplitwaveAlreadyDisbursed,
    #[msg("Splitwave token account is not fully paid")]
    SplitwaveNotFullyPaid,
    #[msg("Deserialization error")]
    DeserializationError,
}