export async function updateRelease(releaseId: number) {
  const response = await fetch(`http://localhost:8000/release/${releaseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update release");
  }

  const data = await response.json();
  return data;
}
