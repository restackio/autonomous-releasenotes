export function extractOwnerAndRepo(gitUrl: string): { owner: string; repo: string } | null {
  let normalizedGitUrl = '';

  if (gitUrl.endsWith('/')) {
    normalizedGitUrl = `${gitUrl.slice(0, -1)}.git`;
  } else {
    normalizedGitUrl = gitUrl.endsWith('.git') ? gitUrl : `${gitUrl}.git`;
  }

  const httpsMatch = normalizedGitUrl.match(/https:\/\/github.com\/([^/]+)\/([^/]+)\.git/);
  const sshMatch = normalizedGitUrl.match(/git@github.com:([^/]+)\/([^/]+)\.git/);

  if (httpsMatch) {
    return {
      owner: httpsMatch[1],
      repo: httpsMatch[2],
    };
  }
  if (sshMatch) {
    return {
      owner: sshMatch[1],
      repo: sshMatch[2],
    };
  }

  return null;
}
