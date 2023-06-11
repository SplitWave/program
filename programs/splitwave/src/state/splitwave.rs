use {
    anchor_lang::prelude::*,
    std::convert::TryFrom,
    crate::errors::SplitwaveError,
};

pub const SEED_SPLITWAVE: &[u8] = b"splitwave";
pub const SEED_SPLITWAVE_TREASURY: &[u8] = b"splitwave-treasury";

/// A structure representing a participant's split and payment status.
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq, Debug, Default)]
pub struct SplitParticipant {
    pub paid: bool, //1
    pub participant_split_amount: u64, //8
    pub participant: Pubkey, //32
    pub participant_token_account: Pubkey, //32
}

/// Represents the state of a splitwave.
#[account]
#[derive(Debug, Default, PartialEq, Eq)]
pub struct Splitwave {
    pub bump: u8, //1
    pub splitwave_disbursed: u8, //1
    pub splitwave_id: u64, //8
    pub total_amount_to_recipient: u64, //8
    pub amount_paid_to_splitwave_account: u64, //8
    pub total_participants: u64, //8
    pub participants_paid_to_splitwave: u64, //8
    pub authority: Pubkey, //32
    pub recipient: Pubkey, //32
    pub recipient_token_account: Pubkey, //32
    pub splitwave_mint: Pubkey, //32
    pub splitwave_treasury: Pubkey, //32
    pub splitwave_treasury_bump: u8, //1
    pub participants: Vec<SplitParticipant>, //4
}

pub const SIZE_OF_SPLITWAVE: usize = 1 + 1 + 8 + 8 + 8 + 8 + 8 + 32 + 32 + 32 + 32 + 32 + 1 + 4;
pub const SIZE_OF_PARTSPLIT: usize = 1 + 8 + 32 + 32;

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
