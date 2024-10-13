import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { services } from './services.js';
import { client } from './client.js';
import { taskQueue } from './taskqueue.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

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

app.get('/releases/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;

  const workflowId = `${Date.now()}-getReleases`;

  const runId = await client.scheduleWorkflow({
    workflowName: 'getReleasesWorkflow',
    workflowId,
    input: { owner, repo },
    taskQueue,
  });

  const result = await client.getWorkflowResult({ workflowId, runId });

  res.json({ releases: result });
});

// Start the server
app.listen(PORT, () => {
  services().catch((err) => {
    console.error('Error in services:', err);
  });
  console.log(`Server is running on port ${PORT}`);
});
