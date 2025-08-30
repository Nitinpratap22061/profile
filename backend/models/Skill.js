import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    skill_name: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    top: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", SkillSchema);
