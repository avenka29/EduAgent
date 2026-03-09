# Amazon Bedrock Agent Setup Plan

This document outlines the steps required to transition from our custom `LLMService` to the managed **Agents for Amazon Bedrock** service. This will allow AWS to handle session state, multi-turn memory, and tool usage.

## 1. AWS Console Configuration

### A. Create the Agent
1.  **Navigate to Bedrock:** Go to the Amazon Bedrock console.
2.  **Create Agent:** Select "Agents" under "Orchestration" and click "Create Agent".
3.  **Model Selection:** Choose **Amazon Nova 2 Lite** (or your preferred model).
4.  **Instruction:** Copy the `SYSTEM_PROMPT` from `TutorAgent.ts` into the "Instructions for the Agent" field.
    *   *Instruction:* "You are a helpful Socratic Tutor for EduAgent. Your goal is to guide students through textbook material without giving them direct answers..."

### B. Action Groups (Optional but Recommended)
*   If we want the agent to "browse" our Course Graph directly, we need to:
    1.  Define an **Action Group**.
    2.  Provide an **OpenAPI schema** for our backend endpoints (e.g., `/api/textbook/toc`).
    3.  Link a **Lambda function** that the agent can call to fetch data from our server.

### C. Knowledge Bases
*   To give the agent deep access to all textbooks without manually injecting context:
    1.  Upload the OpenStax `content_repo` to an **S3 Bucket**.
    2.  Create a **Knowledge Base** in Bedrock pointing to that bucket.
    3.  Associate the Knowledge Base with your Agent.

### D. Deployment
1.  **Prepare Agent:** Click "Prepare" to test your instructions.
2.  **Create Alias:** Create an Alias (e.g., "prod" or "dev").
3.  **Note IDs:** Save the **Agent ID** and **Agent Alias ID**.

## 2. Environment Variables

Update `backend/.env` with the following:

```env
AWS_AGENT_ID=YOUR_AGENT_ID
AWS_AGENT_ALIAS_ID=YOUR_AGENT_ALIAS_ID
```

## 3. Backend Refactor

### A. Install New SDK
```bash
npm install @aws-sdk/client-bedrock-agent-runtime
```

### B. Implement `BedrockAgentService`
Create a new service that uses `InvokeAgentCommand` instead of `InvokeModelCommand`. This service will handle:
*   `sessionId`: Passing a unique ID (like a UUID) from the frontend to maintain conversation context.
*   `inputText`: The student's message.

### C. Update Agent Classes
Refactor `TutorAgent` and `HomeworkAgent` to call the `BedrockAgentService`.

## 4. Frontend Integration
*   The frontend must now generate or track a `sessionId` (e.g., in `localStorage`) and pass it to the backend.
*   This allows the AWS Agent to "remember" previous parts of the conversation.
