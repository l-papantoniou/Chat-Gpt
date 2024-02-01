const express = require('express');
const chatGptController = require('../controllers/chatGptController');
const authorization = require("../middleware/authorization");
const authController = require("../controllers/authController");
const router = express.Router();

router.post('/chat-gpt', chatGptController.getResponse);
router.post('/chat-gpt/translate', chatGptController.getTranslation);


module.exports = router;
