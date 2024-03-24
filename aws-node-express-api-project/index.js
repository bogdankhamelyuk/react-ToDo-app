const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const UserData = require("./task.model");

const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

const uri =
  "mongodb+srv://bogdankhamelyuk:dnn5lrOBgjyViZ8B@to-do-app.q39vhog.mongodb.net/?retryWrites=true&w=majority&appName=to-do-app";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", async (req, res, next) => {});

app.get("/api/firebase-config", (req, res) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "react-todo-app-6b71a.firebaseapp.com",
    projectId: "react-todo-app-6b71a",
    storageBucket: "react-todo-app-6b71a.appspot.com",
    messagingSenderId: "640442615541",
    appId: process.env.FIREBASE_API_ID,
  };
  res.json(firebaseConfig);
});

app.post("/api/get-data", async (req, res) => {
  try {
    const { uid } = req.body;
    const existingUser = await UserData.findOne({ uid });
    if (!existingUser) {
      // If the document does not exist, create a new one
      const newUserData = new UserData({
        uid,
        doneTasks: [],
        allTasks: [],
      });
      existingUser = await newUserData.save();
    }
    // Return doneTasks and allTasks back to the front end
    res.json({
      doneTasks: existingUser.doneTasks,
      allTasks: existingUser.allTasks,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/update-data", async (req, res) => {
  try {
    const { uid, doneTasks, allTasks } = req.body;
    const existingUser = await UserData.findOne({ uid });
    existingUser.doneTasks = doneTasks;
    existingUser.allTasks = allTasks;
    const updatedTask = await existingUser.save();
    res.json(updatedTask);
  } catch (error) {
    // Handle errors
    console.error("Error updating/creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports.handler = serverless(app);
// app.listen(3000, () => {
//   console.log("app is running rn");
// });
