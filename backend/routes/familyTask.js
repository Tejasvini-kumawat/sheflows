import express from "express";
import FamilyTask from "../models/FamilyTask.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new family task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { title, description, startTime, endTime, priority } = req.body;
    const task = new FamilyTask({ userEmail, title, description, startTime, endTime, priority });
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    console.error("Error creating family task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all family tasks for the user, sorted by urgency then by startTime
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const tasks = await FamilyTask.find({ userEmail }).sort({ priority: 1, startTime: 1 });
    res.json({ tasks });
  } catch (error) {
    console.error("Error fetching family tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Mark a family task as completed
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await FamilyTask.findByIdAndUpdate(taskId, { completed: true }, { new: true });
    res.json({ task: updatedTask });
  } catch (error) {
    console.error("Error updating family task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
