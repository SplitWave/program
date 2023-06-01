/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

type ErrorWithCode = Error & { code: number }
type MaybeErrorWithCode = ErrorWithCode | null | undefined

const createErrorFromCodeLookup: Map<number, () => ErrorWithCode> = new Map()
const createErrorFromNameLookup: Map<string, () => ErrorWithCode> = new Map()

/**
 * ZeroAmount: 'Zero Amount to be Split by Authority'
 *
 * @category Errors
 * @category generated
 */
export class ZeroAmountError extends Error {
  readonly code: number = 0x1770
  readonly name: string = 'ZeroAmount'
  constructor() {
    super('Zero Amount to be Split by Authority')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ZeroAmountError)
    }
  }
}

createErrorFromCodeLookup.set(0x1770, () => new ZeroAmountError())
createErrorFromNameLookup.set('ZeroAmount', () => new ZeroAmountError())

/**
 * MaxParticipantsReached: 'Max Aprtiiccpants in a Split Reached'
 *
 * @category Errors
 * @category generated
 */
export class MaxParticipantsReachedError extends Error {
  readonly code: number = 0x1771
  readonly name: string = 'MaxParticipantsReached'
  constructor() {
    super('Max Aprtiiccpants in a Split Reached')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MaxParticipantsReachedError)
    }
  }
}

createErrorFromCodeLookup.set(0x1771, () => new MaxParticipantsReachedError())
createErrorFromNameLookup.set(
  'MaxParticipantsReached',
  () => new MaxParticipantsReachedError()
)

/**
 * EmptyParticipants: 'No partipants created by Authority'
 *
 * @category Errors
 * @category generated
 */
export class EmptyParticipantsError extends Error {
  readonly code: number = 0x1772
  readonly name: string = 'EmptyParticipants'
  constructor() {
    super('No partipants created by Authority')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, EmptyParticipantsError)
    }
  }
}

createErrorFromCodeLookup.set(0x1772, () => new EmptyParticipantsError())
createErrorFromNameLookup.set(
  'EmptyParticipants',
  () => new EmptyParticipantsError()
)

/**
 * InvalidSplit: 'Invalid Split of the total amount'
 *
 * @category Errors
 * @category generated
 */
export class InvalidSplitError extends Error {
  readonly code: number = 0x1773
  readonly name: string = 'InvalidSplit'
  constructor() {
    super('Invalid Split of the total amount')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidSplitError)
    }
  }
}

createErrorFromCodeLookup.set(0x1773, () => new InvalidSplitError())
createErrorFromNameLookup.set('InvalidSplit', () => new InvalidSplitError())

/**
 * SplitwaveAlreadyDisbursed: 'Splitwave already disbursed total_amount_to_recipient to recipient'
 *
 * @category Errors
 * @category generated
 */
export class SplitwaveAlreadyDisbursedError extends Error {
  readonly code: number = 0x1774
  readonly name: string = 'SplitwaveAlreadyDisbursed'
  constructor() {
    super('Splitwave already disbursed total_amount_to_recipient to recipient')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SplitwaveAlreadyDisbursedError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x1774,
  () => new SplitwaveAlreadyDisbursedError()
)
createErrorFromNameLookup.set(
  'SplitwaveAlreadyDisbursed',
  () => new SplitwaveAlreadyDisbursedError()
)

/**
 * SplitwaveNotFullyPaid: 'Splitwave token account is not fully paid'
 *
 * @category Errors
 * @category generated
 */
export class SplitwaveNotFullyPaidError extends Error {
  readonly code: number = 0x1775
  readonly name: string = 'SplitwaveNotFullyPaid'
  constructor() {
    super('Splitwave token account is not fully paid')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SplitwaveNotFullyPaidError)
    }
  }
}

createErrorFromCodeLookup.set(0x1775, () => new SplitwaveNotFullyPaidError())
createErrorFromNameLookup.set(
  'SplitwaveNotFullyPaid',
  () => new SplitwaveNotFullyPaidError()
)

/**
 * DeserializationError: 'Deserialization error'
 *
 * @category Errors
 * @category generated
 */
export class DeserializationErrorError extends Error {
  readonly code: number = 0x1776
  readonly name: string = 'DeserializationError'
  constructor() {
    super('Deserialization error')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DeserializationErrorError)
    }
  }
}

createErrorFromCodeLookup.set(0x1776, () => new DeserializationErrorError())
createErrorFromNameLookup.set(
  'DeserializationError',
  () => new DeserializationErrorError()
)

/**
 * AssociatedTokenAccountMismatch: 'Associated token account mismatch'
 *
 * @category Errors
 * @category generated
 */
export class AssociatedTokenAccountMismatchError extends Error {
  readonly code: number = 0x1777
  readonly name: string = 'AssociatedTokenAccountMismatch'
  constructor() {
    super('Associated token account mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AssociatedTokenAccountMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x1777,
  () => new AssociatedTokenAccountMismatchError()
)
createErrorFromNameLookup.set(
  'AssociatedTokenAccountMismatch',
  () => new AssociatedTokenAccountMismatchError()
)

/**
 * AuthorityNotParticipant: 'Authority is not a participant'
 *
 * @category Errors
 * @category generated
 */
export class AuthorityNotParticipantError extends Error {
  readonly code: number = 0x1778
  readonly name: string = 'AuthorityNotParticipant'
  constructor() {
    super('Authority is not a participant')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AuthorityNotParticipantError)
    }
  }
}

createErrorFromCodeLookup.set(0x1778, () => new AuthorityNotParticipantError())
createErrorFromNameLookup.set(
  'AuthorityNotParticipant',
  () => new AuthorityNotParticipantError()
)

/**
 * MintNotProvided: 'Mint not provided'
 *
 * @category Errors
 * @category generated
 */
export class MintNotProvidedError extends Error {
  readonly code: number = 0x1779
  readonly name: string = 'MintNotProvided'
  constructor() {
    super('Mint not provided')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MintNotProvidedError)
    }
  }
}

createErrorFromCodeLookup.set(0x1779, () => new MintNotProvidedError())
createErrorFromNameLookup.set(
  'MintNotProvided',
  () => new MintNotProvidedError()
)

/**
 * SplitwaveTokenAccountNotProvided: 'Splitwave token account not provided'
 *
 * @category Errors
 * @category generated
 */
export class SplitwaveTokenAccountNotProvidedError extends Error {
  readonly code: number = 0x177a
  readonly name: string = 'SplitwaveTokenAccountNotProvided'
  constructor() {
    super('Splitwave token account not provided')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SplitwaveTokenAccountNotProvidedError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x177a,
  () => new SplitwaveTokenAccountNotProvidedError()
)
createErrorFromNameLookup.set(
  'SplitwaveTokenAccountNotProvided',
  () => new SplitwaveTokenAccountNotProvidedError()
)

/**
 * ParticipantTokenAccountNotProvided: 'Participant token account not provided'
 *
 * @category Errors
 * @category generated
 */
export class ParticipantTokenAccountNotProvidedError extends Error {
  readonly code: number = 0x177b
  readonly name: string = 'ParticipantTokenAccountNotProvided'
  constructor() {
    super('Participant token account not provided')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ParticipantTokenAccountNotProvidedError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x177b,
  () => new ParticipantTokenAccountNotProvidedError()
)
createErrorFromNameLookup.set(
  'ParticipantTokenAccountNotProvided',
  () => new ParticipantTokenAccountNotProvidedError()
)

/**
 * RecipientTokenAccountNotProvided: 'Recipient token account not provided'
 *
 * @category Errors
 * @category generated
 */
export class RecipientTokenAccountNotProvidedError extends Error {
  readonly code: number = 0x177c
  readonly name: string = 'RecipientTokenAccountNotProvided'
  constructor() {
    super('Recipient token account not provided')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, RecipientTokenAccountNotProvidedError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x177c,
  () => new RecipientTokenAccountNotProvidedError()
)
createErrorFromNameLookup.set(
  'RecipientTokenAccountNotProvided',
  () => new RecipientTokenAccountNotProvidedError()
)

/**
 * SplitwaveTokenAccountMintMismatch: 'Splitwave token account mint mismatch'
 *
 * @category Errors
 * @category generated
 */
export class SplitwaveTokenAccountMintMismatchError extends Error {
  readonly code: number = 0x177d
  readonly name: string = 'SplitwaveTokenAccountMintMismatch'
  constructor() {
    super('Splitwave token account mint mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SplitwaveTokenAccountMintMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x177d,
  () => new SplitwaveTokenAccountMintMismatchError()
)
createErrorFromNameLookup.set(
  'SplitwaveTokenAccountMintMismatch',
  () => new SplitwaveTokenAccountMintMismatchError()
)

/**
 * ParticipantTokenAccountMintMismatch: 'Participant token account mint mismatch'
 *
 * @category Errors
 * @category generated
 */
export class ParticipantTokenAccountMintMismatchError extends Error {
  readonly code: number = 0x177e
  readonly name: string = 'ParticipantTokenAccountMintMismatch'
  constructor() {
    super('Participant token account mint mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ParticipantTokenAccountMintMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x177e,
  () => new ParticipantTokenAccountMintMismatchError()
)
createErrorFromNameLookup.set(
  'ParticipantTokenAccountMintMismatch',
  () => new ParticipantTokenAccountMintMismatchError()
)

/**
 * RecipientTokenAccountMintMismatch: 'Recipient token account mint mismatch'
 *
 * @category Errors
 * @category generated
 */
export class RecipientTokenAccountMintMismatchError extends Error {
  readonly code: number = 0x177f
  readonly name: string = 'RecipientTokenAccountMintMismatch'
  constructor() {
    super('Recipient token account mint mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, RecipientTokenAccountMintMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x177f,
  () => new RecipientTokenAccountMintMismatchError()
)
createErrorFromNameLookup.set(
  'RecipientTokenAccountMintMismatch',
  () => new RecipientTokenAccountMintMismatchError()
)

/**
 * SplitwaveTokenAccountOwnerMismatch: 'Splitwave token account owner mismatch'
 *
 * @category Errors
 * @category generated
 */
export class SplitwaveTokenAccountOwnerMismatchError extends Error {
  readonly code: number = 0x1780
  readonly name: string = 'SplitwaveTokenAccountOwnerMismatch'
  constructor() {
    super('Splitwave token account owner mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SplitwaveTokenAccountOwnerMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x1780,
  () => new SplitwaveTokenAccountOwnerMismatchError()
)
createErrorFromNameLookup.set(
  'SplitwaveTokenAccountOwnerMismatch',
  () => new SplitwaveTokenAccountOwnerMismatchError()
)

/**
 * ParticipantTokenAccountOwnerMismatch: 'Participant token account owner mismatch'
 *
 * @category Errors
 * @category generated
 */
export class ParticipantTokenAccountOwnerMismatchError extends Error {
  readonly code: number = 0x1781
  readonly name: string = 'ParticipantTokenAccountOwnerMismatch'
  constructor() {
    super('Participant token account owner mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ParticipantTokenAccountOwnerMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x1781,
  () => new ParticipantTokenAccountOwnerMismatchError()
)
createErrorFromNameLookup.set(
  'ParticipantTokenAccountOwnerMismatch',
  () => new ParticipantTokenAccountOwnerMismatchError()
)

/**
 * RecipientTokenAccountOwnerMismatch: 'Recipient token account owner mismatch'
 *
 * @category Errors
 * @category generated
 */
export class RecipientTokenAccountOwnerMismatchError extends Error {
  readonly code: number = 0x1782
  readonly name: string = 'RecipientTokenAccountOwnerMismatch'
  constructor() {
    super('Recipient token account owner mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, RecipientTokenAccountOwnerMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x1782,
  () => new RecipientTokenAccountOwnerMismatchError()
)
createErrorFromNameLookup.set(
  'RecipientTokenAccountOwnerMismatch',
  () => new RecipientTokenAccountOwnerMismatchError()
)

/**
 * ParticipantTokenAccountInsufficientBalance: 'Participant token account insufficient balance'
 *
 * @category Errors
 * @category generated
 */
export class ParticipantTokenAccountInsufficientBalanceError extends Error {
  readonly code: number = 0x1783
  readonly name: string = 'ParticipantTokenAccountInsufficientBalance'
  constructor() {
    super('Participant token account insufficient balance')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        ParticipantTokenAccountInsufficientBalanceError
      )
    }
  }
}

createErrorFromCodeLookup.set(
  0x1783,
  () => new ParticipantTokenAccountInsufficientBalanceError()
)
createErrorFromNameLookup.set(
  'ParticipantTokenAccountInsufficientBalance',
  () => new ParticipantTokenAccountInsufficientBalanceError()
)

/**
 * ParticipantLamportInsufficientBalance: 'Participant lamport insufficient balance'
 *
 * @category Errors
 * @category generated
 */
export class ParticipantLamportInsufficientBalanceError extends Error {
  readonly code: number = 0x1784
  readonly name: string = 'ParticipantLamportInsufficientBalance'
  constructor() {
    super('Participant lamport insufficient balance')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ParticipantLamportInsufficientBalanceError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x1784,
  () => new ParticipantLamportInsufficientBalanceError()
)
createErrorFromNameLookup.set(
  'ParticipantLamportInsufficientBalance',
  () => new ParticipantLamportInsufficientBalanceError()
)

/**
 * MintMismatch: 'Mint mismatch'
 *
 * @category Errors
 * @category generated
 */
export class MintMismatchError extends Error {
  readonly code: number = 0x1785
  readonly name: string = 'MintMismatch'
  constructor() {
    super('Mint mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MintMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(0x1785, () => new MintMismatchError())
createErrorFromNameLookup.set('MintMismatch', () => new MintMismatchError())

/**
 * SplitwaveTokenAccountMismatch: 'Splitwave token account mismatch'
 *
 * @category Errors
 * @category generated
 */
export class SplitwaveTokenAccountMismatchError extends Error {
  readonly code: number = 0x1786
  readonly name: string = 'SplitwaveTokenAccountMismatch'
  constructor() {
    super('Splitwave token account mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SplitwaveTokenAccountMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x1786,
  () => new SplitwaveTokenAccountMismatchError()
)
createErrorFromNameLookup.set(
  'SplitwaveTokenAccountMismatch',
  () => new SplitwaveTokenAccountMismatchError()
)

/**
 * InvalidMintInitialized: 'Invalid Mint Initialized'
 *
 * @category Errors
 * @category generated
 */
export class InvalidMintInitializedError extends Error {
  readonly code: number = 0x1787
  readonly name: string = 'InvalidMintInitialized'
  constructor() {
    super('Invalid Mint Initialized')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidMintInitializedError)
    }
  }
}

createErrorFromCodeLookup.set(0x1787, () => new InvalidMintInitializedError())
createErrorFromNameLookup.set(
  'InvalidMintInitialized',
  () => new InvalidMintInitializedError()
)

/**
 * InvalidMintSupply: 'Invalid Mint Supply'
 *
 * @category Errors
 * @category generated
 */
export class InvalidMintSupplyError extends Error {
  readonly code: number = 0x1788
  readonly name: string = 'InvalidMintSupply'
  constructor() {
    super('Invalid Mint Supply')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidMintSupplyError)
    }
  }
}

createErrorFromCodeLookup.set(0x1788, () => new InvalidMintSupplyError())
createErrorFromNameLookup.set(
  'InvalidMintSupply',
  () => new InvalidMintSupplyError()
)

/**
 * InvalidMint: 'Invalid Mint'
 *
 * @category Errors
 * @category generated
 */
export class InvalidMintError extends Error {
  readonly code: number = 0x1789
  readonly name: string = 'InvalidMint'
  constructor() {
    super('Invalid Mint')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidMintError)
    }
  }
}

createErrorFromCodeLookup.set(0x1789, () => new InvalidMintError())
createErrorFromNameLookup.set('InvalidMint', () => new InvalidMintError())

/**
 * AmountAlreadyDisbursedToRecipient: 'Amount Already Disbursed to Recipient'
 *
 * @category Errors
 * @category generated
 */
export class AmountAlreadyDisbursedToRecipientError extends Error {
  readonly code: number = 0x178a
  readonly name: string = 'AmountAlreadyDisbursedToRecipient'
  constructor() {
    super('Amount Already Disbursed to Recipient')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AmountAlreadyDisbursedToRecipientError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x178a,
  () => new AmountAlreadyDisbursedToRecipientError()
)
createErrorFromNameLookup.set(
  'AmountAlreadyDisbursedToRecipient',
  () => new AmountAlreadyDisbursedToRecipientError()
)

/**
 * DuplicateParticipants: 'Duplicate Participants'
 *
 * @category Errors
 * @category generated
 */
export class DuplicateParticipantsError extends Error {
  readonly code: number = 0x178b
  readonly name: string = 'DuplicateParticipants'
  constructor() {
    super('Duplicate Participants')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DuplicateParticipantsError)
    }
  }
}

createErrorFromCodeLookup.set(0x178b, () => new DuplicateParticipantsError())
createErrorFromNameLookup.set(
  'DuplicateParticipants',
  () => new DuplicateParticipantsError()
)

/**
 * InvalidAccounts: 'Invalid Accounts'
 *
 * @category Errors
 * @category generated
 */
export class InvalidAccountsError extends Error {
  readonly code: number = 0x178c
  readonly name: string = 'InvalidAccounts'
  constructor() {
    super('Invalid Accounts')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidAccountsError)
    }
  }
}

createErrorFromCodeLookup.set(0x178c, () => new InvalidAccountsError())
createErrorFromNameLookup.set(
  'InvalidAccounts',
  () => new InvalidAccountsError()
)

/**
 * ParticipantNotFound: 'Participant not found'
 *
 * @category Errors
 * @category generated
 */
export class ParticipantNotFoundError extends Error {
  readonly code: number = 0x178d
  readonly name: string = 'ParticipantNotFound'
  constructor() {
    super('Participant not found')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ParticipantNotFoundError)
    }
  }
}

createErrorFromCodeLookup.set(0x178d, () => new ParticipantNotFoundError())
createErrorFromNameLookup.set(
  'ParticipantNotFound',
  () => new ParticipantNotFoundError()
)

/**
 * ParticipantAlreadyPaid: 'Participant already paid'
 *
 * @category Errors
 * @category generated
 */
export class ParticipantAlreadyPaidError extends Error {
  readonly code: number = 0x178e
  readonly name: string = 'ParticipantAlreadyPaid'
  constructor() {
    super('Participant already paid')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ParticipantAlreadyPaidError)
    }
  }
}

createErrorFromCodeLookup.set(0x178e, () => new ParticipantAlreadyPaidError())
createErrorFromNameLookup.set(
  'ParticipantAlreadyPaid',
  () => new ParticipantAlreadyPaidError()
)

/**
 * ParticipantPaidIncorrectAmount: 'Participant paid incorrect amount'
 *
 * @category Errors
 * @category generated
 */
export class ParticipantPaidIncorrectAmountError extends Error {
  readonly code: number = 0x178f
  readonly name: string = 'ParticipantPaidIncorrectAmount'
  constructor() {
    super('Participant paid incorrect amount')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ParticipantPaidIncorrectAmountError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x178f,
  () => new ParticipantPaidIncorrectAmountError()
)
createErrorFromNameLookup.set(
  'ParticipantPaidIncorrectAmount',
  () => new ParticipantPaidIncorrectAmountError()
)

/**
 * InvalidTokenAccountOwner: 'Invalid Token Account Owner'
 *
 * @category Errors
 * @category generated
 */
export class InvalidTokenAccountOwnerError extends Error {
  readonly code: number = 0x1790
  readonly name: string = 'InvalidTokenAccountOwner'
  constructor() {
    super('Invalid Token Account Owner')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidTokenAccountOwnerError)
    }
  }
}

createErrorFromCodeLookup.set(0x1790, () => new InvalidTokenAccountOwnerError())
createErrorFromNameLookup.set(
  'InvalidTokenAccountOwner',
  () => new InvalidTokenAccountOwnerError()
)

/**
 * TokenTransferFailed: 'Token transfer failed'
 *
 * @category Errors
 * @category generated
 */
export class TokenTransferFailedError extends Error {
  readonly code: number = 0x1791
  readonly name: string = 'TokenTransferFailed'
  constructor() {
    super('Token transfer failed')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TokenTransferFailedError)
    }
  }
}

createErrorFromCodeLookup.set(0x1791, () => new TokenTransferFailedError())
createErrorFromNameLookup.set(
  'TokenTransferFailed',
  () => new TokenTransferFailedError()
)

/**
 * PublicKeyMismatch: 'Public key mismatch'
 *
 * @category Errors
 * @category generated
 */
export class PublicKeyMismatchError extends Error {
  readonly code: number = 0x1792
  readonly name: string = 'PublicKeyMismatch'
  constructor() {
    super('Public key mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PublicKeyMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(0x1792, () => new PublicKeyMismatchError())
createErrorFromNameLookup.set(
  'PublicKeyMismatch',
  () => new PublicKeyMismatchError()
)

/**
 * UninitializedAccount: 'Uninitialized account'
 *
 * @category Errors
 * @category generated
 */
export class UninitializedAccountError extends Error {
  readonly code: number = 0x1793
  readonly name: string = 'UninitializedAccount'
  constructor() {
    super('Uninitialized account')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UninitializedAccountError)
    }
  }
}

createErrorFromCodeLookup.set(0x1793, () => new UninitializedAccountError())
createErrorFromNameLookup.set(
  'UninitializedAccount',
  () => new UninitializedAccountError()
)

/**
 * IncorrectOwner: 'Invalid account owner'
 *
 * @category Errors
 * @category generated
 */
export class IncorrectOwnerError extends Error {
  readonly code: number = 0x1794
  readonly name: string = 'IncorrectOwner'
  constructor() {
    super('Invalid account owner')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, IncorrectOwnerError)
    }
  }
}

createErrorFromCodeLookup.set(0x1794, () => new IncorrectOwnerError())
createErrorFromNameLookup.set('IncorrectOwner', () => new IncorrectOwnerError())

/**
 * DerivedKeyInvalid: 'Derived Key is not a signer'
 *
 * @category Errors
 * @category generated
 */
export class DerivedKeyInvalidError extends Error {
  readonly code: number = 0x1795
  readonly name: string = 'DerivedKeyInvalid'
  constructor() {
    super('Derived Key is not a signer')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DerivedKeyInvalidError)
    }
  }
}

createErrorFromCodeLookup.set(0x1795, () => new DerivedKeyInvalidError())
createErrorFromNameLookup.set(
  'DerivedKeyInvalid',
  () => new DerivedKeyInvalidError()
)

/**
 * BumpSeedNotInHashMap: 'Invalid bump seed'
 *
 * @category Errors
 * @category generated
 */
export class BumpSeedNotInHashMapError extends Error {
  readonly code: number = 0x1796
  readonly name: string = 'BumpSeedNotInHashMap'
  constructor() {
    super('Invalid bump seed')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, BumpSeedNotInHashMapError)
    }
  }
}

createErrorFromCodeLookup.set(0x1796, () => new BumpSeedNotInHashMapError())
createErrorFromNameLookup.set(
  'BumpSeedNotInHashMap',
  () => new BumpSeedNotInHashMapError()
)

/**
 * InvalidAssociatedTokenAccount: 'Invalid Associated Token Account'
 *
 * @category Errors
 * @category generated
 */
export class InvalidAssociatedTokenAccountError extends Error {
  readonly code: number = 0x1797
  readonly name: string = 'InvalidAssociatedTokenAccount'
  constructor() {
    super('Invalid Associated Token Account')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidAssociatedTokenAccountError)
    }
  }
}

createErrorFromCodeLookup.set(
  0x1797,
  () => new InvalidAssociatedTokenAccountError()
)
createErrorFromNameLookup.set(
  'InvalidAssociatedTokenAccount',
  () => new InvalidAssociatedTokenAccountError()
)

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 * @category generated
 */
export function errorFromCode(code: number): MaybeErrorWithCode {
  const createError = createErrorFromCodeLookup.get(code)
  return createError != null ? createError() : null
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 * @category generated
 */
export function errorFromName(name: string): MaybeErrorWithCode {
  const createError = createErrorFromNameLookup.get(name)
  return createError != null ? createError() : null
}