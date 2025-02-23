import express from "express";
import Task from "../models/Task.js";
import jwt from "jsonwebtoken";
import { io } from "../server.js"; // Import WebSocket instance

import { generateTaskDescription } from "../services/aiService.js";

const router = express.Router();

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Create Task
router.post("/", authenticate, async (req, res) => {
    if (!req.body.description) {
      req.body.description = await generateTaskDescription(req.body.title);
    }
    const task = await Task.create({ ...req.body, assignedTo: req.userId });
    io.emit("newTask", task);
    res.status(201).json(task);
  });

// Get Tasks
router.get("/", authenticate, async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.userId });
  res.json(tasks);
});

// Update Task
router.put("/:id", authenticate, async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTask);
});

// Delete Task
router.delete("/:id", authenticate, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

router.post("/", authenticate, async (req, res) => {
    const task = await Task.create({ ...req.body, assignedTo: req.userId });
    io.emit("newTask", task); // Notify all connected users
    res.status(201).json(task);
  });

export default router;
