import { defineEvent } from '@restackio/ai/event';

export type PublishReleaseEvent = {
  name: string | null;
  tag_name: string;
  draft: boolean;
  published_at: string | null;
  html_url: string;
};

export type PublishReleaseEventInput = {
  releaseId: number;
  owner: string;
  repo: string;
};

export const publishReleaseEvent =
  defineEvent<PublishReleaseEvent>('publishRelease');
