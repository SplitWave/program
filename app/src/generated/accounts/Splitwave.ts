/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import * as beetSolana from '@metaplex-foundation/beet-solana'
import {
  SplitParticipant,
  splitParticipantBeet,
} from '../types/SplitParticipant'

/**
 * Arguments used to create {@link Splitwave}
 * @category Accounts
 * @category generated
 */
export type SplitwaveArgs = {
  bump: number
  splitwaveDisbursed: boolean
  splitwaveId: beet.bignum
  totalAmountToRecipient: beet.bignum
  amountPaidToSplitwaveAccount: beet.bignum
  totalParticipants: beet.bignum
  participantsPaidToSplitwave: beet.bignum
  authority: web3.PublicKey
  recipientTokenAccount: web3.PublicKey
  splitwaveMint: web3.PublicKey
  splitwaveTreasury: web3.PublicKey
  splitwaveTreasuryBump: number
  participants: SplitParticipant[]
}

export const splitwaveDiscriminator = [39, 79, 28, 23, 116, 77, 103, 221]
/**
 * Holds the data for the {@link Splitwave} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class Splitwave implements SplitwaveArgs {
  private constructor(
    readonly bump: number,
    readonly splitwaveDisbursed: boolean,
    readonly splitwaveId: beet.bignum,
    readonly totalAmountToRecipient: beet.bignum,
    readonly amountPaidToSplitwaveAccount: beet.bignum,
    readonly totalParticipants: beet.bignum,
    readonly participantsPaidToSplitwave: beet.bignum,
    readonly authority: web3.PublicKey,
    readonly recipientTokenAccount: web3.PublicKey,
    readonly splitwaveMint: web3.PublicKey,
    readonly splitwaveTreasury: web3.PublicKey,
    readonly splitwaveTreasuryBump: number,
    readonly participants: SplitParticipant[]
  ) {}

  /**
   * Creates a {@link Splitwave} instance from the provided args.
   */
  static fromArgs(args: SplitwaveArgs) {
    return new Splitwave(
      args.bump,
      args.splitwaveDisbursed,
      args.splitwaveId,
      args.totalAmountToRecipient,
      args.amountPaidToSplitwaveAccount,
      args.totalParticipants,
      args.participantsPaidToSplitwave,
      args.authority,
      args.recipientTokenAccount,
      args.splitwaveMint,
      args.splitwaveTreasury,
      args.splitwaveTreasuryBump,
      args.participants
    )
  }

  /**
   * Deserializes the {@link Splitwave} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [Splitwave, number] {
    return Splitwave.deserialize(accountInfo.data, offset)
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link Splitwave} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<Splitwave> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    )
    if (accountInfo == null) {
      throw new Error(`Unable to find Splitwave account at ${address}`)
    }
    return Splitwave.fromAccountInfo(accountInfo, 0)[0]
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      'pp1aQnBZ8271r5LcZymbudhTXbExDQiH2CzDj3N6ujY'
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, splitwaveBeet)
  }

  /**
   * Deserializes the {@link Splitwave} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [Splitwave, number] {
    return splitwaveBeet.deserialize(buf, offset)
  }

  /**
   * Serializes the {@link Splitwave} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return splitwaveBeet.serialize({
      accountDiscriminator: splitwaveDiscriminator,
      ...this,
    })
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link Splitwave} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: SplitwaveArgs) {
    const instance = Splitwave.fromArgs(args)
    return splitwaveBeet.toFixedFromValue({
      accountDiscriminator: splitwaveDiscriminator,
      ...instance,
    }).byteSize
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link Splitwave} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: SplitwaveArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      Splitwave.byteSize(args),
      commitment
    )
  }

  /**
   * Returns a readable version of {@link Splitwave} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      bump: this.bump,
      splitwaveDisbursed: this.splitwaveDisbursed,
      splitwaveId: (() => {
        const x = <{ toNumber: () => number }>this.splitwaveId
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber()
          } catch (_) {
            return x
          }
        }
        return x
      })(),
      totalAmountToRecipient: (() => {
        const x = <{ toNumber: () => number }>this.totalAmountToRecipient
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber()
          } catch (_) {
            return x
          }
        }
        return x
      })(),
      amountPaidToSplitwaveAccount: (() => {
        const x = <{ toNumber: () => number }>this.amountPaidToSplitwaveAccount
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber()
          } catch (_) {
            return x
          }
        }
        return x
      })(),
      totalParticipants: (() => {
        const x = <{ toNumber: () => number }>this.totalParticipants
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber()
          } catch (_) {
            return x
          }
        }
        return x
      })(),
      participantsPaidToSplitwave: (() => {
        const x = <{ toNumber: () => number }>this.participantsPaidToSplitwave
        if (typeof x.toNumber === 'function') {
          try {
            return x.toNumber()
          } catch (_) {
            return x
          }
        }
        return x
      })(),
      authority: this.authority.toBase58(),
      recipientTokenAccount: this.recipientTokenAccount.toBase58(),
      splitwaveMint: this.splitwaveMint.toBase58(),
      splitwaveTreasury: this.splitwaveTreasury.toBase58(),
      splitwaveTreasuryBump: this.splitwaveTreasuryBump,
      participants: this.participants,
    }
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const splitwaveBeet = new beet.FixableBeetStruct<
  Splitwave,
  SplitwaveArgs & {
    accountDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['bump', beet.u8],
    ['splitwaveDisbursed', beet.bool],
    ['splitwaveId', beet.u64],
    ['totalAmountToRecipient', beet.u64],
    ['amountPaidToSplitwaveAccount', beet.u64],
    ['totalParticipants', beet.u64],
    ['participantsPaidToSplitwave', beet.u64],
    ['authority', beetSolana.publicKey],
    ['recipientTokenAccount', beetSolana.publicKey],
    ['splitwaveMint', beetSolana.publicKey],
    ['splitwaveTreasury', beetSolana.publicKey],
    ['splitwaveTreasuryBump', beet.u8],
    ['participants', beet.array(splitParticipantBeet)],
  ],
  Splitwave.fromArgs,
  'Splitwave'
)
