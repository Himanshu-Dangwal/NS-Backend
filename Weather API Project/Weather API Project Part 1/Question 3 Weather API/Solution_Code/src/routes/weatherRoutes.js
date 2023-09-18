const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Level 3: Get City Weather Data by ZipCode
router.get('/city/zipcode/:code', async (req, res) => {
  try {
    const zipCode = req.params.code;
    const weatherData = await weatherController.getWeatherDataByZipCode(zipCode);
    res.status(200).json({ status: 'success', message: 'Weather data retrieved', data: weatherData });
  } catch (error) {
    res.status(404).json({ status: 'error', message: 'ZipCode not found', error: error.message });
  }
});

module.exports = router;
