# 🚀 Full-Stack Portfolio (MERN + Vite + Tailwind)

![Portfolio Screenshot](https://ibb.co/8DkD16cv,https://ibb.co/VhCtXFG)

🔗 **Live Demo:** [https://profile-lilac-chi.vercel.app/](https://profile-lilac-chi.vercel.app/)  
🔗 **Backend API:** [https://profile-1pok.onrender.com/](https://profile-1pok.onrender.com/)

---

## 📌 Overview

This is a **full-stack portfolio application** built with:

- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Frontend:** React (Vite), TailwindCSS, Shadcn/UI  
- **Deployment:** Render (Backend) + Vercel (Frontend)  

The app lets you manage and showcase your **Profile, Projects, Skills, and Work Experience** dynamically.

---

## ✨ Features

- 📄 Manage **Profile** (name, email, bio, education, social links)  
- 💻 CRUD for **Projects** (title, description, technologies, GitHub/demo links)  
- 🛠️ **Skills** with levels & top-skill filtering  
- 💼 Showcase **Work Experience** (company, role, highlights)  
- 🔍 Search projects by **Skills, Name, Description, or Technologies**  
- 🌐 Built-in **API Client** to test backend endpoints from the frontend  

---

## 🏗 Project Structure

```
backend/
 ┣ models/
 ┃ ┣ Profile.js
 ┃ ┣ Project.js
 ┃ ┣ Skill.js
 ┃ ┗ Work.js
 ┣ routes/
 ┃ ┣ profileRoutes.js
 ┃ ┣ projectRoutes.js
 ┃ ┣ skillRoutes.js
 ┃ ┗ workRoutes.js
 ┣ src/
 ┃ ┣ server.js
 ┃ ┗ seed.js

frontend/
 ┣ src/components/
 ┃ ┣ Portfolio.jsx   # Portfolio UI
 ┃ ┗ ApiClient.jsx   # API testing tool
```

---

## ⚙️ Setup (Local)

### 🔹 Backend
```bash
# Clone repo & navigate to backend
npm install

# Create .env file
MONGO_URI=your_mongo_connection
PORT=5000

# Seed data (optional)
node src/seed.js

# Run server
npm run dev
```

### 🔹 Frontend
```bash
# Navigate to frontend
npm install

# Update API base in components (Portfolio.jsx, ApiClient.jsx)
const API_BASE = "http://localhost:5000/api";

# Run dev server
npm run dev
```

---

## 📡 API Endpoints

### Health (`/api/health`)
- `GET /` → Health check → `{ "status": "OK" }`

### Profile (`/api/profile`)
- `GET /` → Fetch profile  
- `POST /` → Create/Update profile  

### Projects (`/api/projects`)
- `GET /` → Get all projects (optional `?skill=` filter)  
- `POST /` → Create project  
- `GET /:id` → Get project by ID  
- `PUT /:id` → Update project  
- `DELETE /:id` → Delete project  

### Skills (`/api/skills`)
- `GET /` → Get all skills  
- `GET /top` → Get top skills  
- `POST /` → Add skill  
- `DELETE /:id` → Delete skill  

### Work (`/api/work`)
- `GET /` → Get work experiences  
- `POST /` → Add work  

---

## 🧪 Postman Testing

To easily test the backend APIs, import the Postman collection:

📥 [Download Portfolio API Postman Collection](./portfolio_api.postman_collection.json)

### Example Requests

**Profile**  
```http
GET {{base_url}}/api/profile
POST {{base_url}}/api/profile
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "Full-stack developer"
}
```

**Projects**  
```http
GET {{base_url}}/api/projects
POST {{base_url}}/api/projects
Content-Type: application/json

{
  "title": "Portfolio Website",
  "description": "Personal website built with MERN stack",
  "technologies": ["React", "Node.js", "MongoDB"],
  "github": "https://github.com/your-repo",
  "demo": "https://your-demo-link.com"
}
```

**Skills**  
```http
GET {{base_url}}/api/skills
POST {{base_url}}/api/skills
Content-Type: application/json

{
  "skill_name": "React",
  "level": "Advanced",
  "top": true
}
```

**Work**  
```http
GET {{base_url}}/api/work
POST {{base_url}}/api/work
Content-Type: application/json

{
  "company": "Tech Corp",
  "role": "Software Engineer",
  "start": "2021-01-01",
  "end": "2023-01-01",
  "highlights": ["Built scalable APIs", "Led frontend team"]
}
```

You can set a **Postman Environment** with:  
```
base_url = https://profile-1pok.onrender.com
```
and run all tests locally or against deployed backend.

---

## ⚠️ Known Limitations

- No authentication (anyone can modify data)  
- Basic error handling only  
- Seed data recommended for first run  

---

## 📎 Resume

👉 Add your resume link here (https://drive.google.com/file/d/1MorPJ50oAyDaOaWWosM5i6Z3t_HKhf76/view?usp=drivesdk).

---

## 🖼 Screenshots

![Portfolio UI](https://i.ibb.co/VhCtXFG/portfolio2.png)

---

## 📜 License

MIT © 2025 Your Name
