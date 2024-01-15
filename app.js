const express = require('express');
const cors = require("cors");
const authRoutes = require('./src/routes/authRoutes');
const chatGptRoutes = require('./src/routes/chatGptRoutes');
const app = express();

app.use(express.json());
app.use(cors());

// Use the authentication routes
app.use('/api/user', authRoutes);

// Use the Chat-Gpt routes
app.use('/api', chatGptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
