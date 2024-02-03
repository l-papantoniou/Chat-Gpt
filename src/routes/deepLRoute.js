const express = require('express');
const { translate } = require('../controllers/deeplController');
const router = express.Router();

// Define the route for DeepL translation
router.post('/translate', translate);

module.exports = router;
