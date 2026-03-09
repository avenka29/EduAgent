import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

export interface LLMRequest {
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface LLMResponse {
  text: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

export class LLMService {
  private client: BedrockRuntimeClient;
  private modelId: string;

  constructor() {
    this.client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
    this.modelId = process.env.LLM_MODEL_ID || "amazon.nova-lite-v1:0";
  }

  /**
   * Invokes the LLM with a given prompt.
   * Handles the formatting for Amazon Nova models.
   */
  async invoke(request: LLMRequest): Promise<LLMResponse> {
    const { prompt, systemPrompt, maxTokens = 1000, temperature = 0.7 } = request;

    // Formatting for Amazon Nova models (Messages API style)
    const payload = {
      system: systemPrompt ? [{ text: systemPrompt }] : undefined,
      messages: [
        {
          role: "user",
          content: [{ text: prompt }]
        }
      ],
      inferenceConfig: {
        max_new_tokens: maxTokens,
        temperature: temperature,
        top_p: 0.9,
      }
    };

    try {
      const command = new InvokeModelCommand({
        modelId: this.modelId,
        body: JSON.stringify(payload),
        contentType: "application/json",
        accept: "application/json",
      });

      const response = await this.client.send(command);
      const decodedBody = new TextDecoder().decode(response.body);
      const responseBody = JSON.parse(decodedBody);

      // Nova models return output in output.message.content[0].text
      return {
        text: responseBody.output?.message?.content?.[0]?.text || "No response text.",
        usage: {
          inputTokens: responseBody.usage?.input_tokens || 0,
          outputTokens: responseBody.usage?.output_tokens || 0,
        }
      };
    } catch (error) {
      console.error("LLM Invocations Error:", error);
      throw new Error("Failed to invoke LLM");
    }
  }
}
