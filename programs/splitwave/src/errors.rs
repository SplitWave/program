use anchor_lang::prelude::*;

#[error_code]
pub enum SplitwaveError {
    #[msg("Zero Amount to be Split by Authority")]
    ZeroAmount,
    #[msg("Max Aprtiiccpants in a Split Reached")]
    MaxParticipantsReached,
    #[msg("No partipants created by Authority")]
    EmptyParticipants,
}