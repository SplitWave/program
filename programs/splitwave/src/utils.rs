use crate::errors::SplitwaveError;

use anchor_lang::{
    prelude::*,
    solana_program::{
        program::invoke_signed,
        program_memory::{sol_memcmp, sol_memset},
        program_pack::{IsInitialized, Pack},
        pubkey::PUBKEY_BYTES,
        system_instruction,
    },
};

use anchor_spl::token::{Token, Mint};
use arrayref::array_ref;
use spl_associated_token_account::get_associated_token_address;
use spl_token::{instruction::initialize_account2, state::Account};
use std::convert::TryInto;

pub fn assert_is_ata(ata: &AccountInfo, wallet: &Pubkey, mint: &Pubkey) -> Result<Account> {
    assert_owned_by(ata, &spl_token::id())?;
    let ata_account: Account = assert_initialized(ata)?;
    assert_keys_equal(ata_account.owner, *wallet)?;
    assert_keys_equal(ata_account.mint, *mint)?;
    assert_keys_equal(get_associated_token_address(wallet, mint), *ata.key)?;
    Ok(ata_account)
}

pub fn make_ata<'a>(
    ata: AccountInfo<'a>,
    wallet: AccountInfo<'a>,
    mint: AccountInfo<'a>,
    fee_payer: AccountInfo<'a>,
    ata_program: AccountInfo<'a>,
    token_program: AccountInfo<'a>,
    system_program: AccountInfo<'a>,
    rent: AccountInfo<'a>,
    fee_payer_seeds: &[&[u8]],
) -> Result<()> {
    let as_arr = [fee_payer_seeds];

    let seeds: &[&[&[u8]]] = if !fee_payer_seeds.is_empty() {
        &as_arr
    } else {
        &[]
    };

    invoke_signed(
        &spl_associated_token_account::instruction::create_associated_token_account(
            fee_payer.key,
            wallet.key,
            mint.key,
            &spl_token::ID,
        ),
        &[
            ata,
            wallet,
            mint,
            fee_payer,
            ata_program,
            system_program,
            rent,
            token_program,
        ],
        seeds,
    )?;

    Ok(())
}


pub fn assert_keys_equal(key1: Pubkey, key2: Pubkey) -> Result<()> {
    if sol_memcmp(key1.as_ref(), key2.as_ref(), PUBKEY_BYTES) != 0 {
        err!(SplitwaveError::PublicKeyMismatch)
    } else {
        Ok(())
    }
}

pub fn assert_initialized<T: Pack + IsInitialized>(account_info: &AccountInfo) -> Result<T> {
    let account: T = T::unpack_unchecked(&account_info.data.borrow())?;
    if !account.is_initialized() {
        Err(SplitwaveError::UninitializedAccount.into())
    } else {
        Ok(account)
    }
}

pub fn assert_owned_by(account: &AccountInfo, owner: &Pubkey) -> Result<()> {
    if account.owner != owner {
        Err(SplitwaveError::IncorrectOwner.into())
    } else {
        Ok(())
    }
}

pub fn create_program_token_account_if_not_present<'a>(
    payment_account: &UncheckedAccount<'a>,
    system_program: &Program<'a, System>,
    fee_payer: &AccountInfo<'a>,
    token_program: &Program<'a, Token>,
    treasury_mint: &anchor_lang::prelude::Account<'a, Mint>,
    owner: &AccountInfo<'a>,
    rent: &Sysvar<'a, Rent>,
    signer_seeds: &[&[u8]],
    fee_seeds: &[&[u8]],
    is_native: bool,
) -> Result<()> {
    if !is_native && payment_account.data_is_empty() {
        create_or_allocate_account_raw(
            *token_program.key,
            &payment_account.to_account_info(),
            &rent.to_account_info(),
            system_program,
            fee_payer,
            spl_token::state::Account::LEN,
            fee_seeds,
            signer_seeds,
        )?;
        msg!("This.");
        invoke_signed(
            &initialize_account2(
                token_program.key,
                &payment_account.key(),
                &treasury_mint.key(),
                &owner.key(),
            )
            .unwrap(),
            &[
                token_program.to_account_info(),
                treasury_mint.to_account_info(),
                payment_account.to_account_info(),
                rent.to_account_info(),
                owner.clone(),
            ],
            &[signer_seeds],
        )?;
        msg!("Passes");
    }
    Ok(())
}
/// Create account almost from scratch, lifted from
/// https://github.com/solana-labs/solana-program-library/blob/7d4873c61721aca25464d42cc5ef651a7923ca79/associated-token-account/program/src/processor.rs#L51-L98
#[inline(always)]
pub fn create_or_allocate_account_raw<'a>(
    program_id: Pubkey,
    new_account_info: &AccountInfo<'a>,
    rent_sysvar_info: &AccountInfo<'a>,
    system_program_info: &AccountInfo<'a>,
    payer_info: &AccountInfo<'a>,
    size: usize,
    signer_seeds: &[&[u8]],
    new_acct_seeds: &[&[u8]],
) -> Result<()> {
    let rent = &Rent::from_account_info(rent_sysvar_info)?;
    let required_lamports = rent
        .minimum_balance(size)
        .max(1)
        .saturating_sub(new_account_info.lamports());

    if required_lamports > 0 {
        msg!("Transfer {} lamports to the new account", required_lamports);

        let as_arr = [signer_seeds];

        let seeds: &[&[&[u8]]] = if !signer_seeds.is_empty() {
            &as_arr
        } else {
            &[]
        };

        invoke_signed(
            &system_instruction::transfer(payer_info.key, new_account_info.key, required_lamports),
            &[
                payer_info.clone(),
                new_account_info.clone(),
                system_program_info.clone(),
            ],
            seeds,
        )?;
    }

    let accounts = &[new_account_info.clone(), system_program_info.clone()];

    msg!("Allocate space for the account {}", new_account_info.key);
    invoke_signed(
        &system_instruction::allocate(new_account_info.key, size.try_into().unwrap()),
        accounts,
        &[new_acct_seeds],
    )?;

    msg!("Assign the account to the owning program");
    invoke_signed(
        &system_instruction::assign(new_account_info.key, &program_id),
        accounts,
        &[new_acct_seeds],
    )?;
    msg!("Completed assignation!");

    Ok(())
}

pub fn assert_derivation(program_id: &Pubkey, account: &AccountInfo, path: &[&[u8]]) -> Result<u8> {
    let (key, bump) = Pubkey::find_program_address(path, program_id);
    if key != *account.key {
        return Err(SplitwaveError::DerivedKeyInvalid.into());
    }
    Ok(bump)
}

/// cheap method to get supply and decimals of a mint without unpacking whole object
pub fn get_mint_details(account_info: &AccountInfo) -> Result<(u64, u8)> {
    // In token program, 36, 8, 1, 1 is the layout, where:
    // - the first 8 is supply u64.
    // - the next 1 is decimals u8.
    let data = account_info.try_borrow_data()?;
    let supply = array_ref![data, 36, 8];
    let decimals = array_ref![data, 44, 1];

    Ok((u64::from_le_bytes(*supply), u8::from_le_bytes(*decimals)))
}

pub fn close_account<'a>(
    source_account: &AccountInfo<'a>,
    receiver_account: &AccountInfo<'a>,
) -> Result<()> {
    let current_lamports = source_account.lamports();
    let account_data_size = source_account.data_len();

    **source_account.lamports.borrow_mut() = 0;
    **receiver_account.lamports.borrow_mut() = receiver_account
        .lamports()
        .checked_add(current_lamports)
        .ok_or(SplitwaveError::NumericalOverflow)?;

    #[allow(clippy::explicit_auto_deref)]
    sol_memset(*source_account.try_borrow_mut_data()?, 0, account_data_size);

    Ok(())
}
