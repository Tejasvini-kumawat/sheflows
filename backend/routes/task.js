// src/routes/task.js
import express from 'express';
import Task from '../models/Task.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new work task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { title, description, startTime, endTime, priority } = req.body;
    const task = new Task({ userEmail, title, description, startTime, endTime, priority });
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all work tasks for the user, sorted by urgency then start time
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const tasks = await Task.find({ userEmail }).sort({ priority: 1, startTime: 1 });
    res.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Mark a task as completed
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.id;
    const updateData = { completed: req.body.completed };
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
    res.json({ task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
