# initiate-mern

![npm version](https://img.shields.io/npm/v/initiate-mern-cli?color=blue)  
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Simple MERN scaffolder to quickly bootstrap a full-stack MongoDB, Express, React, and Node.js project.

## Features

- Generates a ready-to-run MERN stack project
- Backend: Express, MongoDB (Mongoose), CORS, dotenv, cookie-parser, method-override
- Frontend: React (Vite), React Router, Axios
- Sample API route and page integration
- Environment variable templates for both backend and frontend

## Getting Started

### 1. Install

Clone this repository and install dependencies:

```sh
npm install
```

Or install globally from npm (after publishing):

```sh
npm install -g initiate-mern-cli
```

### 2. Usage

Run the CLI to scaffold a new MERN project:

```sh
npx initiate-mern
```

You will be prompted for:
- Project name
- MongoDB database name
- Backend port
- Frontend port

A new folder with your project will be created.

### 3. Running the Project

#### Backend

```sh
cd <your-project-name>/backend
npm run dev
```

#### Frontend

```sh
cd <your-project-name>/frontend
npm run dev
```

### 4. Environment Variables

- Copy `.env.example` to `.env` in both `backend` and `frontend/src` folders and adjust as needed.

## Project Structure

```
backend/
  .env.example
  server.js
  config/
    db.js
  controllers/
    sampleController.js
  middlewares/
    errorHandler.js
  public/
    index.html
  routes/
    index.js
frontend/
  src/
    .env.example
    App.jsx
    main.jsx
    pages/
      AboutPage.jsx
      HomePage.jsx
    services/
      api.js
```

## License

This project is licensed under the [MIT License](./LICENSE).
