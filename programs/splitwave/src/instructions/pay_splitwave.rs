use {
    crate::{
        state::*,
        errors::SplitwaveError,
        utils::assert_is_ata,
    },
    anchor_lang::prelude::*,
    anchor_spl::token::{self, Mint},
    solana_program::{
        program::invoke_signed,
        system_instruction,
    },
};

#[derive(Accounts)]
#[instruction(participant_split_amount: u64)]
pub struct PaySplitwave<'info> {
    /// CHECK: Authority key for the Splitwave instance.
    #[account(address = splitwave.authority)]
    pub authority: AccountInfo<'info>,

    /// CHECK: recipient token account is an ATA and belongs to the recipient if SPL Token
    ///  SOL or SPL token account to receive the final amount. 
    ///  If treasury mint is native this will be the same as the `recipient` passed in create_splitwave ix.
    #[account(mut)]
    pub recipient_token_account: UncheckedAccount<'info>,

    /// splitwave instance
    #[account(mut,
        seeds = [
            SEED_SPLITWAVE, 
            splitwave.splitwave_id.to_le_bytes().as_ref(),
        ],
        bump = splitwave.bump,
        has_one = recipient_token_account,
        has_one = splitwave_treasury,
        )]
    pub splitwave: Box<Account<'info, Splitwave>>,

    /// Splitwave instance's treasury account
    /// CHECK: Not dangerous. Account seeds checked in constraint.
    #[account(mut, seeds = [SEED_SPLITWAVE_TREASURY, splitwave.key().as_ref()],bump = splitwave.splitwave_treasury_bump)]
    pub splitwave_treasury: UncheckedAccount<'info>,
    
    /// splitwave_mint Mint account, either native SOL mint or a SPL token mint.
    #[account()]
    pub splitwave_mint: Box<Account<'info, Mint>>,

    /// participant as signer
    #[account(mut)]
    pub participant: Signer<'info>,
    
    /// CHECK: participant token account is an ATA and belongs to the participant if SPL Token
    ///  SOL or SPL token account to receive the final amount. 
    ///  If treasury mint is native this will be the same as the `participant` 
    /// passed in create_splitwave ix as arguments.
    #[account(mut, constraint =  splitwave.participants.iter().any(|p| p.participant_token_account == participant_token_account.key() && p.paid == false),)]
    pub participant_token_account: UncheckedAccount<'info>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
}

pub fn handler(
    ctx: Context<PaySplitwave>, 
    participant_split_amount: u64
) -> Result<()> {
    let recipient_token_account = &mut ctx.accounts.recipient_token_account;
    let splitwave = &mut ctx.accounts.splitwave;
    let splitwave_treasury = &mut ctx.accounts.splitwave_treasury;
    let splitwave_mint = &ctx.accounts.splitwave_mint;
    let participant = &ctx.accounts.participant;
    let participant_token_account = &mut ctx.accounts.participant_token_account;
    let system_program = &ctx.accounts.system_program;
    let token_program = &ctx.accounts.token_program;

    let participant_index = 
        splitwave.participants.iter().
        position(|p| p.participant_token_account == participant_token_account.key()).ok_or(SplitwaveError::ParticipantNotFound)?;
   
    if splitwave.participants[participant_index].paid {
        return Err(SplitwaveError::ParticipantAlreadyPaid.into());
    }
   
    if splitwave.participants[participant_index].participant_split_amount != participant_split_amount {
        return Err(SplitwaveError::ParticipantPaidIncorrectAmount.into());
    }

    let is_native = splitwave_mint.key() == spl_token::native_mint::id();

    let splitwave_key = splitwave.key();

    if !is_native {
        
        // transfer participant token to splitwave treasury
        // assert_is_ata of participant_token_account
        let participant_token_account_ata_ret = assert_is_ata(
            &participant_token_account.to_account_info(),
            &participant.key(),
            &splitwave_mint.key(),
        );
        if participant_token_account_ata_ret.is_err() {
            return Err(SplitwaveError::InvalidAssociatedTokenAccount.into());
        }
        invoke_signed(
            &spl_token::instruction::transfer(
                token_program.key,
                &participant_token_account.key(),
                &splitwave_treasury.key(),
                &participant.key(),
                &[],
                participant_split_amount,
            )?,
            &[
                participant_token_account.to_account_info(),
                splitwave_treasury.to_account_info(),
                token_program.to_account_info(),
                participant.to_account_info(),
            ],
            &[],
        )?;
        // let cpi_accounts = Transfer {
        //     from: participant_token_account.to_account_info(),
        //     to: splitwave_treasury.to_account_info(),
        //     authority: participant.to_account_info(),
        // };
        // let cpi_program = token_program.to_account_info();
        // let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        // token::transfer(cpi_ctx, participant_split_amount)?;
        
    } else {
        invoke_signed(
            &system_instruction::transfer(
                &participant_token_account.key(),
                &splitwave_treasury.key(),
                participant_split_amount,
            ),
            &[
                participant_token_account.to_account_info(),
                splitwave_treasury.to_account_info(),
                system_program.to_account_info(),
            ],
            &[],
        )?;
    };

        
    // Update the splitwave state.
    let splitwave = &mut ctx.accounts.splitwave;
    for p in splitwave.participants.iter_mut() {
        if p.participant_token_account == participant.key() {
            p.paid = true;
        }
    }
    splitwave.participants_paid_to_splitwave += 1;
    msg!("splitwave participants paid to splitwave: {}", splitwave.participants_paid_to_splitwave);
    splitwave.amount_paid_to_splitwave_account += participant_split_amount;
    msg!("splitwave amount paid to splitwave account: {}", splitwave.amount_paid_to_splitwave_account);
    msg!("Participant paid to splitwave account");
    

    // disburse the splitwave if all participants have paid
    if splitwave.participants_paid_to_splitwave as usize == splitwave.participants.len() &&
        splitwave.splitwave_disbursed == 0 {
            let splitwave_treasury_seeds = [
                SEED_SPLITWAVE_TREASURY,
                splitwave_key.as_ref(),
                &[splitwave.splitwave_treasury_bump],
            ];
            
            if !is_native {
                msg!("splitwave token transfer");
                msg!("splitwave amount paid to splitwave account: {}", splitwave.amount_paid_to_splitwave_account);
                msg!("splitwave_mint: {}", splitwave_mint.key());
                invoke_signed(
                    &spl_token::instruction::transfer(
                        token_program.key,
                        &splitwave_treasury.key(),
                        &recipient_token_account.key(),
                        &splitwave.key(),
                        &[],
                        splitwave.amount_paid_to_splitwave_account,
                    )?,
                    &[
                        splitwave_treasury.to_account_info(),
                        recipient_token_account.to_account_info(),
                        token_program.to_account_info(),
                        splitwave.to_account_info(),
                    ],
                    &[&splitwave_treasury_seeds],
                )?;
                msg!("splitwave token transfer complete");
            } else {
                msg!("splitwave sol transfer");
                invoke_signed(
                    &system_instruction::transfer(
                        &splitwave_treasury.key(),
                        &recipient_token_account.key(),
                        splitwave.amount_paid_to_splitwave_account,
                    ),
                    &[
                        splitwave_treasury.to_account_info(),
                        recipient_token_account.to_account_info(),
                        system_program.to_account_info(),
                    ],
                    &[&splitwave_treasury_seeds],
                )?;
                msg!("splitwave sol transfer complete");
            }
        splitwave.splitwave_disbursed = 1;
    }

    Ok(())
}
