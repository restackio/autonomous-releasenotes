# Pull Request Analyzer Backend

This folder contains an Express server implemented in TypeScript that showcases the usage of the Restack AI SDK with GitHub integration.

## Overview

The backend server is designed to create releases on a provided GitHub repository using the Restack AI SDK. It provides an API endpoint that accepts the necessary data to create a release: tagname, repository url, release name and release description

## Features

- Express server setup with TypeScript
- GitHub integration for creating releases
- Environment variable configuration for secure token management

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

4. Start the server:
   ```
   npm start
   ```

## API Endpoint

- `POST /release`
  - Request body:
    ```json
    {
      "owner": "username",
      "repo": "repo",
      "tagName": "v1.0.0",
      "releaseName": "Release 1.0.0",
      "releaseBody": "Description of the release",
    }
    ```
  - Response: JSON object with a message confirming successful release creation

## Docker Support

A Dockerfile is provided for containerization.
