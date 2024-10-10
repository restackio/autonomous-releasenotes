import { githubClient } from '../utils/githubClient.js';

export async function updateRelease(
  {
    owner,
    repo,
    releaseId,
  }: {
    owner: string;
    repo: string;
    releaseId: number;
  }
) {
  try {
    const { octokit } = await githubClient();
    const { data } = await octokit.rest.repos.updateRelease({
      owner,
      repo,
      release_id: releaseId,
      draft: false,
      prerelease: false,
    });
    
    return data;
    
  } catch (error) {
    throw new Error(`Error while updating release: ${error}`);
  }
}
