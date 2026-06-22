import { GoogleGenAI } from "@google/genai";
import { Mentor, Guide } from "../data/content";
import { BusinessVault } from "./firestoreService";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getMentorResponse(
  message: string, 
  history: { role: string, parts: { text: string }[] }[], 
  mentor?: Mentor | null,
  relevantGuides?: Guide[],
  businessVault?: BusinessVault | null,
  imageBase64?: string
) {
  try {
    const guidesContext = relevantGuides && relevantGuides.length > 0
      ? `\nCONTENIDO TÉCNICO A ENSEÑAR (Currículum de ${mentor?.category}):\n${relevantGuides.map(g => `- ${g.title}: ${g.topics.join(', ')}`).join('\n')}`
      : undefined;

    const businessContext = businessVault 
      ? `\nDATOS DEL NEGOCIO DEL USUARIO (Bóveda Alquimia CX):\n- Empresa: ${businessVault.businessName}\n- Nicho: ${businessVault.niche}\n- Desafíos: ${businessVault.challenges.join(', ')}\n- Activos: ${businessVault.assets.map(a => a.name).join(', ')}`
      : undefined;

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        history,
        mentor,
        guidesContext,
        businessContext,
        imageBase64
      })
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Gemini API Proxy Error:", error);
    return "Disculpe, he detectado una anomalía en la transmisión de datos. Por favor, reintente su consulta técnica.";
  }
}
