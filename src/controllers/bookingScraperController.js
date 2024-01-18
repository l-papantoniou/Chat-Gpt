const bookingScraperService = require("../services/bookingScraperService");

const bookingScraperController = {
    async scrapBookingData(req, res) {
        try {
            const {bookingUrl} = req.body;

            // Validate the input
            if (!bookingUrl) {
                return res.status(400).json({message: 'bookingUrl is required'});
            }

            // Call the ChatGPT service to get a response
            const response = await bookingScraperService.scrapBookingData(bookingUrl);

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

module.exports = bookingScraperController;
