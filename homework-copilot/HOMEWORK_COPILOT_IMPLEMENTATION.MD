# Homework Co-Pilot Agent Implementation Plan

## 1. Agent Definition (The "Persona")
The Homework Co-Pilot is designed to be a Socratic tutor. It **never** provides the direct answer. Instead, it guides the student through the problem-solving process using inquiry-based learning.

### System Prompt Strategy (Nova 2 Lite)
> "You are an expert Socratic Tutor. Your goal is to help students solve their homework problems by providing incremental hints and asking guiding questions. 
> 
> **CRITICAL RULES:**
> 1. NEVER give the final answer, even if the student asks for it.
> 2. Break the problem into the smallest possible logical steps.
> 3. Provide one hint at a time. 
> 4. Use the provided Common Core Standard {standard_id} ({description}) to ensure the explanation aligns with classroom learning.
> 5. If the student makes a mistake, identify the error politely and ask a question that helps them see the mistake themselves."

## 2. Interaction Flow

### A. Problem Initiation
1.  **Student Input:** "I'm stuck on 1/2 + 1/4."
2.  **Context Injection:** Backend identifies this as `4.NF.A.1` (Equivalent Fractions).
3.  **Initial Response:** "That's a great problem! To add these, we need them to speak the same 'language' (have the same denominator). Looking at 2 and 4, what's a number both can divide into?"

### B. The Hint Loop
*   **Step 1:** Identifying the gap (e.g., Common Denominator).
*   **Step 2:** Executing the conversion (e.g., "What is 1/2 if we want the bottom to be 4?").
*   **Step 3:** Final operation (e.g., "Now that we have 2/4 and 1/4, how many fourths do we have in total?").

## 3. Technical Implementation (MVP)

### Data Schema (Request to `/api/chat?mode=HELP`)
```json
{
  "problem_text": "string",
  "image_data": "base64_string (optional)",
  "chat_history": [
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."}
  ],
  "standard_context": {
    "id": "4.NF.A.1",
    "description": "Equivalent fractions..."
  }
}
```

### Agent Logic (Backend)
1.  **OCR Processing (Optional Stretch):** If `image_data` is present, use a basic OCR library (or Nova 2 Multimodal if available) to extract text.
2.  **Prompt Assembly:** Combine the System Prompt + `standard_context` + `chat_history` + `problem_text`.
3.  **Nova 2 Lite Call:** Get the streaming response for a better UX.

## 4. Frontend UI/UX
*   **Chat Bubble Design:** Use `indigo-50` for the Co-Pilot to distinguish it from the "Structured Learning" agent.
*   **Progress Tracking:** A small sidebar showing which "Step" of the problem the student is currently on.
*   **"I'm Stuck" Button:** Triggers an even simpler hint or an alternative explanation (e.g., "Try drawing it out as a pizza slice").

## 5. Success Metrics (For the Demo)
*   **No Spoilers:** The agent successfully guides the student to `3/4` without ever typing "3/4" itself until the student says it first.
*   **Concept Alignment:** The agent uses the term "Common Denominator" as per the standard description.
