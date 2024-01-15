const chatGptService = require('../services/chatGptService');

const chatGptController = {
    async getResponse(req, res) {
        try {
            const { prompt } = req.body;

            // Validate the input
            if (!prompt) {
                return res.status(400).json({ message: 'Prompt is required' });
            }

            // Call the ChatGPT service to get a response
            const response = await chatGptService.generateResponse(prompt);

            // Send the response back to the client
            res.json({ response });
        } catch (err) {
            console.error('Error in getResponse:', err.message);
            res.status(500).send('Server error');
        }
    }

    // You can add more functions here if needed, such as handling different types of prompts,
    // logging, or more advanced features.
};

module.exports = chatGptController;
