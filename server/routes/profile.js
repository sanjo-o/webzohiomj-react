const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { updateProfile, getUserProfile } = require('../controllers/profileController');

router.get('/', auth, getUserProfile);
router.put('/', auth, updateProfile);

module.exports = router; 