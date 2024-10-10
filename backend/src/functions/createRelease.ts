import { githubClient } from '../utils/githubClient.js';

export async function createRelease(
  {
    owner,
    repo,
    tagName,
    releaseName,
    releaseBody,
    branch,
  }: {
    owner: string;
    repo: string;
    tagName: string;
    releaseName: string;
    releaseBody: string;
    branch?: string;
  }
) {
  try {
    const { octokit } = await githubClient();
    const { data } = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: tagName,
      name: releaseName,
      body: releaseBody,
      draft: true,
      prerelease: true,
      generate_release_notes: true,
      ...(branch && { target_commitish: branch }),
    });
    
    return data;
    
  } catch (error) {
    throw new Error(`Error while creating release: ${error}`);
  }
}
