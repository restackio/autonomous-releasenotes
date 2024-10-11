import { step } from '@restackio/ai/workflow';

import * as functions from '../functions/index.js';

export async function getReleasesWorkflow({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const releases = await step<typeof functions>({
    taskQueue: 'github',
  }).getReleases({ owner, repo });

  return releases;
}
