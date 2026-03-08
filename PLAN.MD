# EduAgent Hackathon 8-Day Plan (Updated with Homework Help Agent)

## **Day 1 – Project Setup & Research**
**Goals:**  
- Finalize MVP scope: 1–2 subjects, 1–2 topics per subject, 3–5 lesson steps each  
- Research **Khan Academy API**, Common Core standards API  
- Set up project repo and development environment  

**Tasks:**  
- Create Next.js + React frontend  
- Set up backend (Node.js/TypeScript) for lesson serving, user data, and quiz storage  
- Draft **JSON structure** for lessons, quizzes, and guided hints  

---

## **Day 2 – Lesson Integration**
**Goals:**  
- Pull lessons, exercises, and videos from **Khan Academy API**  
- Store lessons in **pre-curated JSON paths**  

**Tasks:**  
- Fetch 3–5 lessons per chosen topic  
- Structure lessons with:  
  - `lesson_id`  
  - `step_id`  
  - `content` (text/video)  
  - `exercise` (MCQ / short answer)  
- Seed database with lessons for Structured Course Agent  

---

## **Day 3 – Structured Course Agent (Skill Assessment & Adaptive Learning)**
**Goals:**  
- Implement quizzes and adaptive learning paths  
- Map results to **Common Core standards**  

**Tasks:**  
- Display quiz questions per lesson step  
- Nova 2 Lite evaluates answers and generates **feedback/hints**  
- Adaptive branching logic:  
  - Correct → next lesson step  
  - Incorrect → repeat step or suggest extra practice  
- Store student progress aligned to standards  

---

## **Day 4 – Homework Help Agent (Guided Assistance)**
**Goals:**  
- Enable students to get **learning-focused guidance** for homework  

**Tasks:**  
- Accept student homework input (text or optional image)  
- Nova 2 Lite interprets the problem and provides **step-by-step hints**  
- Ensure **guardrails**: no full answers, reinforce reasoning and learning  
- Integrate **Common Core mapping** to suggest additional practice  

---

## **Day 5 – Co-Pilot / Q&A Agent**
**Goals:**  
- Enable students to ask questions in natural language  
- Provide **concept guidance without giving direct answers**  

**Tasks:**  
- Use Nova 2 Lite to interpret and explain concepts  
- Provide multilingual support (start with 1 extra language)  
- Optional: connect Nova 2 Sonic for voice feedback  

---

## **Day 6 – Progress Tracking Dashboard**
**Goals:**  
- Visualize student mastery and learning progress  

**Tasks:**  
- Display quiz results, lesson completion, and skill mastery per Common Core standard  
- Suggest next lessons or extra exercises based on performance  
- Implement simple charts / progress bars  

---

## **Day 7 – Testing & Polishing**
**Goals:**  
- Test all flows end-to-end for a smooth demo  

**Tasks:**  
- Test Structured Course Agent and adaptive quiz logic  
- Test Homework Help Agent for guided feedback (text + optional images)  
- Test Q&A co-pilot in multiple languages  
- UI polish and error handling  

---

## **Day 8 – Demo Preparation & Submission**
**Goals:**  
- Record **3–5 minute demo video**  
- Prepare **project description** for Devpost  
- Optional: add stretch features  

**Stretch Features (Optional)**  
- Voice interaction via Nova 2 Sonic  
- OCR for handwritten worksheets  
- Multimodal content (images, diagrams)  
- More subjects/topics or full K–12 coverage  

---

## **Hackathon MVP Focus**
- **Structured Course Agent:** Adaptive lesson paths from Khan Academy + quizzes + Common Core alignment  
- **Homework Help Agent:** Guided step-by-step assistance, reinforcing learning without giving full answers  
- **Co-Pilot Q&A Agent:** Multilingual explanation support  
- **Progress Dashboard:** Tracks mastery and suggests next steps  

> **Tip:** Focus on **3–5 lesson steps per topic** to clearly demonstrate adaptive learning and homework guidance within 9 days.