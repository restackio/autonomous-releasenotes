import { defineEvent } from '@restackio/ai/event';

export type CreateReleaseEventInput = {
  repository: string;
  branch: string;
  defaultBranch: string;
};

export type CreateReleaseEvent = {
  name: string;
  tag_name: string;
  draft: boolean;
  published_at: string;
  html_url: string;
  id: number;
};

export const createReleaseEvent =
  defineEvent<CreateReleaseEvent>('createRelease');
