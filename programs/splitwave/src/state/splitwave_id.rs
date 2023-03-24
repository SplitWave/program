use anchor_lang::prelude::*;


pub const SEED_SPLITWAVE_ID: &[u8] = b"splitwave-id";


/// Represents the state of a splitwave.
#[account]
#[derive(Debug, Default, PartialEq, Eq,)]
pub struct SplitwaveId {
    pub bump: u8, //1
    // pub count: u64, //8
    pub splitwave_id: u64, //24
    // pub splitwave_id: String, //24
}

pub const SIZE_OF_SPLITWAVE_ID: usize = 1 + 8;
// pub const SIZE_OF_SPLITWAVE_ID: usize = 1 + 8 + 24;