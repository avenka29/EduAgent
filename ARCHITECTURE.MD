# EduAgent System Architecture

## 1. High-Level Diagram (Conceptual)

```text
[ Frontend (React) ] <--- API (JSON) ---> [ Backend Hub (Node.js) ]
                                            |          |          |
      +-------------------------------------+          |          +-----------------------+
      |                                     |          |                                  |
[ Learning Agent ]                  [ Evaluator Agent ]                     [ Homework Help Agent ]
(Khan Academy Content)              (Mastery Assessment)                    (Guided Hint System)
      |                                     |                                  |
      +-------------------------------------+----------+-----------------------+
                                            |
                                  [ Shared State / DB ]
                             (PostgreSQL/Firebase/MongoDB)
                        - Student Profile & Mastery Scores
                        - Lesson History & Chat Transcripts
```

## 2. Component Roles

### A. The Backend Hub (The Orchestrator)
The Hub is the "brain" of the application logic. It doesn't perform the AI reasoning itself but manages the **Agent Lifecycle**:
*   **Context Injection:** It fetches the relevant Common Core standards and Khan Academy metadata before calling the AI.
*   **Routing:** It decides which agent "persona" should respond based on the user's current activity (e.g., "I'm in a quiz" vs. "I'm asking about my homework").
*   **Persistence:** It saves all interactions to the database so agents have "long-term memory."

### B. Shared State Communication (How Agents "Talk")
Agents communicate **asynchronously** through the database rather than directly calling each other.

*   **Scenario: Identifying a Gap**
    1.  **Homework Help Agent** notices a student is failing to solve a fraction addition problem after 3 hints.
    2.  It logs a `MisconceptionEvent` in the DB: `{"standard": "4.NF.A.1", "issue": "cannot find common denominators"}`.
    3.  The **Evaluator Agent** is triggered by this log to lower the mastery score for that specific standard.
    4.  The **Structured Learning Agent** reads the updated mastery score and proactively suggests: *"Hey! I noticed you're stuck on denominators. Want to try this quick 5-minute video first?"*

## 3. The Tech Stack Flow

1.  **User Input:** Student submits a quiz answer via React.
2.  **API Layer:** Backend receives the answer and fetches the `question_metadata` and `student_history`.
3.  **Agent Invocation (Nova 2 Lite):**
    *   Backend sends a prompt to Nova: *"You are the Evaluator Agent. Here is the student's history... analyze this answer..."*
4.  **Processing:** Nova returns a JSON object (as defined in `COMMON_CORE_STANDARDS_&_EVALUATOR.MD`).
5.  **State Update:** Backend updates the database and triggers any "Follow-up" agent actions.
6.  **Frontend Update:** React receives the feedback and updates the UI (e.g., showing a success animation or a "Help" button).

## 4. Scalability & Extensibility
*   **Modular Personas:** New agents (e.g., a "Parent/Teacher Reporting Agent") can be added by simply creating a new prompt template and database hook.
*   **API Agnostic:** While we use Khan Academy, the "Evaluator" and "Homework" agents are built to work with any educational content mapped to standards.
