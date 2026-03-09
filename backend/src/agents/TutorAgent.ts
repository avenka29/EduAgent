import { BaseAgent } from "./BaseAgent";

export interface TutorRequest {
  message: string;
  context: string; // The lesson content
  history?: { role: 'user' | 'assistant', text: string }[];
}

export class TutorAgent extends BaseAgent {
  private static SYSTEM_PROMPT = `You are a helpful Socratic Tutor for EduAgent. 
Your goal is to guide students through textbook material without giving them direct answers. 
Use the provided lesson context to ask guiding questions, explain underlying concepts, and encourage critical thinking. 
Be encouraging, professional, and pedagogical.`;

  async chat(request: TutorRequest) {
    const { message, context, history = [] } = request;

    // Build history string if needed or pass as separate messages if LLMService supports it
    // For simplicity now, we include context and latest message
    const prompt = `
Lesson Context:
${context}

Student Message: ${message}
`;

    return this.askLLM({
      prompt,
      systemPrompt: TutorAgent.SYSTEM_PROMPT,
    });
  }
}
