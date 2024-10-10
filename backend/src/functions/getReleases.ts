import { githubClient } from '../utils/githubClient.js';

export async function getReleases(
  {
    owner,
    repo,
  }: {
    owner: string;
    repo: string;
  }
) {
  try {
    const { octokit } = await githubClient();
    const { data } = await octokit.rest.repos.listReleases({
      owner,
      repo,
    });
    
    return data;
    
  } catch (error) {
    throw new Error(`Error while fetching releases: ${error}`);
  }
}
