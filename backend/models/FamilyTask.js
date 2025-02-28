import mongoose from 'mongoose';

const familyTaskSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number }, // in hours
  priority: { type: Number, required: true, default: 2 }, // 1 = High, 2 = Medium, 3 = Low
  completed: { type: Boolean, default: false }
}, { timestamps: true });

familyTaskSchema.pre('save', function(next) {
  if (this.startTime && this.endTime && this.endTime > this.startTime) {
    const diffMs = this.endTime - this.startTime;
    this.duration = diffMs / (1000 * 60 * 60);
  }
  next();
});

familyTaskSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.startTime && update.endTime && new Date(update.endTime) > new Date(update.startTime)) {
    const diffMs = new Date(update.endTime) - new Date(update.startTime);
    update.duration = diffMs / (1000 * 60 * 60);
    this.setUpdate(update);
  }
  next();
});

const FamilyTask = mongoose.model('FamilyTask', familyTaskSchema);
export default FamilyTask;
