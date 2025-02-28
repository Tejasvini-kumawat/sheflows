// src/routes/selfcare.js
import express from 'express';
import SelfCare from '../models/SelfCare.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new self-care/hobby activity
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email;
    // Expecting startTime and endTime from the request body
    const { type, title, description, startTime, endTime } = req.body;
    const activity = new SelfCare({ userEmail, type, title, description, startTime, endTime });
    await activity.save();
    res.status(201).json({ activity });
  } catch (error) {
    console.error("Error creating self-care activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get self-care activities for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const activities = await SelfCare.find({ userEmail }).sort({ startTime: 1 });
    res.json({ activities });
  } catch (error) {
    console.error("Error fetching self-care activities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update (PUT) a self-care activity by ID (for marking complete or any update)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const activityId = req.params.id;
    // Use req.body for the fields to update (e.g., { completed: true })
    const updatedActivity = await SelfCare.findByIdAndUpdate(activityId, req.body, { new: true });
    if (!updatedActivity) {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.json({ activity: updatedActivity });
  } catch (error) {
    console.error("Error updating self-care activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
