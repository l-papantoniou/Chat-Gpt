const bcrypt = require('bcrypt');
const pool = require('../config/dbConfig');
const {PrismaClient, User, users} = require('@prisma/client');
const jwtGenerator = require('../utils/jwtGenerator');

const prisma = new PrismaClient();

const authController = {
    // Register User
    async registerUser(req, res) {
        try {
            const {email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

            // Add user to the database
            const newUser = await prisma.users.create({
                data: {
                    email: email,
                    password: hashedPassword
                }
            });

            // Exclude the password from the response for security
            const {password: _, ...userWithoutPassword} = newUser;

            res.json(userWithoutPassword);
        } catch (err) {
            console.error(err.message);
            // Handle unique constraint violation
            if (err.code === "P2002") {
                return res.status(409).send("Email already exists");
            }
            res.status(500).send('Server error');
        }
    },

    // Login User
    async loginUser(req, res) {
        try {
            const {email, password} = req.body;

            // Check if user doesn't exist (if not then throw error)
            const user = await prisma.users.findUnique({
                where: {
                    email: email
                }
            });

            if (!user) {
                return res.status(401).json({message: 'Invalid Credentials'});
            }

            // Check if incoming password is the same as the database password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({message: 'Invalid Credentials'});
            }

            // Create and assign a jwt token
            const token = jwtGenerator(user.id);
            res.json({token});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },

    // Verify User
    async verifyUser(req, res) {
        try {
            // Assuming the user is already verified by the 'authorization' middleware
            res.json({message: 'User is verified', user: req.user});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
};

module.exports = authController;
