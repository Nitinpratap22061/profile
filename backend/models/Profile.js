import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  portfolio: String
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  bio: String,
  education: [String],
  links: LinkSchema
}, { timestamps: true });

export default mongoose.model("Profile", ProfileSchema);
