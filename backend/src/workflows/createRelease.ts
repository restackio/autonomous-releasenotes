import { step } from '@restackio/ai/workflow';

import * as functions from '../functions/index.js';

export async function createReleaseWorkflow({
  owner,
  repo,
  tagName,
  releaseName,
  releaseBody,
  branch,
}: {
  owner: string;
  repo: string;
  tagName: string;
  releaseName: string;
  releaseBody: string;
  branch: string;
}) {
  const release = await step<typeof functions>({
    taskQueue: 'github',
  }).createRelease({ owner, repo, tagName, releaseName, releaseBody, branch });

  return release;
}
