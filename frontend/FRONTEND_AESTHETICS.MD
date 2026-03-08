# EduAgent Frontend Aesthetics & Design System

## 1. Design Philosophy
EduAgent is designed for K-12 students. The interface should be **inviting, encouraging, and distraction-free**. It should feel like a "friendly tutor" rather than a rigid testing platform.

*   **Vibe:** Modern, Clean, Playful, and Trustworthy.
*   **Accessibility:** High contrast for readability, large touch targets, and clear visual cues for progress.

## 2. Color Palette (Tailwind CSS)

| Category | Role | Tailwind Colors | Hex (Approx) |
| :--- | :--- | :--- | :--- |
| **Primary** | Main Branding / Actions | `blue-600` to `indigo-500` | `#2563eb` |
| **Secondary** | Encouragement / Success | `emerald-500` | `#10b981` |
| **Accent** | Attention / Highlights | `amber-400` | `#fbbf24` |
| **Background** | Main App Background | `slate-50` | `#f8fafc` |
| **Surface** | Cards / Modals | `white` | `#ffffff` |
| **Text (Primary)** | Body & Headings | `slate-900` | `#0f172a` |
| **Text (Secondary)**| Labels & Help Text | `slate-500` | `#64748b` |
| **Error** | Critical Warnings | `rose-500` | `#f43f5e` |

## 3. Typography
*   **Headings:** `font-sans` (Inter or Outfit) - Bold and rounded to feel approachable.
*   **Body:** `font-sans` (Inter) - High legibility for long lesson texts.
*   **Code/Math:** `font-mono` (JetBrains Mono or Fira Code) - For clear distinction in technical subjects.

## 4. UI Components & Patterns

### a. The "Agent" Chat Interface
*   **Speech Bubbles:** Rounded corners (`rounded-2xl`), distinct background for Agent vs. Student.
*   **Avatars:** Simple, friendly robot or scholar icons.
*   **Typing Indicators:** Subtle animation to make the AI feel "alive."

### b. Lesson Cards
*   **Visuals:** Large thumbnails for Khan Academy videos.
*   **Progress:** Mini progress bars at the bottom of cards (`h-2 bg-slate-100 rounded-full overflow-hidden`).
*   **Shadows:** Soft shadows (`shadow-sm` transitioning to `shadow-md` on hover).

### c. Dashboard & Mastery
*   **Mastery Rings:** Circular progress indicators for Common Core standards.
*   **Badges:** Gamified icons for completing topics (e.g., "Fraction Master").

### d. Feedback States
*   **Correct Answer:** Flash of `emerald-50` background with a "Great job!" toast.
*   **Hint Needed:** Subtle `amber-100` highlight around the hint button.

## 5. Layout Structure
*   **Sidebar:** Navigation for Home, Lessons, Homework Help, and Progress.
*   **Main Stage:** Centered content area (max-width `max-w-5xl`) to prevent eye strain on wide monitors.
*   **Mobile First:** Responsive design that collapses the sidebar into a bottom nav or hamburger menu for tablet/mobile learners.
