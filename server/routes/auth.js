const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { register, login, getMe, updateProfile } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/update-profile', auth, updateProfile);
router.get('/test-auth', auth, (req, res) => {
  res.json({ message: 'Authentication working', userId: req.userId });
});

module.exports = router;