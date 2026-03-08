# EduAgent Frontend Implementation Plan (React + Tailwind CSS)

## 1. Technical Stack
*   **Framework:** React (Next.js 14/15 or Vite-based)
*   **Styling:** Tailwind CSS (v3 or v4)
*   **Icons:** Lucide React
*   **State Management:** React Context API (for student progress/session) or Zustand
*   **Networking:** Axios or Native Fetch for API calls (Khan Academy API, Backend/AI)
*   **Animations:** Framer Motion (for smooth transitions between lesson steps)
*   **Testing:** Vitest + React Testing Library

## 2. Directory Structure
```text
src/
├── components/          # Reusable UI elements
│   ├── ui/              # Atom level (Button, Input, Card, Badge)
│   ├── layout/          # Sidebar, Header, Page Container
│   ├── lesson/          # LessonPlayer, QuizModule, VideoEmbed
│   └── chat/            # AgentChat, MessageBubble, InputBar
├── hooks/               # Custom hooks (useProgress, useLessons, useAgent)
├── context/             # Global State (UserContext, LearningContext)
├── pages/ or app/       # Main routes
│   ├── Dashboard/       # Progress overview
│   ├── Lessons/         # Topic listing
│   ├── LessonDetail/    # Step-by-step lesson view
│   ├── HomeworkHelp/    # Chat interface for guidance
│   └── Profile/         # Mastery and Settings
├── services/            # API wrappers (khanAPI.ts, aiAgent.ts)
├── styles/              # Global CSS & Tailwind config
└── utils/               # Formatting, constants, and math helpers
```

## 3. Core View Implementation

### a. Dashboard View
*   **Hero Section:** Greeting and "Next Lesson" quick action.
*   **Progress Grid:** Cards for ongoing topics with progress bars.
*   **Mastery Chart:** A Radar or Bar chart showing mastery of Common Core standards (Math, English, etc.).

### b. Lesson Player View
*   **Left Column:** Video/Text content from Khan Academy.
*   **Right Column (Collapsible):** Quiz / Active practice area.
*   **Bottom Bar:** Navigation (Previous / Next / Request Hint).

### c. Homework Help Agent View
*   **Full Screen Chat:** Immersive conversational interface.
*   **Input Area:** Text input + "Attach Image" (for OCR/Multimodal support).
*   **Side Panel:** Related lessons/standards being worked on.

## 4. Implementation Roadmap (Frontend)

### Phase 1: Scaffolding (Day 1-2)
1.  Initialize project with React + Tailwind + Lucide.
2.  Set up `tailwind.config.ts` with the EduAgent color palette.
3.  Build Layout components (Sidebar, Main Container).

### Phase 2: Core Components (Day 3-4)
1.  Develop `LessonCard` and `ProgressBar` components.
2.  Implement `AgentChat` message list and input system.
3.  Build the `QuizModule` with support for MCQ and short answers.

### Phase 3: Data Integration (Day 5-6)
1.  Connect to backend for fetching Khan Academy content.
2.  Implement `useAgent` hook for real-time interaction with Nova 2 Lite.
3.  Add `ProgressContext` to track student answers and update UI state.

### Phase 4: Polish & Feedback (Day 7-8)
1.  Add `Framer Motion` animations for lesson transitions.
2.  Optimize mobile responsiveness.
3.  Implement "Celebration" UI for mastery completion.
