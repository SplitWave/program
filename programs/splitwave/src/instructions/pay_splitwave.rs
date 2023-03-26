
use {
    crate::{
        state::*,
        errors::SplitwaveError,
    },
    anchor_lang::{
        prelude::*,
        solana_program::{
            system_program, 
            sysvar,
            program_pack::Pack, 
            program::invoke, 
            system_instruction,
        },
    },
    anchor_spl::{
        associated_token::AssociatedToken,
        token::{self, Transfer},
    },
};

#[derive(Accounts)]
#[instruction(participant_split_amount: u64)]
pub struct PaySplitwave<'info> {
    /// CHECK: the participant is validated by the seeds of the splitwave account
    #[account(address = splitwave.authority)]
    pub authority: AccountInfo<'info>,
        
    #[account(mut)]
    pub splitwave: Account<'info, Splitwave>,

    #[account(mut, constraint =  splitwave.participants.iter().any(|p| p.participant == participant.key() && p.paid == false),)]
    pub participant: Signer<'info>,
    
    /// CHECK: The recipient is validated by the splitwave account
    #[account(address = splitwave.recipient)]
    pub recipient: AccountInfo<'info>,
    
    #[account(address = sysvar::rent::ID)]
    pub rent: Sysvar<'info, Rent>,

    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,

    #[account(address = anchor_spl::token::ID)]
    pub token_program: Program<'info, token::Token>,

    #[account(address = anchor_spl::associated_token::ID)]
    pub associated_token_program: Program<'info, AssociatedToken>,

    // remaining accounts could be passed in this order
    // - splitwave_mint
    // - splitwave_token_account
    // - participant_token_account
    // - recipient_token_account

    // #[account(address = splitwave.mint)]
    // pub splitwave_mint: Account<'info, Mint>,

    // #[account(mut)]
    // pub splitwave_token_account: Account<'info, TokenAccount>,

    // #[account(
    //     mut, 
    //     associated_token::authority = participant,
    //     associated_token::mint = mint,
    // )]
    // pub participant_token_account: Account<'info, TokenAccount>,

    // #[account( 
    //     init_if_needed,
    //     payer = participant,
    //     associated_token::authority = recipient,
    //     associated_token::mint = mint,
    // )]
    // pub recipient_token_account: Box<Account<'info, TokenAccount>>,
    
}

pub fn handler<'key, 'accounts, 'remaining, 'info>(ctx: Context<'key, 'accounts, 'remaining, 'info, PaySplitwave<'info>>, participant_split_amount: u64) -> Result<()> {
    // Get accounts.
    let splitwave = &mut ctx.accounts.splitwave;
    let participant = &ctx.accounts.participant;
    let recipient = &ctx.accounts.recipient;
    let token_program = &ctx.accounts.token_program;
    
    if let Some(splitwave_mint) = splitwave.splitwave_mint {
        let remaining_accounts = ctx.remaining_accounts;
        let splitwave_mint_account_info = remaining_accounts.get(0).ok_or(SplitwaveError::MintNotProvided)?;
        let splitwave_token_account = remaining_accounts.get(1).ok_or(SplitwaveError::SplitwaveTokenAccountNotProvided)?;
        let participant_token_account = remaining_accounts.get(2).ok_or(SplitwaveError::ParticipantTokenAccountNotProvided)?;
        let recipient_token_account = remaining_accounts.get(3).ok_or(SplitwaveError::RecipientTokenAccountNotProvided)?;
        
        if splitwave_mint_account_info.key() != splitwave_mint {
            return Err(SplitwaveError::MintMismatch.into());
        }
        if splitwave_token_account.key() != splitwave.splitwave_token_account.unwrap() {
            return Err(SplitwaveError::SplitwaveTokenAccountMismatch.into());
        }
        
        let splitwave_token_account_data = &splitwave_token_account.try_borrow_data()?;
        let splitwave_token_account_data = spl_token::state::Account::unpack(&splitwave_token_account_data)?;
        let participant_token_account_data = &participant_token_account.try_borrow_data()?;
        let participant_token_account_data = spl_token::state::Account::unpack(&participant_token_account_data)?;
        let recipient_token_account_data = &recipient_token_account.try_borrow_data()?;
        let recipient_token_account_data = spl_token::state::Account::unpack(&recipient_token_account_data)?;


        if splitwave_token_account_data.mint != splitwave_mint.key(){
            return Err(SplitwaveError::SplitwaveTokenAccountMintMismatch.into());
        }
        if participant_token_account_data.mint != splitwave_mint.key() {
            return Err(SplitwaveError::ParticipantTokenAccountMintMismatch.into());
        }
        if recipient_token_account_data.mint != splitwave_mint.key() {
            return Err(SplitwaveError::RecipientTokenAccountMintMismatch.into());
        }
        // check owners and if the token accounts have enough balance for participant
        if splitwave_token_account_data.owner != splitwave.key(){
            return Err(SplitwaveError::SplitwaveTokenAccountOwnerMismatch.into());
        }
        if participant_token_account_data.owner != participant.key(){
            return Err(SplitwaveError::ParticipantTokenAccountOwnerMismatch.into());
        }
        if recipient_token_account_data.owner != recipient.key(){
            return Err(SplitwaveError::RecipientTokenAccountOwnerMismatch.into());
        }
        if participant_token_account_data.amount < participant_split_amount {
            return Err(SplitwaveError::ParticipantTokenAccountInsufficientBalance.into());
        }
        let cpi_accounts = Transfer {
            from: participant_token_account.to_account_info(),
            to: splitwave_token_account.to_account_info(),
            authority: participant.to_account_info(),
        };
        let cpi_program = token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, participant_split_amount)?;
        
    } else {
        let participant_lamports = participant.lamports();
        if participant_lamports < participant_split_amount {
            return Err(SplitwaveError::ParticipantLamportInsufficientBalance.into());
        }
        invoke(
            &system_instruction::transfer(participant.key, &splitwave.key(), participant_split_amount),
            &[
                participant.to_account_info(),
                splitwave.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;
        
    };

        
    // Update the splitwave state.
    let splitwave = &mut ctx.accounts.splitwave;
    for p in splitwave.participants.iter_mut() {
        if p.participant_split_amount == participant_split_amount && p.participant == participant.key() {
            p.paid = true;
        }
    }
    splitwave.participants_paid_to_splitwave += 1;
    splitwave.amount_paid_to_splitwave_account += participant_split_amount;

    // disburse the splitwave if all participants have paid
    if splitwave.participants_paid_to_splitwave as usize == splitwave.participants.len() 
        && splitwave.splitwave_disbursed == false {
            if splitwave.splitwave_mint.is_some() {
                let splitwave_token_account = &ctx.remaining_accounts[1];
                let recipient_token_account = &ctx.remaining_accounts[3];
                // let splitwave_token_account = ctx.remaining_accounts.get(1).unwrap();
                // let recipient_token_account = ctx.remaining_accounts.get(3).unwrap();
                let splitwave_id_for_seeds = splitwave.splitwave_id.to_le_bytes();
                let splitwave_seeds = &[
                    SEED_SPLITWAVE, 
                    splitwave_id_for_seeds.as_ref(),
                    &[splitwave.bump]
                ];
                
                let splitwave_signer = &[&splitwave_seeds[..]];
                let cpi_accounts = Transfer {
                    from: splitwave_token_account.to_account_info(),
                    to: recipient_token_account.to_account_info(),
                    authority: splitwave.to_account_info(),
                };
                let cpi_program = token_program.to_account_info();
                let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts).with_signer(splitwave_signer);
                token::transfer(cpi_ctx, splitwave.amount_paid_to_splitwave_account)?;
            } else {
                invoke(
                    &system_instruction::transfer(&splitwave.key(), recipient.key, splitwave.total_amount_to_recipient),
                    &[
                        splitwave.to_account_info(),
                        recipient.to_account_info(),
                        ctx.accounts.system_program.to_account_info(),
                    ],
                )?;
            }
        splitwave.splitwave_disbursed = true;
    }

    Ok(())
}
