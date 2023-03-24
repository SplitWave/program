use crate::errors::SplitwaveError;

use {
    anchor_lang::{prelude::*, AnchorDeserialize},
    std::convert::TryFrom,
};

pub const SEED_SPLITWAVE: &[u8] = b"splitwave";

/// A structure representing a participant's split and payment status.
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq, Debug, Default)]
pub struct PartSplit {
    pub split: u64,
    pub paid: bool,
    pub participant: Pubkey,
}

/// Represents the state of a splitwave.
#[account]
#[derive(Debug, Default, PartialEq, Eq)]
pub struct Splitwave {
    pub bump: u8, //1
    pub splitwave_id: u64, //8
    pub total_amount_to_recipient: u64, //8
    pub amount_paid_to_splitwave: u64, //8
    pub total_participants: u64, //8
    pub participants_paid_to_splitwave: u64, //8
    pub authority: Pubkey, //32
    pub mint: Pubkey, //32
    pub recipient: Pubkey, //32
    pub amount_disbursed_to_recipient: bool, //1
    pub splitwave_token_account: Pubkey, //32
    pub participants: Vec<PartSplit>, //4
    // pub splitwave_id: String, //24
}

pub const SIZE_OF_SPLITWAVE: usize = 1 + 8 + 8 + 8 + 8 + 8 + 32 + 32 + 32 + 1 + 32 + 4;
// pub const SIZE_OF_SPLITWAVE: usize = 1 + 8 + 8 + 8 + 8 + 32 + 32 + 32 + 1 + 32 + 4 + 24;
pub const SIZE_OF_PARTSPLIT: usize = 8 + 1 + 32;

impl Splitwave {
    /// Calculates the Splitwave's pubkey based on authority, mint, and recipient.
    pub fn pubkey(&mut self) -> Pubkey {
        Pubkey::find_program_address(
            &[
                SEED_SPLITWAVE,
                self.splitwave_id.to_le_bytes().as_ref(),
            ],
            &crate::ID,
        )
        .0
    }
}


impl TryFrom<Vec<u8>> for Splitwave {
    type Error = SplitwaveError;

    /// Tries to create a Splitwave instance from a Vec<u8>.
    fn try_from(data: Vec<u8>) -> std::result::Result<Self, Self::Error> {
        Splitwave::try_deserialize(&mut data.as_slice()).map_err(|_| SplitwaveError::DeserializationError)
    }
}
