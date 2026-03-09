import { BaseAgent } from "./BaseAgent";

export interface HomeworkRequest {
  problem: string;
  studentAttempt?: string;
}

export class HomeworkAgent extends BaseAgent {
  private static SYSTEM_PROMPT = `You are a Socratic Homework Copilot for EduAgent. 
Your role is to help students solve their homework problems by providing hints and reinforcing core concepts. 
NEVER give the final answer. Instead, break the problem down into steps and ask the student to solve the next small piece. 
If they provide an attempt, analyze it for misconceptions and guide them gently.`;

  async assist(request: HomeworkRequest) {
    const { problem, studentAttempt } = request;

    const prompt = `
Homework Problem:
${problem}

Student's Current Attempt:
${studentAttempt || "No attempt provided yet."}
`;

    return this.askLLM({
      prompt,
      systemPrompt: HomeworkAgent.SYSTEM_PROMPT,
    });
  }
}
