import * as assert from "assert";
import * as anchor from "@project-serum/anchor";
import { Program, Wallet, BN, getProvider } from "@project-serum/anchor";

import * as fs from "fs";

import {
  SystemProgram,
  Transaction,
  Keypair,
  SYSVAR_RENT_PUBKEY,
  PublicKey,
} from "@solana/web3.js";

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { IDL, Splitwave } from "../target/types/splitwave";

const SPLITWAVE_PROGRAM_ID = new PublicKey(
  "pp1aQnBZ8271r5LcZymbudhTXbExDQiH2CzDj3N6ujY"
);

const NATIVE_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);

const loadWalletKey = async (keypairFile: string) => {
  if (!keypairFile || keypairFile == "") {
    throw new Error("Keypair is required!");
  }
  const loaded = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString()))
  );
  return loaded;
};

describe("splitwave", async () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Splitwave as Program<Splitwave>;

  const SEED_SPLITWAVE = Buffer.from("splitwave");

  const ZzZ1KPPath =
    "./Keypairs/DHywTRDpPWiyxXfgdaaPPXeBsvU6Lmofkk8SAU7kZzZ1.json";
  const ZzZ2KPPath =
    "./Keypairs/BfnRc8FyxxTcdGEfsokkuLPR2RiE6xbL8nM56EQ7ZzZ2.json";
  const zzz3KPPath =
    "./Keypairs/2get7zBCcjqLLsgHCYTTFABQUGzXfksq7RNHQZgWzzz3.json";
  const Zzz4KPPath =
    "./Keypairs/GHaeX7RnfxZEtRcYrUBNFzNeJPjK3kXKi9jyGQfpZzz4.json";
  const zzZ5KPPath =
    "./Keypairs/4QLiMNTLG1r4S1C8eQdzWrUBm1qHgtikTZYJyc56zzZ5.json";

  const ZzZ1KP = await loadWalletKey(ZzZ1KPPath);
  const ZzZ2KP = await loadWalletKey(ZzZ2KPPath);
  const zzz3KP = await loadWalletKey(zzz3KPPath);
  const Zzz4KP = await loadWalletKey(Zzz4KPPath);
  const zzZ5KP = await loadWalletKey(zzZ5KPPath);

  const ZzZ1PK = "DHywTRDpPWiyxXfgdaaPPXeBsvU6Lmofkk8SAU7kZzZ1";
  const ZzZ2PK = "BfnRc8FyxxTcdGEfsokkuLPR2RiE6xbL8nM56EQ7ZzZ2";
  const zzz3PK = "2get7zBCcjqLLsgHCYTTFABQUGzXfksq7RNHQZgWzzz3";
  const Zzz4PK = "GHaeX7RnfxZEtRcYrUBNFzNeJPjK3kXKi9jyGQfpZzz4";
  const zzZ5PK = "4QLiMNTLG1r4S1C8eQdzWrUBm1qHgtikTZYJyc56zzZ5";

  const ZzZ1Wallet = new Wallet(await loadWalletKey(ZzZ1KPPath));
  const ZzZ2Wallet = new Wallet(await loadWalletKey(ZzZ2KPPath));
  const zzz3Wallet = new Wallet(await loadWalletKey(zzz3KPPath));
  const Zzz4Wallet = new Wallet(await loadWalletKey(Zzz4KPPath));
  const zzZ5Wallet = new Wallet(await loadWalletKey(zzZ5KPPath));

  const findSplitwavePda = async (
    authority: PublicKey,
    mint: PublicKey,
    recipient: PublicKey
  ) => {
    const [splitwavePda] = await PublicKey.findProgramAddressSync(
      [
        Buffer.from(SEED_SPLITWAVE),
        authority.toBuffer(),
        mint.toBuffer(),
        recipient.toBuffer(),
      ],
      new PublicKey(SPLITWAVE_PROGRAM_ID)
    );
    return splitwavePda;
  };

  it("create Splitwave", async () => {
    const splitwavePda = await findSplitwavePda(
      ZzZ1KP.publicKey,
      NATIVE_SOL_MINT,
      zzZ5KP.publicKey
    );

    const splitwaveTokenAccount = await getAssociatedTokenAddressSync(
      NATIVE_SOL_MINT,
      splitwavePda,
      true,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const participants = [
      {
        participant_split_amount: new BN(2),
        paid: false,
        participant: ZzZ2KP.publicKey,
      },
      {
        participant_split_amount: new BN(5),
        paid: false,
        participant: zzz3KP.publicKey,
      },
      {
        participant_split_amount: new BN(3),
        paid: false,
        participant: Zzz4KP.publicKey,
      },
    ];

    const tx = await program.methods
      .createSplitwave(new anchor.BN(10), participants)
      .accountsStrict({
        authority: ZzZ1KP.publicKey,
        mint: NATIVE_SOL_MINT,
        recipient: zzZ5KP.publicKey,
        splitwave: splitwavePda,
        splitwaveTokenAccount: splitwaveTokenAccount,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .signers([ZzZ1KP]);

    console.log("Your transaction signature", tx);
  });

  // it("pay Splitwave", async () => {
  //   const splitwavePda = await findSplitwavePda(
  //     ZzZ1KP.publicKey,
  //     NATIVE_SOL_MINT,
  //     zzZ5KP.publicKey
  //   );

  //   const splitwaveTokenAccount = await getAssociatedTokenAddressSync(
  //     NATIVE_SOL_MINT,
  //     splitwavePda,
  //     true,
  //     TOKEN_PROGRAM_ID,
  //     ASSOCIATED_TOKEN_PROGRAM_ID
  //   );

  //   let participantTokenAccount = await getAssociatedTokenAddressSync(
  //     NATIVE_SOL_MINT,
  //     ZzZ2KP.publicKey,
  //     false,
  //     TOKEN_PROGRAM_ID,
  //     ASSOCIATED_TOKEN_PROGRAM_ID
  //   );

  //   const tx = await program.methods
  //     .paySplitwave(new anchor.BN(2))
  //     .accountsStrict({
  //       authority: ZzZ1KP.publicKey,
  //       mint: NATIVE_SOL_MINT,
  //       recipient: zzZ5KP.publicKey,
  //       splitwave: splitwavePda,
  //       splitwaveTokenAccount: splitwaveTokenAccount,
  //       participant: ZzZ2KP.publicKey,
  //       participantTokenAccount: participantTokenAccount,
  //       rent: anchor.web3.SYSVAR_RENT_PUBKEY,
  //       systemProgram: anchor.web3.SystemProgram.programId,
  //       tokenProgram: TOKEN_PROGRAM_ID,
  //       associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  //     })
  //     .signers([ZzZ2KP])
  //     .rpc();

  //   console.log("Your transaction signature", tx);
  // });
});
