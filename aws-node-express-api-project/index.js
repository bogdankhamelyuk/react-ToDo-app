const serverless = require("serverless-http");
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

const uri = `mongodb+srv://bogdankhamelyuk:${process.env.MONGO_PWD}@serverlessinstance0.mljmsy6.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Define schema
const taskSchema = new mongoose.Schema({
  uid: String,
  tasks: [String],
  selectedTasks: [String],
});
const Task = mongoose.model("Task", taskSchema);

app.post("/api/tasks", async (req, res) => {
  const { uid, tasks, selectedTasks } = req.body;
  try {
    const existingUser = await Task.findOne({ uid: uid });
    if (existingUser) {
      // If the user exists, update their data
      existingUser.tasks = tasks;
      existingUser.selectedTasks = selectedTasks;
      await existingUser.save();
      res.status(200).json({ message: "User data updated successfully" });
    } else {
      // If the user doesn't exist, create a new user document
      const newUser = new Task({ uid, tasks, selectedTasks });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
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

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

module.exports.handler = serverless(app);
