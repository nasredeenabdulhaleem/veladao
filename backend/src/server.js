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
const SolanaService = require('./services/solanaService')


// smart contract connection
const managerSecretKey = require('./secret-key.json') /* your manager's secret key */;
// const solanaService = new SolanaService('https://localhost:8899', managerSecretKey);
const solanaService = new SolanaService('https://api.devnet.solana.com', managerSecretKey);

// Transaction signature: 3mWG5nwhM8rtWyFYGwdrAV55Kybvo5skxcSgq1wVY22obRYfnZwsX9uXgoXoAoyfJ6Ub82jKfKWjFX6ZBgUisQyN
// Project initialized with ID: EHysXrdn7Lb9jGqBFMCk5H2fK8eEg9n9mkJpXFAks3cE
// Initialize the platform on server start
(async () => {
  await solanaService.initializePlatform();
})();

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