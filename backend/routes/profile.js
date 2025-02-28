// src/routes/profile.js
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Profile from "../models/Profile.js";
import authMiddleware from "../middleware/authMiddleware.js";

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

// Use memory storage so the file is kept in memory for Cloudinary upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET /api/profile – fetch the user's profile from the database
router.get("/", authMiddleware, async (req, res) => {
  try {
    // req.user is set by authMiddleware (contains email from token)
    const profile = await Profile.findOne({ email: req.user.email });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/profile – update or create a profile document
router.put("/", upload.single("profileImage"), authMiddleware, async (req, res) => {
  const { name, email, bio, age, mobile, profession, dateOfBirth } = req.body;
  let profileImageUrl = req.body.profileImage || "";
  
  // If a file is uploaded, use Cloudinary to store the image
  if (req.file) {
    try {
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "profile_images" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(fileBuffer);
        });
      };

      const result = await streamUpload(req.file.buffer);
      profileImageUrl = result.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).json({ error: "Image upload failed" });
    }
  }

  try {
    // Update (or create) the profile document using email as identifier
    const updatedProfile = await Profile.findOneAndUpdate(
      { email },
      { name, email, bio, profileImage: profileImageUrl, age, mobile, profession, dateOfBirth },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: "Profile updated", profile: updatedProfile });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
