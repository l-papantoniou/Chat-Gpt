const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use the authentication routes
app.use('/api/user', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
