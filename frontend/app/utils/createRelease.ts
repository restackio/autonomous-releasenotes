import { extractOwnerAndRepo } from './extractOwnerRepo';

export async function createRelease({
  tagName,  
  releaseName,
  releaseBody,
  repoUrl,
}: {
  tagName: string;
  releaseName: string;
  releaseBody: string;
  repoUrl: string;
}) {
  const ownerAndRepo = extractOwnerAndRepo(repoUrl);

  if (!ownerAndRepo) {
    throw new Error('Invalid repository URL');
  }

  const { owner, repo } = ownerAndRepo;

  const response = await fetch('http://localhost:80/release', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tagName, releaseName, releaseBody, owner, repo }),
  });

  if (!response.ok) {
    throw new Error('Failed to create release');
  }

  const data = await response.json();
  return data;
}
  