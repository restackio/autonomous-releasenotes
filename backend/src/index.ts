import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint for "/analyze"
app.post('/analyze', (req, res) => {
    const data = req.body; // Access the request body
    // Process the data as needed
    res.json({ message: 'Analysis complete', data }); // Respond with a message
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
