const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');


// Level 4: Post Weather Alerts
router.post('/alerts', async (req, res) => {
  try {
    const { city, date, humidity } = req.body;
    await weatherController.saveWeatherAlert({ city, date, humidity });
    res.status(200).json({ status: 'success', message: 'Weather alert saved successfully' });
  } catch (error) {
    res.status(404).json({ status: 'error', message: 'Failed to save weather alert', error: error.message });
  }
});

module.exports = router;
