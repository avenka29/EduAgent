# Common Core Standards Ingestion & Evaluator Agent

## 1. Common Core Standards Ingestion

### a. JSON Data Structure
To ensure the AI (Nova 2 Lite) can accurately map student progress, we need a consistent JSON structure for standards.

```json
{
  "subject": "Mathematics",
  "grade_level": "Grade 4",
  "domains": [
    {
      "domain_id": "4.NF",
      "name": "Number and Operations—Fractions",
      "standards": [
        {
          "standard_id": "4.NF.A.1",
          "description": "Explain why a fraction a/b is equivalent to a fraction (n × a)/(n × b) by using visual fraction models...",
          "mastery_threshold": 0.8,
          "suggested_khan_lessons": ["intro-to-equivalent-fractions", "visualizing-equivalent-fractions"]
        }
      ]
    }
  ]
}
```

### b. Ingestion Strategy
1.  **Source:** Fetch or manually curate standards from the [Common Core State Standards Initiative](http://www.corestandards.org/math/) (or a pre-compiled JSON repo).
2.  **Storage:** Store in a document database (MongoDB/Firestore) or a structured JSON file in the backend to allow quick lookups by `standard_id`.
3.  **Indexing:** Create a mapping between Khan Academy `lesson_id` and the corresponding `standard_id`.

---

## 2. Evaluator Agent (Powered by Nova 2 Lite)

### a. Agent Role
The Evaluator Agent acts as an "invisible grader" that analyzes student performance across quizzes and homework.

### b. Input Data (Per Evaluation)
*   **`student_answer`**: The raw text or selected option from the student.
*   **`question_context`**: The original question, correct answer, and the standard being tested.
*   **`student_history`**: (Optional) Previous attempts on this standard.

### c. Prompt Strategy for Nova 2 Lite
The agent will be prompted with a structured instruction:
> "You are an expert K-12 educator. Evaluate the student's answer based on Common Core standard {standard_id}: {description}. Determine if the student demonstrates mastery (80% accuracy/understanding). If not, provide a constructive hint that reinforces the standard's concept without giving away the final answer."

### d. Output Schema
```json
{
  "is_mastered": boolean,
  "score": number (0.0 to 1.0),
  "feedback": "string (encouraging & educational)",
  "recommended_next_step": "string (lesson_id or practice_topic)",
  "identified_misconception": "string (if any)"
}
```

## 3. Implementation Workflow

### Step 1: Backend API
*   Create an endpoint `/api/evaluate` that receives student submission and metadata.
*   Lookup the full standard description based on the ID.

### Step 2: Agent Interaction
*   Send the context + prompt to Amazon Nova 2 Lite.
*   Parse the JSON response to update the student's `mastery_score` in the database.

### Step 3: Feedback Loop
*   If `is_mastered` is `false`, trigger the "Adaptive Learning Path" logic to serve extra practice.
*   If `is_mastered` is `true`, unlock the next topic in the learning tree.
