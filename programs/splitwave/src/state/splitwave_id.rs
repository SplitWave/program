use anchor_lang::prelude::*;
use shank::ShankAccount;

/// Represents the state of a splitwave.
#[account]
#[derive(Debug, Default, PartialEq, Eq, ShankAccount)]
pub struct SplitwaveId {
    pub next_id: u64 //8
}

pub const SIZE_OF_SPLITWAVE_ID: usize = 8;