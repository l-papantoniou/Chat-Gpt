// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Adjust the path as necessary

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/verify', authController.verifyUser);

module.exports = router;
