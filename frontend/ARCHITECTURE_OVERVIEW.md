# EduAgent Frontend Architecture Overview

## 1. Vision & Philosophy
The EduAgent frontend is designed as an **inclusive, mission-driven learning platform**. Unlike traditional SaaS products, its architecture prioritizes accessibility, cognitive load reduction, and pedagogical effectiveness.

### Core Principles:
- **Mastery-First UI:** Interfaces are designed to celebrate progress and deep understanding rather than just completion.
- **Distraction-Free Learning:** Clean, high-contrast layouts that focus the learner's attention on the content.
- **AI-Human Synergy:** The AI (EduAgent Tutor) is treated as a first-class citizen in the UI, integrated into the learning flow rather than being a "side-chat" afterthought.

## 2. Tech Stack
| Technology | Role | Justification |
| :--- | :--- | :--- |
| **React 19** | UI Library | Leveraging the latest concurrent features and improved hooks for a highly responsive experience. |
| **Vite** | Build Tool | Provides near-instant HMR and optimized production builds. |
| **Tailwind CSS v4** | Styling | Uses the new CSS-first configuration and `@theme` variables for a highly maintainable design system. |
| **React Router v7** | Routing | Handles navigation between the mission-driven Landing Page and the functional Dashboard. |
| **Framer Motion** | Animation | Provides "playful" yet subtle transitions that make the app feel alive and encouraging for K-12 students. |
| **Lucide React** | Iconography | Clean, consistent, and accessible vector icons. |

## 3. High-Level Routing
The application is split into two distinct "worlds":
1.  **The Public World (`/`)**: A mission-focused landing page designed to inspire students, teachers, and donors. It emphasizes "Education for All."
2.  **The Learning World (`/dashboard`)**: A personalized, authenticated-style environment where the actual mastery-based learning occurs.

## 4. Component Hierarchy
We follow an **Atomic-inspired structure** adapted for React:
- **Pages**: Top-level route containers (`LandingPage`, `Dashboard`).
- **Layouts**: Persistent structural elements (Sidebar, TopNav).
- **Features**: Complex, stateful logic blocks (LessonPlayer, AgentChat).
- **UI (Shadcn-style)**: Reusable, low-level primitives (Button, Card, Progress).

## 5. Styling System (Tailwind v4)
We use a centralized `@theme` block in `src/index.css` to define our "EduAgent Design System":
- **Primary Blue (`#2563eb`)**: Trust and clarity.
- **Secondary Emerald (`#10b981`)**: Success and growth.
- **Accent Amber (`#fbbf24`)**: Attention and hints.
- **App Background (`#f8fafc`)**: Soft on the eyes for long study sessions.
