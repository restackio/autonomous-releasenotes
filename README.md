# Pull Request Analyzer Backend

This folder contains an Express server implemented in TypeScript that showcases the usage of the Restack AI SDK with GitHub integration.

## Overview

The backend server is designed to analyze pull requests from GitHub repositories using the Restack AI SDK. It provides an API endpoint that accepts GitHub repository URLs and pull request numbers, processes the data, and returns insightful analysis results.

## Features

- Express server setup with TypeScript
- GitHub integration for fetching pull request data
- Restack AI SDK implementation for pull request analysis
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

- `POST /analyze-pr`
  - Request body:
    ```json
    {
      "repoUrl": "https://github.com/username/repo",
      "prNumber": 123
    }
    ```
  - Response: Analysis results from the Restack AI SDK

## Docker Support

A Dockerfile is provided for containerization.
