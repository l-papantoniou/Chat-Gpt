const bcrypt = require('bcrypt');
const pool = require('../config/dbConfig'); // Adjust the import path based on your project structure
const jwtGenerator = require('../utils/jwtGenerator');

const authController = {
    // Register User
    async registerUser(req, res) {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

            // Add user to the database
            const newUser = await pool.query(
                'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
                [email, hashedPassword]
            );

            res.json(newUser.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },

    // Login User
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Check if user doesn't exist (if not then throw error)
            const user = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            if (user.rows.length === 0) {
                return res.status(401).json({ message: 'Invalid Credentials' });
            }

            // Check if incoming password is the same as the database password
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid Credentials' });
            }

            // Create and assign a jwt token
            const token = jwtGenerator(user.rows[0].id);
            res.json({ token });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },

    // Verify User
    async verifyUser(req, res) {
        try {
            // Assuming the user is already verified by the 'authorization' middleware
            res.json({ message: 'User is verified', user: req.user });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
};

module.exports = authController;
