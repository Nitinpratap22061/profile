import { Router } from "express";
import Skill from "../models/Skill.js";

const router = Router();

// Add a new skill
router.post("/", async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all skills
router.get("/", async (_req, res) => {
  try {
    const skills = await Skill.find().sort({ top: -1, skill_name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get only top skills
router.get("/top", async (_req, res) => {
  try {
    const skills = await Skill.find({ top: true }).sort({ skill_name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete skill
router.delete("/:id", async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
