import { githubClient } from '../utils/githubClient.js';

export async function getRepositoryPullRequests(
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
    const { data } = await octokit.rest.pulls.list({
      owner,
      repo,
      state: 'open',
      sort: 'created',
      direction: 'desc',
    });
    
    return data.map(pr => ({
      number: pr.number,
      title: pr.title,
      url: pr.html_url,
      createdAt: pr.created_at,
      updatedAt: pr.updated_at,
    }));
    
  } catch (error) {
    throw new Error(`Error while retrieving open pull requests: ${error}`);
  }
}
