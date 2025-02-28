// src/models/Profile.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    bio: { 
      type: String, 
      default: "" 
    },
    profileImage: { 
      type: String, 
      default: "" 
    },
    age: { 
      type: Number 
    },
    mobile: { 
      type: String 
    },
    profession: { 
      type: String 
    },
    dateOfBirth: { 
      type: Date 
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
