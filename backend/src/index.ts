import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { client } from './client.js';
import { taskQueue } from './taskqueue.js';

import { publishReleaseEvent } from './events/publishRelease.js';
import { createReleaseEvent } from './events/createRelease.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.get('/', (_, res) => {
  res.send('Hello World! The server is running.');
});

let handleReleaseWorkflowId: string = 'handleRelease';
let runId: string = '';

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

app.put('/publish/:owner/:repo/:id', async (req, res) => {
  const { id, owner, repo } = req.params;

  const publishedRelease = await client.sendWorkflowEvent({
    event: {
      name: publishReleaseEvent.name,
      input: { id, owner, repo },
    },
    workflow: {
      workflowId: handleReleaseWorkflowId,
      runId,
    },
  });

  res.json({ release: publishedRelease });
});

app.post('/webhook', async (req, res) => {
  console.log('Webhook received:', req.body);
  const data = req.body;

  res.status(200).send('Webhook received');

  await client.sendWorkflowEvent({
    event: {
      name: createReleaseEvent.name,
      input: {
        repository: data.repository.full_name,
        branch: data.ref.split('/').pop() || '',
        defaultBranch: data.repository.default_branch,
      },
    },
    workflow: {
      workflowId: handleReleaseWorkflowId,
      runId,
    },
  });
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    runId = await client.scheduleWorkflow({
      workflowName: 'handleReleaseWorkflow',
      workflowId: handleReleaseWorkflowId,
      taskQueue,
    });
  } catch (error) {
    console.error('Error in scheduleWorkflow:', error);
  }
});
