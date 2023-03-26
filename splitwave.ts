export type Splitwave = {
  version: "0.1.0";
  name: "splitwave";
  instructions: [
    {
      name: "createSplitwaveId";
      accounts: [
        {
          name: "splitwaveId";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "createSplitwave";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "recipient";
          isMut: false;
          isSigner: false;
        },
        {
          name: "splitwave";
          isMut: true;
          isSigner: false;
        },
        {
          name: "splitwaveTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "splitwaveId";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "totalAmountToRecipient";
          type: "u64";
        },
        {
          name: "participants";
          type: {
            vec: {
              defined: "SplitParticipant";
            };
          };
        }
      ];
    },
    {
      name: "paySplitwave";
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "recipient";
          isMut: false;
          isSigner: false;
        },
        {
          name: "recipientTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "splitwave";
          isMut: true;
          isSigner: false;
        },
        {
          name: "splitwaveTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "participant";
          isMut: true;
          isSigner: true;
        },
        {
          name: "participantTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "participant_split_amount";
          type: "u64";
        }
      ];
    },
    {
      name: "disburseSplitwave";
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "recipient";
          isMut: false;
          isSigner: false;
        },
        {
          name: "splitwave";
          isMut: true;
          isSigner: false;
        },
        {
          name: "splitwaveTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "recipientTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "updateSplitwave";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "recipient";
          isMut: false;
          isSigner: false;
        },
        {
          name: "splitwave";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "totalAmountToRecipient";
          type: {
            option: "u64";
          };
        },
        {
          name: "participants";
          type: {
            vec: {
              defined: "SplitParticipant";
            };
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "splitwaveId";
      docs: ["Represents the state of a splitwave."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "splitwaveId";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "splitwave";
      docs: ["Represents the state of a splitwave."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "splitwaveId";
            type: "u64";
          },
          {
            name: "totalAmountToRecipient";
            type: "u64";
          },
          {
            name: "amountPaidToSplitwave";
            type: "u64";
          },
          {
            name: "totalParticipants";
            type: "u64";
          },
          {
            name: "participantsPaidToSplitwave";
            type: "u64";
          },
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "recipient";
            type: "publicKey";
          },
          {
            name: "amountDisbursedToRecipient";
            type: "bool";
          },
          {
            name: "splitwaveTokenAccount";
            type: "publicKey";
          },
          {
            name: "participants";
            type: {
              vec: {
                defined: "SplitParticipant";
              };
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "SplitParticipant";
      docs: [
        "A structure representing a participant's split and payment status."
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "participant_split_amount";
            type: "u64";
          },
          {
            name: "paid";
            type: "bool";
          },
          {
            name: "participant";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "ZeroAmount";
      msg: "Zero Amount to be Split by Authority";
    },
    {
      code: 6001;
      name: "MaxParticipantsReached";
      msg: "Max Aprtiiccpants in a Split Reached";
    },
    {
      code: 6002;
      name: "EmptyParticipants";
      msg: "No partipants created by Authority";
    },
    {
      code: 6003;
      name: "InvalidSplit";
      msg: "Invalid Split of the total amount";
    },
    {
      code: 6004;
      name: "SplitwaveAlreadyDisbursed";
      msg: "Splitwave already disbursed total_amount_to_recipient to recipient";
    },
    {
      code: 6005;
      name: "SplitwaveNotFullyPaid";
      msg: "Splitwave token account is not fully paid";
    },
    {
      code: 6006;
      name: "DeserializationError";
      msg: "Deserialization error";
    },
    {
      code: 6007;
      name: "AssociatedTokenAccountMismatch";
      msg: "Associated token account mismatch";
    }
  ];
};

export const IDL: Splitwave = {
  version: "0.1.0",
  name: "splitwave",
  instructions: [
    {
      name: "createSplitwaveId",
      accounts: [
        {
          name: "splitwaveId",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createSplitwave",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "recipient",
          isMut: false,
          isSigner: false,
        },
        {
          name: "splitwave",
          isMut: true,
          isSigner: false,
        },
        {
          name: "splitwaveTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "splitwaveId",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "totalAmountToRecipient",
          type: "u64",
        },
        {
          name: "participants",
          type: {
            vec: {
              defined: "SplitParticipant",
            },
          },
        },
      ],
    },
    {
      name: "paySplitwave",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "recipient",
          isMut: false,
          isSigner: false,
        },
        {
          name: "recipientTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "splitwave",
          isMut: true,
          isSigner: false,
        },
        {
          name: "splitwaveTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "participant",
          isMut: true,
          isSigner: true,
        },
        {
          name: "participantTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "participant_split_amount",
          type: "u64",
        },
      ],
    },
    {
      name: "disburseSplitwave",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "recipient",
          isMut: false,
          isSigner: false,
        },
        {
          name: "splitwave",
          isMut: true,
          isSigner: false,
        },
        {
          name: "splitwaveTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "recipientTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateSplitwave",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "recipient",
          isMut: false,
          isSigner: false,
        },
        {
          name: "splitwave",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "totalAmountToRecipient",
          type: {
            option: "u64",
          },
        },
        {
          name: "participants",
          type: {
            vec: {
              defined: "SplitParticipant",
            },
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "splitwaveId",
      docs: ["Represents the state of a splitwave."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "splitwaveId",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "splitwave",
      docs: ["Represents the state of a splitwave."],
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "splitwaveId",
            type: "u64",
          },
          {
            name: "totalAmountToRecipient",
            type: "u64",
          },
          {
            name: "amountPaidToSplitwave",
            type: "u64",
          },
          {
            name: "totalParticipants",
            type: "u64",
          },
          {
            name: "participantsPaidToSplitwave",
            type: "u64",
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "recipient",
            type: "publicKey",
          },
          {
            name: "amountDisbursedToRecipient",
            type: "bool",
          },
          {
            name: "splitwaveTokenAccount",
            type: "publicKey",
          },
          {
            name: "participants",
            type: {
              vec: {
                defined: "SplitParticipant",
              },
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "SplitParticipant",
      docs: [
        "A structure representing a participant's split and payment status.",
      ],
      type: {
        kind: "struct",
        fields: [
          {
            name: "participant_split_amount",
            type: "u64",
          },
          {
            name: "paid",
            type: "bool",
          },
          {
            name: "participant",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "ZeroAmount",
      msg: "Zero Amount to be Split by Authority",
    },
    {
      code: 6001,
      name: "MaxParticipantsReached",
      msg: "Max Aprtiiccpants in a Split Reached",
    },
    {
      code: 6002,
      name: "EmptyParticipants",
      msg: "No partipants created by Authority",
    },
    {
      code: 6003,
      name: "InvalidSplit",
      msg: "Invalid Split of the total amount",
    },
    {
      code: 6004,
      name: "SplitwaveAlreadyDisbursed",
      msg: "Splitwave already disbursed total_amount_to_recipient to recipient",
    },
    {
      code: 6005,
      name: "SplitwaveNotFullyPaid",
      msg: "Splitwave token account is not fully paid",
    },
    {
      code: 6006,
      name: "DeserializationError",
      msg: "Deserialization error",
    },
    {
      code: 6007,
      name: "AssociatedTokenAccountMismatch",
      msg: "Associated token account mismatch",
    },
  ],
};
