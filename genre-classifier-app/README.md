# Genre Classifier App

This project is the frontend part of the music genre classifier. It's a simple web app that uses the [genre classifier API](../genre-classifier-api/) to determine the genre of a 30 second clip song. It was developed with ReactJS + Vite.

## Tech Stack

- **ReactJS:** main JavaScript library used to build the frontend
- **Vite:** build tool used to bundle the frontend

## Running the project locally

### Prerequisites

- [Firebase Project](https://firebase.google.com/) with the storage service enabled. A web app must be created and the config must be added to the `.env` file. You can follow these [instructions](https://firebase.google.com/docs/web/setup?authuser=0&hl=en#add-sdk-and-initialize).
- [Node.js](https://nodejs.org/en/) installed and the `node` and `npm` commands available in the terminal
- The [genre classifier API](../genre-classifier-api/) must be already running locally. Check the running locally section of the project for more information.

### Running the project in dev mode

1. Copy the `.env.example` file and rename it to `.env`.

```bash
cp .env.example .env
```

Replace the variables with the values of your Firebase project.

2. Install the dependencies:

```bash
npm install
```

3. Run the project in development mode:

```bash
npm run dev
```

The project will be running at http://localhost:3000. A new browser tab will be opened automatically.
