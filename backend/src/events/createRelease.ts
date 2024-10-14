import { defineEvent } from '@restackio/ai/event';

export type CreateReleaseEventInput = {
  owner: string;
  repo: string;
  tagName: string;
  releaseName: string;
  releaseBody: string;
  branch?: string;
};

export type CreateReleaseEvent = {
  name: string | null;
  tag_name: string;
  draft: boolean;
  published_at: string | null;
  html_url: string;
};

export const createReleaseEvent =
  defineEvent<CreateReleaseEvent>('createRelease');
