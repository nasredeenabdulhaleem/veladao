use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("GNap3DpM75MTEz5bvoKm5uncy2BXtQeXXxysp8HHeRTA");

#[program]
pub mod veladao {
    use super::*;

    pub fn initialize_platform(ctx: Context<InitializePlatform>) -> Result<()> {
        let platform = &mut ctx.accounts.platform;
        platform.manager = *ctx.accounts.manager.key;
        platform.total_funds = 0;
        platform.platform_wallet = *ctx.accounts.platform_wallet.key;
        Ok(())
    }

    pub fn initialize_project(
        ctx: Context<InitializeProject>,
        name: String,
        description: String,
        target_amount: u64,
        milestones: Vec<Milestone>,
        deadline: i64,
    ) -> Result<()> {
        let project = &mut ctx.accounts.project;
        project.name = name;
        project.description = description;
        project.manager = *ctx.accounts.manager.key;
        project.target_amount = target_amount;
        project.current_amount = 0;
        project.milestones = milestones;
        project.current_milestone = 0;
        project.deadline = deadline;
        project.state = ProjectState::Active;
        Ok(())
    }

    pub fn record_donation(
        ctx: Context<RecordDonation>,
        amount: u64,
        donation_reference: String,
    ) -> Result<()> {
        let donation = &mut ctx.accounts.donation;
        let project = &mut ctx.accounts.project;
        let platform = &mut ctx.accounts.platform;

        donation.donor = ctx.accounts.donor.key();
        donation.project = *project.to_account_info().key;
        donation.amount = amount;
        donation.timestamp = Clock::get()?.unix_timestamp;
        donation.reference = donation_reference;

        project.current_amount = project
            .current_amount
            .checked_add(amount)
            .ok_or(ErrorCode::Overflow)?;
        platform.total_funds = platform
            .total_funds
            .checked_add(amount)
            .ok_or(ErrorCode::Overflow)?;

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
            b"vault",
            project.to_account_info().key.as_ref(),
            &[ctx.bumps.project_vault],
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
        let project = &mut ctx.accounts.project;
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
            b"vault",
            project.to_account_info().key.as_ref(),
            &[ctx.bumps.project_vault],
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
            .ok_or(ErrorCode::Underflow)?;

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

    pub fn get_project(ctx: Context<GetProject>) -> Result<ProjectInfo> {
        let project = &ctx.accounts.project;
        Ok(ProjectInfo {
            name: project.name.clone(),
            description: project.description.clone(),
            manager: project.manager,
            target_amount: project.target_amount,
            current_amount: project.current_amount,
            deadline: project.deadline,
            state: project.state,
            milestones: project.milestones.clone(),
            current_milestone: project.current_milestone,
        })
    }

    pub fn get_donation(ctx: Context<GetDonation>) -> Result<DonationInfo> {
        let donation = &ctx.accounts.donation;
        Ok(DonationInfo {
            donor: donation.donor,
            project: donation.project,
            amount: donation.amount,
            timestamp: donation.timestamp,
            reference: donation.reference.clone(),
        })
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum ProjectState {
    Active,
    Successful,
    Expired,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct ProjectInfo {
    pub name: String,
    pub description: String,
    pub manager: Pubkey,
    pub target_amount: u64,
    pub current_amount: u64,
    pub deadline: i64,
    pub state: ProjectState,
    pub milestones: Vec<Milestone>,
    pub current_milestone: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct DonationInfo {
    pub donor: Pubkey,
    pub project: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
    pub reference: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct Milestone {
    pub description: String,
    pub target: u64,
    pub end_date: i64,
}

// New context for getting project details
#[derive(Accounts)]
pub struct GetProject<'info> {
    pub project: Account<'info, Project>,
}

// New context for getting donation details
#[derive(Accounts)]
pub struct GetDonation<'info> {
    pub donation: Account<'info, Donation>,
}
#[account]
pub struct Platform {
    pub manager: Pubkey,
    pub total_funds: u64,
    pub platform_wallet: Pubkey,
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
    pub milestones: Vec<Milestone>,
    pub current_milestone: u64,
}

#[account]
pub struct Donation {
    pub donor: Pubkey,
    pub project: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
    pub reference: String,
}

#[derive(Accounts)]
pub struct InitializeProject<'info> {
    #[account(
        init, 
        payer = manager, 
        space = 8 + 32 + 256 + 32 + 8 + 8 + 8 + 1 + (4 + (32 + 8 + 8) * MAX_MILESTONES) + 8
    )]
    pub project: Account<'info, Project>,
    #[account(mut)]
    pub manager: Signer<'info>,
    pub system_program: Program<'info, System>,
}

const MAX_MILESTONES: usize = 10;

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
pub struct InitializePlatform<'info> {
    #[account(init, payer = manager, space = 8 + 32 + 8 + 32)]
    pub platform: Account<'info, Platform>,
    #[account(mut)]
    pub manager: Signer<'info>,
    /// CHECK: This is the platform wallet, it doesn't need to be a signer
    pub platform_wallet: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RecordDonation<'info> {
    #[account(mut)]
    pub platform: Account<'info, Platform>,
    #[account(mut)]
    pub project: Account<'info, Project>,
    #[account(
        init,
        payer = donor,
        space = 8 + 32 + 32 + 8 + 8 + 64, // Adjusted space for reference string
        seeds = [b"donation", project.key().as_ref(), donor.key().as_ref()],
        bump
    )]
    pub donation: Account<'info, Donation>,
    #[account(mut)]
    pub donor: Signer<'info>,
    pub system_program: Program<'info, System>,
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
    #[msg("Overflow detected")]
    Overflow,
    #[msg("Underflow detected")]
    Underflow,
    #[msg("Bump for the account not found")]
    BumpNotFound,
}
