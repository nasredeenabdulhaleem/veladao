use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod crowdfund {
    use super::*;

    pub fn initialize_project(
        ctx: Context<InitializeProject>,
        name: String,
        description: String,
        target_amount: u64,
        deadline: i64,
    ) -> Result<()> {
        let project = &mut ctx.accounts.project;
        project.name = name;
        project.description = description;
        project.target_amount = target_amount;
        project.current_amount = 0;
        project.deadline = deadline;
        project.manager = *ctx.accounts.manager.key;
        project.state = ProjectState::Active;
        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        let project = &mut ctx.accounts.project;
        let clock = Clock::get()?;

        require!(
            project.state == ProjectState::Active,
            ErrorCode::ProjectNotActive
        );
        require!(
            clock.unix_timestamp < project.deadline,
            ErrorCode::ProjectExpired
        );

        // Transfer tokens from donor to project vault
        let cpi_accounts = Transfer {
            from: ctx.accounts.donor_token_account.to_account_info(),
            to: ctx.accounts.project_vault.to_account_info(),
            authority: ctx.accounts.donor.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        // Update project state
        project.current_amount = project.current_amount.checked_add(amount).unwrap();

        // Check if target reached
        if project.current_amount >= project.target_amount {
            project.state = ProjectState::Successful;
        }

        Ok(())
    }

    pub fn withdraw_funds(ctx: Context<WithdrawFunds>) -> Result<()> {
        let project = &ctx.accounts.project;
        require!(
            project.state == ProjectState::Successful,
            ErrorCode::ProjectNotSuccessful
        );

        // Transfer tokens from project vault to manager
        let seeds = &[
            project.to_account_info().key.as_ref(),
            &[*ctx.bumps.get("project_vault").unwrap()],
        ];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.project_vault.to_account_info(),
            to: ctx.accounts.manager_token_account.to_account_info(),
            authority: ctx.accounts.project_vault.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        token::transfer(cpi_ctx, ctx.accounts.project_vault.amount)?;

        Ok(())
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        let project = &ctx.accounts.project;
        let clock = Clock::get()?;

        require!(
            project.state == ProjectState::Active,
            ErrorCode::ProjectNotActive
        );
        require!(
            clock.unix_timestamp >= project.deadline,
            ErrorCode::ProjectNotExpired
        );
        require!(
            project.current_amount < project.target_amount,
            ErrorCode::ProjectSuccessful
        );

        // Transfer tokens from project vault to donor
        let seeds = &[
            project.to_account_info().key.as_ref(),
            &[*ctx.bumps.get("project_vault").unwrap()],
        ];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.project_vault.to_account_info(),
            to: ctx.accounts.donor_token_account.to_account_info(),
            authority: ctx.accounts.project_vault.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        token::transfer(cpi_ctx, ctx.accounts.donation.amount)?;

        // Remove donation from project
        project.current_amount = project
            .current_amount
            .checked_sub(ctx.accounts.donation.amount)
            .unwrap();

        // Close donation account
        let dest_starting_lamports = ctx.accounts.donor.lamports();
        **ctx.accounts.donor.lamports.borrow_mut() = dest_starting_lamports
            .checked_add(ctx.accounts.donation.to_account_info().lamports())
            .unwrap();
        **ctx
            .accounts
            .donation
            .to_account_info()
            .lamports
            .borrow_mut() = 0;

        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum ProjectState {
    Active,
    Successful,
    Expired,
}

#[account]
pub struct Project {
    pub name: String,
    pub description: String,
    pub manager: Pubkey,
    pub target_amount: u64,
    pub current_amount: u64,
    pub deadline: i64,
    pub state: ProjectState,
}

#[account]
pub struct Donation {
    pub project: Pubkey,
    pub donor: Pubkey,
    pub amount: u64,
}

#[derive(Accounts)]
pub struct InitializeProject<'info> {
    #[account(init, payer = manager, space = 8 + 32 + 256 + 32 + 8 + 8 + 8 + 1)]
    pub project: Account<'info, Project>,
    #[account(mut)]
    pub manager: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub project: Account<'info, Project>,
    #[account(
        init,
        payer = donor,
        space = 8 + 32 + 32 + 8,
        seeds = [b"donation", project.key().as_ref(), donor.key().as_ref()],
        bump
    )]
    pub donation: Account<'info, Donation>,
    #[account(mut)]
    pub donor: Signer<'info>,
    #[account(mut)]
    pub donor_token_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        seeds = [b"vault", project.key().as_ref()],
        bump
    )]
    pub project_vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct WithdrawFunds<'info> {
    #[account(mut, has_one = manager)]
    pub project: Account<'info, Project>,
    pub manager: Signer<'info>,
    #[account(mut)]
    pub manager_token_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        seeds = [b"vault", project.key().as_ref()],
        bump
    )]
    pub project_vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(mut)]
    pub project: Account<'info, Project>,
    #[account(
        mut,
        seeds = [b"donation", project.key().as_ref(), donor.key().as_ref()],
        bump,
        close = donor
    )]
    pub donation: Account<'info, Donation>,
    #[account(mut)]
    pub donor: Signer<'info>,
    #[account(mut)]
    pub donor_token_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        seeds = [b"vault", project.key().as_ref()],
        bump
    )]
    pub project_vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Project is not active")]
    ProjectNotActive,
    #[msg("Project has expired")]
    ProjectExpired,
    #[msg("Project is not successful")]
    ProjectNotSuccessful,
    #[msg("Project has not expired")]
    ProjectNotExpired,
    #[msg("Project is successful")]
    ProjectSuccessful,
}
