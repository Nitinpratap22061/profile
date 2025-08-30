import dotenv from "dotenv";
import mongoose from "mongoose";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Work from "../models/Work.js";

dotenv.config();
mongoose.set("strictQuery", true);

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Promise.all([
      Profile.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Work.deleteMany({})
    ]);
    console.log("🧹 Cleared old collections");

    // Profile
    await Profile.create({
      name: "Nitin Pratap",
      email: "pratapnitin87@gmail.com",
      bio: "Full Stack Developer specializing in scalable web apps, ML-driven products, and modern DevOps workflows. Passionate about AI, distributed systems, and open-source contributions.",
      education: ["B.Tech CSE, IIIT Kalyani (2022–2026)"],
      links: {
        github: "https://github.com/Nitinpratap22061",
        linkedin: "https://www.linkedin.com/in/nitin-pratap-a0a555268",
        portfolio: "https://nitinpratap.vercel.app/"
      }
    });

    // Skills
    await Skill.insertMany([
      { skill_name: "JavaScript", level: "advanced", top: true },
      { skill_name: "TypeScript", level: "advanced", top: true },
      { skill_name: "React", level: "advanced", top: true },
      { skill_name: "Next.js", level: "advanced", top: true },
      { skill_name: "Node.js", level: "advanced", top: true },
      { skill_name: "Express", level: "advanced" },
      { skill_name: "MongoDB", level: "intermediate", top: true },
      { skill_name: "PostgreSQL", level: "intermediate" },
      { skill_name: "Redis", level: "intermediate" },
      { skill_name: "Kafka", level: "intermediate" },
      { skill_name: "Python", level: "intermediate", top: true },
      { skill_name: "FastAPI", level: "intermediate" },
      { skill_name: "Docker", level: "intermediate" },
      { skill_name: "Kubernetes", level: "intermediate" },
      { skill_name: "AWS", level: "intermediate" },
      { skill_name: "Azure", level: "beginner" },
      { skill_name: "LangChain", level: "intermediate" },
      { skill_name: "Weaviate", level: "intermediate" },
      { skill_name: "LLMs", level: "intermediate" },
      { skill_name: "Tailwind CSS", level: "advanced" },
      { skill_name: "CI/CD", level: "intermediate" },
      { skill_name: "Jest", level: "intermediate" },
      { skill_name: "Cypress", level: "beginner" },
    ]);

    // Projects
    await Project.insertMany([
      {
        title: "AI-Powered PDF Chatbot",
        description: "Chat with PDFs using LangChain, Groq, and Pinecone. Built RAG pipelines and custom embeddings.",
        technologies: ["Python", "LangChain", "Pinecone", "Groq", "FastAPI"],
        github: "https://github.com/nitinpratap/pdf-chat",
        demo: "https://pdfchat.nitinpratap.dev"
      },
      {
        title: "Portfolio Website",
        description: "Modern, responsive portfolio built with React, Vite, and TailwindCSS.",
        technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
        github: "https://github.com/nitinpratap/portfolio",
        demo: "https://nitinpratap.dev"
      },
      {
        title: "Realtime Chat App",
        description: "Realtime chat app with JWT authentication, WebSocket messaging, and group chat features.",
        technologies: ["Node.js", "Express", "Socket.io", "MongoDB", "JWT"],
        github: "https://github.com/nitinpratap/chat-app"
      },
      {
        title: "Task Management API",
        description: "REST API with PostgreSQL, Prisma, and role-based authentication. Supports GraphQL as well.",
        technologies: ["Node.js", "Express", "PostgreSQL", "Prisma"],
        github: "https://github.com/nitinpratap/task-api"
      },
      {
        title: "Blog CMS",
        description: "Markdown-based blogging platform with custom admin dashboard and server-side rendering.",
        technologies: ["Next.js", "MongoDB", "Tailwind CSS"],
        github: "https://github.com/nitinpratap/blog-cms"
      },
      {
        title: "E-commerce Platform",
        description: "Full-stack ecommerce app with Stripe integration, product search, and order management.",
        technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind"],
        github: "https://github.com/nitinpratap/ecommerce"
      },
      {
        title: "DevOps Pipeline Automation",
        description: "CI/CD pipeline automation for microservices using GitHub Actions, Docker, and Kubernetes.",
        technologies: ["Docker", "Kubernetes", "GitHub Actions", "Node.js"],
        github: "https://github.com/nitinpratap/devops-pipeline"
      },
      {
        title: "AI SaaS Starter Kit",
        description: "Boilerplate SaaS platform with Stripe billing, Next.js API routes, and AI integrations.",
        technologies: ["Next.js", "Stripe", "OpenAI API", "PostgreSQL"],
        github: "https://github.com/nitinpratap/ai-saas-kit"
      },
      {
    title: "Personal Portfolio Backend",
    description: "Backend service for managing portfolio data (projects, skills, work experience) using Express and MongoDB.",
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose"],
    github: "https://github.com/Nitinpratap22061/personal_preview"
    },
    ]);

    // Work Experience
    await Work.insertMany([
      {
        company: "Predusk (Intern)",
        role: "AI/ML Intern",
        start: "2025-06",
        end: "2025-08",
        highlights: [
          "Built a scalable RAG-based document search system",
          "Optimized LLM evaluation workflows, cutting inference time by 30%",
          "Implemented semantic search using vector databases"
        ]
      },
      {
        company: "Open Source Contributions",
        role: "Contributor",
        start: "2024-01",
        end: "Present",
        highlights: [
          "Contributed to LangChain core repository and ecosystem tools",
          "Built Next.js plugins for static site generation",
          "Maintained CI/CD workflows for open-source libraries"
        ]
      },
      {
        company: "Freelance Developer",
        role: "Full Stack Developer",
        start: "2023-04",
        end: "Present",
        highlights: [
          "Delivered 10+ full-stack web apps for startups and SMEs",
          "Set up automated CI/CD pipelines reducing deployment friction by 50%",
          "Built ML-powered chatbots for ecommerce clients"
        ]
      },
      {
        company: "IIIT Kalyani Research",
        role: "Student Researcher",
        start: "2024-07",
        end: "2025-05",
        highlights: [
          "Worked on NLP tasks for Hindi-English translation models",
          "Implemented low-latency serving for LLM fine-tuning"
        ]
      }
    ]);

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔒 Database connection closed.");
  }
}

run();
