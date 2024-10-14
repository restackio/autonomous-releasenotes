"use client";

import React, { useState } from "react";
import { createRelease } from "./utils/createRelease";
import { Releases } from "./releases";
import { getReleases } from "./utils/getReleases";

export default function Home() {
  const [gitUrl, setGitUrl] = useState("");
  const [releases, setReleases] = useState([]);

  const getGithubReleases = async () => {
    const releases = await getReleases(gitUrl);
    setReleases(releases);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tagName = formData.get("tagName") as string;
    const releaseName = formData.get("releaseName") as string;
    const releaseBody = formData.get("releaseBody") as string;
    const repoUrl = formData.get("repoUrl") as string;

    await createRelease({
      tagName,
      releaseName,
      releaseBody,
      repoUrl,
    });

    await getGithubReleases();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-2xl font-bold mb-4">Create Github Release</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="GitHub Repository URL"
                className="border rounded p-2 w-full"
                required
                onChange={(e) => setGitUrl(e.target.value)}
                name="repoUrl"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Release name"
                className="border rounded p-2 w-full"
                required
                name="releaseName"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="v1.0.0"
                className="border rounded p-2 w-full"
                required
                name="tagName"
              />
            </div>
            <div>
              <textarea
                placeholder="Description"
                className="border rounded p-2 w-full"
                required
                name="releaseBody"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2"
            disabled={!gitUrl}
          >
            Create Release
          </button>
          <button
            type="button"
            className="bg-green-500 text-white rounded p-2 mt-2"
            disabled={!gitUrl}
            onClick={() => getGithubReleases()}
          >
            Get Releases
          </button>
        </form>
        {releases.length > 0 && (
          <Releases releases={releases} gitUrl={gitUrl} />
        )}
      </main>
    </div>
  );
}
