# IntelliCAir — AI-Powered HR & Healthcare Platform

IntelliCAir is a multi-portal HR and healthcare platform connecting **hospitals, recruiters, and candidates** through job workflows, candidate assessments, real-time updates, and AI-assisted experiences.

Built with **Next.js, TypeScript, Redux Toolkit, Tailwind CSS, Material UI, WebSocket, and Axios**.

## Highlights

- Role-based hospital, recruiter, and candidate experiences
- Recruiter onboarding and agency workflows
- Job listing, filtering, pagination, and bid tracking
- Candidate management and assessment flows
- AI-assisted chat with rich content support
- Timed examination experiences with real-time scoring and feedback
- WebSocket-powered live updates
- Centralized API handling with Axios interceptors
- Responsive UI with dark/light theme support

## Product Areas

### Hospital & Recruiter Portals

- Hospital onboarding and agency management
- Recruiter invitations and access flows
- Recruiter dashboard for jobs, candidates, bids, and placement activity

### Job & Candidate Workflows

- Searchable and paginated job dashboards
- Job bid tracking and status updates
- Candidate lifecycle management
- Assessment and examination flows

### AI & Real-Time Experiences

- Context-aware chatbot experience
- Markdown and attachment rendering
- Real-time communication and updates through WebSocket
- AI-assisted examination workflows

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js |
| Language | TypeScript |
| State Management | Redux Toolkit |
| Styling | Tailwind CSS + Material UI |
| API Layer | Axios with interceptors |
| Real-Time | WebSocket |
| Routing | Next.js Pages Router |
| Deployment | Node.js / Vercel-compatible |

## Project Structure

```text
public/
src/
  pages/                 # Application routes
  components/            # Reusable UI components
  redux/
    apps/                 # Feature-based state modules
    store.ts              # Redux store configuration
  layouts/                # Shared application layouts
  @core/
    theme/                # Theme configuration
    utils/axios.ts        # Centralized API client
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL printed by Next.js in your terminal.

### Production build

```bash
npm run build
npm start
```

## Engineering Focus

The repository demonstrates a feature-oriented frontend architecture with centralized state management, shared layouts, reusable components, role-based product surfaces, API abstraction, and real-time UI updates.

## Notes

Environment-specific API endpoints and credentials should be configured through local environment variables and must not be committed to the repository.
