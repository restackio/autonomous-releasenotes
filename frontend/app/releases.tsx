import { useEffect, useState } from 'react';

import { getReleases } from './utils/getReleases';

export async function Releases() {
  const [releases, setReleases] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getGithubReleases = async () => {
      try {
        const releases = await getReleases('https://github.com/restackio/cloud-sdk-ts');
        setReleases(releases);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
   void getGithubReleases()
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Releases</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {releases.map((release) => (
          <div key={release.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">{release.name}</h2>
            <p className="text-sm text-gray-600">Tag: {release.tag_name}</p>
            <p className="text-sm text-gray-600 mt-2">
              Published: {new Date(release.published_at).toLocaleDateString()}
            </p>
            <a
              href={release.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              View Release
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
