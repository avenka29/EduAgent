# EduAgent Context Document

## 1) Basic Idea & Purpose
**EduAgent** is an AI-powered tutoring platform designed to provide **personalized education** for K-12 students anywhere in the world. The goal is to **bridge educational gaps**, especially for underserved communities, by leveraging AI to assess student understanding, recommend tailored lessons, and provide guided help on homework.

**Why we are creating it:**
- Over 260 million children worldwide are out of school or lack access to quality education (UNICEF, 2023).
- AI can provide **adaptive, scalable, and accessible learning experiences**.
- Focus on **learning guidance**, not just giving answers, promoting genuine understanding.

---

## 2) Feature Descriptions

### a) Structured Learning Agent
- Guides students through lessons sourced from **Khan Academy API**.
- Presents content (videos, text explanations) and quizzes.
- Maps student progress to **Common Core standards** (or international equivalents).
- Evaluates quiz answers and generates **adaptive recommendations**:
  - Extra practice if mastery is low
  - Move to next topic if mastery threshold is reached
- Supports multiple subjects (e.g., Math, English) and optionally multiple languages.

### b) Homework Help / Co-Pilot Agent
- Assists students in understanding homework problems without giving full answers.
- Provides **step-by-step hints** and explanations.
- Integrates Common Core standards mapping to **identify weak areas**.
- Optional multimodal support: text, image (OCR for handwritten work), or voice feedback (Nova 2 Sonic).
- Guardrails to ensure students **learn concepts** rather than copying answers.

---

## 3) Technical Pointers / APIs
- **Khan Academy API:** Pull lessons, exercises, and videos.
- **Common Core Standards JSON:** Map lessons and quizzes to standards.
- **Nova 2 Lite (Amazon Nova):** 
  - Reasoning for quiz evaluation
  - Step-by-step hints for homework guidance
  - Adaptive learning recommendations
- **Nova 2 Sonic (optional):** Voice feedback for explanations
- **OCR Libraries (optional):** For handwritten homework, e.g., Tesseract.js
- **Database:** Store lessons, mappings, student progress, and quiz results (PostgreSQL, MongoDB, or Firebase)

---

## 4) Demoable Flows & Features

### Example Flow 1: Learning Fractions
1. Student selects **Fractions** topic.
2. Structured Learning Agent presents **lesson video and exercises** from Khan Academy.
3. Student completes exercises (on paper or online).
4. Structured Learning Agent evaluates answers using **Nova 2 Lite** and maps results to **Common Core standards**.
5. Agent determines next step:
   - If mastery < threshold → additional practice recommended
   - If mastery ≥ threshold → advance to next lesson
6. Progress displayed in **dashboard** showing mastery per standard.

### Example Flow 2: Homework Guidance
1. Student inputs homework question (text or image).
2. Homework Help Agent interprets the question and identifies **relevant skills/standards**.
3. Agent provides **guided step-by-step hints** and optional practice problems.
4. Student works through hints and submits progress.
5. Agent updates mastery and suggests additional lessons if needed.

### Features Demonstrated:
- Adaptive learning paths based on quiz performance
- Skill mastery tracking aligned to standards
- Step-by-step guided homework help without giving answers
- Multilingual support (optional)
- Optional voice or multimodal intera