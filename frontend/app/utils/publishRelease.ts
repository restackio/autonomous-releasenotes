import { extractOwnerAndRepo } from "./extractOwnerRepo";

export async function publishRelease(id: string, repoUrl: string) {
  const ownerAndRepo = extractOwnerAndRepo(repoUrl);

  if (!ownerAndRepo) {
    throw new Error("Invalid repository URL");
  }

  const { owner, repo } = ownerAndRepo;

  const response = await fetch(
    `http://localhost:8000/publish/${owner}/${repo}/${id}`,
    {
      method: "POST",
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
