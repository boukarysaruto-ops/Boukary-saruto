
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedGuide, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTextGuide = async (topic: string): Promise<GeneratedGuide> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `Génère un guide textuel complet et structuré sur le sujet suivant : "${topic}". 
  IMPORTANT : Ne te base pas sur des vidéos YouTube. Cherche des sources écrites, académiques, techniques ou officielles.
  Le guide doit être divisé en sections claires avec un titre et un contenu détaillé.
  Retourne les données au format JSON structuré.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  content: { type: Type.STRING }
                },
                required: ["id", "title", "content"]
              }
            }
          },
          required: ["title", "summary", "sections"]
        }
      },
    });

    const resultText = response.text || '{}';
    const parsedData = JSON.parse(resultText);

    // Extract grounding sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri
      }));

    return {
      ...parsedData,
      sources
    };
  } catch (error) {
    console.error("Erreur Gemini Service:", error);
    throw error;
  }
};
