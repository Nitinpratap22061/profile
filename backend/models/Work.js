import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema({
  company: String,
  role: String,
  start: String,
  end: String,
  highlights: [String]
}, { timestamps: true });

export default mongoose.model("Work", WorkSchema);
