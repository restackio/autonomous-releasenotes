import { githubClient } from '../utils/githubClient.js';

export async function publishRelease({
  owner,
  repo,
  id,
}: {
  owner: string;
  repo: string;
  id: number;
}) {
  try {
    const { octokit } = await githubClient();
    const { data } = await octokit.rest.repos.updateRelease({
      owner,
      repo,
      release_id: id,
      draft: false,
    });

    return {
      name: data.name,
      tag_name: data.tag_name,
      draft: data.draft,
      published_at: data.published_at,
      html_url: data.html_url,
      id: data.id,
    };
  } catch (error) {
    throw new Error(`Error while updating release: ${error}`);
  }
}
