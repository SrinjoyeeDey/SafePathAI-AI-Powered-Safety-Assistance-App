![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-orange?style=for-the-badge&logo=hacktoberfest)
![Open Issues](https://img.shields.io/github/issues/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App?style=for-the-badge)
![Contributors](https://img.shields.io/github/contributors/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App?style=for-the-badge)
![Stars](https://img.shields.io/github/stars/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-Contributions%20Welcome-green?style=for-the-badge)

## 🌍 SafePathAI — AI-Powered Safety & Assistance App

Your AI-driven personal safety assistant combining geolocation, maps, AI (Gemini/OpenAI), and the MERN stack to make urban navigation safer and smarter.


---

## ✨ Features

✅ JWT Authentication — Secure login & signup (bcrypt)

✅ Geolocation Support — Detect user location in real-time

✅ Nearby Safe Zones — Hospitals, pharmacies, police stations (Mapbox/Google APIs)

✅ AI Assistant — Safety recommendations powered by Gemini/OpenAI

✅ SOS Button — One-tap emergency message with live location

✅ MongoDB Backend — Stores users, SOS alerts, chat history, and places

✅ Open Source — Frontend contributions welcome (Next.js + shadcn/ui)



---

## 🗂 Tech Stack

**Backend**:

Node.js + Express + TypeScript

MongoDB + Mongoose

JWT Auth + Bcrypt

REST API


**Frontend (to be built)**:

Next.js + TypeScript

TailwindCSS + shadcn/ui

Mapbox / Google Maps integration

next-themes (dark/light mode)


**AI**:

Gemini API / OpenAI API (server-proxied for security)



---

## 📁 Repository Structure

```bash
/backend
├─ src/
│  ├─ models/       # Contains Mongoose or TypeORM models
│  │   ├─ User.ts       # User schema/model
│  │   ├─ Place.ts      # Place schema/model
│  │   ├─ SOS.ts        # SOS alert schema/model
│  │   └─ Chat.ts       # Chat schema/model
│  ├─ routes/       # Defines API endpoints
│  │   ├─ auth.ts       # Authentication routes (login, signup)
│  │   ├─ places.ts     # CRUD operations for places
│  │   ├─ ai.ts         # AI-related endpoints (e.g., chat, suggestions)
│  │   └─ sos.ts        # SOS alert endpoints
│  ├─ controllers/  # Handles business logic for routes
│  │   ├─ authController.ts
│  │   ├─ placeController.ts
│  │   ├─ aiController.ts
│  │   └─ sosController.ts
│  ├─ middleware/   # Express middlewares
│  │   ├─ authMiddleware.ts     # JWT verification, authentication
│  │   └─ errorMiddleware.ts    # Centralized error handling
│  └─ index.ts      # Entry point: initializes server, connects DB, mounts routes
├─ .env.example     # Template environment variables (do NOT share actual .env)
├─ package.json     # NPM dependencies and scripts
└─ tsconfig.json    # TypeScript configuration
```





---

## 🔑 Environment Variables
```
Create a .env file in /backend (not pushed to GitHub):

PORT=4000
MONGO_URI=your_mongo_connection
JWT_ACCESS_SECRET=super_secret
JWT_REFRESH_SECRET=another_secret
OPENAI_API_KEY=your_openai_or_gemini_key
MAPBOX_API_KEY=your_mapbox_key
```

---

## 🚀 Getting Started

1️⃣ Clone the repo

git clone https://github.com/your-username/safepathai.git
cd safepathai/backend

2️⃣ Install dependencies

npm install
# or
yarn install

3️⃣ Setup environment variables

cp .env.example .env
# fill in your secrets

4️⃣ Run the backend

npm run dev
# or
yarn dev

Backend API will be live at: http://localhost:4000/api


---

## 🎨 Frontend Contribution (OPEN FOR YOU 💚)

We need frontend heroes to bring the UI to life! You can:

Build a mobile-friendly UI with Next.js + shadcn/ui

Add green/white theme with dark/light mode toggle

Integrate maps + AI chat

Polish the UX like GirlScript Summer of Code pages 🌸



---

## 🖌 Design Guidelines

To maintain a consistent and beautiful UI, *please follow our [Design Guide]([./DESIGN_GUIDE.md](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/blob/main/frontend/DESIGN_GUIDE.md))* before contributing.  

It includes:  
- Color palette 🎨  
- Typography & spacing 📐  
- Component templates 🧩  
- Page layouts & examples 🖼  
- Contribution rules for consistency ✨  

Following this guide ensures your changes integrate seamlessly with the existing frontend.

---


## 🛠 Contribution Guide

1. 🍴 Fork this repo


2. 🌿 Create a new branch:



git checkout -b feature/frontend-dashboard

3. 💻 Implement features (frontend, docs, bug fixes, etc.)


4. ✅ Commit & push:



git commit -m "✨ Added dashboard with Mapbox integration"
git push origin feature/frontend-dashboard

5. 🔃 Open a Pull Request — we’ll review together 🎉




---

## 📌 Roadmap

Backend: JWT Auth + MongoDB + AI route

SOS system & nearby places API

Frontend authentication pages (login/signup)

Dashboard with live map & AI chat

Dark/light theme (green/white palette)

Deploy full-stack on Vercel/Render



---

### 🤝 Why Contribute?

🚀 Learn real-world MERN + AI integration

🎨 Showcase your frontend skills with shadcn & Next.js

🌍 Build something impactful (safety assistant app)

🏆 Great for hackathons, resumes, and open-source contributions



---

### 💡 Example Use Case

You’re walking home late 🚶‍♀ → open the app

It shows nearest hospital & police station 🏥 👮

Ask AI: “What’s the safest route home?” 🤖

In emergencies, hit SOS → sends your live location instantly 🚨



---

## 🌟 Star This Repo

If you like the idea 💚, ⭐ star the repo and share with friends. Let’s make it community-built & impactful.


---

## 📬 Connect

Created with ❤ for open-source collaboration
Author: Srinjoyee Dey
Contributions welcome from everyone 🙌


---


