import * as anchor from "@project-serum/anchor";
import { BN, Program } from "@project-serum/anchor";

import * as fs from "fs";

import {
  Keypair,
  PublicKey,
} from "@solana/web3.js";

import { IDL, Splitwave } from "../target/types/splitwave";
import { SEED_SPLITWAVE_ID } from "./constants";
import { wait } from "./lib";
import { assert } from "chai";

const SPLITWAVE_PROGRAM_ID = new PublicKey(
  "pP24ZPhQLvSSri8hB5DdoUxRGRLCiYxdf5MH1s93dfd"
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

  it("create Splitwave id", async () => {
    const [splitwaveId] = PublicKey.findProgramAddressSync(
      [Buffer.from(SEED_SPLITWAVE_ID)],
      program.programId
    );

    const tx = await program.methods
      .createSplitwaveId()
      .accounts({
        splitwaveId,
        payer: (program.provider as anchor.AnchorProvider).wallet.publicKey
      })
      .rpc();

    console.log("Your transaction signature", tx);

    await wait(1);

    const splitwaveID = await program.account.splitwaveId.fetchNullable(splitwaveId, "confirmed");
    
    assert.isTrue(splitwaveID.splitwaveId.eq(new BN("1")));
  });
 
});
