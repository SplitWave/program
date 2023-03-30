export type Splitwave = {
  "version": "0.1.0",
  "name": "splitwave",
  "instructions": [
    {
      "name": "createSplitwaveId",
      "accounts": [
        {
          "name": "splitwaveId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createSplitwave",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Key paying SOL fees for setting up the Splitwave instance.",
            "Authority key for the Splitwave instance."
          ]
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipientTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL or SPL token account to receive the final amount.",
            "If treasury mint is native this will be the same as the `recipient`."
          ]
        },
        {
          "name": "splitwave",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "splitwave instance"
          ]
        },
        {
          "name": "splitwaveTreasury",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Splitwave instance's treasury account"
          ]
        },
        {
          "name": "splitwaveMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "splitwave_mint Mint account, either native SOL mint or a SPL token mint."
          ]
        },
        {
          "name": "splitwaveId",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "splitwave_id instance",
            "constant address but the splitwave_id increments sequentially"
          ]
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "totalAmountToRecipient",
          "type": "u64"
        },
        {
          "name": "participants",
          "type": {
            "vec": {
              "defined": "SplitParticipant"
            }
          }
        },
        {
          "name": "splitwaveTreasuryBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "paySplitwave",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipientTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL or SPL token account to receive the final amount.",
            "If treasury mint is native this will be the same as the `recipient` passed in create_splitwave ix."
          ]
        },
        {
          "name": "splitwave",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "splitwave instance"
          ]
        },
        {
          "name": "splitwaveTreasury",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Splitwave instance's treasury account"
          ]
        },
        {
          "name": "splitwaveMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "splitwave_mint Mint account, either native SOL mint or a SPL token mint."
          ]
        },
        {
          "name": "participant",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "participant as signer"
          ]
        },
        {
          "name": "participantTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL or SPL token account to receive the final amount.",
            "If treasury mint is native this will be the same as the `participant`",
            "passed in create_splitwave ix as arguments."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "participantSplitAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateSplitwave",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "splitwave",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "totalAmountToRecipient",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "participants",
          "type": {
            "vec": {
              "defined": "SplitParticipant"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "splitwaveId",
      "docs": [
        "Represents the state of a splitwave."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "splitwaveId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "splitwave",
      "docs": [
        "Represents the state of a splitwave."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "splitwaveDisbursed",
            "type": "bool"
          },
          {
            "name": "splitwaveId",
            "type": "u64"
          },
          {
            "name": "totalAmountToRecipient",
            "type": "u64"
          },
          {
            "name": "amountPaidToSplitwaveAccount",
            "type": "u64"
          },
          {
            "name": "totalParticipants",
            "type": "u64"
          },
          {
            "name": "participantsPaidToSplitwave",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "recipientTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "splitwaveMint",
            "type": "publicKey"
          },
          {
            "name": "splitwaveTreasury",
            "type": "publicKey"
          },
          {
            "name": "splitwaveTreasuryBump",
            "type": "u8"
          },
          {
            "name": "participants",
            "type": {
              "vec": {
                "defined": "SplitParticipant"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SplitParticipant",
      "docs": [
        "A structure representing a participant's split and payment status."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "paid",
            "type": "bool"
          },
          {
            "name": "participantSplitAmount",
            "type": "u64"
          },
          {
            "name": "participantTokenAccount",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ZeroAmount",
      "msg": "Zero Amount to be Split by Authority"
    },
    {
      "code": 6001,
      "name": "MaxParticipantsReached",
      "msg": "Max Aprtiiccpants in a Split Reached"
    },
    {
      "code": 6002,
      "name": "EmptyParticipants",
      "msg": "No partipants created by Authority"
    },
    {
      "code": 6003,
      "name": "InvalidSplit",
      "msg": "Invalid Split of the total amount"
    },
    {
      "code": 6004,
      "name": "SplitwaveAlreadyDisbursed",
      "msg": "Splitwave already disbursed total_amount_to_recipient to recipient"
    },
    {
      "code": 6005,
      "name": "SplitwaveNotFullyPaid",
      "msg": "Splitwave token account is not fully paid"
    },
    {
      "code": 6006,
      "name": "DeserializationError",
      "msg": "Deserialization error"
    },
    {
      "code": 6007,
      "name": "AssociatedTokenAccountMismatch",
      "msg": "Associated token account mismatch"
    },
    {
      "code": 6008,
      "name": "AuthorityNotParticipant",
      "msg": "Authority is not a participant"
    },
    {
      "code": 6009,
      "name": "MintNotProvided",
      "msg": "Mint not provided"
    },
    {
      "code": 6010,
      "name": "SplitwaveTokenAccountNotProvided",
      "msg": "Splitwave token account not provided"
    },
    {
      "code": 6011,
      "name": "ParticipantTokenAccountNotProvided",
      "msg": "Participant token account not provided"
    },
    {
      "code": 6012,
      "name": "RecipientTokenAccountNotProvided",
      "msg": "Recipient token account not provided"
    },
    {
      "code": 6013,
      "name": "SplitwaveTokenAccountMintMismatch",
      "msg": "Splitwave token account mint mismatch"
    },
    {
      "code": 6014,
      "name": "ParticipantTokenAccountMintMismatch",
      "msg": "Participant token account mint mismatch"
    },
    {
      "code": 6015,
      "name": "RecipientTokenAccountMintMismatch",
      "msg": "Recipient token account mint mismatch"
    },
    {
      "code": 6016,
      "name": "SplitwaveTokenAccountOwnerMismatch",
      "msg": "Splitwave token account owner mismatch"
    },
    {
      "code": 6017,
      "name": "ParticipantTokenAccountOwnerMismatch",
      "msg": "Participant token account owner mismatch"
    },
    {
      "code": 6018,
      "name": "RecipientTokenAccountOwnerMismatch",
      "msg": "Recipient token account owner mismatch"
    },
    {
      "code": 6019,
      "name": "ParticipantTokenAccountInsufficientBalance",
      "msg": "Participant token account insufficient balance"
    },
    {
      "code": 6020,
      "name": "ParticipantLamportInsufficientBalance",
      "msg": "Participant lamport insufficient balance"
    },
    {
      "code": 6021,
      "name": "MintMismatch",
      "msg": "Mint mismatch"
    },
    {
      "code": 6022,
      "name": "SplitwaveTokenAccountMismatch",
      "msg": "Splitwave token account mismatch"
    },
    {
      "code": 6023,
      "name": "InvalidMintInitialized",
      "msg": "Invalid Mint Initialized"
    },
    {
      "code": 6024,
      "name": "InvalidMintSupply",
      "msg": "Invalid Mint Supply"
    },
    {
      "code": 6025,
      "name": "InvalidMint",
      "msg": "Invalid Mint"
    },
    {
      "code": 6026,
      "name": "AmountAlreadyDisbursedToRecipient",
      "msg": "Amount Already Disbursed to Recipient"
    },
    {
      "code": 6027,
      "name": "DuplicateParticipants",
      "msg": "Duplicate Participants"
    },
    {
      "code": 6028,
      "name": "InvalidAccounts",
      "msg": "Invalid Accounts"
    },
    {
      "code": 6029,
      "name": "ParticipantNotFound",
      "msg": "Participant not found"
    },
    {
      "code": 6030,
      "name": "ParticipantAlreadyPaid",
      "msg": "Participant already paid"
    },
    {
      "code": 6031,
      "name": "ParticipantPaidIncorrectAmount",
      "msg": "Participant paid incorrect amount"
    },
    {
      "code": 6032,
      "name": "InvalidTokenAccountOwner",
      "msg": "Invalid Token Account Owner"
    },
    {
      "code": 6033,
      "name": "TokenTransferFailed",
      "msg": "Token transfer failed"
    },
    {
      "code": 6034,
      "name": "PublicKeyMismatch",
      "msg": "Public key mismatch"
    },
    {
      "code": 6035,
      "name": "UninitializedAccount",
      "msg": "Uninitialized account"
    },
    {
      "code": 6036,
      "name": "IncorrectOwner",
      "msg": "Invalid account owner"
    },
    {
      "code": 6037,
      "name": "DerivedKeyInvalid",
      "msg": "Derived Key is not a signer"
    },
    {
      "code": 6038,
      "name": "BumpSeedNotInHashMap",
      "msg": "Invalid bump seed"
    },
    {
      "code": 6039,
      "name": "InvalidAssociatedTokenAccount",
      "msg": "Invalid Associated Token Account"
    }
  ]
};

export const IDL: Splitwave = {
  "version": "0.1.0",
  "name": "splitwave",
  "instructions": [
    {
      "name": "createSplitwaveId",
      "accounts": [
        {
          "name": "splitwaveId",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createSplitwave",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Key paying SOL fees for setting up the Splitwave instance.",
            "Authority key for the Splitwave instance."
          ]
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipientTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL or SPL token account to receive the final amount.",
            "If treasury mint is native this will be the same as the `recipient`."
          ]
        },
        {
          "name": "splitwave",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "splitwave instance"
          ]
        },
        {
          "name": "splitwaveTreasury",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Splitwave instance's treasury account"
          ]
        },
        {
          "name": "splitwaveMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "splitwave_mint Mint account, either native SOL mint or a SPL token mint."
          ]
        },
        {
          "name": "splitwaveId",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "splitwave_id instance",
            "constant address but the splitwave_id increments sequentially"
          ]
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "totalAmountToRecipient",
          "type": "u64"
        },
        {
          "name": "participants",
          "type": {
            "vec": {
              "defined": "SplitParticipant"
            }
          }
        },
        {
          "name": "splitwaveTreasuryBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "paySplitwave",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipientTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL or SPL token account to receive the final amount.",
            "If treasury mint is native this will be the same as the `recipient` passed in create_splitwave ix."
          ]
        },
        {
          "name": "splitwave",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "splitwave instance"
          ]
        },
        {
          "name": "splitwaveTreasury",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Splitwave instance's treasury account"
          ]
        },
        {
          "name": "splitwaveMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "splitwave_mint Mint account, either native SOL mint or a SPL token mint."
          ]
        },
        {
          "name": "participant",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "participant as signer"
          ]
        },
        {
          "name": "participantTokenAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "SOL or SPL token account to receive the final amount.",
            "If treasury mint is native this will be the same as the `participant`",
            "passed in create_splitwave ix as arguments."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "participantSplitAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateSplitwave",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "splitwave",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "totalAmountToRecipient",
          "type": {
            "option": "u64"
          }
        },
        {
          "name": "participants",
          "type": {
            "vec": {
              "defined": "SplitParticipant"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "splitwaveId",
      "docs": [
        "Represents the state of a splitwave."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "splitwaveId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "splitwave",
      "docs": [
        "Represents the state of a splitwave."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "splitwaveDisbursed",
            "type": "bool"
          },
          {
            "name": "splitwaveId",
            "type": "u64"
          },
          {
            "name": "totalAmountToRecipient",
            "type": "u64"
          },
          {
            "name": "amountPaidToSplitwaveAccount",
            "type": "u64"
          },
          {
            "name": "totalParticipants",
            "type": "u64"
          },
          {
            "name": "participantsPaidToSplitwave",
            "type": "u64"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "recipientTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "splitwaveMint",
            "type": "publicKey"
          },
          {
            "name": "splitwaveTreasury",
            "type": "publicKey"
          },
          {
            "name": "splitwaveTreasuryBump",
            "type": "u8"
          },
          {
            "name": "participants",
            "type": {
              "vec": {
                "defined": "SplitParticipant"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SplitParticipant",
      "docs": [
        "A structure representing a participant's split and payment status."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "paid",
            "type": "bool"
          },
          {
            "name": "participantSplitAmount",
            "type": "u64"
          },
          {
            "name": "participantTokenAccount",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ZeroAmount",
      "msg": "Zero Amount to be Split by Authority"
    },
    {
      "code": 6001,
      "name": "MaxParticipantsReached",
      "msg": "Max Aprtiiccpants in a Split Reached"
    },
    {
      "code": 6002,
      "name": "EmptyParticipants",
      "msg": "No partipants created by Authority"
    },
    {
      "code": 6003,
      "name": "InvalidSplit",
      "msg": "Invalid Split of the total amount"
    },
    {
      "code": 6004,
      "name": "SplitwaveAlreadyDisbursed",
      "msg": "Splitwave already disbursed total_amount_to_recipient to recipient"
    },
    {
      "code": 6005,
      "name": "SplitwaveNotFullyPaid",
      "msg": "Splitwave token account is not fully paid"
    },
    {
      "code": 6006,
      "name": "DeserializationError",
      "msg": "Deserialization error"
    },
    {
      "code": 6007,
      "name": "AssociatedTokenAccountMismatch",
      "msg": "Associated token account mismatch"
    },
    {
      "code": 6008,
      "name": "AuthorityNotParticipant",
      "msg": "Authority is not a participant"
    },
    {
      "code": 6009,
      "name": "MintNotProvided",
      "msg": "Mint not provided"
    },
    {
      "code": 6010,
      "name": "SplitwaveTokenAccountNotProvided",
      "msg": "Splitwave token account not provided"
    },
    {
      "code": 6011,
      "name": "ParticipantTokenAccountNotProvided",
      "msg": "Participant token account not provided"
    },
    {
      "code": 6012,
      "name": "RecipientTokenAccountNotProvided",
      "msg": "Recipient token account not provided"
    },
    {
      "code": 6013,
      "name": "SplitwaveTokenAccountMintMismatch",
      "msg": "Splitwave token account mint mismatch"
    },
    {
      "code": 6014,
      "name": "ParticipantTokenAccountMintMismatch",
      "msg": "Participant token account mint mismatch"
    },
    {
      "code": 6015,
      "name": "RecipientTokenAccountMintMismatch",
      "msg": "Recipient token account mint mismatch"
    },
    {
      "code": 6016,
      "name": "SplitwaveTokenAccountOwnerMismatch",
      "msg": "Splitwave token account owner mismatch"
    },
    {
      "code": 6017,
      "name": "ParticipantTokenAccountOwnerMismatch",
      "msg": "Participant token account owner mismatch"
    },
    {
      "code": 6018,
      "name": "RecipientTokenAccountOwnerMismatch",
      "msg": "Recipient token account owner mismatch"
    },
    {
      "code": 6019,
      "name": "ParticipantTokenAccountInsufficientBalance",
      "msg": "Participant token account insufficient balance"
    },
    {
      "code": 6020,
      "name": "ParticipantLamportInsufficientBalance",
      "msg": "Participant lamport insufficient balance"
    },
    {
      "code": 6021,
      "name": "MintMismatch",
      "msg": "Mint mismatch"
    },
    {
      "code": 6022,
      "name": "SplitwaveTokenAccountMismatch",
      "msg": "Splitwave token account mismatch"
    },
    {
      "code": 6023,
      "name": "InvalidMintInitialized",
      "msg": "Invalid Mint Initialized"
    },
    {
      "code": 6024,
      "name": "InvalidMintSupply",
      "msg": "Invalid Mint Supply"
    },
    {
      "code": 6025,
      "name": "InvalidMint",
      "msg": "Invalid Mint"
    },
    {
      "code": 6026,
      "name": "AmountAlreadyDisbursedToRecipient",
      "msg": "Amount Already Disbursed to Recipient"
    },
    {
      "code": 6027,
      "name": "DuplicateParticipants",
      "msg": "Duplicate Participants"
    },
    {
      "code": 6028,
      "name": "InvalidAccounts",
      "msg": "Invalid Accounts"
    },
    {
      "code": 6029,
      "name": "ParticipantNotFound",
      "msg": "Participant not found"
    },
    {
      "code": 6030,
      "name": "ParticipantAlreadyPaid",
      "msg": "Participant already paid"
    },
    {
      "code": 6031,
      "name": "ParticipantPaidIncorrectAmount",
      "msg": "Participant paid incorrect amount"
    },
    {
      "code": 6032,
      "name": "InvalidTokenAccountOwner",
      "msg": "Invalid Token Account Owner"
    },
    {
      "code": 6033,
      "name": "TokenTransferFailed",
      "msg": "Token transfer failed"
    },
    {
      "code": 6034,
      "name": "PublicKeyMismatch",
      "msg": "Public key mismatch"
    },
    {
      "code": 6035,
      "name": "UninitializedAccount",
      "msg": "Uninitialized account"
    },
    {
      "code": 6036,
      "name": "IncorrectOwner",
      "msg": "Invalid account owner"
    },
    {
      "code": 6037,
      "name": "DerivedKeyInvalid",
      "msg": "Derived Key is not a signer"
    },
    {
      "code": 6038,
      "name": "BumpSeedNotInHashMap",
      "msg": "Invalid bump seed"
    },
    {
      "code": 6039,
      "name": "InvalidAssociatedTokenAccount",
      "msg": "Invalid Associated Token Account"
    }
  ]
};
