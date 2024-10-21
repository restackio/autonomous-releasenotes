"use client";

import React, { useState } from "react";
import { Releases } from "./releases";
import { getReleases } from "./utils/releases";

export default function Home() {
  const [gitUrl, setGitUrl] = useState("");
  const [releases, setReleases] = useState([]);

  const getGithubReleases = async () => {
    const releases = await getReleases(gitUrl);
    setReleases(releases);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 text-black dark:text-white">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-2xl font-bold mb-4">Create Github Release</h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="GitHub Repository URL"
              className="border rounded p-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
              required
              onChange={(e) => setGitUrl(e.target.value)}
              name="repoUrl"
            />
          </div>
        </div>
        <button
          type="button"
          className="bg-green-500 text-white rounded p-2 mt-2"
          disabled={!gitUrl}
          onClick={() => getGithubReleases()}
        >
          Get Releases
        </button>
        {releases.length > 0 && (
          <Releases releases={releases} gitUrl={gitUrl} />
        )}
      </main>
    </div>
  );
}
