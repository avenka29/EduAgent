# EduAgent Frontend Implementation Details

## 1. Directory Structure (`/src`)
The codebase follows a modular organization to separate concerns while remaining highly discoverable.

```text
src/
├── components/
│   ├── ui/           # Primitives (Button, Card, Badge)
│   ├── layout/       # Sidebar, TopNav, AppContainer
│   ├── lesson/       # LessonPlayer, QuizModule, VideoEmbed
│   └── chat/         # AgentChat, MessageBubble, InputBar
├── pages/
│   ├── LandingPage.tsx   # Public, mission-focused entry point
│   ├── Dashboard.tsx     # Student learning command center
│   └── ...               # (Future) LessonDetail, Profile, etc.
├── styles/
│   └── index.css         # Tailwind v4 theme and global base styles
├── hooks/
│   └── ...               # Custom hooks (e.g., useProgress, useAgent)
├── context/
│   └── ...               # Global state (e.g., LearningContext)
├── App.tsx               # Routing and top-level providers
└── main.tsx              # Application entry point
```

## 2. Component Design Patterns

### a. Tailwind CSS v4 Theme
Instead of a separate `tailwind.config.js`, variables are defined in `src/index.css` using the `@theme` block.

```css
@theme {
  --color-primary-blue: #2563eb;
  --color-secondary-emerald: #10b981;
  /* ... other variables ... */
}
```

### b. Responsive Strategy
- **Mobile First**: All layouts are mobile-responsive out of the box.
- **Sidebars**: Collapsible or transformed into bottom-nav for mobile users.
- **Max Widths**: Centered `max-w-7xl` or `max-w-5xl` for text-heavy content to ensure readability.

## 3. Mission-First Elements

### Socratic AI Chat (`src/components/chat`)
The AI interface is designed to be supportive, not answering for the student.
- **Prompting**: Visual indicators that show the AI is "thinking" or "typing."
- **Feedback**: Emerald highlights for "Aha!" moments and blue for subtle guidance.

### b. Mastery Visualization (`src/pages/Dashboard.tsx`)
Progress is shown as "Mastery Bars" rather than grades.
- **States**: `Mastered` (100%), `Practiced` (50%+), and `Started`.
- **Engagement**: Use of `framer-motion` to animate bar fills on page load to encourage a sense of progress.

## 4. Responsible AI Guardrails
The frontend is designed to visually reinforce the platform's commitment to safe and responsible AI usage.

### a. Socratic UI Indicators
- **Active Guardrail Badges**: UI components that explicitly state "Active Guardrails" to build trust with parents and educators.
- **Redirect Messaging**: Special styling for AI messages that redirect students from asking for answers to conceptual understanding.

### b. Safety Features
- **Strict Moderation**: Visual feedback for filtered or moderated content.
- **Pedagogical Alignment**: Integration with curriculum standards (Common Core) ensuring the AI doesn't deviate into off-topic or non-educational domains.

## 5. Development Best Practices

- **Type Safety**: All components are written in TypeScript (`.tsx`) with clear prop definitions.
- **Accessibility**: ARIA labels on all interactive icons and high-contrast color pairings.
- **Semantic HTML**: Proper use of `<aside>`, `<main>`, `<nav>`, and `<section>` for SEO and screen readers.

## 5. Build and Deployment
The app is optimized for rapid iteration using Vite.
- **Dev**: `npm run dev` (starts HMR server)
- **Build**: `npm run build` (outputs to `/dist`)
- **Type-Check**: `tsc --noEmit` is integrated into the build step to ensure structural integrity.
