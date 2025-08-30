import { Router } from "express";
import Work from "../models/Work.js";

const r = Router();

r.post("/", async (req, res) => res.json(await Work.create(req.body)));
r.get("/", async (_req, res) => res.json(await Work.find().sort({ start: -1 })));

export default r;
