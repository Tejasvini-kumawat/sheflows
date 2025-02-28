import mongoose from 'mongoose';

const calendarEventSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  eventType: {
    type: String,
    enum: ['work', 'personal', 'family', 'self-care'],
    default: 'personal'
  },
  reminder: { type: Boolean, default: false }
}, { timestamps: true });

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);
export default CalendarEvent;
