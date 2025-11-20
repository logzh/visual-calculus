import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askCalculusTutor = async (
  context: string,
  userQuestion: string
): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    const systemInstruction = `You are an expert and friendly Calculus Tutor. 
    The user is currently interacting with a visualization about: ${context}.
    Keep your answers concise (under 100 words if possible), encouraging, and conceptually clear. 
    Avoid heavy jargon unless you explain it. Use Markdown for math formatting if needed.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: userQuestion,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm thinking about that...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while thinking. Please check your API key or try again.";
  }
};

export const generateQuizQuestion = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a single, conceptual multiple-choice question about ${topic} in Calculus. 
      Return ONLY the question and 4 options, and indicate the correct answer at the end. 
      Do not use JSON. Format it simply as text.`,
    });
    return response.text || "Could not generate a quiz.";
  } catch (error) {
    return "Error generating quiz.";
  }
};