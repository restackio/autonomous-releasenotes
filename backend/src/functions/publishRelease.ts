import { githubClient } from '../utils/githubClient.js';

export async function publishRelease({
  owner,
  repo,
  releaseId,
}: {
  owner: string;
  repo: string;
  releaseId: number;
}) {
  try {
    const { octokit } = await githubClient();
    const { data } = await octokit.rest.repos.updateRelease({
      owner,
      repo,
      release_id: releaseId,
      draft: false,
    });

    return {
      name: data.name,
      tag_name: data.tag_name,
      draft: data.draft,
      published_at: data.published_at,
      html_url: data.html_url,
    };
  } catch (error) {
    throw new Error(`Error while updating release: ${error}`);
  }
}
