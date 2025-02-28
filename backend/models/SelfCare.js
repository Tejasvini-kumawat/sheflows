// src/models/SelfCare.js
import mongoose from 'mongoose';

const selfCareSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'hobby', 'fitness', 'mental health'
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },  // starting timestamp (required)
  endTime: { type: Date, required: true },      // ending timestamp (required)
  duration: { type: Number },                   // in hours (computed)
  completed: { type: Boolean, default: false }
}, { timestamps: true });

// Pre-save hook to calculate duration
selfCareSchema.pre('save', function(next) {
  if (this.startTime && this.endTime && this.endTime > this.startTime) {
    const diffMs = this.endTime - this.startTime;
    this.duration = diffMs / (1000 * 60 * 60);
  }
  next();
});

// Pre-findOneAndUpdate hook to update duration on modifications
selfCareSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.startTime && update.endTime && new Date(update.endTime) > new Date(update.startTime)) {
    const diffMs = new Date(update.endTime) - new Date(update.startTime);
    update.duration = diffMs / (1000 * 60 * 60);
    this.setUpdate(update);
  }
  next();
});

const SelfCare = mongoose.model('SelfCare', selfCareSchema);
export default SelfCare;
