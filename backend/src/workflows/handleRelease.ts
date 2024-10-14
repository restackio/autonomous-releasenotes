import { condition, step } from '@restackio/ai/workflow';
import { onEvent } from '@restackio/ai/event';

import * as functions from '../functions/index.js';
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
      const release = await step<typeof functions>({
        taskQueue: 'github',
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
      const release = await step<typeof functions>({
        taskQueue: 'github',
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
