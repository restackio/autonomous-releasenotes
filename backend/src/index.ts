import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World! The server is running.');
});

app.post('/release', (req, res) => {
    const data = req.body;
    res.json({ message: 'Release created successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
