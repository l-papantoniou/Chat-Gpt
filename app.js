const express = require('express');
const cors = require("cors");
const authRoutes = require('./src/routes/authRoutes');
const chatGptRoutes = require('./src/routes/chatGptRoutes');
const hotelCompaniesRoutes = require('./src/routes/hotelCompaniesRoutes');
const bookingScraperRoutes = require('./src/routes/bookingScraperRoutes');
const deeplRoutes = require('./src/routes/deeplRoute');
const app = express();

app.use(express.json());
app.use(cors());

// Use the authentication routes
app.use('/api/user', authRoutes);

// Use the hotel companies routes
app.use('/api/hotel-companies', hotelCompaniesRoutes);

// Use the Chat-Gpt routes
app.use('/api/chat', chatGptRoutes);

// Use the Booking-Scraper routes
app.use('/api/booking', bookingScraperRoutes);

// Use the Booking-Scraper routes
app.use('/api/deepl', deeplRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
