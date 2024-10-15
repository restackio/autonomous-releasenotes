import { condition, step } from '@restackio/ai/workflow';
import { onEvent } from '@restackio/ai/event';
import * as githubFunctions from '@restackio/integrations-github/functions';
import { githubTaskQueue } from '@restackio/integrations-github/taskQueue';

import {
  publishReleaseEvent,
  PublishReleaseEventInput,
} from '../events/publishRelease.js';

import {
  createReleaseEvent,
  CreateReleaseEventInput,
} from '../events/createRelease.js';

export async function handleReleaseWorkflow() {
  let endReleaseWorkflow = false;

  onEvent(
    publishReleaseEvent,
    async ({ id, owner, repo }: PublishReleaseEventInput) => {
      const release = await step<typeof githubFunctions>({
        taskQueue: githubTaskQueue,
      }).publishRelease({ owner, repo, id });

      return release;
    },
  );

  onEvent(
    createReleaseEvent,
    async ({
      owner,
      repo,
      tagName,
      releaseName,
      releaseBody,
      branch,
    }: CreateReleaseEventInput) => {
      const release = await step<typeof githubFunctions>({
        taskQueue: githubTaskQueue,
      }).createRelease({
        owner,
        repo,
        tagName,
        releaseName,
        releaseBody,
        branch,
      });

      return release;
    },
  );

  await condition(() => endReleaseWorkflow);
}
