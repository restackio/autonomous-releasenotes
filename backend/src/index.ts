import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { services } from './services.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.get('/', (_, res) => {
    res.send('Hello World! The server is running.');
});

app.post('/release', (req, res) => {
    const data = req.body;
    console.log('data', data);
    res.json({ message: 'Release created successfully' });
});

app.put('/release/:id', (req, res) => {
    const data = req.body;
    console.log('data', data);
    res.json({ message: 'Release updated successfully' });
});

app.get('/releases/:owner/:repo', (req, res) => {
    const { owner, repo } = req.params;
    console.log('data', owner, repo);
    res.json({ message: 'Releases fetched successfully' });
});

// Start the server
app.listen(PORT, () => {
    services().catch((err) => {
        console.error("Error in services:", err);
    });
    console.log(`Server is running on port ${PORT}`);
});
