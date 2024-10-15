import { step } from '@restackio/ai/workflow';

import * as githubFunctions from '@restackio/integrations-github/functions';
import { githubTaskQueue } from '@restackio/integrations-github/taskQueue';

export async function getReleasesWorkflow({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const releases = await step<typeof githubFunctions>({
    taskQueue: githubTaskQueue,
  }).getReleases({ owner, repo });

  return releases;
}
