import { GoogleGenAI } from "@google/genai";

export const generateEODSummary = async (rawText: string): Promise<string> => {
  try {
    // Safe access to process.env for browser environments
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;

    if (!apiKey) {
        console.warn("API_KEY not found in environment variables. Returning mock response.");
        return `(Mock AI Summary) Successfully completed key modules. Facing minor blockers on UI styling. Plan to resolve by tomorrow morning.`;
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const prompt = `
      You are a professional Project Manager assistant. 
      Rewrite the following raw End-of-Day (EOD) notes into a concise, professional summary bulleted list.
      Highlight key achievements, blockers, and next steps.
      
      Raw Notes:
      ${rawText}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating summary. Please try again later.";
  }
};