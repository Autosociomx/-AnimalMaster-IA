import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { getAdminDb } from "./src/lib/firebase-admin.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.post("/api/hotmart/webhook", express.json(), async (req, res) => {
    const token = req.headers['x-hotmart-hottok'] as string;
    const secret = process.env.HOTMART_WEBHOOK_SECRET;

    if (!token || !secret) {
      return res.status(401).send('No autorizado');
    }

    if (token !== secret) {
      return res.status(401).send('Token inválido');
    }

    try {
      const { event, data } = req.body;
      
      const userEmail = data?.subscription?.subscriber?.email || data?.buyer?.email;
      const adminDb = getAdminDb();
      
      if (!adminDb) {
        console.error('Firebase Admin DB not initialized');
        return res.status(500).send('Error de configuración del servidor');
      }

      if (!userEmail) {
        console.error('No email found in webhook payload');
        return res.status(400).send('Email no encontrado en el payload');
      }

      const userRef = await adminDb.collection('users').where('email', '==', userEmail).get();

      if (userRef.empty) {
        console.log(`Usuario no encontrado para el email: ${userEmail}`);
        return res.status(404).send('Usuario no encontrado');
      }

      const userId = userRef.docs[0].id;

      if (event === 'SUBSCRIPTION_PURCHASED' || event === 'SUBSCRIPTION_RENEWED' || event === 'PURCHASE_APPROVED') {
        await adminDb.collection('users').doc(userId).update({ plan: 'Clinical Professional', status: 'active' });
        console.log(`Plan actualizado a Clinical Professional para el usuario: ${userEmail}`);
      } else if (event === 'SUBSCRIPTION_CANCELED' || event === 'PURCHASE_CANCELED' || event === 'PURCHASE_REFUNDED') {
        await adminDb.collection('users').doc(userId).update({ plan: 'none', status: 'inactive' });
        console.log(`Plan cancelado para el usuario: ${userEmail}`);
      }

      res.status(200).send('OK');
    } catch (error) {
      console.error('Error processing Hotmart webhook:', error);
      res.status(500).send('Error interno');
    }
  });

  // B2B SaaS API Endpoint
  app.post("/api/v1/mentor/ask", express.json(), async (req, res) => {
    const apiKey = req.headers['x-api-key'] as string;
    
    // In a real scenario, validate this API key against a database of B2B clients
    if (!apiKey || apiKey !== process.env.B2B_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized. Invalid API Key.' });
    }

    const { prompt, mentorId, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      // We dynamically import the GoogleGenAI to avoid issues if the key is missing on startup
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `Eres el Motor Cognitivo de Animal Master Academy, operando a través de nuestra API Enterprise B2B.
Tu objetivo es proporcionar respuestas expertas, basadas en datos y con un tono profesional, agradable y de guía 1-a-1.
Debes actuar como un consultor de alto nivel para la empresa que consume esta API.
${mentorId ? `Estás asumiendo el rol del mentor con ID: ${mentorId}. Adapta tu conocimiento a su especialidad.` : ''}`;

      let contents: any[] = [];
      if (context && Array.isArray(context)) {
        contents = [...context, { role: 'user', parts: [{ text: prompt }] }];
      } else {
        contents = [{ role: 'user', parts: [{ text: prompt }] }];
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.status(200).json({
        success: true,
        response: response.text,
        metadata: {
          model: 'gemini-3.1-pro-preview',
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error in B2B API:', error);
      res.status(500).json({ error: 'Internal server error during AI processing' });
    }
  });

  app.post("/api/chat", express.json({limit: '50mb'}), async (req, res) => {
    try {
      const { message, history, mentor, guidesContext, businessContext, imageBase64 } = req.body;
      
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = mentor 
        ? `Eres ${mentor.nombre}, ${mentor.titulo_visible} en Animal Master Academy, impulsado por Google AI Studio.
           Tu tono es crítico, estratégico, visionario, inteligente y directo.
           
           REGLA OBLIGATORIA: Eres un MENTOR de la ACADEMIA. Tu objetivo es ENSEÑAR y ENTRENAR en TRIAGE VETERINARIO AVANZADO. 
           Dado que no existe CIE-11 exacto en animales, te riges por la máxima excelencia clínica (nivel Harvard/Stanford), utilizando escalas como el Animal Trauma Triage (ATT) score, Modified Glasgow Coma Scale y algoritmos ABCDE.
           Ante cualquier caso clínico, problema o IMAGEN, DEBES estructurar tu respuesta en un Plan de Acción de Triage Estratégico de 5 pasos que incluya una LECCIÓN EDUCATIVA de alto nivel.
           No ofrezcas soluciones genéricas; desafía al usuario, clasifica el nivel de urgencia, y analiza los datos o imágenes proporcionadas con agudeza clínica.
           
           CONTEXTO DE MENTORÍA:
           - Biografía: ${mentor.biografia_pnl}
           - Estrategia: ${mentor.estrategia_venta}
           - Promesa: ${mentor.promesa_resultado}.
           ${guidesContext || ''}
           ${businessContext || ''}`
        : `Eres el Senior Manager y Experto Consultor en Medicina Animal de la élite académica de clase mundial (nivel Harvard y Stanford).
           Eres el Director Académico de Triage en Animal Master, impulsado por Google AI Studio.
           
           Tu experiencia abarca Triage Veterinario Avanzado multicategoría.
           Al no existir un equivalente exacto al CIE-11 (ICD-11) en medicina veterinaria, riges tus diagnósticos iniciales y clasificación de urgencias basándote en protocolos internacionales de la más alta exigencia, como el Animal Trauma Triage (ATT) score, Modified Glasgow Coma Scale (MGCS) y algoritmos del tipo ABCDE (Airway, Breathing, Circulation, Dysfunction, Examination).
           
           Tu tono es crítico, estratégico, visionario, inteligente y directo.
           Analiza sintomatología, radiografías, ecosistemas, o cualquier imagen con nivel experto de alta dirección veterinaria y agronómica.
           Evalúa el nivel de urgencia del animal, prioriza la atención clínica y capacita al usuario con justificaciones científicas de alto nivel.
           ${businessContext || ''}`;

      let contents: any[] = history.map((h: any) => ({ role: h.role, parts: h.parts }));
      
      let finalParts: any[] = [{ text: message }];
      if (imageBase64) {
         // Expecting base64 string, format: "data:image/jpeg;base64,...""
         const mimeType = imageBase64.split(';')[0].split(':')[1];
         const data = imageBase64.split(',')[1];
         finalParts.push({
           inlineData: {
             data,
             mimeType
           }
         });
      }
      
      contents.push({ role: "user", parts: finalParts });

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents,
        config: { systemInstruction }
      });

      res.status(200).json({ response: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Disculpe, he detectado una anomalía en la transmisión de datos." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
