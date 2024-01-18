const express = require('express');
const bookingScraperController = require('../controllers/bookingScraperController');
const router = express.Router();


router.post('/booking-scraper', bookingScraperController.scrapBookingData)


module.exports = router;
