
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiHealthInsight } from "../types";

const getClient = () => {
    // NOTE: In a production environment, never expose your API key in client-side code.
    // 1. Ideally, use a backend proxy to handle API calls.
    // 2. If client-side is necessary, restrict the API key in Google Cloud Console 
    //    to your specific domain (HTTP Referrer restriction) to prevent unauthorized use.
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
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
    // Fallback if no API key
    return null;
  }

  const targetLanguage = lang === 'th' ? 'Thai' : 'English';

  const prompt = `
    Analyze the air quality for ${location}.
    Current US AQI: ${aqi}.
    PM2.5: ${pm25} μg/m³.
    Ozone: ${ozone} μg/m³.
    
    Provide a JSON response in the ${targetLanguage} language with:
    1. A short 1-sentence punchy summary of the air quality situation.
    2. The tone should be helpful but brutally honest.
    
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