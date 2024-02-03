const chatGptService = require('../services/chatGptService');

const chatGptController = {
    async getResponse(req, res) {
        try {
            const payload = req.body;

            // Validate the input
            if (!payload.venue) {
                return res.status(400).json({message: 'A tourist accommodation is required!'});
            }

            // Call the ChatGPT service to get a response
            const response = await chatGptService.generateResponse(payload);

            // Send the response back to the client
            res.json({response});
        } catch (err) {
            console.error('Error in getResponse:', err.message);
            res.status(500).send('Server error');
        }
    },

    async getTranslation(req, res) {
        try {
            const payload = req.body;

            // Validate the input
            if (!payload.description) {
                return res.status(400).json({message: 'Description is required'});
            }
            // Validate the input
            if (!payload.targetLanguage) {
                return res.status(400).json({message: 'Target Language is required'});
            }

            // Call the ChatGPT service to get the translation
            const response = await chatGptService.translateContent(payload);

            // Send the response back to the client
            res.json({response});
        } catch (err) {
            console.error('Error in getResponse:', err.message);
            res.status(500).send('Server error');
        }
    }

    // You can add more functions here if needed, such as handling different types of prompts,
    // logging, or more advanced features.
};

module.exports = chatGptController;
