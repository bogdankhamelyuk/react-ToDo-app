const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/api/firebase-config", (req, res) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "react-todo-app-6b71a.firebaseapp.com",
    projectId: "react-todo-app-6b71a",
    storageBucket: "react-todo-app-6b71a.appspot.com",
    databaseURL: "https://react-todo-app-6b71a-default-rtdb.europe-west1.firebasedatabase.app",
    messagingSenderId: "640442615541",
    appId: process.env.FIREBASE_API_ID,
  };
  res.json(firebaseConfig);
});

module.exports.handler = serverless(app);
