import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import profileRoutes from "../routes/profileRoutes.js";
import projectRoutes from "../routes/projectRoutes.js";
import skillRoutes from "../routes/skillRoutes.js";
import workRoutes from "../routes/workRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/health", (_req, res) =>
  res.json({ ok: true, ts: new Date().toISOString() })
);

app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/work", workRoutes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 API running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1);
  }
};

start();
