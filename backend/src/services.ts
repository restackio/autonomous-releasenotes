import {
  createRelease,
  updateRelease,
  getReleases,
} from "./functions/index.js";

import { client } from "./client.js";

export async function services() {
  try {
    await Promise.all([
      client.startService({
        taskQueue: "github",
        functions: { createRelease, updateRelease, getReleases },
      }),
    ]);

    console.log("Services running successfully.");
  } catch (e) {
    console.error("Failed to run worker", e);
  }
}
