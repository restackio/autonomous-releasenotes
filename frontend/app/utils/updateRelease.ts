export async function updateRelease(releaseId: string) {

  const response = await fetch(`http://localhost:80/release/${releaseId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update release');
  }

  const data = await response.json();
  return data;
}
  