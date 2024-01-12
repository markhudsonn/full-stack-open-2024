# Phonebook Backend

This project is the backend part of the Phonebook application. It handles API requests and serves the built frontend files.

See the [live demo](https://fso-2024-phonebook-backend.fly.dev/) of the application.

## Getting Started

To get the backend running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` to start the local server

## Building the Frontend

To build the frontend for production use:

- `npm run build:ui` to build the frontend
- `npm run deploy:full` to build the frontend and deploy the full application
- `npm run deploy` to deploy the application

## Fly Deployment

To deploy the application:

- Ensure you have the `fly` CLI installed
- Run `npm run deploy` to deploy to Fly.io
