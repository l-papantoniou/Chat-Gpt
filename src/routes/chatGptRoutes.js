const express = require('express');
const chatGptController = require('../controllers/chatGptController');
const router = express.Router();

router.post('/chat-gpt', chatGptController.getResponse);

module.exports = router;
