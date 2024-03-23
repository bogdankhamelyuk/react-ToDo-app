const mongoose = require("mongoose");

// Define the schema for tasks
const taskSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  doneTasks: {
    type: [String],
    required: true,
  },
  allTasks: {
    type: [String],
    required: true,
  },
});

// Create a model using the schema
const UserData = mongoose.model("UserData", taskSchema);

module.exports = UserData;
