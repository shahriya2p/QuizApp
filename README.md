# Quiz App Setup

## Backend

Quiz App requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd backend
npm i
npm run dev
```

Create `backend/config/dev.env` for environment variable and paste the following code snippet.

```sh
PORT=<LOCAL PORT>
DB_URL=<MONGO DB URL>
```

## Frontend React Native Mobile App

Make sure You have Correct React Native Environment following [React Native](https://reactnative.dev/docs/environment-setup) to run App.

Install the dependencies start the server.

```sh

cd frontendMobileApp

yarn install

yarn pod-install

yarn start

```

Run Following command in other terminal to run IOS Application

```sh
yarn ios
```

Run Following command in other terminal to run Android application but make sure android emulator is on

```sh
yarn android
```

## Frontend React Web App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Make sure you correct environment to run this app.

Install the dependencies start the server.

```sh

cd frontendWebApp
npm i
npm start

```

Run Following command for build web app for production to the `build` folder.

```sh
npm run build
```
