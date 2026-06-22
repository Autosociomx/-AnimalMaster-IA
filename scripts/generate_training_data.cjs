const fs = require('fs');

// Matriz de Variables para generar miles de combinaciones
const usuarios = [
  "Dueño de finca pequeña",
  "Gerente de producción avícola",
  "Criador de caballos de paso",
  "Estudiante de veterinaria",
  "Inversor ganadero",
  "Cuidador de zoológico",
  "Propietario de mascotas exóticas",
  "Productor lechero",
  "Nutricionista animal",
  "Administrador de rancho",
  "Transportista de ganado",
  "Juez de equitación",
  "Asesor genético",
  "Propietario de tienda de mascotas",
  "Administrador de refugio animal"
];

const animales = [
  "vacas lecheras (Holstein)",
  "ganado de engorde (Angus)",
  "caballos de carrera",
  "caballos de paso fino",
  "gallinas ponedoras",
  "pollos de engorde",
  "cerdos de cría",
  "ovejas y cabras",
  "loros y guacamayas",
  "halcones y aves rapaces",
  "cerdos de engorde",
  "bovinos de doble propósito",
  "caballos de salto",
  "conejos de cría",
  "peces tilapia (acuicultura)"
];

const situaciones = [
  {
    problema: "caída repentina en la producción",
    contexto: "desde hace 3 días, sin cambios aparentes en el clima",
    emocion: "preocupado por las pérdidas económicas"
  },
  {
    problema: "síntomas de cólico o dolor abdominal",
    contexto: "después de un cambio reciente en la dieta",
    emocion: "urgente, necesita saber si llamar al veterinario inmediatamente"
  },
  {
    problema: "agresividad inusual entre los animales",
    contexto: "en un espacio confinado o durante la alimentación",
    emocion: "frustrado y buscando técnicas de manejo"
  },
  {
    problema: "baja tasa de conversión alimenticia",
    contexto: "los costos de alimento suben pero el peso no aumenta",
    emocion: "analítico, buscando optimizar el ROI"
  },
  {
    problema: "problemas respiratorios leves",
    contexto: "en un grupo de animales jóvenes",
    emocion: "cauteloso, buscando prevención antes de que empeore"
  },
  {
    problema: "planificación de la temporada de cría",
    contexto: "buscando mejorar la genética del rebaño/parvada",
    emocion: "estratégico y con visión a futuro"
  },
  {
    problema: "transición a pastoreo rotacional",
    contexto: "para mejorar la sostenibilidad de la finca",
    emocion: "curioso y dispuesto a aprender nuevas metodologías"
  },
  {
    problema: "estrés térmico por ola de calor",
    contexto: "temperaturas récord pronosticadas para la próxima semana",
    emocion: "buscando medidas preventivas urgentes"
  },
  {
    problema: "signos de mastitis subclínica",
    contexto: "en el último control lechero",
    emocion: "preocupado por la calidad del producto"
  },
  {
    problema: "brote sospechoso de enfermedad infecciosa",
    contexto: "con alta mortalidad en la granja vecina",
    emocion: "en pánico y buscando bioseguridad urgente"
  },
  {
    problema: "baja tasa de eclosión o natalidad",
    contexto: "a pesar de mantener condiciones ambientales constantes",
    emocion: "confundido y buscando errores de manejo"
  },
  {
    problema: "cojeras recurrentes",
    contexto: "en época de lluvias intensas y exceso de barro",
    emocion: "frustrado por los altos costos de tratamiento"
  }
];

const tonosRespuesta = [
  "Empático y directo, dando pasos de acción inmediatos.",
  "Analítico y basado en datos, explicando el 'por qué' detrás del problema.",
  "Educativo y paciente, guiando al usuario a través de un proceso de diagnóstico.",
  "Estratégico y enfocado en el negocio, calculando el impacto financiero."
];

// Función para generar un prompt y una respuesta simulada
function generarInteraccion(usuario, animal, situacion, tono) {
  const prompt = `Soy un ${usuario}. Tengo un problema con mis ${animal}. He notado una ${situacion.problema} ${situacion.contexto}. Estoy ${situacion.emocion}. ¿Qué debo hacer?`;
  
  // Aquí simulamos la estructura de la respuesta ideal (Fondo de Respuesta)
  const respuesta = `[Tono: ${tono}] Hola. Entiendo perfectamente tu situación como ${usuario} y la preocupación que genera la ${situacion.problema} en tus ${animal}. 
Paso 1: Evaluación inmediata. Dado que esto ocurre ${situacion.contexto}, lo primero es aislar las variables.
Paso 2: Diagnóstico diferencial. Podría deberse a factores nutricionales, estrés ambiental o un patógeno emergente.
Paso 3: Acción recomendada. Te sugiero implementar [Medida Específica] y monitorear durante 24 horas. Si la situación persiste, contacta a tu especialista local. Estoy aquí para hacer seguimiento a tus ${animal}.`;

  return {
    messages: [
      { role: "user", content: prompt },
      { role: "model", content: respuesta }
    ]
  };
}

// Generar el dataset
const dataset = [];
let contador = 0;

console.log("Generando matriz de escenarios...");

for (const u of usuarios) {
  for (const a of animales) {
    for (const s of situaciones) {
      for (const t of tonosRespuesta) {
        dataset.push(generarInteraccion(u, a, s, t));
        contador++;
      }
    }
  }
}

// Guardar en formato JSONL (ideal para Fine-Tuning en Google AI Studio)
const jsonlData = dataset.map(item => JSON.stringify(item)).join('\n');

fs.writeFileSync('training_dataset.jsonl', jsonlData);

console.log(`¡Éxito! Se han generado ${contador} escenarios únicos de entrenamiento en 'training_dataset.jsonl'.`);
console.log(`Este archivo está listo para ser subido a Google AI Studio para hacer Fine-Tuning del modelo.`);
