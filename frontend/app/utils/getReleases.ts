import { extractOwnerAndRepo } from "./extractOwnerRepo";

export async function getReleases(repoUrl: string) {
  const ownerAndRepo = extractOwnerAndRepo(repoUrl);

  if (!ownerAndRepo) {
    throw new Error("Invalid repository URL");
  }

  const { owner, repo } = ownerAndRepo;

  const response = await fetch(
    `http://localhost:80/releases/${owner}/${repo}`,
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
  return data;
}
