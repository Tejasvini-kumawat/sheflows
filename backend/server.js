// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contact.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import calendarRoutes from "./routes/calendar.js";
import taskRoutes from "./routes/task.js";
import familyRoutes from "./routes/familyTask.js";
import selfcareRoutes from "./routes/selfcare.js";
import chatbotRoutes from "./routes/chatbot.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cors({ origin: ["http://localhost:5173", "https://sheflows-backend.vercel.app/"], credentials: true }));

// Connect to MongoDB Atlas
connectDB();

app.get("/", (req, res) => {
  res.send("✅ SheFlows backend is running.");
});

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/profile", profileRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/familyTask", familyRoutes);
app.use("/api/selfcare", selfcareRoutes);
app.use("/api/chat", chatbotRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
