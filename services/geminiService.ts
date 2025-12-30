import { GoogleGenAI } from "@google/genai";
import { TechniqueDef, InnovationMethod } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // split(',') to remove data:image/xxx;base64, prefix
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  });

  return {
    inlineData: { 
      data: await base64EncodedDataPromise, 
      mimeType: file.type 
    },
  };
};

export const generateInnovationAnalysis = async (
  problem: string, 
  technique: TechniqueDef,
  image?: File | null
): Promise<string | string[]> => {
  try {
    // Special handling for Visual Prototyping (Image Generation/Editing)
    if (technique.id === InnovationMethod.VISUAL_PROTOTYPING) {
      if (!image) {
        throw new Error("An image is required for Visual Prototyping. Please upload one.");
      }

      const imagePart = await fileToGenerativePart(image);
      const promptText = problem || "Enhance this image";

      // Generate 4 variations concurrently
      const requests = Array(4).fill(0).map(() => 
        ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              imagePart,
              { text: promptText }
            ]
          },
        })
      );

      // Use allSettled to get as many results as possible even if some fail
      const results = await Promise.allSettled(requests);
      const generatedImages: string[] = [];

      for (const res of results) {
        if (res.status === 'fulfilled') {
          const response = res.value;
          if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData && part.inlineData.data) {
                generatedImages.push(`data:image/png;base64,${part.inlineData.data}`);
                break; // Take first image part from this candidate
              }
            }
          }
        } else {
          console.warn("One image generation request failed:", res.reason);
        }
      }

      if (generatedImages.length > 0) {
        return generatedImages;
      }
      
      throw new Error("Failed to generate any images. Please try again.");
    }

    // Default Text Handling (Gemini 3 Pro)
    const prompt = technique.promptTemplate.replace("{problem}", problem);

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        systemInstruction: "You are a world-class innovation consultant. Your output should be structured, practical, and formatted in clean Markdown. Use bold headings and bullet points for readability.",
      }
    });

    if (response.text) {
      return response.text;
    }
    
    throw new Error("No text returned from Gemini.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate analysis. Please check your connection or API key.");
  }
};