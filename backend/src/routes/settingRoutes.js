const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const SettingsController = require('../controllers/settingsController');

// Route to create or update a setting
router.post('/upsert', authMiddleware.authenticateUser, SettingsController.upsertSetting);

// Route to get a specific setting by key
router.get('/get', SettingsController.getSetting);

// Route to delete a setting by key
router.delete('/delete', authMiddleware.authenticateUser, SettingsController.deleteSetting);

module.exports = router;
