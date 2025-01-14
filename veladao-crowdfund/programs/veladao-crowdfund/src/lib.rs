// use anchor_lang::prelude::*;
// use anchor_spl::token::{self, Token, TokenAccount, Transfer};

// declare_id!("GNap3DpM75MTEz5bvoKm5uncy2BXtQeXXxysp8HHeRTA");

// #[program]
// pub mod veladao {
//     use super::*;

//     pub fn initialize_platform(ctx: Context<InitializePlatform>, initial_fee: u16) -> Result<()> {
//         let platform = &mut ctx.accounts.platform;
//         platform.manager = *ctx.accounts.manager.key;
//         platform.total_funds = 0;
//         platform.platform_wallet = ctx.accounts.platform_wallet.key();
//         platform.platform_fee = initial_fee;
//         platform.project_count = 0;
//         platform.total_milestones = 0;
//         platform.completed_milestones = 0;
//         emit!(PlatformInitialized {
//             manager: platform.manager,
//             platform_wallet: platform.platform_wallet,
//             initial_fee: initial_fee as u64,
//         });
//         Ok(())
//     }

//     pub fn update_platform_fee(ctx: Context<UpdatePlatformFee>, new_fee: u16) -> Result<()> {
//         let platform = &mut ctx.accounts.platform;
//         require!(
//             ctx.accounts.manager.key() == platform.manager,
//             ErrorCode::Unauthorized
//         );
//         platform.platform_fee = new_fee;
//         emit!(PlatformFeeUpdated {
//             new_fee: new_fee as u64
//         });
//         Ok(())
//     }

//     pub fn initialize_project(
//         ctx: Context<InitializeProject>,
//         name: String,
//         description: String,
//         target_amount: u64,
//         milestones: Vec<Milestone>,
//         deadline: i64,
//     ) -> Result<()> {
//         let project = &mut ctx.accounts.project;
//         let platform = &ctx.accounts.platform;

//         project.name = name;
//         project.description = description;
//         project.manager = *ctx.accounts.manager.key;
//         project.target_amount = target_amount;
//         project.current_amount = 0;
//         project.milestones = milestones;
//         project.current_milestone = 0;
//         project.deadline = deadline;
//         project.state = ProjectState::Active;
//         project.platform_fee = platform.platform_fee;

//         emit!(ProjectInitialized {
//             project: project.key(),
//             name: project.name.clone(),
//             target_amount,
//             deadline,
//         });
//         Ok(())
//     }

//     pub fn update_project(
//         ctx: Context<UpdateProject>,
//         name: Option<String>,
//         description: Option<String>,
//         milestones: Option<Vec<Milestone>>,
//     ) -> Result<()> {
//         let project = &mut ctx.accounts.project;

//         if let Some(new_name) = name {
//             project.name = new_name;
//         }
//         if let Some(new_description) = description {
//             project.description = new_description;
//         }
//         if let Some(new_milestones) = milestones {
//             require!(
//                 project.current_milestone == 0,
//                 ErrorCode::CannotUpdateMilestones
//             );
//             project.milestones = new_milestones;
//         }

//         emit!(ProjectUpdated {
//             project: project.key(),
//             name: project.name.clone(),
//             description: project.description.clone(),
//         });
//         Ok(())
//     }

//     pub fn record_donation(
//         ctx: Context<RecordDonation>,
//         amount: u64,
//         donation_reference: String,
//     ) -> Result<()> {
//         let donation = &mut ctx.accounts.donation;
//         let project = &mut ctx.accounts.project;
//         let platform = &mut ctx.accounts.platform;

//         donation.donor = ctx.accounts.donor.key();
//         donation.project = *project.to_account_info().key;
//         donation.amount = amount;
//         donation.timestamp = Clock::get()?.unix_timestamp;
//         donation.reference = donation_reference;

//         let fee_amount = (amount * project.platform_fee as u64) / 10000;
//         let project_amount = amount - fee_amount;

//         project.current_amount = project
//             .current_amount
//             .checked_add(project_amount)
//             .ok_or(ErrorCode::Overflow)?;
//         platform.total_funds = platform
//             .total_funds
//             .checked_add(fee_amount)
//             .ok_or(ErrorCode::Overflow)?;

//         if project.current_amount >= project.target_amount {
//             project.state = ProjectState::Successful;
//         }

//         // Transfer fee to platform wallet
//         let cpi_accounts = Transfer {
//             from: ctx.accounts.donor_token_account.to_account_info(),
//             to: ctx.accounts.platform_wallet.to_account_info(),
//             authority: ctx.accounts.donor.to_account_info(),
//         };
//         let cpi_program = ctx.accounts.token_program.to_account_info();
//         let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
//         token::transfer(cpi_ctx, fee_amount)?;

//         // Transfer project amount to project vault
//         let cpi_accounts = Transfer {
//             from: ctx.accounts.donor_token_account.to_account_info(),
//             to: ctx.accounts.project_vault.to_account_info(),
//             authority: ctx.accounts.donor.to_account_info(),
//         };
//         let cpi_program = ctx.accounts.token_program.to_account_info();
//         let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
//         token::transfer(cpi_ctx, project_amount)?;

//         // Update platform total_funds
//         let platform = &mut ctx.accounts.platform;
//         platform.total_funds = platform
//             .total_funds
//             .checked_add(amount)
//             .ok_or(ErrorCode::Overflow)?;

//         emit!(DonationRecorded {
//             project: project.key(),
//             donor: donation.donor,
//             amount,
//             fee_amount,
//         });
//         Ok(())
//     }

//     pub fn complete_milestone(ctx: Context<CompleteMilestone>) -> Result<()> {
//         let project = &mut ctx.accounts.project;
//         require!(
//             project.state == ProjectState::Active,
//             ErrorCode::ProjectNotActive
//         );
//         require!(
//             project.current_milestone < project.milestones.len() as u64,
//             ErrorCode::NoMoreMilestones
//         );

//         let current_milestone = &project.milestones[project.current_milestone as usize];
//         require!(
//             project.current_amount >= current_milestone.target,
//             ErrorCode::MilestoneTargetNotReached
//         );

//         project.current_milestone += 1;

//         if project.current_milestone as usize == project.milestones.len() {
//             project.state = ProjectState::Successful;
//         }

//         // Update platform completed_milestones
//         let platform = &mut ctx.accounts.platform;
//         platform.completed_milestones = platform
//             .completed_milestones
//             .checked_add(1)
//             .ok_or(ErrorCode::Overflow)?;

//         emit!(MilestoneCompleted {
//             project: project.key(),
//             milestone_index: project.current_milestone - 1,
//         });
//         Ok(())
//     }
//     pub fn withdraw_funds(ctx: Context<WithdrawFunds>) -> Result<()> {
//         let project = &ctx.accounts.project;
//         require!(
//             project.state == ProjectState::Successful,
//             ErrorCode::ProjectNotSuccessful
//         );

//         // Transfer tokens from project vault to manager
//         let seeds = &[
//             b"vault",
//             project.to_account_info().key.as_ref(),
//             &[ctx.bumps.project_vault],
//         ];
//         let signer = &[&seeds[..]];

//         let cpi_accounts = Transfer {
//             from: ctx.accounts.project_vault.to_account_info(),
//             to: ctx.accounts.manager_token_account.to_account_info(),
//             authority: ctx.accounts.project_vault.to_account_info(),
//         };
//         let cpi_program = ctx.accounts.token_program.to_account_info();
//         let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
//         token::transfer(cpi_ctx, ctx.accounts.project_vault.amount)?;

//         Ok(())
//     }

//     pub fn refund(ctx: Context<Refund>) -> Result<()> {
//         let project = &mut ctx.accounts.project;
//         let clock = Clock::get()?;

//         require!(
//             project.state == ProjectState::Active,
//             ErrorCode::ProjectNotActive
//         );
//         require!(
//             clock.unix_timestamp >= project.deadline,
//             ErrorCode::ProjectNotExpired
//         );
//         require!(
//             project.current_amount < project.target_amount,
//             ErrorCode::ProjectSuccessful
//         );

//         // Transfer tokens from project vault to donor
//         let seeds = &[
//             b"vault",
//             project.to_account_info().key.as_ref(),
//             &[ctx.bumps.project_vault],
//         ];
//         let signer = &[&seeds[..]];

//         let cpi_accounts = Transfer {
//             from: ctx.accounts.project_vault.to_account_info(),
//             to: ctx.accounts.donor_token_account.to_account_info(),
//             authority: ctx.accounts.project_vault.to_account_info(),
//         };
//         let cpi_program = ctx.accounts.token_program.to_account_info();
//         let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
//         token::transfer(cpi_ctx, ctx.accounts.donation.amount)?;

//         // Remove donation from project
//         project.current_amount = project
//             .current_amount
//             .checked_sub(ctx.accounts.donation.amount)
//             .ok_or(ErrorCode::Underflow)?;

//         // Close donation account
//         let dest_starting_lamports = ctx.accounts.donor.lamports();
//         **ctx.accounts.donor.lamports.borrow_mut() = dest_starting_lamports
//             .checked_add(ctx.accounts.donation.to_account_info().lamports())
//             .unwrap();
//         **ctx
//             .accounts
//             .donation
//             .to_account_info()
//             .lamports
//             .borrow_mut() = 0;

//         Ok(())
//     }

//     pub fn get_project(ctx: Context<GetProject>) -> Result<ProjectInfo> {
//         let project = &ctx.accounts.project;
//         Ok(ProjectInfo {
//             name: project.name.clone(),
//             description: project.description.clone(),
//             manager: project.manager,
//             target_amount: project.target_amount,
//             current_amount: project.current_amount,
//             deadline: project.deadline,
//             state: project.state,
//             milestones: project.milestones.clone(),
//             current_milestone: project.current_milestone,
//         })
//     }

//     pub fn get_donation(ctx: Context<GetDonation>) -> Result<DonationInfo> {
//         let donation = &ctx.accounts.donation;
//         Ok(DonationInfo {
//             donor: donation.donor,
//             project: donation.project,
//             amount: donation.amount,
//             timestamp: donation.timestamp,
//             reference: donation.reference.clone(),
//         })
//     }

//     pub fn get_platform_info(ctx: Context<GetPlatformInfo>) -> Result<PlatformInfo> {
//         let platform = &ctx.accounts.platform;
//         Ok(PlatformInfo {
//             total_funds: platform.total_funds,
//             platform_fee: platform.platform_fee,
//             platform_wallet: platform.platform_wallet,
//             project_count: platform.project_count,
//             total_milestones: platform.total_milestones,
//             completed_milestones: platform.completed_milestones,
//         })
//     }
// }

// pub fn get_platform_wallet(program_id: &Pubkey) -> (Pubkey, u8) {
//     Pubkey::find_program_address(&[b"platform_wallet"], program_id)
// }

// #[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
// pub struct PlatformInfo {
//     pub total_funds: u64,
//     pub platform_fee: u16,
//     pub platform_wallet: Pubkey,
//     pub project_count: u64,
//     pub total_milestones: u64,
//     pub completed_milestones: u64,
// }

// #[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
// pub enum ProjectState {
//     Active,
//     Successful,
//     Expired,
// }

// #[derive(AnchorSerialize, AnchorDeserialize)]
// pub struct ProjectInfo {
//     pub name: String,
//     pub description: String,
//     pub manager: Pubkey,
//     pub target_amount: u64,
//     pub current_amount: u64,
//     pub deadline: i64,
//     pub state: ProjectState,
//     pub milestones: Vec<Milestone>,
//     pub current_milestone: u64,
// }

// #[derive(AnchorSerialize, AnchorDeserialize)]
// pub struct DonationInfo {
//     pub donor: Pubkey,
//     pub project: Pubkey,
//     pub amount: u64,
//     pub timestamp: i64,
//     pub reference: String,
// }

// #[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
// pub struct Milestone {
//     pub description: String,
//     pub target: u64,
//     pub end_date: i64,
// }

// // New context for getting project details
// #[derive(Accounts)]
// pub struct GetProject<'info> {
//     pub project: Account<'info, Project>,
// }

// // New context for getting donation details
// #[derive(Accounts)]
// pub struct GetDonation<'info> {
//     pub donation: Account<'info, Donation>,
// }
// #[account]
// pub struct Platform {
//     pub manager: Pubkey,
//     pub total_funds: u64,
//     pub platform_wallet: Pubkey,
//     pub platform_fee: u16,
//     pub project_count: u64,
//     pub total_milestones: u64,
//     pub completed_milestones: u64,
// }

// #[account]
// pub struct Project {
//     pub name: String,
//     pub description: String,
//     pub manager: Pubkey,
//     pub target_amount: u64,
//     pub current_amount: u64,
//     pub deadline: i64,
//     pub state: ProjectState,
//     pub milestones: Vec<Milestone>,
//     pub current_milestone: u64,
//     pub platform_fee: u16,
// }

// #[account]
// pub struct Donation {
//     pub donor: Pubkey,
//     pub project: Pubkey,
//     pub amount: u64,
//     pub timestamp: i64,
//     pub reference: String,
// }

// #[derive(Accounts)]
// pub struct InitializeProject<'info> {
//     #[account(
//         init, 
//         payer = manager, 
//         space = 8 + 32 + 256 + 32 + 8 + 8 + 8 + 1 + (4 + (32 + 8 + 8) * MAX_MILESTONES) + 8
//     )]
//     pub project: Account<'info, Project>,
//     #[account(mut)]
//     pub platform: Account<'info, Platform>,
//     #[account(mut)]
//     pub manager: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }

// const MAX_MILESTONES: usize = 10;

// #[derive(Accounts)]
// pub struct WithdrawFunds<'info> {
//     #[account(mut, has_one = manager)]
//     pub project: Account<'info, Project>,
//     pub manager: Signer<'info>,
//     #[account(mut)]
//     pub manager_token_account: Account<'info, TokenAccount>,
//     #[account(
//         mut,
//         seeds = [b"vault", project.key().as_ref()],
//         bump
//     )]
//     pub project_vault: Account<'info, TokenAccount>,
//     pub token_program: Program<'info, Token>,
// }

// #[derive(Accounts)]
// pub struct InitializePlatform<'info> {
//     #[account(init, payer = manager, space = 8 + 32 + 8 + 32)]
//     pub platform: Account<'info, Platform>,
//     #[account(mut)]
//     pub manager: Signer<'info>,
//     /// CHECK: This is the platform wallet, derived as a PDA
//     #[account(
//         seeds = [b"platform_wallet"],
//         bump
//     )]
//     pub platform_wallet: AccountInfo<'info>,
//     pub system_program: Program<'info, System>,
// }

// #[derive(Accounts)]
// pub struct RecordDonation<'info> {
//     #[account(mut)]
//     pub platform: Account<'info, Platform>,
//     #[account(mut)]
//     pub project: Account<'info, Project>,
//     #[account(
//         init,
//         payer = donor,
//         space = 8 + 32 + 32 + 8 + 8 + 64,
//         seeds = [b"donation", project.key().as_ref(), donor.key().as_ref()],
//         bump
//     )]
//     pub donation: Account<'info, Donation>,
//     #[account(mut)]
//     pub donor: Signer<'info>,
//     #[account(mut)]
//     pub donor_token_account: Account<'info, TokenAccount>,
//     /// CHECK: This is the platform wallet, verified in the platform account
//     #[account(mut, address = platform.platform_wallet)]
//     pub platform_wallet: AccountInfo<'info>,
//     #[account(
//         mut,
//         seeds = [b"vault", project.key().as_ref()],
//         bump
//     )]
//     pub project_vault: Account<'info, TokenAccount>,
//     pub token_program: Program<'info, Token>,
//     pub system_program: Program<'info, System>,
// }
// #[derive(Accounts)]
// pub struct Refund<'info> {
//     #[account(mut)]
//     pub project: Account<'info, Project>,
//     #[account(
//         mut,
//         seeds = [b"donation", project.key().as_ref(), donor.key().as_ref()],
//         bump,
//         close = donor
//     )]
//     pub donation: Account<'info, Donation>,
//     #[account(mut)]
//     pub donor: Signer<'info>,
//     #[account(mut)]
//     pub donor_token_account: Account<'info, TokenAccount>,
//     #[account(
//         mut,
//         seeds = [b"vault", project.key().as_ref()],
//         bump
//     )]
//     pub project_vault: Account<'info, TokenAccount>,
//     pub token_program: Program<'info, Token>,
// }

// #[derive(Accounts)]
// pub struct CompleteMilestone<'info> {
//     #[account(mut)]
//     pub platform: Account<'info, Platform>,
//     #[account(mut, has_one = manager)]
//     pub project: Account<'info, Project>,
//     pub manager: Signer<'info>,
// }

// #[derive(Accounts)]
// pub struct UpdatePlatformFee<'info> {
//     #[account(mut, has_one = manager)]
//     pub platform: Account<'info, Platform>,
//     pub manager: Signer<'info>,
// }
// #[derive(Accounts)]
// pub struct GetPlatformInfo<'info> {
//     pub platform: Account<'info, Platform>,
// }
// #[derive(Accounts)]
// pub struct UpdateProject<'info> {
//     #[account(mut, has_one = manager)]
//     pub project: Account<'info, Project>,
//     pub manager: Signer<'info>,
// }
// // Events
// #[event]
// pub struct PlatformInitialized {
//     pub manager: Pubkey,
//     pub platform_wallet: Pubkey,
//     pub initial_fee: u64,
// }

// #[event]
// pub struct PlatformFeeUpdated {
//     pub new_fee: u64,
// }

// #[event]
// pub struct ProjectInitialized {
//     pub project: Pubkey,
//     pub name: String,
//     pub target_amount: u64,
//     pub deadline: i64,
// }

// #[event]
// pub struct ProjectUpdated {
//     pub project: Pubkey,
//     pub name: String,
//     pub description: String,
// }

// #[event]
// pub struct DonationRecorded {
//     pub project: Pubkey,
//     pub donor: Pubkey,
//     pub amount: u64,
//     pub fee_amount: u64,
// }

// #[event]
// pub struct MilestoneCompleted {
//     pub project: Pubkey,
//     pub milestone_index: u64,
// }

// #[error_code]
// pub enum ErrorCode {
//     #[msg("Unauthorized")]
//     Unauthorized,
//     #[msg("Cannot update milestones after donations have been made")]
//     CannotUpdateMilestones,
//     #[msg("No more milestones to complete")]
//     NoMoreMilestones,
//     #[msg("Milestone target not reached")]
//     MilestoneTargetNotReached,
//     #[msg("Overflow detected")]
//     Overflow,
//     #[msg("Project is not active")]
//     ProjectNotActive,
//     #[msg("Project is not successful")]
//     ProjectNotSuccessful,
//     #[msg("Project has not expired")]
//     ProjectNotExpired,
//     #[msg("Project is successful")]
//     ProjectSuccessful,
//     #[msg("Underflow detected")]
//     Underflow,
//     #[msg("Bump for the account not found")]
//     BumpNotFound,
// }


use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("GNap3DpM75MTEz5bvoKm5uncy2BXtQeXXxysp8HHeRTA");

#[program]
pub mod veladao {
    use super::*;

    pub fn initialize_platform(
        ctx: Context<InitializePlatform>,
        initial_fee: u16,
        platform_wallet: Pubkey,
    ) -> Result<()> {
        let platform = &mut ctx.accounts.platform;
        platform.manager = *ctx.accounts.manager.key;
        platform.total_funds = 0;
        platform.platform_wallet = platform_wallet;
        platform.platform_fee = initial_fee;
        platform.project_count = 0;
        platform.total_milestones = 0;
        platform.completed_milestones = 0;

        emit!(PlatformInitialized {
            manager: platform.manager,
            platform_wallet,
            initial_fee: initial_fee as u64,
        });
        Ok(())
    }

    pub fn update_platform_fee(ctx: Context<UpdatePlatformFee>, new_fee: u16) -> Result<()> {
        let platform = &mut ctx.accounts.platform;
        require!(
            ctx.accounts.manager.key() == platform.manager,
            ErrorCode::Unauthorized
        );
        platform.platform_fee = new_fee;
        emit!(PlatformFeeUpdated {
            new_fee: new_fee as u64
        });
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
        let platform = &mut ctx.accounts.platform;

        require!(
            ctx.accounts.manager.key() == platform.manager,
            ErrorCode::Unauthorized
        );

        project.name = name;
        project.description = description;
        project.manager = *ctx.accounts.manager.key;
        project.target_amount = target_amount;
        project.current_amount = 0;
        project.milestones = milestones;
        project.current_milestone = 0;
        project.deadline = deadline;
        project.state = ProjectState::Active;
        project.platform_fee = platform.platform_fee;
        project.platform_wallet = platform.platform_wallet;

        platform.project_count = platform.project_count.checked_add(1).ok_or(ErrorCode::Overflow)?;
        platform.total_milestones = platform.total_milestones.checked_add(project.milestones.len() as u64).ok_or(ErrorCode::Overflow)?;

        emit!(ProjectInitialized {
            project: project.key(),
            name: project.name.clone(),
            target_amount,
            deadline,
        });
        Ok(())
    }

    pub fn update_project(
        ctx: Context<UpdateProject>,
        name: Option<String>,
        description: Option<String>,
        milestones: Option<Vec<Milestone>>,
    ) -> Result<()> {
        let project = &mut ctx.accounts.project;
        let platform = &mut ctx.accounts.platform;

        require!(
            ctx.accounts.manager.key() == platform.manager,
            ErrorCode::Unauthorized
        );

        if let Some(new_name) = name {
            project.name = new_name;
        }
        if let Some(new_description) = description {
            project.description = new_description;
        }
        if let Some(new_milestones) = milestones {
            require!(
                project.current_milestone == 0,
                ErrorCode::CannotUpdateMilestones
            );
            platform.total_milestones = platform.total_milestones
                .checked_sub(project.milestones.len() as u64)
                .ok_or(ErrorCode::Underflow)?
                .checked_add(new_milestones.len() as u64)
                .ok_or(ErrorCode::Overflow)?;
            project.milestones = new_milestones;
        }

        emit!(ProjectUpdated {
            project: project.key(),
            name: project.name.clone(),
            description: project.description.clone(),
        });
        Ok(())
    }

    pub fn process_donation(
        ctx: Context<ProcessDonation>,
        amount: u64,
        donor: Pubkey,
        donation_reference: String,
    ) -> Result<()> {
        let project = &mut ctx.accounts.project;
        let platform = &mut ctx.accounts.platform;

        require!(
            ctx.accounts.manager.key() == platform.manager,
            ErrorCode::Unauthorized
        );

        let fee_amount = (amount * project.platform_fee as u64) / 10000;
        let project_amount = amount - fee_amount;

        project.current_amount = project
            .current_amount
            .checked_add(project_amount)
            .ok_or(ErrorCode::Overflow)?;
        platform.total_funds = platform
            .total_funds
            .checked_add(fee_amount)
            .ok_or(ErrorCode::Overflow)?;

        if project.current_amount >= project.target_amount {
            project.state = ProjectState::Successful;
        }

        // Transfer fee to platform wallet
        let cpi_accounts = Transfer {
            from: ctx.accounts.donation_token_account.to_account_info(),
            to: ctx.accounts.platform_wallet.to_account_info(),
            authority: ctx.accounts.manager.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, fee_amount)?;

        // Transfer project amount to project vault
        let cpi_accounts = Transfer {
            from: ctx.accounts.donation_token_account.to_account_info(),
            to: ctx.accounts.project_vault.to_account_info(),
            authority: ctx.accounts.manager.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, project_amount)?;

        emit!(DonationProcessed {
            project: project.key(),
            donor,
            amount,
            fee_amount,
            reference: donation_reference,
        });
        Ok(())
    }

    pub fn complete_milestone(ctx: Context<CompleteMilestone>) -> Result<()> {
        let project = &mut ctx.accounts.project;
        let platform = &mut ctx.accounts.platform;

        require!(
            ctx.accounts.manager.key() == platform.manager,
            ErrorCode::Unauthorized
        );
        require!(
            project.state == ProjectState::Active,
            ErrorCode::ProjectNotActive
        );
        require!(
            project.current_milestone < project.milestones.len() as u64,
            ErrorCode::NoMoreMilestones
        );

        let current_milestone = &project.milestones[project.current_milestone as usize];
        require!(
            project.current_amount >= current_milestone.target,
            ErrorCode::MilestoneTargetNotReached
        );

        project.current_milestone += 1;
        platform.completed_milestones += 1;

        if project.current_milestone as usize == project.milestones.len() {
            project.state = ProjectState::Successful;
        }

        emit!(MilestoneCompleted {
            project: project.key(),
            milestone_index: project.current_milestone - 1,
        });
        Ok(())
    }

    pub fn process_refund(
        ctx: Context<ProcessRefund>,
        donor: Pubkey,
        amount: u64,
    ) -> Result<()> {
        let project = &mut ctx.accounts.project;
        let platform = &ctx.accounts.platform;

        require!(
            ctx.accounts.manager.key() == platform.manager,
            ErrorCode::Unauthorized
        );
        require!(
            project.state == ProjectState::Active,
            ErrorCode::ProjectNotActive
        );
        let clock = Clock::get()?;
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
        token::transfer(cpi_ctx, amount)?;

        project.current_amount = project
            .current_amount
            .checked_sub(amount)
            .ok_or(ErrorCode::Underflow)?;

        emit!(RefundProcessed {
            project: project.key(),
            donor,
            amount,
        });
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
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct PlatformInfo {
    pub total_funds: u64,
    pub platform_fee: u16,
    pub platform_wallet: Pubkey,
    pub project_count: u64,
    pub total_milestones: u64,
    pub completed_milestones: u64,
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

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct Milestone {
    pub description: String,
    pub target: u64,
    pub end_date: i64,
}

#[account]
pub struct Platform {
    pub manager: Pubkey,
    pub total_funds: u64,
    pub platform_wallet: Pubkey,
    pub platform_fee: u16,
    pub project_count: u64,
    pub total_milestones: u64,
    pub completed_milestones: u64,
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
    pub platform_fee: u16,
    pub platform_wallet: Pubkey,
}

#[derive(Accounts)]
pub struct InitializePlatform<'info> {
    #[account(init, payer = manager, space = 8 + 32 + 8 + 32 + 2 + 8 + 8 + 8)]
    pub platform: Account<'info, Platform>,
    #[account(mut)]
    pub manager: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePlatformFee<'info> {
    #[account(mut, has_one = manager)]
    pub platform: Account<'info, Platform>,
    pub manager: Signer<'info>,
}

#[derive(Accounts)]
pub struct InitializeProject<'info> {
    #[account(mut, has_one = manager)]
    pub platform: Account<'info, Platform>,
    #[account(
        init, 
        payer = manager, 
        space = 8 + 32 + 256 + 32 + 8 + 8 + 8 + 1 + (4 + (32 + 8 + 8) * 10) + 8 + 32
    )]
    pub project: Account<'info, Project>,
    #[account(mut)]
    pub manager: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProject<'info> {
    #[account(mut, has_one = manager)]
    pub platform: Account<'info, Platform>,
    #[account(mut)]
    pub project: Account<'info, Project>,
    pub manager: Signer<'info>,
}

#[derive(Accounts)]
pub struct ProcessDonation<'info> {
    #[account(mut)]
    pub platform: Account<'info, Platform>,
    #[account(mut)]
    pub project: Account<'info, Project>,
    pub manager: Signer<'info>,
    #[account(mut)]
    pub donation_token_account: Account<'info, TokenAccount>,
    /// CHECK: Verified through platform account
    #[account(mut, address = platform.platform_wallet)]
    pub platform_wallet: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [b"vault", project.key().as_ref()],
        bump
    )]
    pub project_vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

// #[derive(Accounts)]
// pub struct CompleteMilestone<'info> {
//     #[account(mut)]
//     pub platform: Account<'info, Platform>,
    


//     #[account(mut)]
//     pub project: Account<'info, Project>,
//     pub manager: Signer<'info>,
// }
#[derive(Accounts)]
pub struct CompleteMilestone<'info> {
    #[account(mut)]
    pub platform: Account<'info, Platform>,
    #[account(mut)]
    pub project: Account<'info, Project>,
    #[account(
        constraint = manager.key() == platform.manager @ ErrorCode::Unauthorized
    )]
    pub manager: Signer<'info>,
}
#[derive(Accounts)]
pub struct ProcessRefund<'info> {
    #[account(mut, has_one = manager)]
    pub platform: Account<'info, Platform>,
    #[account(mut)]
    pub project: Account<'info, Project>,
    pub manager: Signer<'info>,
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

// Events
#[event]
pub struct PlatformInitialized {
    pub manager: Pubkey,
    pub platform_wallet: Pubkey,
    pub initial_fee: u64,
}

#[event]
pub struct PlatformFeeUpdated {
    pub new_fee: u64,
}

#[event]
pub struct ProjectInitialized {
    pub project: Pubkey,
    pub name: String,
    pub target_amount: u64,
    pub deadline: i64,
}

#[event]
pub struct ProjectUpdated {
    pub project: Pubkey,
    pub name: String,
    pub description: String,
}

#[event]
pub struct DonationProcessed {
    pub project: Pubkey,
    pub donor: Pubkey,
    pub amount: u64,
    pub fee_amount: u64,
    pub reference: String,
}

#[event]
pub struct MilestoneCompleted {
    pub project: Pubkey,
    pub milestone_index: u64,
}

#[event]
pub struct RefundProcessed {
    pub project: Pubkey,
    pub donor: Pubkey,
    pub amount: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Cannot update milestones after donations have been made")]
    CannotUpdateMilestones,
    #[msg("No more milestones to complete")]
    NoMoreMilestones,
    #[msg("Milestone target not reached")]
    MilestoneTargetNotReached,
    #[msg("Overflow detected")]
    Overflow,
    #[msg("Project is not active")]
    ProjectNotActive,
    #[msg("Project is not successful")]
    ProjectNotSuccessful,
    #[msg("Project has not expired")]
    ProjectNotExpired,
    #[msg("Project is successful")]
    ProjectSuccessful,
    #[msg("Underflow detected")]
    Underflow,
}