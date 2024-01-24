const authService = require('../services/authService');

const authController = {

    // Register User
    async registerUser(req, res) {
        try {
            const user = await authService.registerUser(req.body.username, req.body.email, req.body.password);
            res.json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Login User
    async loginUser(req, res) {
        try {
            const { user, token } = await authService.loginUser(req.body.email, req.body.password);

            // Optionally exclude sensitive information from the user object
            const { password: _, ...userWithoutPassword } = user;

            res.json({ user: userWithoutPassword, token });
        } catch (error) {
            // Adjust the status code and response based on the error type
            if (error.message === 'User not found' || error.message === 'Invalid credentials') {
                return res.status(401).json({ message: error.message });
            }
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
