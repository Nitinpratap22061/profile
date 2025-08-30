import { Router } from "express";
import Profile from "../models/Profile.js";

const r = Router();

// create or update (upsert 1 profile)
r.post("/", async (req, res) => {
  const payload = req.body;
  const doc = await Profile.findOneAndUpdate({}, payload, { upsert: true, new: true, setDefaultsOnInsert: true });
  res.json(doc);
});

r.get("/", async (_req, res) => {
  const doc = await Profile.findOne({});
  res.json(doc || {});
});

export default r;
