// const anchor = require('@project-serum/anchor');
// const { PublicKey, SystemProgram, Keypair, Connection, clusterApiUrl } = require('@solana/web3.js');
// const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// const idl = require('../idl.json');

// class VeladaoService {
//     constructor(provider, programId) {
//         // Set the provider and program ID
//         this.provider = provider;
//         this.program = new anchor.Program(idl, programId, provider);
//     }

//     // Method to initialize the platform
//     async initializePlatform(manager, platformWallet, initialFee) {
//         const [platformPda, _] = await PublicKey.findProgramAddress(
//             [Buffer.from('platform_wallet')],
//             this.program.programId
//         );

//         console.log("Initializing platform with PDA:", platformPda.toBase58());

//         try {
//             const tx = await this.program.methods.initializePlatform(new anchor.BN(initialFee))
//                 .accounts({
//                     platform: platformPda,
//                     manager: manager.publicKey,
//                     platformWallet: platformWallet.publicKey,
//                     systemProgram: SystemProgram.programId,
//                 })
//                 .signers([manager])
//                 .rpc();

//             console.log("Transaction signature:", tx);

//             // Wait for transaction confirmation
//             await this.provider.connection.confirmTransaction(tx, 'confirmed');
//             console.log("Transaction confirmed");

//             // Fetch the account to ensure it was created
//             const account = await this.program.account.platform.fetch(platformPda);
//             console.log("Platform account created:", account);

//             return platformPda;
//         } catch (error) {
//             console.error("Error in initializePlatform:", error);
//             throw error;
//         }
//     }
//     // async initializePlatform(manager, platformWallet, initialFee) {
//     //     const [platformPda, bump] = await PublicKey.findProgramAddress(
//     //         [Buffer.from('platform_wallet')],
//     //         this.program.programId
//     //     );

//     //     console.log("Initializing platform with PDA:", platformPda.toBase58());

//     //     try {
//     //         const tx = await this.program.methods.initializePlatform(new anchor.BN(initialFee))
//     //             .accounts({
//     //                 platform: platformPda,
//     //                 manager: manager.publicKey,
//     //                 platformWallet: platformWallet.publicKey,
//     //                 systemProgram: SystemProgram.programId,
//     //             })
//     //             .signers([manager])
//     //             .rpc();

//     //         console.log("Transaction signature:", tx);

//     //         // Wait for transaction confirmation
//     //         await this.provider.connection.confirmTransaction(tx, 'confirmed');
//     //         console.log("Transaction confirmed");

//     //         // Fetch the account to ensure it was created
//     //         const account = await this.program.account.platform.fetch(platformPda);
//     //         console.log("Platform account created:", account);

//     //         return platformPda;
//     //     } catch (error) {
//     //         console.error("Error in initializePlatform:", error);
//     //         throw error;
//     //     }
//     // }
//     // async initializePlatform(manager, platformWallet, initialFee) {
//     //     const [platformPda, _] = await PublicKey.findProgramAddressSync(
//     //         [Buffer.from('platform_wallet')],
//     //         this.program.programId
//     //     );

//     //     const tx = await this.program.methods.initializePlatform(new anchor.BN(initialFee))
//     //         .accounts({
//     //             platform: platformPda,
//     //             manager: manager.publicKey,
//     //             platformWallet: platformWallet.publicKey,
//     //             systemProgram: SystemProgram.programId,
//     //         })
//     //         .signers([manager])
//     //         .transaction();
//     //     const currentSigners = [... new Set(tx.signatures.filter(k => k.signature !== null).map(k => k.publicKey.toBase58()))];
//     //     const expectedSigners = [... new Set(tx.instructions.flatMap(i => i.keys.filter(k => k.isSigner).map(k => k.pubkey.toBase58())))];
//     //     console.log('Current signers:', currentSigners);
//     //     console.log('Expected signers:', expectedSigners);
//     //     // await this.provider.sendAndConfirm(tx, [manager]);
//     // }

//     // Method to update platform fees
//     async updatePlatformFee(manager, platformPda, newFee) {
//         await this.program.rpc.updatePlatformFee(new anchor.BN(newFee), {
//             accounts: {
//                 platform: platformPda,
//                 manager: manager.publicKey,
//             },
//             signers: [manager],
//         });
//     }

//     // Method to initialize a project
//     async initializeProject(manager, platformPda, name, description, targetAmount, milestones, deadline) {
//         const project = anchor.web3.Keypair.generate();

//         await this.program.rpc.initializeProject(
//             name,
//             description,
//             new anchor.BN(targetAmount),
//             milestones,
//             new anchor.BN(deadline),
//             {
//                 accounts: {
//                     project: project.publicKey,
//                     platform: platformPda,
//                     manager: manager.publicKey,
//                     systemProgram: SystemProgram.programId,
//                 },
//                 signers: [manager, project],
//             }
//         );


//         return project.publicKey; // Return the project's public key
//     }

//     // Method to donate to a project
//     async recordDonation(donor, donorTokenAccount, projectPda, platformPda, platformWallet, amount, reference) {
//         await this.program.rpc.recordDonation(new anchor.BN(amount), reference, {
//             accounts: {
//                 donation: anchor.web3.Keypair.generate().publicKey,
//                 project: projectPda,
//                 donor: donor.publicKey,
//                 donorTokenAccount: donorTokenAccount,
//                 platform: platformPda,
//                 platformWallet: platformWallet,
//                 tokenProgram: TOKEN_PROGRAM_ID,
//             },
//             signers: [donor],
//         });
//     }

//     // Method to complete a milestone
//     async completeMilestone(manager, projectPda) {
//         await this.program.rpc.completeMilestone({
//             accounts: {
//                 project: projectPda,
//                 manager: manager.publicKey,
//             },
//             signers: [manager],
//         });
//     }

//     // Method to withdraw funds once a project is successful
//     async withdrawFunds(manager, projectPda, managerTokenAccount, vaultPda) {
//         await this.program.rpc.withdrawFunds({
//             accounts: {
//                 project: projectPda,
//                 manager: manager.publicKey,
//                 managerTokenAccount: managerTokenAccount,
//                 projectVault: vaultPda,
//                 tokenProgram: TOKEN_PROGRAM_ID,
//             },
//             signers: [manager],
//         });
//     }

//     // Method to refund donors if the project fails
//     async refund(donor, projectPda, donorTokenAccount, donationPda, vaultPda) {
//         await this.program.rpc.refund({
//             accounts: {
//                 project: projectPda,
//                 donor: donor.publicKey,
//                 donorTokenAccount: donorTokenAccount,
//                 donation: donationPda,
//                 projectVault: vaultPda,
//                 tokenProgram: TOKEN_PROGRAM_ID,
//             },
//             signers: [donor],
//         });
//     }

//     // Fetch project details
//     async getProject(projectPda) {
//         const project = await this.program.account.project.fetch(projectPda);
//         return project;
//     }

//     // Fetch donation details
//     async getDonation(donationPda) {
//         const donation = await this.program.account.donation.fetch(donationPda);
//         return donation;
//     }

//     // Fetch platform details
//     async getPlatform(platformPda) {
//         const platform = await this.program.account.platform.fetch(platformPda);
//         return platform;
//     }
// }

// const getPlatformFee = require('../utils/getPlatformFee');

// // Load secret keys and initialize keypairs
// const managerSecretKey = require('../secret-key.json');
// const platformWalletKey = require('../platform-wallet-keypair.json');
// const managerKeypair = Keypair.fromSecretKey(Buffer.from(managerSecretKey));
// const platformWalletKeypair = Keypair.fromSecretKey(Buffer.from(platformWalletKey));

// // Initialize connection and wallet
// const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
// const wallet = new anchor.Wallet(managerKeypair); // Use managerKeypair for the wallet

// // Create the Anchor provider
// const provider = new anchor.AnchorProvider(connection, wallet, { commitment: 'confirmed' });
// anchor.setProvider(provider);

// // Create VeladaoService instance with provider and program ID
// const veladaoService = new VeladaoService(provider, new anchor.web3.PublicKey('GNap3DpM75MTEz5bvoKm5uncy2BXtQeXXxysp8HHeRTA'));
// // (async () => {
// //     const initialFee = await getPlatformFee(); // Example initial fee
// //     console.log("Platform fee:", initialFee);
// //     await veladaoService.initializePlatform(managerKeypair, platformWalletKeypair, initialFee);
// //     console.log('Platform initialized');
// // })();

// // (async () => {
// //     try {
// //         const initialFee = await getPlatformFee(); // Example initial fee
// //         console.log("Initial platform fee:", initialFee);

// //         const [platformPda, _] = await PublicKey.findProgramAddress(
// //             [Buffer.from('platform_wallet')],
// //             veladaoService.program.programId
// //         );

// //         console.log("Platform PDA:", platformPda.toBase58());

// //         await veladaoService.initializePlatform(managerKeypair, platformWalletKeypair, initialFee);
// //         console.log('Platform initialized successfully');

// //         // 2. Confirm the platform account is created and owned by your program
// //         const platformInfo = await veladaoService.getPlatform(platformPda);
// //         console.log('Platform account info:', platformInfo);

// //         if (platformInfo.manager.toBase58() === managerKeypair.publicKey.toBase58()) {
// //             console.log('Platform account created and owned by the correct program');
// //         } else {
// //             console.log('Warning: Platform account may not be owned by the expected manager');
// //         }

// //         // 3. Use the correct platform account address when initializing a project
// //         console.log('Use this platform PDA when initializing projects:', platformPda.toBase58());

// //     } catch (error) {
// //         console.error('Error during platform initialization:', error);
// //     }
// // })();

// module.exports = veladaoService;

const { Connection, PublicKey, Transaction } = require('@solana/web3.js');
const { Program, Provider, web3 } = require('@project-serum/anchor');
const idl = require('./veladao.json'); // You'll need to generate this IDL file from your Rust program

class VelaDAOService {
    constructor(connection, wallet) {
        this.connection = connection;
        this.wallet = wallet;
        this.program = null;
    }

    async initialize() {
        const provider = new Provider(this.connection, this.wallet, Provider.defaultOptions());
        const programId = new PublicKey('GNap3DpM75MTEz5bvoKm5uncy2BXtQeXXxysp8HHeRTA');
        this.program = new Program(idl, programId, provider);
    }

    async initializePlatform(initialFee, platformWallet) {
        const platform = web3.Keypair.generate();
        await this.program.rpc.initializePlatform(
            initialFee,
            platformWallet,
            {
                accounts: {
                    platform: platform.publicKey,
                    manager: this.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId,
                },
                signers: [platform],
            }
        );
        return platform.publicKey;
    }

    async updatePlatformFee(platformAddress, newFee) {
        await this.program.rpc.updatePlatformFee(
            newFee,
            {
                accounts: {
                    platform: platformAddress,
                    manager: this.wallet.publicKey,
                },
            }
        );
    }

    async initializeProject(platformAddress, name, description, targetAmount, milestones, deadline) {
        // const project = web3.Keypair.generate();
        // Generate a deterministic seed for the project
        const seed = sha256(`${platformAddress.toBase58()}-${name}-${targetAmount}-${deadline}`);

        // Generate a deterministic keypair from the seed
        const project = Keypair.fromSeed(Uint8Array.from(seed.slice(0, 32)));

        await this.program.rpc.initializeProject(
            name,
            description,
            new web3.BN(targetAmount),
            milestones.map(m => ({
                description: m.description,
                target: new web3.BN(m.target),
                endDate: new web3.BN(m.endDate),
            })),
            new web3.BN(deadline),
            {
                accounts: {
                    platform: platformAddress,
                    project: project.publicKey,
                    manager: this.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId,
                },
                signers: [project],
            }
        );
        return project.publicKey;
    }

    async updateProject(projectAddress, name, description, milestones) {
        await this.program.rpc.updateProject(
            name,
            description,
            milestones ? milestones.map(m => ({
                description: m.description,
                target: new web3.BN(m.target),
                endDate: new web3.BN(m.endDate),
            })) : null,
            {
                accounts: {
                    project: projectAddress,
                    manager: this.wallet.publicKey,
                },
            }
        );
    }

    async processDonation(platformAddress, projectAddress, amount, donorAddress, donationReference) {
        const [projectVault] = await PublicKey.findProgramAddress(
            [Buffer.from('vault'), projectAddress.toBuffer()],
            this.program.programId
        );

        await this.program.rpc.processDonation(
            new web3.BN(amount),
            donorAddress,
            donationReference,
            {
                accounts: {
                    platform: platformAddress,
                    project: projectAddress,
                    manager: this.wallet.publicKey,
                    donationTokenAccount: this.wallet.publicKey, // Assuming the wallet is also the token account
                    platformWallet: (await this.program.account.platform.fetch(platformAddress)).platformWallet,
                    projectVault: projectVault,
                    tokenProgram: web3.SPL_TOKEN_PROGRAM_ID,
                },
            }
        );
    }

    async completeMilestone(platformAddress, projectAddress) {
        await this.program.rpc.completeMilestone(
            {
                accounts: {
                    platform: platformAddress,
                    project: projectAddress,
                    manager: this.wallet.publicKey,
                },
            }
        );
    }

    async processRefund(platformAddress, projectAddress, donorAddress, amount) {
        const [projectVault] = await PublicKey.findProgramAddress(
            [Buffer.from('vault'), projectAddress.toBuffer()],
            this.program.programId
        );

        await this.program.rpc.processRefund(
            donorAddress,
            new web3.BN(amount),
            {
                accounts: {
                    platform: platformAddress,
                    project: projectAddress,
                    manager: this.wallet.publicKey,
                    donorTokenAccount: donorAddress, // Assuming the donor address is also their token account
                    projectVault: projectVault,
                    tokenProgram: web3.SPL_TOKEN_PROGRAM_ID,
                },
            }
        );
    }

    async withdrawFunds(projectAddress) {
        const [projectVault] = await PublicKey.findProgramAddress(
            [Buffer.from('vault'), projectAddress.toBuffer()],
            this.program.programId
        );

        await this.program.rpc.withdrawFunds(
            {
                accounts: {
                    project: projectAddress,
                    manager: this.wallet.publicKey,
                    managerTokenAccount: this.wallet.publicKey, // Assuming the wallet is also the token account
                    projectVault: projectVault,
                    tokenProgram: web3.SPL_TOKEN_PROGRAM_ID,
                },
            }
        );
    }
}

module.exports = VelaDAOService;