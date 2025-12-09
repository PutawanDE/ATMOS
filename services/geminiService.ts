
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiHealthInsight } from "../types";

const getClient = () => {
    // API Key is automatically injected into process.env.API_KEY
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("Gemini API Key is missing.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
}

export const generateHealthInsights = async (
  location: string,
  aqi: number,
  pm25: number,
  ozone: number,
  lang: string = 'en'
): Promise<GeminiHealthInsight | null> => {
  const client = getClient();
  if (!client) {
    return null;
  }

  const targetLanguage = lang === 'th' ? 'Thai' : 'English';

  const prompt = `
    Analyze the air quality for ${location} in ${targetLanguage}.
    Current US AQI: ${aqi}.
    PM2.5: ${pm25} μg/m³.
    Ozone: ${ozone} μg/m³.
    
    You are an AI assistant for a "Brutalist" style dashboard.
    Provide a JSON response with:
    1. 'summary': A short, punchy, 1-2 sentence assessment of the air. 
       - If AQI is good, be slightly sarcastic about how rare it is or tell them to go outside immediately.
       - If AQI is bad, be brutally honest about the danger (e.g., "Taste the metal?", "Your lungs are crying").
       - Keep it under 140 characters if possible.
       - Tone: Witty, raw, direct.
    
    The output MUST be valid JSON.
  `;

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING }
            }
        }
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as GeminiHealthInsight;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
