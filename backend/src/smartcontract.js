// import { Program, Instruction, PublicKey } from '@solana/web3.js';

// const program = new Program('CrowdfundContract', {
//     // Initialize project
//     initProject: async (projectName, projectDescription, targetAmount, manager) => {
//         const project = {
//             id: await program.generateId(),
//             name: projectName,
//             description: projectDescription,
//             targetAmount,
//             currentAmount: 0,
//             manager,
//         };
//         program.state.projects.set(project.id, project);
//     },

//     // Donate to a project
//     donate: async (projectId, amount, donor) => {
//         const project = program.state.projects.get(projectId);
//         if (!project) throw new Error('Project not found');

//         const donation = {
//             id: await program.generateId(),
//             projectId,
//             amount,
//             donor,
//         };
//         program.state.donations.set(donation.id, donation);

//         project.currentAmount += amount;
//         program.state.projects.set(projectId, project);

//         if (project.currentAmount >= project.targetAmount) {
//             // Release funds to project manager
//             await program.releaseFunds(projectId);
//         }
//     },

//     // Release funds to project manager
//     releaseFunds: async (projectId) => {
//         const project = program.state.projects.get(projectId);
//         if (!project) throw new Error('Project not found');

//         // Transfer funds to project manager
//         // ...
//     },
//     getProject: async (RPC) =>{},
// getDonations: async (RPC)=>{},
// });
const { Connection, PublicKey, Keypair, SystemProgram, Transaction } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, createTransferInstruction } = require('@solana/spl-token');

const USDC_MINT = new PublicKey('Es9vMFrzaCERgXTJhA1SK8taqWhQpCv1M4cfKtjXY4A'); // USDC Mint address

class CrowdfundProgram {
  constructor(connection, wallet) {
    this.connection = connection;
    this.wallet = wallet;
    this.state = {
      projects: new Map(), // In-memory storage for projects
      donations: new Map(), // In-memory storage for donations
    };
  }

  // Generate a random unique ID
  async generateId() {
    return Keypair.generate().publicKey.toString();
  }

  // Initialize a new project
  async initProject(projectName, projectDescription, targetAmount, manager) {
    const projectId = await this.generateId();
    const project = {
      id: projectId,
      name: projectName,
      description: projectDescription,
      targetAmount,
      currentAmount: 0,
      manager, // Public Key of the project manager
    };

    // Store project in state
    this.state.projects.set(projectId, project);
    console.log('Project initialized:', project);
    return project;
  }

  // Donate to a project (handles SOL, USDC, USDT)
  async donate(projectId, amount, donorPublicKey, tokenType = 'SOL') {
    const project = this.state.projects.get(projectId);
    if (!project) throw new Error('Project not found');

    const donationId = await this.generateId();
    let transaction = new Transaction();

    if (tokenType === 'SOL') {
      // SOL Donation
      transaction.add(SystemProgram.transfer({
        fromPubkey: donorPublicKey,
        toPubkey: new PublicKey(project.manager), // Project manager receives funds
        lamports: amount * web3.LAMPORTS_PER_SOL, // Convert SOL to lamports
      }));
    } else if (tokenType === 'USDC' || tokenType === 'USDT') {
      // USDC/USDT Donation
      const mint = tokenType === 'USDC' ? USDC_MINT : USDT_MINT;

      const donorTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        this.wallet.payer,
        mint,
        donorPublicKey
      );
      const projectTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        this.wallet.payer,
        mint,
        new PublicKey(project.manager)
      );

      const transferInstruction = createTransferInstruction(
        donorTokenAccount.address, // From token account
        projectTokenAccount.address, // To project token account
        donorPublicKey, // Authority
        amount * web3.LAMPORTS_PER_SOL, // Token amount
        [],
        TOKEN_PROGRAM_ID
      );

      transaction.add(transferInstruction);
    }

    // Send and confirm the transaction
    await this.connection.sendTransaction(transaction, [this.wallet.payer]);

    // Store donation in state
    const donation = { id: donationId, projectId, amount, donor: donorPublicKey.toString(), tokenType };
    this.state.donations.set(donationId, donation);
    project.currentAmount += amount;
    this.state.projects.set(projectId, project);

    console.log('Donation successful:', donation);

    // Check if the target amount is reached
    if (project.currentAmount >= project.targetAmount) {
      await this.releaseFunds(projectId);
    }
  }

  // Release funds to the project manager when the target is met
  async releaseFunds(projectId) {
    const project = this.state.projects.get(projectId);
    if (!project) throw new Error('Project not found');

    // Logic to handle funds release to the project manager
    console.log('Funds released to manager:', project.manager);
    // Implement your fund release mechanism here (e.g., token transfer, notification, etc.)
  }

  // Fetch project details
  getProject(projectId) {
    return this.state.projects.get(projectId);
  }

  // Fetch donation details
  getDonations(projectId) {
    return Array.from(this.state.donations.values()).filter(donation => donation.projectId === projectId);
  }
}

module.exports = CrowdfundProgram;
