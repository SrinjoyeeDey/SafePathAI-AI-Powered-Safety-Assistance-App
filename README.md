<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:1E293B,100:22C55E&height=210&section=header&text=%20SafePathAI%20-%20Hacktoberfest%202025&fontSize=40&fontColor=00ff9c&fontAlignY=40&animation=fadeIn&desc=AI-Powered%20Safety%20and%20Navigation%20System&descAlignY=70&descAlign=50" />
</p>

<!-- Typing SVG Animation -->
<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?font=Roboto&size=30&duration=4000&color=22C55E&center=true&vCenter=true&width=600&lines=AI-Powered+Safety+Companion;Real-time+Location+Tracking;Smart+Emergency+Alerts;Safe+Route+Recommendations;Instant+SOS+Assistance;Privacy+First+Design" alt="Typing SVG" />

<br>

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-8a2be2?style=for-the-badge&logo=hacktoberfest)](https://hacktoberfest.com)
[![Open Issues](https://img.shields.io/github/issues/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App?style=for-the-badge&color=blue)](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/issues)
[![Contributors](https://img.shields.io/github/contributors/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App?style=for-the-badge&color=green)](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/graphs/contributors)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Your AI-driven personal safety assistant combining geolocation, maps, AI (Gemini/OpenAI), and the MERN stack to make urban navigation safer and smarter.**

  [Report Bug](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/issues) • [Request Feature](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/issues)

</div>

<br>

## Table of Contents
<details>

| Section | Section |
|:---|:---|
| [Features](#features) | [Quick Start](#quick-start) |
| [Use Cases](#use-cases) | [Frontend Contribution](#frontend-contribution) |
| [Tech Stack](#tech-stack) | [Contributing](#contributing) |
| [System Architecture](#system-architecture) | [Roadmap](#roadmap) |
| [Repository Structure](#repository-structure) | [Contributors](#contributors) |
</details>
<br>

## Features

<div align="left">

| Feature | Description |
|:---|:---|
| **JWT Authentication** | Secure login & signup with bcrypt password hashing |
| **Real-time Geolocation** | Live location tracking with high accuracy |
| **Nearby Safe Zones** | Find hospitals, police stations, pharmacies instantly |
| **AI Safety Assistant** | Gemini/OpenAI powered safety recommendations |
| **One-tap SOS** | Emergency alerts with live location sharing |
| **Safe Route Planning** | AI-powered safest route recommendations |
| **Cross-platform** | Responsive design for all devices |
| **Dark/Light Theme** | Accessible interface with theme toggle |

</div>

<br>

## Use Cases

<div align="center">

```mermaid
graph TD
    A[User Scenario] --> B[Walking Home Late]
    A --> C[Traveling in New City]
    A --> D[Emergency Situation]
    
    B --> E[Open SafePathAI App]
    C --> E
    D --> E
    
    E --> F[View Safe Routes & Zones]
    E --> G[Ask AI Assistant]
    E --> H[Hit SOS Button]
    
    F --> I[Get Safety Recommendations]
    G --> I
    H --> J[Send Emergency Alerts]
    
    I --> K[Reach Destination Safely]
    J --> K
```

</div>

<div align="left">

**Real-world Scenario:**

Imagine you're walking home late at night. You open SafePathAI to:
- View nearby safe zones including hospitals and police stations
- Consult the AI assistant for the safest route recommendations
- Access instant SOS functionality that shares your live location with emergency contacts

The app provides peace of mind through real-time safety monitoring and intelligent route planning.

</div>

<br>

## Tech Stack

<div align="left">

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-47A248?style=flat-square&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)

### Frontend (In Development)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0+-06B6D4?style=flat-square&logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-000000?style=flat-square)

### AI & APIs
![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=flat-square&logo=google)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT-412991?style=flat-square&logo=openai)
![Mapbox](https://img.shields.io/badge/Mapbox-Maps-000000?style=flat-square&logo=mapbox)

</div>

<br>

System Architecture

<div align="center">

```mermaid
flowchart TD
    subgraph Frontend
        A[Next.js UI] --> B[Map Integration]
        A --> C[AI Chat Interface]
        A --> D[SOS Dashboard]
    end
    
    subgraph Backend
        E[Express Server] --> F[JWT Auth]
        E --> G[MongoDB]
        E --> H[AI Service]
        E --> I[Map APIs]
    end
    
    subgraph External Services
        J[Gemini/OpenAI] --> H
        K[Mapbox/Google Maps] --> I
        L[Emergency Services] --> M[SOS Alerts]
    end
    
    A <--> E
    F --> G
    H --> J
    I --> K
```

</div>

<br>

Repository Structure

<div align="left">
  
```typescript
SafePathAI/
├── 📂 backend/
│   ├── 📂 src/
│   │   ├── 📂 models/           # Database schemas
│   │   │   ├── User.ts          # User authentication model
│   │   │   ├── Place.ts         # Safe locations model
│   │   │   ├── SOS.ts           # Emergency alerts model
│   │   │   └── Chat.ts          # AI conversation history
│   │   ├── 📂 routes/           # API endpoints
│   │   │   ├── auth.ts          # Login/signup routes
│   │   │   ├── places.ts        # Location data routes
│   │   │   ├── ai.ts            # AI assistant routes
│   │   │   └── sos.ts           # Emergency alert routes
│   │   ├── 📂 controllers/      # Business logic
│   │   ├── 📂 middleware/       # Auth & error handling
│   │   └── index.ts             # Server entry point
│   ├── .env.example             # Environment template
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── 📂 frontend/
│   ├── 📂 public/
│   │   ├── vite.svg
│   │   └── index.html
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 Dashboard/
│   │   │   │   └── UserLocation.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── DarkModeToggle.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Map.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── SOSButton.tsx
│   │   ├── 📂 context/
│   │   │   ├── AuthContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── 📂 pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Emergency.tsx
│   │   │   ├── Favorites.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   ├── 📂 services/
│   │   │   ├── api.ts
│   │   │   └── (other service files)
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .gitignore
│   ├── DESIGN_GUIDE.md
│   ├── README.md
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.cjs
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   └── tsconfig.json
│
├── .gitignore
├── LICENSE.md
├── README.md
├── package.json
└── package-lock.json
```

</div>

<br>

Quick Start

### Prerequisites

<div align="left">

![Node.js](https://img.shields.io/badge/Node.js-16%2B-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0%2B-47A248?style=for-the-badge&logo=mongodb)

</div>

Installation

<div align="left">

```bash
# 1. Clone the repository
git clone https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App.git
cd SafePathAI-AI-Powered-Safety-Assistance-App/backend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your API keys

# 4. Start development server
npm run dev

# 5. Backend API running at:
# http://localhost:4000/api
```

</div>

<div align="center">

```mermaid
graph LR
    A[Clone Repository] --> B[Install Dependencies]
    B --> C[Configure Environment]
    C --> D[Start Server]
    D --> E[API Ready!]
```

</div>

Environment Variables

<div align="left">

Create .env file in /backend:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
OPENAI_API_KEY=your_openai_or_gemini_key
MAPBOX_API_KEY=your_mapbox_api_key
```

</div>

<br>

Frontend Contribution

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com/?font=Roboto&size=24&duration=3000&color=22C55E&center=true&vCenter=true&width=500&lines=🟢+OPEN+FOR+CONTRIBUTIONS;+UI+Designers+Welcome;+Frontend+Developers+Needed;💚+Join+Our+Community" alt="Typing SVG" />

</div>

<div align="left">

### Priority Tasks
- **Mobile-responsive dashboard** with Next.js + shadcn/ui
- **Map integration** with real-time location tracking
- **AI chat interface** with message history
- **SOS emergency panel** with one-tap functionality
- **Theme system** (green/white palette with dark/light mode)

### Design Guidelines
Please follow our [Design Guide](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/blob/main/frontend/DESIGN_GUIDE.md) for:
- **Color Palette**: Green/white theme with accessibility standards
- **Typography**: Consistent font hierarchy and spacing
- **Components**: Reusable UI patterns with shadcn/ui
- **Responsive Layouts**: Mobile-first approach

### Good First Issues
Look for issues tagged with: 
`good-first-issue` `frontend` `ui` `documentation`

</div>

<br>

🤝 Contributing

<div align="center">

We love your input! We want to make contributing as easy and transparent as possible.

<img src="https://readme-typing-svg.herokuapp.com/?font=Roboto&size=20&duration=3000&color=10B981&center=true&vCenter=true&width=500&lines=Contributions+Welcome!;Fork+and+Create+PR;Follow+Guidelines;Test+Your+Changes" alt="Contributing" />

</div>

Development Workflow

<div align="center">

```mermaid
graph LR
    A[Fork Repository] --> B[Create Branch]
    B --> C[Make Changes]
    C --> D[Run Tests]
    D --> E[Submit PR]
    E --> F[Review & Merge]
```

</div>

Steps to Contribute

<div align="left">

1. Fork the repository
2. Create a feature branch: git checkout -b feature/amazing-feature
3. Commit your changes: git commit -m 'Add amazing feature'
4. Push to the branch: git push origin feature/amazing-feature
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow React/Next.js best practices
- Use shadcn/ui components for consistency
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed


### Documentations:

## Backend Documentations:
  The Backend Documentation is generated using SwaggerUI and is available at `http://localhost:4000/api-docs`.
  Frontend developer can refer to the same to create `json` objects.

## Frontend Documentations:
The Backend Documentation is generated using Typedoc and tsdocs and can be build using
```bash
npm run docs
```
command.

The outputed static files will be available in /docs folder



</div>

<br>

## Roadmap

<div align="left">

| Feature | Description |
|---------|-------------|
| Core Backend | JWT Auth, MongoDB, Basic AI |
| Frontend Development | Next.js UI, Map Integration |
| Real-time Features | Live location sharing, notifications |
| Advanced AI | Predictive safety analytics |
| Mobile App | React Native application |
| Multi-language | Internationalization support |
| Offline Mode | Basic functionality without internet |
| Community Features | User reviews, safety tips |

</div>

<br>
<br>

## Contributors

<div align="center">

🏆 Our Amazing Contributors

<a href="https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App" />
</a>

</div>

<br>

<div align="left">

### Why Contribute?

- **Learn Real-world Skills**: MERN stack + AI integration
- **Showcase Talent**: Build portfolio with modern technologies  
- **Make Impact**: Create something that enhances personal safety
- **Join Community**: Collaborate with developers worldwide
- **Recognition**: Featured in contributors section & certificates

### Get Involved

- **Discussions**: Share ideas in GitHub Discussions
- **Issues**: Report bugs or request features
- **Documentation**: Help improve docs and guides
- **Code Reviews**: Participate in peer reviews

</div>

<br>

---

<div align="center">

## Join Our Community

**Star ⭐ this repo if you find it interesting!**

**Share with friends** who might want to contribute to an impactful open-source project.

<br>

<img src="https://readme-typing-svg.herokuapp.com/?font=Roboto&size=22&duration=3000&color=22C55E&center=true&vCenter=true&width=500&lines=Let's+build+safety+together;One+commit+at+a+time;+Welcome+Aboard!" alt="Final Message" />

<br>

[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App/pulls)
[![Open Source Love](https://img.shields.io/badge/Open%20Source-💚-green?style=for-the-badge)](https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-Friendly-orange?style=for-the-badge)](https://hacktoberfest.com)


![Visitor Count](https://komarev.com/ghpvc/?username=SrinjoyeeDey&label=Profile%20Views&color=green&style=flat)



**Built with ❤️ for the open-source community**  
**Author**: Srinjoyee Dey  
**Contributions welcome from everyone** 🙌

</div>

