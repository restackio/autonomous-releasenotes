import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import {
  createRelease,
  updateRelease,
  getReleases,
} from './functions/index.js';

import { client } from './client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function services() {
  const workflowsPath = resolve(__dirname, './workflows');

  try {
    await Promise.all([
      client.startService({
        workflowsPath,
        taskQueue: 'github',
        functions: { createRelease, updateRelease, getReleases },
      }),
    ]);

    console.log('Services running successfully.');
  } catch (e) {
    console.error('Failed to run worker', e);
  }
}
