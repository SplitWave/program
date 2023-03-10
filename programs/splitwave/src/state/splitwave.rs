use {
    anchor_lang::{prelude::*, AnchorDeserialize},
    std::convert::TryFrom,
};

pub const SEED_SPLITWAVE: &[u8] = b"splitwave";

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, Debug, Default)]
pub struct PartSplit {
    pub split: u64,
    pub paid: bool,
    pub participant: Pubkey,
}

/**
 * Splitwave
 */

#[account]
#[derive(Debug)]
pub struct Splitwave {
    pub bump: u8,
    pub total_amount_to_recipient: u64,
    pub amount_paid_to_splitwave: u64,
    pub total_participants: u64,
    pub participants_paid_to_splitwave: u64,
    pub authority: Pubkey,
    pub mint: Pubkey,
    pub recipient: Pubkey,
    pub amount_disbursed_to_recipient: bool,
    pub participants: Vec<PartSplit>,
    pub splitwave_token_account: Pubkey,
}

impl Splitwave {
    pub fn pubkey(authority: Pubkey, mint: Pubkey, recipient: Pubkey) -> Pubkey {
        Pubkey::find_program_address(
            &[
                SEED_SPLITWAVE,
                authority.as_ref(),
                mint.as_ref(),
                recipient.as_ref(),
            ],
            &crate::ID,
        )
        .0
    }
}

impl TryFrom<Vec<u8>> for Splitwave {
    type Error = Error;
    fn try_from(data: Vec<u8>) -> std::result::Result<Self, Self::Error> {
        Splitwave::try_deserialize(&mut data.as_slice())
    }
}
