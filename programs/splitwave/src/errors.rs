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
    #[msg("Associated token account mismatch")]
    AssociatedTokenAccountMismatch,
    #[msg("Authority is not a participant")]
    AuthorityNotParticipant,
    #[msg("Mint not provided")]
    MintNotProvided,
    #[msg("Splitwave token account not provided")]
    SplitwaveTokenAccountNotProvided,
    #[msg("Participant token account not provided")]
    ParticipantTokenAccountNotProvided,
    #[msg("Recipient token account not provided")]
    RecipientTokenAccountNotProvided,
    #[msg("Splitwave token account mint mismatch")]
    SplitwaveTokenAccountMintMismatch,
    #[msg("Participant token account mint mismatch")]
    ParticipantTokenAccountMintMismatch,
    #[msg("Recipient token account mint mismatch")]
    RecipientTokenAccountMintMismatch,
    #[msg("Splitwave token account owner mismatch")]
    SplitwaveTokenAccountOwnerMismatch,
    #[msg("Participant token account owner mismatch")]
    ParticipantTokenAccountOwnerMismatch,
    #[msg("Recipient token account owner mismatch")]
    RecipientTokenAccountOwnerMismatch,
    #[msg("Participant token account insufficient balance")]
    ParticipantTokenAccountInsufficientBalance,
    #[msg("Participant lamport insufficient balance")]
    ParticipantLamportInsufficientBalance,
    #[msg("Mint mismatch")]
    MintMismatch,
    #[msg("Splitwave token account mismatch")]
    SplitwaveTokenAccountMismatch,
    #[msg("Invalid Mint Initialized")]
    InvalidMintInitialized,
    #[msg("Invalid Mint Supply")]
    InvalidMintSupply,
    #[msg("Invalid Mint")]
    InvalidMint,
    #[msg("Amount Already Disbursed to Recipient")]
    AmountAlreadyDisbursedToRecipient,
    #[msg("Duplicate Participants")]
    DuplicateParticipants,
    #[msg("Invalid Accounts")]
    InvalidAccounts,
}