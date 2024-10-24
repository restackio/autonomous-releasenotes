## Overview

This repository showcases how to use the Restack AI SDK to call workflows and send events. The backend is implemented using a simple Express server, and the frontend is a Next.js application.

## Integration with Backend

This frontend application integrates with a backend Express server located at `/backend`. Which exposes a webhook POST endpoint that you can set on your github repository.
This way the server will get a request from github every time a commit is pushed on the repository.

- Create releases when github event comes in after a push.
- List all releases from a provided git repository on the UI

## Additional Resources

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## Backend Flow

![graphic](https://github.com/user-attachments/assets/5ec5b722-cc5c-4b1f-8fc6-ffa07b4e142a)
