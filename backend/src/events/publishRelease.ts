import { defineEvent } from '@restackio/ai/event';

export type PublishReleaseEvent = {
  name: string;
  tag_name: string;
  draft: boolean;
  published_at: string;
  html_url: string;
  id: number;
};

export type PublishReleaseEventInput = {
  id: number;
  owner: string;
  repo: string;
};

export const publishReleaseEvent =
  defineEvent<PublishReleaseEvent>('publishRelease');
