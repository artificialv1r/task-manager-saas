// src/controllers/task.js
const taskModel = require("../models/task");

const createTask = async (req, res) => {
  const { title, description, list_id, position } = req.body;

  try {
    const newTask = await taskModel.create(
      title,
      description,
      list_id,
      position
    );
    res.json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.findAll();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
};
