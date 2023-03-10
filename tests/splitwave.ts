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
    const tx = await program.methods
      .createSplitwave({
        totalAmountToRecipient: new BN(100),
        participants: participants,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
