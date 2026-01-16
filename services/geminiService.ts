
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiResponse = async (prompt: string, systemInstruction?: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are a helpful assistant integrated into a multi-project dashboard.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with the AI. Please check your API key and connection.";
  }
};

export const getAIStatsSummary = async (data: any) => {
  const prompt = `Analyze this JSON data representing system performance and provide a 2-sentence summary of health: ${JSON.stringify(data)}`;
  return await getGeminiResponse(prompt, "You are a data analyst.");
};
