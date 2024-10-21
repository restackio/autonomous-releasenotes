export function extractOwnerAndRepo(
  gitUrl: string
): { owner: string; repo: string } | null {
  let normalizedGitUrl = "";

  if (gitUrl.endsWith("/")) {
    normalizedGitUrl = `${gitUrl.slice(0, -1)}.git`;
  } else {
    normalizedGitUrl = gitUrl.endsWith(".git") ? gitUrl : `${gitUrl}.git`;
  }

  const httpsMatch = normalizedGitUrl.match(
    /https:\/\/github.com\/([^/]+)\/([^/]+)\.git/
  );
  const sshMatch = normalizedGitUrl.match(
    /git@github.com:([^/]+)\/([^/]+)\.git/
  );

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

export async function getReleases(repoUrl: string) {
  const ownerAndRepo = extractOwnerAndRepo(repoUrl);

  if (!ownerAndRepo) {
    throw new Error("Invalid repository URL");
  }

  const { owner, repo } = ownerAndRepo;

  const response = await fetch(
    `http://localhost:8000/releases/${owner}/${repo}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get releases");
  }

  const data = await response.json();

  return data.releases;
}

export async function publishRelease(id: string, repoUrl: string) {
  const ownerAndRepo = extractOwnerAndRepo(repoUrl);

  if (!ownerAndRepo) {
    throw new Error("Invalid repository URL");
  }

  const { owner, repo } = ownerAndRepo;

  const response = await fetch(
    `http://localhost:8000/publish/${owner}/${repo}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create release");
  }

  const data = await response.json();
  return data;
}
