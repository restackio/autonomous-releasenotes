import { publishRelease } from "./utils/releases";

type Release = {
  id: string;
  name: string;
  draft: boolean;
  tag_name: string;
  published_at: string;
  html_url: string;
};

export function Releases({
  releases,
  gitUrl,
}: {
  releases: Release[];
  gitUrl: string;
}) {
  return (
    <div>
      <h1>Current Releases</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {releases.map((release: Release) => (
          <div key={release.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">{release.name}</h2>
            <h2 className="text-lg font-semibold mb-2">
              {release.draft ? "Draft" : "Published"}
            </h2>
            <p className="text-sm text-gray-600">
              <strong>Tag:</strong> {release.tag_name}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Published:</strong>{" "}
              {new Date(release.published_at).toLocaleDateString()}
            </p>
            <a
              href={release.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              View Release
            </a>
            {release.draft && (
              <button
                onClick={() => publishRelease(release.id, gitUrl)}
                className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Publish Release
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
