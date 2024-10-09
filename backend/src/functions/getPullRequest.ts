import { githubClient } from '../utils/githubClient.js';

export async function getPullRequest(
  {
    owner,
    repo,
    pull_number, // Changed from title to pull_number
  }: {
    owner: string;
    repo: string;
    pull_number: number; // Updated type to number
  }
) {
  try {
    const { octokit } = await githubClient();
    const { data } = await octokit.rest.pulls.get({ // Changed to get method
      owner,
      repo,
      pull_number, // Use pull_number to fetch the specific pull request
    });
    
    return {
      pullRequestUrl: data.html_url,
      pullRequestNumber: data.number,
      diff: data.diff_url,
    };
  } catch (error) {
    throw new Error(`Error while retrieving pull request: ${error}`); // Updated error message
  }
}
