import * as anchor from "@project-serum/anchor";
import { BN, Program } from "@project-serum/anchor";
// import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { Splitwave } from "../target/types/splitwave";
import { PublicKey } from "@solana/web3.js";

describe("splitwave", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Splitwave as Program<Splitwave>;

  it("Is initialized!", async () => {
    // Add your test here.
    let participants = [
      {
        split: 30,
        paid: false,
        participant: new PublicKey(
          "DHywTRDpPWiyxXfgdaaPPXeBsvU6Lmofkk8SAU7kZzZ1"
        ),
      },
      {
        split: 20,
        paid: false,
        participant: new PublicKey(
          "BfnRc8FyxxTcdGEfsokkuLPR2RiE6xbL8nM56EQ7ZzZ2"
        ),
      },
      {
        split: 50,
        paid: false,
        participant: new PublicKey(
          "5gBmQCEfMUQCPogBdKDR5kW6UaMnE5CPRDDdoWQgZZZ3"
        ),
      },
    ];
    export type ArgsTuple<[{ name: "totalAmountToRecipient"; type: "u64"; }, { name: "participants"; type: { vec: { defined: "PartSplit"; }; }; }]>
    export type PartSplit  = { name: "split"; type: "u64"; } | { name: "paid"; type: "bool"; } | { name: "participant"; type: "Pubkey"; }
    const tx = await program.methods
      .createSplitwave(
        
      )
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
