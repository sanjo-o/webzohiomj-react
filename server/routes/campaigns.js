const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Campaign = require('../models/Campaign');

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a campaign (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { title, image, amount } = req.body;
    const campaign = new Campaign({
      title,
      image,
      amount,
      creator: req.userId
    });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;