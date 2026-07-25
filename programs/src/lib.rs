// PowerChain AI Renewable Energy Credit (REC) Clearing Anchor Program
// Program ID: PWRC111111111111111111111111111111111111111

use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, MintTo};

declare_id!("PWRC111111111111111111111111111111111111111");

#[program]
pub mod powerchain_credit_clearing {
    use super::*;

    pub fn initialize_grid_vault(
        ctx: Context<InitializeGridVault>,
        mwh_capacity: u64,
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.authority = *ctx.accounts.authority.key;
        vault.mwh_capacity = mwh_capacity;
        vault.total_credits_minted = 0;
        vault.pyth_oracle_feed = *ctx.accounts.pyth_price_feed.key;
        msg!("PowerChain Grid Vault Initialized with MWh Capacity: {}", mwh_capacity);
        Ok(())
    }

    pub fn settle_power_credits(
        ctx: Context<SettlePowerCredits>,
        mwh_generated: u64,
        pwrc_amount: u64,
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.total_credits_minted += pwrc_amount;

        // Mint PWRC tokens to recipient SPL token account
        let seeds = &[
            b"grid_vault".as_ref(),
            &[ctx.bumps.vault],
        ];
        let signer = &[&seeds[..]];

        let cpi_accounts = MintTo {
            mint: ctx.accounts.pwrc_mint.to_account_info(),
            to: ctx.accounts.recipient_token_account.to_account_info(),
            authority: vault.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);

        token::mint_to(cpi_ctx, pwrc_amount)?;

        msg!("Settled {} MWh clean energy generation for {} PWRC credits", mwh_generated, pwrc_amount);
        Ok(())
    }
}

#[account]
pub struct GridVault {
    pub authority: Pubkey,
    pub mwh_capacity: u64,
    pub total_credits_minted: u64,
    pub pyth_oracle_feed: Pubkey,
}

#[derive(Accounts)]
pub struct InitializeGridVault<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 8 + 8 + 32,
        seeds = [b"grid_vault"],
        bump
    )]
    pub vault: Account<'info, GridVault>,
    /// CHECK: Pyth Oracle Feed Account
    pub pyth_price_feed: AccountInfo<'info>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SettlePowerCredits<'info> {
    #[account(
        mut,
        seeds = [b"grid_vault"],
        bump,
        has_one = authority
    )]
    pub vault: Account<'info, GridVault>,
    #[account(mut)]
    pub pwrc_mint: Account<'info, Mint>,
    #[account(mut)]
    pub recipient_token_account: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}
