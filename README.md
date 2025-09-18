# IntelliCAir – AI-Powered HR & Healthcare Platform

IntelliCAir is a full-stack HR & Healthcare solution connecting **hospitals, recruiters, and candidates**.  
Built with **Next.js + TypeScript + Redux Toolkit + TailwindCSS + Material-UI**, it provides job management, recruiter onboarding, candidate assessments, and AI-powered chat support — all in one platform.

---

## 🚀 Features

### 🏥 Hospital & Recruiter Portals
- **Hospital Onboarding & Agency Management** – Hospitals can register, invite recruiters, and view job bid lists.
- **Recruiter Dashboard** – Recruiters can bid on jobs, manage candidates, and track placements.

### 💼 Job Management
- **Jobs Dashboard** – Interactive job listing with pagination, filtering, and live updates.
- **Bid Tracking** – View job bids and status changes in real time.

### 🤖 AI Chatbot
- **Context-Aware Chat** – Candidate and recruiter support via AI chatbot.
- **File Attachments & Markdown Support** – Rich responses, image previews, and safe rendering.

### 📝 Examination System
- **AI-Based Exams** – Question generation, real-time scoring, and feedback.
- **Timed & Secure Sessions** – Candidate authentication and anti-cheating measures.

### 🎨 Modern UI/UX
- **TailwindCSS + Material-UI** hybrid design system.
- **Dark/Light Themes** fully supported.
- **Responsive Design** across all devices.

---

## 🛠 Tech Stack

| Layer          | Technology                               |
|----------------|------------------------------------------|
| **Framework**  | Next.js (Pages Router) + TypeScript      |
| **State**      | Redux Toolkit (Slices + Async Thunks)    |
| **UI**         | TailwindCSS + Material-UI                |
| **API Layer**  | Axios with interceptors & error handling |
| **Real-Time**  | REST + WebSocket for chat                |
| **Deployment** | Vercel / Node 18+                        |

---

## 📂 Project Structure

intellicair-app/  
├─ public/                  # Static assets (images, icons, etc.)  
├─ src/  
│   ├─ pages/               # Next.js pages (dashboard, login, onboarding, etc.)  
│   ├─ components/          # Reusable UI components (chatbot, forms, tables)  
│   ├─ redux/               # Redux Toolkit slices, actions, selectors  
│   │   ├─ apps/            # Feature-based slices (jobs, chatbot, exams, etc.)  
│   │   └─ store.ts         # Root store configuration  
│   ├─ layouts/             # Global layouts and wrappers  
│   ├─ @core/theme/         # Dark/Light theme configuration  
│   └─ @core/utils/axios.ts # Centralized API client with interceptors  
├─ .env.example             # Environment variable template  
├─ .gitignore  
├─ package.json  
└─ README.md

---

## 🏁 Getting Started

First, run the development server:

```bash
npm run dev
