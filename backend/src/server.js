const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const milestoneRoutes = require('./routes/milestoneRoutes');
const userRoutes = require('./routes/userRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const settingsRoutes = require('./routes/settingRoutes');
// const SolanaService = require('./services/solanaService')
// const getPlatformFee = require('./utils/getPlatformFee');
// const VeladaoService = require('./services/veladaoService');
// const anchor = require('@project-serum/anchor');
// const { Keypair, Connection, clusterApiUrl } = require('@solana/web3.js');


// // Import manager's secret key
// const managerSecretKey = require('./secret-key.json'); // The manager's secret key
// const platformWalletKey = require('./platform-wallet-keypair.json'); // The platform wallet

// // Convert secret key into Keypair for the wallet
// const managerKeypair = Keypair.fromSecretKey(Buffer.from(managerSecretKey));

// // Initialize connection and wallet
// const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
// const wallet = new anchor.Wallet(managerKeypair); // Use managerKeypair for the wallet

// // Create the Anchor provider
// const provider = new anchor.AnchorProvider(connection, wallet, { commitment: 'confirmed' });
// anchor.setProvider(provider);

// // Create VeladaoService instance with provider and program ID
// const veladaoService = new VeladaoService(provider, new anchor.web3.PublicKey('GNap3DpM75MTEz5bvoKm5uncy2BXtQeXXxysp8HHeRTA'));

// // Example: Initialize platform
// const platformWallet = Keypair.fromSecretKey(Buffer.from(platformWalletKey));// Keypair.fromSecretKey(Buffer.from(platformWalletKey)); // Generate or load the platform wallet
// // veladaoService.initializePlatform(managerKeypair, platformWallet, 500)
// //   .then(() => console.log('Platform initialized'))
// //   .catch(error => console.error('Error initializing platform:', error));
// console.log('Manager public key:', managerKeypair.publicKey.toBase58());
// console.log('Platform wallet public key:', platformWallet.publicKey.toBase58());

// veladaoService.initializePlatform(managerKeypair, platformWallet, 500)
//   .then(() => console.log('Platform initialized'))
//   .catch(error => {
//     console.error('Error initializing platform:', error);
//     if (error.logs) {
//       console.error('Error logs:', error.logs);
//     }
//   });
// // const solanaService = new SolanaService('https://localhost:8899', managerSecretKey);
// const solanaService = new SolanaService('https://api.devnet.solana.com', managerSecretKey);

// // Transaction signature: 3mWG5nwhM8rtWyFYGwdrAV55Kybvo5skxcSgq1wVY22obRYfnZwsX9uXgoXoAoyfJ6Ub82jKfKWjFX6ZBgUisQyN
// // Project initialized with ID: EHysXrdn7Lb9jGqBFMCk5H2fK8eEg9n9mkJpXFAks3cE
// // Initialize the platform on server start

// (async () => {
//   const platformFee = await getPlatformFee();
//   console.log("Platform fee:", platformFee);
//   await solanaService.initializePlatform(Number(platformFee));
// })();

// Middleware
// Increase the payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', contributionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user-profile', userProfileRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/settings', settingsRoutes);




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});