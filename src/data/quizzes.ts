
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  category: string;
  title: string;
  description: string;
  questions: Question[];
  difficulty: 'Principiante' | 'Intermedio' | 'Experto';
}

export const QUIZZES: Quiz[] = [
  {
    id: 'acuicola-01',
    category: 'Acuícola',
    title: 'Maestría en Sistemas Biofloc',
    description: 'Evaluación técnica sobre la gestión de nitrógeno y comunidades microbianas en sistemas cerrados.',
    difficulty: 'Experto',
    questions: [
      {
        id: 'q1',
        text: '¿Cuál es la relación Carbono:Nitrógeno (C:N) ideal para promover el crecimiento de bacterias heterótrofas en un sistema Biofloc?',
        options: ['5:1', '10:1', '15:1 a 20:1', '30:1'],
        correctAnswer: 2,
        explanation: 'Una relación C:N superior a 15:1 es crucial para que las bacterias heterótrofas asimilen el amonio directamente en biomasa bacteriana.'
      },
      {
        id: 'q2',
        text: '¿Qué parámetro es el indicador más crítico de la salud del "floc" en tiempo real?',
        options: ['Color del agua', 'Sólidos sedimentables (Cono Imhoff)', 'Temperatura', 'Salinidad'],
        correctAnswer: 1,
        explanation: 'El volumen de sólidos sedimentables permite ajustar la aireación y el recambio para mantener la comunidad microbiana en niveles óptimos.'
      }
    ]
  },
  {
    id: 'porcina-01',
    category: 'Porcina',
    title: 'Optimización de la Fase de Destete',
    description: 'Examen sobre nutrición de precisión y manejo ambiental en lechones recién destetados.',
    difficulty: 'Intermedio',
    questions: [
      {
        id: 'q1',
        text: '¿A qué temperatura debe mantenerse el área de descanso de los lechones durante la primera semana post-destete?',
        options: ['22°C', '26°C', '30-32°C', '38°C'],
        correctAnswer: 2,
        explanation: 'Los lechones tienen una capacidad termorreguladora limitada; 30-32°C previene el estrés por frío y diarreas mecánicas.'
      },
      {
        id: 'q2',
        text: '¿Cuál es el principal beneficio de la alimentación líquida fermentada en porcinos?',
        options: ['Menor costo de equipo', 'Mejora de la salud intestinal (pH bajo)', 'Mayor desperdicio de alimento', 'Facilidad de limpieza'],
        correctAnswer: 1,
        explanation: 'La fermentación reduce el pH y aumenta los lactobacilos, creando una barrera natural contra patógenos como E. coli.'
      }
    ]
  },
  {
    id: 'canina-01',
    category: 'Canina',
    title: 'Etología Clínica y Modificación de Conducta',
    description: 'Evaluación sobre protocolos de desensibilización y contracondicionamiento.',
    difficulty: 'Experto',
    questions: [
      {
        id: 'q1',
        text: 'En el condicionamiento operante, ¿qué define al "Refuerzo Negativo"?',
        options: ['Dar algo malo', 'Quitar algo bueno', 'Quitar un estímulo aversivo para aumentar una conducta', 'Dar un premio'],
        correctAnswer: 2,
        explanation: 'El refuerzo negativo implica retirar algo que al perro le desagrada cuando realiza la conducta deseada, aumentando la probabilidad de que se repita.'
      },
      {
        id: 'q2',
        text: '¿Cuál es la "zona de umbral" en una terapia de desensibilización?',
        options: ['Cuando el perro ataca', 'El punto exacto antes de que el perro muestre una respuesta reactiva', 'Cuando el perro está dormido', 'Cuando el perro ignora la comida'],
        correctAnswer: 1,
        explanation: 'Trabajar bajo el umbral es vital para que el perro pueda aprender sin entrar en un estado de pánico o estrés agudo.'
      }
    ]
  },
  {
    id: 'equina-01',
    category: 'Equina',
    title: 'Biomecánica y Podología Equina',
    description: 'Análisis del equilibrio del casco y su impacto en el rendimiento deportivo.',
    difficulty: 'Experto',
    questions: [
      {
        id: 'q1',
        text: '¿Qué estructura es responsable de la absorción del 80% del impacto inicial en el paso del caballo?',
        options: ['La muralla', 'La ranilla y los talones', 'El hueso tejuelo', 'El tendón flexor profundo'],
        correctAnswer: 1,
        explanation: 'La ranilla y las almohadillas digitales en los talones son los amortiguadores naturales del sistema locomotor equino.'
      }
    ]
  },
  {
    id: 'aviar-01',
    category: 'Aviar',
    title: 'Bioseguridad y Manejo de Aves de Corral',
    description: 'Evaluación sobre prevención de enfermedades y optimización de la puesta en gallinas.',
    difficulty: 'Intermedio',
    questions: [
      {
        id: 'q1',
        text: '¿Cuál es el fotoperiodo (horas de luz) recomendado para mantener una producción de huevos constante en gallinas ponedoras?',
        options: ['8-10 horas', '12 horas', '14-16 horas', '24 horas'],
        correctAnswer: 2,
        explanation: 'Las gallinas necesitan entre 14 y 16 horas de luz para estimular la glándula pituitaria y mantener la ovulación regular.'
      },
      {
        id: 'q2',
        text: '¿Qué medida es fundamental en un protocolo de bioseguridad aviar para prevenir la Influenza Aviar?',
        options: ['Cambiar el color del alimento', 'Control estricto de visitas y pediluvios con desinfectante', 'Pintar el gallinero de blanco', 'Dar vitaminas cada hora'],
        correctAnswer: 1,
        explanation: 'El control de acceso y la desinfección del calzado son las barreras más efectivas contra la entrada de virus externos al plantel.'
      }
    ]
  },
  {
    id: 'bovina-01',
    category: 'Bovina',
    title: 'Nutrición y Manejo de Ganado de Engorde',
    description: 'Examen sobre formulación de raciones y eficiencia de conversión alimenticia.',
    difficulty: 'Experto',
    questions: [
      {
        id: 'q1',
        text: '¿Qué es el FDN (Fibra Detergente Neutro) y por qué es importante en la dieta bovina?',
        options: ['Es un tipo de proteína', 'Representa la capacidad de llenado del rumen y limita el consumo voluntario', 'Es un mineral esencial', 'Es un aditivo saborizante'],
        correctAnswer: 1,
        explanation: 'El FDN mide la fracción de la pared celular vegetal; niveles muy altos limitan la cantidad de alimento que el animal puede ingerir debido al llenado físico del rumen.'
      },
      {
        id: 'q2',
        text: '¿Cuál es el pH ruminal ideal para la digestión eficiente de la fibra por bacterias celulolíticas?',
        options: ['4.0 - 5.0', '6.2 - 6.8', '7.5 - 8.5', '9.0'],
        correctAnswer: 1,
        explanation: 'Un pH cercano a la neutralidad (6.2-6.8) es óptimo para las bacterias que degradan el forraje. Un pH menor a 6.0 inhibe su crecimiento y puede causar acidosis.'
      }
    ]
  }
];
