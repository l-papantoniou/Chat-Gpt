const express = require('express');
const router = express.Router();
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')
const authController = require('../controllers/authController');

router.post('/register', validInfo, authController.registerUser);
router.post('/login', validInfo, authController.loginUser);
router.post('/verify', authorization, authController.verifyUser);

module.exports = router;
