// const { Connection, PublicKey, Keypair, SystemProgram } = require('@solana/web3.js');
// const { Program, Provider, web3 } = require('@project-serum/anchor');
// const { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount } = require('@solana/spl-token');

// // Load the IDL (Interface Description Language) for your program
// const idl = JSON.parse(require('fs').readFileSync('./crowdfund_idl.json', 'utf8'));

// // Your program ID (replace with your actual program ID)
// const PROGRAM_ID = new PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS');

// class CrowdfundProgram {
//     constructor(connection, wallet) {
//         this.connection = connection;
//         this.wallet = wallet;
//         this.provider = new Provider(connection, wallet, Provider.defaultOptions());
//         this.program = new Program(idl, PROGRAM_ID, this.provider);
//     }

//     async initializeProject(name, description, targetAmount, deadline) {
//         const project = Keypair.generate();
//         const [projectVault, vaultBump] = await PublicKey.findProgramAddress(
//             [Buffer.from('vault'), project.publicKey.toBuffer()],
//             this.program.programId
//         );

//         await this.program.rpc.initializeProject(
//             name,
//             description,
//             new web3.BN(targetAmount),
//             new web3.BN(deadline),
//             {
//                 accounts: {
//                     project: project.publicKey,
//                     manager: this.wallet.publicKey,
//                     systemProgram: SystemProgram.programId,
//                 },
//                 signers: [project],
//             }
//         );

//         console.log(`Project initialized with ID: ${project.publicKey.toString()}`);
//         return project.publicKey;
//     }

//     async donate(projectPubkey, amount, tokenMintAddress) {
//         const [projectVault] = await PublicKey.findProgramAddress(
//             [Buffer.from('vault'), projectPubkey.toBuffer()],
//             this.program.programId
//         );

//         const donorTokenAccount = await getOrCreateAssociatedTokenAccount(
//             this.connection,
//             this.wallet.payer,
//             new PublicKey(tokenMintAddress),
//             this.wallet.publicKey
//         );

//         const [donation] = await PublicKey.findProgramAddress(
//             [Buffer.from('donation'), projectPubkey.toBuffer(), this.wallet.publicKey.toBuffer()],
//             this.program.programId
//         );

//         await this.program.rpc.donate(
//             new web3.BN(amount),
//             {
//                 accounts: {
//                     project: projectPubkey,
//                     donation: donation,
//                     donor: this.wallet.publicKey,
//                     donorTokenAccount: donorTokenAccount.address,
//                     projectVault: projectVault,
//                     tokenProgram: TOKEN_PROGRAM_ID,
//                     systemProgram: SystemProgram.programId,
//                 },
//             }
//         );

//         console.log(`Donated ${amount} tokens to project ${projectPubkey.toString()}`);
//     }

//     async withdrawFunds(projectPubkey, managerTokenAccount) {
//         const [projectVault] = await PublicKey.findProgramAddress(
//             [Buffer.from('vault'), projectPubkey.toBuffer()],
//             this.program.programId
//         );

//         await this.program.rpc.withdrawFunds(
//             {
//                 accounts: {
//                     project: projectPubkey,
//                     manager: this.wallet.publicKey,
//                     managerTokenAccount: managerTokenAccount,
//                     projectVault: projectVault,
//                     tokenProgram: TOKEN_PROGRAM_ID,
//                 },
//             }
//         );

//         console.log(`Funds withdrawn from project ${projectPubkey.toString()}`);
//     }

//     async refund(projectPubkey, donorPubkey, donorTokenAccount) {
//         const [projectVault] = await PublicKey.findProgramAddress(
//             [Buffer.from('vault'), projectPubkey.toBuffer()],
//             this.program.programId
//         );

//         const [donation] = await PublicKey.findProgramAddress(
//             [Buffer.from('donation'), projectPubkey.toBuffer(), donorPubkey.toBuffer()],
//             this.program.programId
//         );

//         await this.program.rpc.refund(
//             {
//                 accounts: {
//                     project: projectPubkey,
//                     donation: donation,
//                     donor: donorPubkey,
//                     donorTokenAccount: donorTokenAccount,
//                     projectVault: projectVault,
//                     tokenProgram: TOKEN_PROGRAM_ID,
//                 },
//             }
//         );

//         console.log(`Refund processed for donor ${donorPubkey.toString()} on project ${projectPubkey.toString()}`);
//     }

//     async getProject(projectPubkey) {
//         return await this.program.account.project.fetch(projectPubkey);
//     }

//     async getDonation(projectPubkey, donorPubkey) {
//         const [donation] = await PublicKey.findProgramAddress(
//             [Buffer.from('donation'), projectPubkey.toBuffer(), donorPubkey.toBuffer()],
//             this.program.programId
//         );
//         return await this.program.account.donation.fetch(donation);
//     }
// }

// module.exports = CrowdfundProgram;
const { Connection, PublicKey, Keypair, SystemProgram } = require('@solana/web3.js');
const { Program, Provider, web3 } = require('@project-serum/anchor');
const { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount } = require('@solana/spl-token');

// Load the IDL (Interface Description Language) for your program
const idl = JSON.parse(require('fs').readFileSync('./crowdfund_idl.json', 'utf8'));

// Your program ID (replace with your actual program ID)
const PROGRAM_ID = new PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS');

class CrowdfundProgram {
    constructor(connection, wallet) {
        this.connection = connection;
        this.wallet = wallet;
        this.provider = new Provider(connection, wallet, Provider.defaultOptions());
        this.program = new Program(idl, PROGRAM_ID, this.provider);
    }

    async initializePlatform() {
        const platform = Keypair.generate();
        await this.program.rpc.initializePlatform({
            accounts: {
                platform: platform.publicKey,
                manager: this.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [platform],
        });

        console.log(`Platform initialized with ID: ${platform.publicKey.toString()}`);
        return platform.publicKey;
    }

    async initializeProject(platformPubkey, name, description, targetAmount, milestones) {
        const project = Keypair.generate();
        await this.program.rpc.initializeProject(
            name,
            description,
            new web3.BN(targetAmount),
            milestones.map(m => new web3.BN(m)),
            {
                accounts: {
                    platform: platformPubkey,
                    project: project.publicKey,
                    manager: this.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
                signers: [project],
            }
        );

        console.log(`Project initialized with ID: ${project.publicKey.toString()}`);
        return project.publicKey;
    }

    async donate(platformPubkey, projectPubkey, amount, tokenMintAddress) {
        const [platformVault] = await PublicKey.findProgramAddress(
            [Buffer.from('vault'), platformPubkey.toBuffer()],
            this.program.programId
        );

        const donorTokenAccount = await getOrCreateAssociatedTokenAccount(
            this.connection,
            this.wallet.payer,
            new PublicKey(tokenMintAddress),
            this.wallet.publicKey
        );

        await this.program.rpc.donate(
            new web3.BN(amount),
            {
                accounts: {
                    platform: platformPubkey,
                    project: projectPubkey,
                    donor: this.wallet.publicKey,
                    donorTokenAccount: donorTokenAccount.address,
                    platformVault: platformVault,
                    tokenProgram: TOKEN_PROGRAM_ID,
                },
            }
        );

        console.log(`Donated ${amount} tokens to project ${projectPubkey.toString()}`);
    }

    async releaseMilestone(platformPubkey, projectPubkey, managerTokenAccount) {
        const [platformVault] = await PublicKey.findProgramAddress(
            [Buffer.from('vault'), platformPubkey.toBuffer()],
            this.program.programId
        );

        await this.program.rpc.releaseMilestone(
            {
                accounts: {
                    platform: platformPubkey,
                    project: projectPubkey,
                    manager: this.wallet.publicKey,
                    managerTokenAccount: managerTokenAccount,
                    platformVault: platformVault,
                    tokenProgram: TOKEN_PROGRAM_ID,
                },
            }
        );

        console.log(`Milestone released for project ${projectPubkey.toString()}`);
    }

    async getPlatform(platformPubkey) {
        return await this.program.account.platform.fetch(platformPubkey);
    }

    async getProject(projectPubkey) {
        return await this.program.account.project.fetch(projectPubkey);
    }
}

module.exports = CrowdfundProgram;