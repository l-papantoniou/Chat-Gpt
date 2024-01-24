const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const authService = {
    async registerUser(username, email, password) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add user to the database
        const newUser = await prisma.users.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });

        const token = jwtGenerator(newUser.id);

        return {newUser, token};
    },

    async loginUser(email, password) {
        // Check if user exists
        const user = await prisma.users.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        // Check if incoming password is the same as the database password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        // Generate a JWT token
        const token = jwtGenerator(user.id);

        return {user, token};
    },

};

module.exports = authService;
