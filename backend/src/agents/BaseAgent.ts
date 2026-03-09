import { LLMService, LLMRequest, LLMResponse } from "../services/LLMService";

export abstract class BaseAgent {
  protected llm: LLMService;

  constructor() {
    this.llm = new LLMService();
  }

  protected async askLLM(request: LLMRequest): Promise<LLMResponse> {
    return this.llm.invoke(request);
  }
}
