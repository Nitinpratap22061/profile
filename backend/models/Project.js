import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  links: {
    github: String,
    demo: String
  },
  skills: [String]
}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);
