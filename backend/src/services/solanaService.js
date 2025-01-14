// const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
// const { Program, AnchorProvider, Wallet, BN, web3 } = require('@project-serum/anchor');
// const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// // Load the IDL
// const idl = require('../idl.json');

// // Your program ID (replace with your actual program ID)
// const PROGRAM_ID = new PublicKey('GNap3DpM75MTEz5bvoKm5uncy2BXtQeXXxysp8HHeRTA');

// // Define default options for the Provider
// const defaultProviderOptions = {
//   preflightCommitment: 'processed',
//   commitment: 'processed',
// };
// // DUMXrA3DGjEP9T2Juw6YDrdmbMpjZgoPu5hUcHDwCM7C

// // SolanaService Class
// class SolanaService {
//   constructor(connectionUrl, managerSecretKey) {
//     this.connection = new Connection(connectionUrl);
//     console.log('Connected to Solana network:', connectionUrl);
//     this.managerWallet = Keypair.fromSecretKey(Buffer.from(managerSecretKey, 'base64'));
//     this.wallet = new Wallet(this.managerWallet);
//     this.provider = new AnchorProvider(
//       this.connection,
//       this.wallet,
//       defaultProviderOptions
//     );
//     this.program = new Program(idl, PROGRAM_ID, this.provider);
//     this.platformPubkey = null;
//   }

//   // async initializePlatform() {
//   //   try {
//   //     console.log('Initializing platform...');
//   //     const platform = Keypair.generate();
//   //     console.log('Platform keypair generated:', platform.publicKey.toString());

//   //     const tx = await this.program.methods.initializePlatform()
//   //       .accounts({
//   //         platform: platform.publicKey,
//   //         manager: this.wallet.publicKey,
//   //         systemProgram: web3.SystemProgram.programId,
//   //       })
//   //       .transaction();

//   //     console.log('Fetching recent blockhash...');
//   //     const { blockhash } = await this.provider.connection.getLatestBlockhash();
//   //     tx.recentBlockhash = blockhash;
//   //     tx.feePayer = this.wallet.publicKey;

//   //     console.log('Transaction created, signing...');
//   //     const signedTx = await this.wallet.signTransaction(tx);

//   //     console.log('Transaction signed, sending...');
//   //     const txid = await this.provider.connection.sendRawTransaction(signedTx.serialize());

//   //     console.log('Transaction sent, awaiting confirmation...');
//   //     await this.provider.connection.confirmTransaction(txid);

//   //     this.platformPubkey = platform.publicKey;
//   //     console.log(`Platform initialized with ID: ${this.platformPubkey.toString()}`);
//   //   } catch (error) {
//   //     console.error("Failed to initialize platform:", error);
//   //     console.error("Error stack:", error.stack);
//   //     throw error;
//   //   }
//   // }

//   // Initialize a project

//   async initializePlatform() {
//     try {
//       console.log('Initializing platform...');
//       const platform = Keypair.generate();
//       console.log('Platform keypair generated:', platform.publicKey.toString());

//       const tx = await this.program.methods.initializePlatform()
//         .accounts({
//           platform: platform.publicKey,
//           manager: this.wallet.publicKey,
//           systemProgram: web3.SystemProgram.programId,
//         })
//         .transaction();

//       console.log('Fetching latest blockhash...');
//       const { blockhash } = await this.provider.connection.getLatestBlockhash();
//       tx.recentBlockhash = blockhash;
//       tx.feePayer = this.wallet.publicKey;

//       console.log('Transaction created, signing...');

//       // Sign the transaction with both the wallet and platform keypair
//       tx.partialSign(platform); // Sign with the platform keypair
//       const signedTx = await this.wallet.signTransaction(tx); // Sign with the manager's wallet

//       console.log('Transaction signed, sending...');
//       const txid = await this.provider.connection.sendRawTransaction(signedTx.serialize());

//       console.log('Transaction sent, awaiting confirmation...');
//       await this.provider.connection.confirmTransaction(txid);

//       this.platformPubkey = platform.publicKey;
//       console.log(`Platform initialized with ID: ${this.platformPubkey.toString()}`);
//     } catch (error) {
//       console.error("Failed to initialize platform:", error);
//       console.error("Error stack:", error.stack);
//       throw error;
//     }
//   }

//   async initializeProject(name, description, targetAmount, milestones, endDate) {
//     try {
//       if (!this.platformPubkey) {
//         throw new Error("Platform public key is not set. Initialize the platform first.");
//       }

//       // Validate targetAmount
//       if (isNaN(targetAmount) || targetAmount <= 0) {
//         throw new Error("Invalid target amount");
//       }

//       // Validate milestones
//       if (!Array.isArray(milestones) || milestones.some(m => isNaN(m) || m <= 0)) {
//         throw new Error("Invalid milestones");
//       }

//       const project = Keypair.generate();
//       console.log("Generated project keypair:", project.publicKey.toString());


//       const accounts = {
//         platform: this.platformPubkey,
//         project: project.publicKey,
//         manager: this.managerWallet.publicKey,
//         systemProgram: web3.SystemProgram.programId,
//       };

//       console.log("Accounts object:", accounts);
//       const deadline = new BN(Math.floor(endDate) / 1000); // Set deadline to 3 months from now

//       const tx = await this.program.methods.initializeProject(
//         name,
//         description,
//         new BN(targetAmount),
//         milestones,
//         deadline
//       )
//         .accounts(accounts)
//         .signers([project, this.managerWallet])
//         .rpc();

//       console.log("Transaction signature:", tx);
//       return project.publicKey.toString();
//     } catch (error) {
//       console.error("Failed to initialize project:", error);
//       throw error;
//     }
//   }
//   // Handle donations
//   async donate(projectId, amount, donorPublicKey, donorTokenAccount) {
//     try {
//       const [platformVault] = await PublicKey.findProgramAddress(
//         [Buffer.from('vault'), this.platformPubkey.toBuffer()],
//         this.program.programId
//       );
//       const [donationAccount] = await PublicKey.findProgramAddress(
//         [Buffer.from('donation'), new PublicKey(projectId).toBuffer(), new PublicKey(donorPublicKey).toBuffer()],
//         this.program.programId
//       );

//       await this.program.methods.donate(new web3.BN(amount))
//         .accounts({
//           platform: this.platformPubkey,
//           project: new PublicKey(projectId),
//           donation: donationAccount,
//           donor: new PublicKey(donorPublicKey),
//           donorTokenAccount,
//           platformVault: platformVault,
//           tokenProgram: TOKEN_PROGRAM_ID,
//           systemProgram: web3.SystemProgram.programId,
//         })
//         .rpc();
//       return donationAccount.toString();
//     } catch (error) {
//       console.error("Failed to process donation:", error);
//       throw error;
//     }
//   }

//   // Release milestone funds
//   async releaseMilestone(projectId, managerTokenAccount) {
//     try {
//       const [platformVault] = await PublicKey.findProgramAddress(
//         [Buffer.from('vault'), this.platformPubkey.toBuffer()],
//         this.program.programId
//       );
//       await this.program.methods.releaseMilestone()
//         .accounts({
//           platform: this.platformPubkey,
//           project: new PublicKey(projectId),
//           manager: this.managerWallet.publicKey,
//           managerTokenAccount,
//           platformVault: platformVault,
//           tokenProgram: TOKEN_PROGRAM_ID,
//         })
//         .signers([this.managerWallet])
//         .rpc();
//     } catch (error) {
//       console.error("Failed to release milestone funds:", error);
//       throw error;
//     }
//   }
// }

// module.exports = SolanaService;
// const { Connection, PublicKey, Keypair, SystemProgram } = require('@solana/web3.js');
// const { Program, AnchorProvider, Wallet, BN, web3 } = require('@project-serum/anchor');
// const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// const idl = require('../idl.json');
// const PROGRAM_ID = new PublicKey('GNap3DpM75MTEz5bvoKm5uncy2BXtQeXXxysp8HHeRTA');

// // const defaultProviderOptions = {
// //   preflightCommitment: 'processed',
// //   commitment: 'processed',
// // };

// class SolanaService {
//   constructor(connectionUrl, managerSecretKey) {
//     this.connection = new Connection(connectionUrl);
//     this.managerKeypair = Keypair.fromSecretKey(Buffer.from(managerSecretKey, 'base64'));
//     this.wallet = new Wallet(this.managerKeypair);
//     this.provider = new AnchorProvider(
//       this.connection,
//       this.wallet,
//       { preflightCommitment: 'processed', commitment: 'processed' }
//     );
//     this.program = new Program(idl, PROGRAM_ID, this.provider);
//     this.platformPubkey = null;
//   }

//   async getLatestBlockhash() {
//     return await this.connection.getLatestBlockhash('confirmed');
//   }

//   async findPlatformAddress() {
//     return PublicKey.findProgramAddressSync(
//       [Buffer.from("platform")],
//       this.program.programId
//     );
//   }

//   async findPlatformWalletAddress() {
//     return PublicKey.findProgramAddressSync(
//       [Buffer.from('platform_wallet')],
//       this.program.programId
//     );
//   }

//   async initializePlatform(initialFee) {
//     console.log("Initializing platform with fee:", initialFee);

//     try {
//       const [platformPda] = await this.findPlatformAddress();
//       const [platformWallet] = await this.findPlatformWalletAddress();

//       console.log("Platform PDA:", platformPda.toString());
//       console.log("Platform Wallet:", platformWallet.toString());

//       const tx = await this.program.methods.initializePlatform(new BN(initialFee))
//         .accounts({
//           platform: platformPda,
//           manager: this.managerKeypair.publicKey,
//           platformWallet: platformWallet,
//           systemProgram: SystemProgram.programId,
//         })
//         .signers([this.managerKeypair])
//         .rpc();

//       console.log("Transaction signature:", tx);

//       this.platformPubkey = platformPda;
//       console.log(`Platform initialized with ID: ${this.platformPubkey.toString()}`);
//       return tx;
//     } catch (error) {
//       console.error("Failed to initialize platform:", error);
//       throw error;
//     }
//   }

//   async updatePlatformFee(newFee) {
//     if (!this.platformPubkey) {
//       throw new Error("Platform not initialized");
//     }

//     try {
//       const tx = await this.program.methods.updatePlatformFee(new BN(newFee))
//         .accounts({
//           platform: this.platformPubkey,
//           manager: this.wallet.publicKey,
//         })
//         .rpc();

//       console.log(`Platform fee updated to: ${newFee}`);
//       return tx;
//     } catch (error) {
//       console.error("Failed to update platform fee:", error);
//       throw error;
//     }
//   }

//   async initializeProject(name, description, targetAmount, milestones, deadline) {
//     if (!this.platformPubkey) {
//       throw new Error("Platform not initialized");
//     }

//     try {
//       const project = Keypair.generate();
//       const tx = await this.program.methods.initializeProject(
//         name,
//         description,
//         new BN(targetAmount),
//         milestones.map(m => ({
//           description: m.description,
//           target: new BN(m.target),
//           endDate: new BN(m.endDate)
//         })),
//         new BN(deadline)
//       )
//         .accounts({
//           project: project.publicKey,
//           platform: this.platformPubkey,
//           manager: this.wallet.publicKey,
//           systemProgram: SystemProgram.programId,
//         })
//         .signers([project])
//         .rpc();

//       console.log(`Project initialized with ID: ${project.publicKey.toString()}`);
//       return { projectId: project.publicKey.toString(), tx };
//     } catch (error) {
//       console.error("Failed to initialize project:", error);
//       throw error;
//     }
//   }

//   async updateProject(projectId, name, description, milestones) {
//     try {
//       const tx = await this.program.methods.updateProject(
//         name ? name : null,
//         description ? description : null,
//         milestones ? milestones.map(m => ({ description: m.description, target: new BN(m.target), endDate: new BN(m.endDate) })) : null
//       )
//         .accounts({
//           project: new PublicKey(projectId),
//           manager: this.wallet.publicKey,
//         })
//         .rpc();

//       console.log(`Project updated: ${projectId}`);
//       return tx;
//     } catch (error) {
//       console.error("Failed to update project:", error);
//       throw error;
//     }
//   }

//   async recordDonation(projectId, amount, donationReference, donorTokenAccountPubkey) {
//     if (!this.platformPubkey) {
//       throw new Error("Platform not initialized");
//     }

//     try {
//       const [donationPDA] = await PublicKey.findProgramAddress(
//         [Buffer.from('donation'), new PublicKey(projectId).toBuffer(), this.wallet.publicKey.toBuffer()],
//         this.program.programId
//       );

//       const [projectVaultPDA] = await PublicKey.findProgramAddress(
//         [Buffer.from('vault'), new PublicKey(projectId).toBuffer()],
//         this.program.programId
//       );

//       const [platformWallet] = await this.findPlatformWalletAddress();

//       const tx = await this.program.methods.recordDonation(new BN(amount), donationReference)
//         .accounts({
//           platform: this.platformPubkey,
//           project: new PublicKey(projectId),
//           donation: donationPDA,
//           donor: this.wallet.publicKey,
//           donorTokenAccount: new PublicKey(donorTokenAccountPubkey),
//           platformWallet: platformWallet,
//           projectVault: projectVaultPDA,
//           tokenProgram: TOKEN_PROGRAM_ID,
//           systemProgram: SystemProgram.programId,
//         })
//         .rpc();

//       console.log(`Donation recorded with ID: ${donationPDA.toString()}`);
//       return { donationId: donationPDA.toString(), tx };
//     } catch (error) {
//       console.error("Failed to record donation:", error);
//       throw error;
//     }
//   }


//   async completeMilestone(projectId) {
//     try {
//       const tx = await this.program.methods.completeMilestone()
//         .accounts({
//           platform: this.platformPubkey,
//           project: new PublicKey(projectId),
//           manager: this.wallet.publicKey,
//         })
//         .rpc();

//       console.log(`Milestone completed for project: ${projectId}`);
//       return tx;
//     } catch (error) {
//       console.error("Failed to complete milestone:", error);
//       throw error;
//     }
//   }

//   async withdrawFunds(projectId, managerTokenAccountPubkey) {
//     try {
//       const [projectVaultPDA] = await PublicKey.findProgramAddress(
//         [Buffer.from('vault'), new PublicKey(projectId).toBuffer()],
//         this.program.programId
//       );

//       const tx = await this.program.methods.withdrawFunds()
//         .accounts({
//           project: new PublicKey(projectId),
//           manager: this.wallet.publicKey,
//           managerTokenAccount: new PublicKey(managerTokenAccountPubkey),
//           projectVault: projectVaultPDA,
//           tokenProgram: TOKEN_PROGRAM_ID,
//         })
//         .rpc();

//       console.log(`Funds withdrawn for project: ${projectId}`);
//       return tx;
//     } catch (error) {
//       console.error("Failed to withdraw funds:", error);
//       throw error;
//     }
//   }

//   async refund(projectId, donorPubkey, donorTokenAccountPubkey) {
//     try {
//       const [donationPDA] = await PublicKey.findProgramAddress(
//         [Buffer.from('donation'), new PublicKey(projectId).toBuffer(), new PublicKey(donorPubkey).toBuffer()],
//         this.program.programId
//       );

//       const [projectVaultPDA] = await PublicKey.findProgramAddress(
//         [Buffer.from('vault'), new PublicKey(projectId).toBuffer()],
//         this.program.programId
//       );

//       const tx = await this.program.methods.refund()
//         .accounts({
//           project: new PublicKey(projectId),
//           donation: donationPDA,
//           donor: new PublicKey(donorPubkey),
//           donorTokenAccount: new PublicKey(donorTokenAccountPubkey),
//           projectVault: projectVaultPDA,
//           tokenProgram: TOKEN_PROGRAM_ID,
//         })
//         .rpc();

//       console.log(`Refund processed for donation: ${donationPDA.toString()}`);
//       return tx;
//     } catch (error) {
//       console.error("Failed to process refund:", error);
//       throw error;
//     }
//   }

//   async getProject(projectId) {
//     try {
//       const projectInfo = await this.program.account.project.fetch(new PublicKey(projectId));
//       return projectInfo;
//     } catch (error) {
//       console.error("Failed to fetch project info:", error);
//       throw error;
//     }
//   }

//   async getDonation(donationId) {
//     try {
//       const donationInfo = await this.program.account.donation.fetch(new PublicKey(donationId));
//       return donationInfo;
//     } catch (error) {
//       console.error("Failed to fetch donation info:", error);
//       throw error;
//     }
//   }

//   async getPlatformInfo() {
//     if (!this.platformPubkey) {
//       throw new Error("Platform not initialized");
//     }

//     try {
//       const platformInfo = await this.program.account.platform.fetch(this.platformPubkey);
//       return platformInfo;
//     } catch (error) {
//       console.error("Failed to fetch platform info:", error);
//       throw error;
//     }
//   }
// }

// module.exports = SolanaService;