import { Router } from "express";
import Project from "../models/Project.js";

const r = Router();

// Create a project
r.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects (with optional skill filter)
r.get("/", async (req, res) => {
  try {
    const { skill } = req.query;
    let query = {};
    if (skill) query.skills = skill;

    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get project by ID
r.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update project
r.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete project
r.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default r;
