/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from '@solana/spl-token'
import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'

/**
 * @category Instructions
 * @category PaySplitwave
 * @category generated
 */
export type PaySplitwaveInstructionArgs = {
  participantSplitAmount: beet.bignum
}
/**
 * @category Instructions
 * @category PaySplitwave
 * @category generated
 */
export const paySplitwaveStruct = new beet.BeetArgsStruct<
  PaySplitwaveInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['participantSplitAmount', beet.u64],
  ],
  'PaySplitwaveInstructionArgs'
)
/**
 * Accounts required by the _paySplitwave_ instruction
 *
 * @property [] authority
 * @property [_writable_] recipientTokenAccount
 * @property [_writable_] splitwave
 * @property [_writable_] splitwaveTreasury
 * @property [] splitwaveMint
 * @property [_writable_, **signer**] participant
 * @property [_writable_] participantTokenAccount
 * @category Instructions
 * @category PaySplitwave
 * @category generated
 */
export type PaySplitwaveInstructionAccounts = {
  authority: web3.PublicKey
  recipientTokenAccount: web3.PublicKey
  splitwave: web3.PublicKey
  splitwaveTreasury: web3.PublicKey
  splitwaveMint: web3.PublicKey
  participant: web3.PublicKey
  participantTokenAccount: web3.PublicKey
  systemProgram?: web3.PublicKey
  tokenProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const paySplitwaveInstructionDiscriminator = [
  219, 86, 54, 230, 252, 190, 100, 2,
]

/**
 * Creates a _PaySplitwave_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category PaySplitwave
 * @category generated
 */
export function createPaySplitwaveInstruction(
  accounts: PaySplitwaveInstructionAccounts,
  args: PaySplitwaveInstructionArgs,
  programId = new web3.PublicKey('pP24ZPhQLvSSri8hB5DdoUxRGRLCiYxdf5MH1s93dfd')
) {
  const [data] = paySplitwaveStruct.serialize({
    instructionDiscriminator: paySplitwaveInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.authority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.recipientTokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.splitwave,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.splitwaveTreasury,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.splitwaveMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.participant,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.participantTokenAccount,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
  ]

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
