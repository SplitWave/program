/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  SplitParticipant,
  splitParticipantBeet,
} from '../types/SplitParticipant'

/**
 * @category Instructions
 * @category UpdateSplitwave
 * @category generated
 */
export type UpdateSplitwaveInstructionArgs = {
  totalAmountToRecipient: beet.COption<beet.bignum>
  participants: SplitParticipant[]
}
/**
 * @category Instructions
 * @category UpdateSplitwave
 * @category generated
 */
export const updateSplitwaveStruct = new beet.FixableBeetArgsStruct<
  UpdateSplitwaveInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['totalAmountToRecipient', beet.coption(beet.u64)],
    ['participants', beet.array(splitParticipantBeet)],
  ],
  'UpdateSplitwaveInstructionArgs'
)
/**
 * Accounts required by the _updateSplitwave_ instruction
 *
 * @property [**signer**] authority
 * @property [_writable_] splitwave
 * @category Instructions
 * @category UpdateSplitwave
 * @category generated
 */
export type UpdateSplitwaveInstructionAccounts = {
  authority: web3.PublicKey
  splitwave: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const updateSplitwaveInstructionDiscriminator = [
  160, 66, 181, 58, 170, 175, 74, 81,
]

/**
 * Creates a _UpdateSplitwave_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category UpdateSplitwave
 * @category generated
 */
export function createUpdateSplitwaveInstruction(
  accounts: UpdateSplitwaveInstructionAccounts,
  args: UpdateSplitwaveInstructionArgs,
  programId = new web3.PublicKey('pp1aQnBZ8271r5LcZymbudhTXbExDQiH2CzDj3N6ujY')
) {
  const [data] = updateSplitwaveStruct.serialize({
    instructionDiscriminator: updateSplitwaveInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.authority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.splitwave,
      isWritable: true,
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
