import express from 'express';
import CalendarEvent from '../models/CalendarEvent.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create new calendar event
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { title, description, startTime, endTime, eventType, reminder } = req.body;
    const event = new CalendarEvent({ userEmail, title, description, startTime, endTime, eventType, reminder });
    await event.save();
    res.status(201).json({ event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all calendar events for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const events = await CalendarEvent.find({ userEmail }).sort({ startTime: 1 });
    res.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
