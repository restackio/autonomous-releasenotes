# Create repository releases

This folder contains an Express server implemented in TypeScript that showcases the usage of the Restack AI SDK with GitHub integration.

## Overview

The backend server is designed to create releases on a provided GitHub repository using the Restack AI SDK. It provides an API endpoint that accepts the necessary data to create a release: tagname, repository url, release name and release description.

Once the express server is booted the workflow `handleReleaseWorkflow` will be started as well. It will keep running and listening to events to either create or publish a release on github. This is to showcase how workflows can keep running for an indefinite time and as well how to define, handle and send events using the restack ai sdk.

## Features

- Express server setup with TypeScript
- GitHub integration for creating releases
- Environment variable configuration for secure token management
- A long running workflow that will listen to events to either: create or publish a release on provided github repository

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root of the backend folder and add your GitHub authentication token:

   ```
   GITHUB_AUTH_TOKEN=your_github_token_here
   ```

3. Build the TypeScript code:

   ```
   npm run build
   ```

4. Start Restack AI:

   ```
   docker run -d --pull always --name studio -p 5233:5233 -p 6233:6233 -p 7233:7233 ghcr.io/restackio/engine:main
   ```

5. Start the server:
   ```
   npm start
   ```

## API Endpoints

### `POST /release`

- **Request body:**
  ```json
  {
    "owner": "username",
    "repo": "repo",
    "tagName": "v1.0.0",
    "releaseName": "Release 1.0.0",
    "releaseBody": "Description of the release"
  }
  ```
- **Response:** JSON object with a message confirming successful release creation.

### `PUT /publish/:owner/:repo/:id`

- **Path parameters:**
  - `owner`: GitHub username or organization name.
  - `repo`: Repository name.
  - `id`: Release ID to be published.
- **Response:** JSON object with a message confirming successful release publication.

### `GET /releases/:owner/:repo`

- **Path parameters:**
  - `owner`: GitHub username or organization name.
  - `repo`: Repository name.
- **Response:** JSON object containing a list of releases for the specified repository.

## Docker Support

A Dockerfile is provided for containerization.
