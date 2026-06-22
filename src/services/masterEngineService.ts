import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface EngineResult {
  rawText: string;
  source: {
    platform: string;
    type: string; // "Post", "Comment", "DM"
    status: string; // "Unattended", "Replied", "High Demand"
  };
  interpretation: {
    subject: string;
    intention: string;
    urgency: string;
  };
  structure: {
    entity: string; // Generic: "Sujeto/Entidad"
    details: string; // Generic: "Atributos/Contexto"
    need: string; // Generic: "Requerimiento/Necesidad"
    item: string; // Generic: "Elemento/Síntoma"
  };
  diagnosis: {
    causes: { type: string; probability: string }[];
    recommendations: string[];
  };
  syntheticExpansion: {
    scenario: string;
    variation: string;
    insight: string;
  }[];
  response: string;
  dataRow: any;
}

export async function runMasterEngine(input: string | { data: string; mimeType: string }): Promise<EngineResult> {
  const model = "gemini-3-flash-preview";

  // Step 1: Ingestion & OCR + Social Context
  const ingestionResponse = await ai.models.generateContent({
    model,
    contents: typeof input === 'string' 
      ? `Analiza este texto de una publicación de red social (Facebook, TikTok, IG): "${input}". 
         Extrae el texto exacto, la intención (compra, duda, falla, cotización) y el nivel de urgencia.
         Identifica la plataforma probable y si parece ser una consulta sin respuesta (Unattended).
         Responde solo en JSON con las llaves: texto, intencion, urgencia, plataforma, tipo_post, estado.`
      : {
          parts: [
            { inlineData: input },
            { text: `Analiza esta captura de pantalla de una red social. 
                     Busca patrones de demanda real como frases que incluyan: "busco", "necesito", "alguien sabe", "ayuda", "recomiendan", "¿dónde?".
                     Extrae el texto exacto del post o comentario que contiene la demanda.
                     Identifica la intención, urgencia, plataforma probable y si parece desatendida. 
                     Responde solo en JSON con las llaves: texto, intencion, urgencia, plataforma, tipo_post, estado.` }
          ]
        },
    config: { responseMimeType: "application/json" }
  });

  const ingestion = JSON.parse(ingestionResponse.text || "{}");

  // Step 2: Interpretation & Universal Structuring (Niche-Agnostic)
  const structureResponse = await ai.models.generateContent({
    model,
    contents: `A partir del siguiente mensaje: "${ingestion.texto || ingestion.mensaje}", identifica: 
    1. Entidad/Sujeto (El protagonista de la consulta, ej: Perro Pitbull, Aveo 2016, Software ERP)
    2. Atributos (Detalles, Contexto, Especificaciones)
    3. Requerimiento (Falla, Compra, Duda, Cotización)
    4. Elemento/Síntoma (Lo que se busca o lo que falla).
    Responde solo en JSON con las llaves: entity, details, need, item.`,
    config: { responseMimeType: "application/json" }
  });

  const structure = JSON.parse(structureResponse.text || "{}");

  // Step 3: Diagnosis & Technical Intelligence (Universal Expert)
  const diagnosisResponse = await ai.models.generateContent({
    model,
    contents: `Actúa como un experto técnico de élite universal. Dado el Sujeto: ${structure.entity} y el Requerimiento/Síntoma: ${structure.item}, genera 3 posibles causas con probabilidad y 3 recomendaciones técnicas de alto nivel. Responde solo en JSON con las llaves: causes (array de {type, probability}) y recommendations (array de strings).`,
    config: { responseMimeType: "application/json" }
  });

  const diagnosis = JSON.parse(diagnosisResponse.text || "{}");

  // Step 4: Hybrid Data Strategy (Synthetic Expansion - 30% Synthetic)
  const syntheticResponse = await ai.models.generateContent({
    model,
    contents: `Basado en este caso real de ${ingestion.plataforma}: "${ingestion.texto || ingestion.mensaje}", genera 3 escenarios sintéticos similares pero con variaciones en el contexto o problema para acelerar el aprendizaje del sistema. Responde solo en JSON como un array de objetos con las llaves: scenario, variation, insight.`,
    config: { responseMimeType: "application/json" }
  });

  const syntheticExpansion = JSON.parse(syntheticResponse.text || "[]");

  // Step 5: Monetization (Universal Solution Routing)
  const solutionResponse = await ai.models.generateContent({
    model,
    contents: `Actúa como el cerebro de la Inteligencia Universal. 
    Analiza este caso: "${ingestion.texto || ingestion.mensaje}".
    
    REGLAS DE ENRUTAMIENTO:
    1. Si el problema es sobre animales (salud, comportamiento, entrenamiento): Sugiere "Animal Master Academy" como la solución definitiva.
    2. Si el problema es sobre vehículos (fallas, piezas, mantenimiento): Sugiere "AutoSocio" como la solución definitiva.
    3. Si es otro nicho: Sugiere una solución técnica experta genérica.

    Genera una respuesta para la plataforma ${ingestion.plataforma}. 
    Objetivo: Ayudar primero, mostrar autoridad técnica, mencionar la solución específica (Animal Master o AutoSocio) y llevar a mensaje privado (DM). 
    Usa un tono humano, profesional y empático. 
    Datos técnicos para incluir: ${JSON.stringify({ structure, diagnosis })}`
  });

  // Step 6: Dataset Row (Learning/Optimization)
  const dataRow = {
    timestamp: new Date().toISOString(),
    plataforma: ingestion.plataforma || "Desconocida",
    estado: ingestion.estado || "Unattended",
    mensaje: ingestion.texto || ingestion.mensaje,
    intencion: ingestion.intencion,
    entidad: structure.entity,
    requerimiento: structure.need,
    elemento: structure.item,
    solucion_sugerida: structure.entity?.toLowerCase().includes('perro') || structure.entity?.toLowerCase().includes('gato') || structure.entity?.toLowerCase().includes('animal') ? 'Animal Master' : (structure.entity?.toLowerCase().includes('auto') || structure.entity?.toLowerCase().includes('carro') || structure.entity?.toLowerCase().includes('vehiculo') ? 'AutoSocio' : 'Universal'),
    estrategia: "Inteligencia Universal (Mapeo de Oportunidad)",
    confianza: "Alta (IA Validada)"
  };

  return {
    rawText: ingestion.texto || ingestion.mensaje,
    source: {
      platform: ingestion.plataforma || "Desconocida",
      type: ingestion.tipo_post || "Post",
      status: ingestion.estado || "Unattended"
    },
    interpretation: {
      subject: structure.entity || "No detectado",
      intention: ingestion.intencion,
      urgency: ingestion.urgency
    },
    structure: {
      entity: structure.entity,
      details: structure.details,
      need: structure.need,
      item: structure.item
    },
    diagnosis: {
      causes: diagnosis.causes || [],
      recommendations: diagnosis.recommendations || []
    },
    syntheticExpansion: Array.isArray(syntheticExpansion) ? syntheticExpansion : [],
    response: solutionResponse.text || "",
    dataRow
  };
}
