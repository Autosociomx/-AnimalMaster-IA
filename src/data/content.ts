export interface Course {
  id: string;
  category: 'Porcine' | 'Bovine' | 'Canine' | 'Feline' | 'Equine' | 'Aquaculture' | 'Avian' | 'SpecialtyPets';
  title: string;
  description: string;
  learningObjectives: string[];
  targetAudience: string;
  prerequisites: string;
  format: string;
  imageUrl: string;
  videoUrl?: string;
  duration: string;
  level: 'Guía de Inmersión' | 'Curso de Especialidad' | 'Maestría de Élite';
}

export const COURSES: Course[] = [
  {
    id: 'canine-101',
    category: 'Canine',
    title: 'Maestría en Psicología Canina Moderna',
    description: 'Un viaje profundo a la mente de tu mejor amigo. Este curso desglosa los últimos descubrimientos en neurociencia aplicada al comportamiento canino, permitiéndote entender no solo qué hace tu perro, sino por qué lo hace.',
    learningObjectives: [
      'Interpretar micro-expresiones y lenguaje corporal sutil.',
      'Implementar técnicas de refuerzo positivo basadas en la dopamina.',
      'Resolver conflictos de convivencia mediante la comunicación no verbal.',
      'Diseñar planes de enriquecimiento cognitivo personalizados.'
    ],
    targetAudience: 'Dueños de mascotas comprometidos, entrenadores principiantes y personal de refugios.',
    prerequisites: 'Ninguno. Solo pasión por los perros.',
    format: 'Lecciones en video 4K, webinars en vivo mensuales y guías descargables.',
    imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1df0?q=80&w=2071&auto=format&fit=crop',
    duration: '12 horas de contenido',
    level: 'Guía de Inmersión'
  },
  {
    id: 'equine-201',
    category: 'Equine',
    title: 'Biomecánica y Doma de Alta Escuela',
    description: 'Domina la conexión invisible entre jinete y caballo. Este curso técnico se enfoca en la optimización del movimiento y la respuesta neurológica del equino para alcanzar niveles de competición de élite.',
    learningObjectives: [
      'Analizar la biomecánica del paso, trote y galope.',
      'Sincronizar las ayudas del jinete con el ritmo cardíaco del caballo.',
      'Prevenir lesiones mediante el fortalecimiento propioceptivo.',
      'Desarrollar una "mano de seda" mediante la sintonización neuro-equina.'
    ],
    targetAudience: 'Jinetes experimentados, criadores de caballos de deporte y veterinarios equinos.',
    prerequisites: 'Experiencia previa en equitación básica y manejo de cuadra.',
    format: 'Clases magistrales en video, análisis de video 1-a-1 y manuales técnicos.',
    imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2071&auto=format&fit=crop',
    duration: '20 horas de contenido',
    level: 'Curso de Especialidad'
  },
  {
    id: 'porcine-301',
    category: 'Porcine',
    title: 'Ingeniería de Producción Porcina de Precisión',
    description: 'Transforma tu granja en una operación de alto rendimiento. Aprende a utilizar datos biométricos e inteligencia artificial para maximizar la eficiencia, la salud y el bienestar en la producción porcina industrial.',
    learningObjectives: [
      'Optimizar el microbioma ruminal para una conversión alimenticia superior.',
      'Implementar sistemas de monitoreo ambiental automatizados.',
      'Gestionar la genética de linaje para resistencia a enfermedades.',
      'Maximizar el ROI mediante el análisis predictivo de mercado.'
    ],
    targetAudience: 'Gerentes de granjas industriales, ingenieros agrónomos y grandes inversores del sector.',
    prerequisites: 'Conocimientos avanzados en zootecnia o administración agropecuaria.',
    format: 'Módulos interactivos, simulaciones de gestión y consultoría estratégica grupal.',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=2073&auto=format&fit=crop',
    duration: '40 horas de contenido',
    level: 'Maestría de Élite'
  },
  {
    id: 'feline-102',
    category: 'Feline',
    title: 'Etología Felina y Enriquecimiento de Hábitat',
    description: 'Descubre el mundo secreto de los gatos. Este curso te enseña a transformar cualquier espacio en un paraíso felino que satisfaga sus instintos ancestrales y elimine problemas de comportamiento comunes.',
    learningObjectives: [
      'Mapear el territorio felino para reducir el estrés.',
      'Implementar juegos de caza simulada para estimulación mental.',
      'Entender la comunicación química (feromonas) y su impacto.',
      'Resolver problemas de marcaje y agresividad territorial.'
    ],
    targetAudience: 'Dueños de gatos, cuidadores profesionales y arquitectos de interiores "pet-friendly".',
    prerequisites: 'Ninguno.',
    format: 'Video tutoriales prácticos, guías de diseño de interiores y acceso a foro de expertos.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop',
    duration: '8 horas de contenido',
    level: 'Guía de Inmersión'
  },
  {
    id: 'bovine-202',
    category: 'Bovine',
    title: 'Gestión de Ganadería Regenerativa y Sostenible',
    description: 'Lidera la revolución verde en el campo. Aprende técnicas de pastoreo rotativo y manejo holístico que mejoran la salud del suelo, aumentan la calidad de la carne/leche y combaten el cambio climático.',
    learningObjectives: [
      'Diseñar sistemas de pastoreo rotativo de alta densidad.',
      'Restaurar la biodiversidad del suelo mediante el manejo animal.',
      'Reducir la dependencia de insumos químicos externos.',
      'Certificar tu producción bajo estándares de sostenibilidad global.'
    ],
    targetAudience: 'Ganaderos tradicionales buscando modernización, consultores ambientales y estudiantes de agronomía.',
    prerequisites: 'Conocimientos básicos de manejo de ganado.',
    format: 'Documentales educativos, hojas de cálculo de planificación y visitas virtuales a granjas modelo.',
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=2002&auto=format&fit=crop',
    duration: '25 horas de contenido',
    level: 'Curso de Especialidad'
  },
  {
    id: 'specialty-302',
    category: 'SpecialtyPets',
    title: 'Crianza de Élite de Especies Exóticas',
    description: 'El pináculo de la zootecnia de especialidad. Este curso cubre los protocolos más estrictos para la cría y conservación de especies no convencionales, desde reptiles raros hasta pequeños mamíferos de linaje premium.',
    learningObjectives: [
      'Controlar microclimas con precisión de laboratorio.',
      'Dominar la nutrición específica para especies exóticas.',
      'Gestionar la genética de poblaciones pequeñas.',
      'Navegar el marco legal internacional (CITES) para el comercio ético.'
    ],
    targetAudience: 'Criadores profesionales, conservacionistas y coleccionistas de alto nivel.',
    prerequisites: 'Experiencia demostrable en el manejo de la especie específica.',
    format: 'Webinars técnicos avanzados, acceso a base de datos de genética y mentoría 1-a-1.',
    imageUrl: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=1974&auto=format&fit=crop',
    duration: '50 horas de contenido',
    level: 'Maestría de Élite'
  }
];

export interface Guide {
  id: string;
  category: 'Porcine' | 'Bovine' | 'Canine' | 'Feline' | 'Equine' | 'Aquaculture' | 'Avian' | 'SpecialtyPets';
  title: string;
  pages: number;
  level: 'Guía de Inmersión' | 'Curso de Especialidad' | 'Maestría de Élite';
  topics: string[];
  pdfUrl: string;
}

export const ANIMAL_GUIDES: Guide[] = [
  // Porcine
  { id: 'porcine-1', category: 'Porcine', title: 'Bio-Rendimiento Porcino: El Blueprint', pages: 42, level: 'Guía de Inmersión', topics: ['Descodificación del estrés ambiental', 'Arquitectura de instalaciones', 'Genética de alto rendimiento', 'Nutrición metabólica'], pdfUrl: '/pdfs/porcine-1.pdf' },
  { id: 'porcine-2', category: 'Porcine', title: 'Fortaleza Inmunológica y Bioseguridad', pages: 45, level: 'Curso de Especialidad', topics: ['Psicología del flujo de trabajo', 'Zonificación estricta', 'Protocolos de cuarentena', 'Vigilancia serológica'], pdfUrl: '/pdfs/porcine-2.pdf' },
  { id: 'porcine-3', category: 'Porcine', title: 'Neuro-Maternidad y Supervivencia Neonatal', pages: 48, level: 'Maestría de Élite', topics: ['Optimización del entorno de parto', 'Inducción hormonal', 'Impronta neonatal', 'Fostering estratégico'], pdfUrl: '/pdfs/porcine-3.pdf' },
  
  // Canine
  { id: 'canine-1', category: 'Canine', title: 'Neuro-Semántica del Lenguaje Canino', pages: 25, level: 'Guía de Inmersión', topics: ['Descodificación de micro-expresiones', 'Reactividad vs. proactividad', 'Lectura de estados de conciencia'], pdfUrl: '/pdfs/canine-1.pdf' },
  { id: 'canine-2', category: 'Canine', title: 'Arquitectura del Refuerzo Neuro-Asociativo', pages: 32, level: 'Guía de Inmersión', topics: ['Ingeniería del condicionamiento operante', 'Manipulación de la dopamina', 'Jerarquía de anclajes emocionales'], pdfUrl: '/pdfs/canine-2.pdf' },
  { id: 'canine-3', category: 'Canine', title: 'Protocolos de Obediencia de Alto Impacto', pages: 28, level: 'Guía de Inmersión', topics: ['Instalación de comandos', 'Obediencia a devoción voluntaria', 'Resolución de bloqueos'], pdfUrl: '/pdfs/canine-3.pdf' },
  { id: 'canine-4', category: 'Canine', title: 'Reestructuración de la Ansiedad por Separación', pages: 35, level: 'Curso de Especialidad', topics: ['Desprogramación de traumas', 'Protocolos de desensibilización', 'Diseño de entornos seguros'], pdfUrl: '/pdfs/canine-4.pdf' },
  { id: 'canine-5', category: 'Canine', title: 'Gestión de la Reactividad y Agresión', pages: 38, level: 'Curso de Especialidad', topics: ['Mapeo de detonantes', 'Modificación de umbrales', 'Técnicas de desactivación'], pdfUrl: '/pdfs/canine-5.pdf' },

  // Feline
  { id: 'feline-1', category: 'Feline', title: 'Neuro-Etología Felina Aplicada', pages: 30, level: 'Guía de Inmersión', topics: ['Comportamiento territorial', 'Manejo de estrés ambiental', 'Enriquecimiento cognitivo'], pdfUrl: '/pdfs/feline-1.pdf' },
  { id: 'feline-2', category: 'Feline', title: 'Medicina Felina de Alta Precisión', pages: 45, level: 'Curso de Especialidad', topics: ['Diagnóstico temprano', 'Manejo del dolor', 'Anestesia especializada'], pdfUrl: '/pdfs/feline-2.pdf' },

  // Equine
  { id: 'equine-1', category: 'Equine', title: 'Sintonización Neuro-Equina', pages: 30, level: 'Guía de Inmersión', topics: ['Bio-retroalimentación', 'Dinámicas de liderazgo', 'Interpretación de tensión muscular'], pdfUrl: '/pdfs/equine-1.pdf' },
  { id: 'equine-2', category: 'Equine', title: 'Bio-Nutrición y Rendimiento Equino', pages: 42, level: 'Guía de Inmersión', topics: ['Optimización del microbioma', 'Suplementación', 'Recuperación metabólica'], pdfUrl: '/pdfs/equine-2.pdf' },
  { id: 'equine-3', category: 'Equine', title: 'Intervención Táctica en Crisis Equinas', pages: 45, level: 'Guía de Inmersión', topics: ['Manejo del pánico', 'Estabilización neurológica', 'Triaje avanzado'], pdfUrl: '/pdfs/equine-3.pdf' },
  { id: 'equine-4', category: 'Equine', title: 'Biomecánica y Doma de Alta Escuela', pages: 50, level: 'Curso de Especialidad', topics: ['Sincronización jinete-caballo', 'Propiocepción', 'Reflejos condicionados'], pdfUrl: '/pdfs/equine-4.pdf' },
  { id: 'equine-5', category: 'Equine', title: 'Ingeniería Reproductiva Equina', pages: 55, level: 'Maestría de Élite', topics: ['Ciclos hormonales', 'Optimización de la fertilidad', 'Programación fetal'], pdfUrl: '/pdfs/equine-5.pdf' },

  // Bovine
  { id: 'bovine-1', category: 'Bovine', title: 'Diseño de Entornos de Bajo Estrés', pages: 40, level: 'Guía de Inmersión', topics: ['Arquitectura de instalaciones', 'Psicología del rebaño', 'Reducción del cortisol'], pdfUrl: '/pdfs/bovine-1.pdf' },
  { id: 'bovine-2', category: 'Bovine', title: 'Optimización Metabólica Lechera', pages: 48, level: 'Curso de Especialidad', topics: ['Ingeniería del microbioma ruminal', 'Alimentación de precisión', 'Prevención de trastornos'], pdfUrl: '/pdfs/bovine-2.pdf' },
  
  // Aquaculture
  { id: 'aquaculture-1', category: 'Aquaculture', title: 'Sistemas Acuícolas de Alta Densidad', pages: 45, level: 'Guía de Inmersión', topics: ['Bio-filtración avanzada', 'Manejo del estrés osmótico', 'Alimentación de precisión'], pdfUrl: '/pdfs/aquaculture-1.pdf' },
  
  // Avian
  { id: 'avian-1', category: 'Avian', title: 'Bio-Rendimiento en Producción Aviar', pages: 35, level: 'Guía de Inmersión', topics: ['Manipulación del fotoperiodo', 'Entornos libres de estrés', 'Nutrición de precisión'], pdfUrl: '/pdfs/avian-1.pdf' },
  
  // Specialty Pets
  { id: 'specialty-pets-1', category: 'SpecialtyPets', title: 'Mascotas de Especialidad: El Blueprint de Crianza', pages: 30, level: 'Guía de Inmersión', topics: ['Nutrición avanzada', 'Manejo de estrés en especies menores', 'Arquitectura de hábitats de lujo'], pdfUrl: '/pdfs/specialty-pets-1.pdf' },
  { id: 'specialty-pets-2', category: 'SpecialtyPets', title: 'Medicina Preventiva en Especies de Compañía No Convencionales', pages: 35, level: 'Curso de Especialidad', topics: ['Protocolos de salud integral', 'Control biológico', 'Diagnóstico clínico avanzado'], pdfUrl: '/pdfs/specialty-pets-2.pdf' },
  { id: 'specialty-pets-3', category: 'SpecialtyPets', title: 'Genética y Selección en Especies de Élite', pages: 40, level: 'Maestría de Élite', topics: ['Mapeo genético de precisión', 'Selección de caracteres de linaje', 'Optimización de la descendencia premium'], pdfUrl: '/pdfs/specialty-pets-3.pdf' }
];

export interface Mentor {
  id: string;
  category: 'Porcine' | 'Bovine' | 'Canine' | 'Feline' | 'Equine' | 'Aquaculture' | 'Avian' | 'SpecialtyPets';
  nombre: string;
  titulo_visible: string;
  especialidad_neuro: string;
  biografia_pnl: string;
  anclaje_credibilidad: string;
  promesa_resultado: string;
  estrategia_venta: string;
  foto_url: string;
  tags: string[];
  metrics: {
    userRating: number;
    resolutionRate: number;
    retentionRate: number;
    knowledgeUpdate: number;
    innovation: number;
  };
}

const getMentorProfile = (index: number, category: string): Omit<Mentor, 'id' | 'nombre' | 'category'> => {
  const catName = {
    Porcine: 'Porcina',
    Bovine: 'Bovina',
    Canine: 'Canina',
    Feline: 'Felina',
    Equine: 'Equina',
    Aquaculture: 'Acuícola',
    Avian: 'Aviar',
    SpecialtyPets: 'Mascotas de Especialidad'
  }[category as keyof typeof MENTORS] || category;

  const profiles = [
    {
      titulo_visible: `Mentor Guía en Producción ${catName}`,
      especialidad_neuro: 'Acompañamiento 1-a-1 y Evolución Continua',
      biografia_pnl: `Mi enfoque no es solo entregarte información, sino caminar a tu lado. Como tu guía personal en el mundo ${catName.toLowerCase()}, me dedico a hacer un seguimiento constante de tu progreso. Te enseñaré sobre el camino, asegurándome de que cada paso que des esté respaldado por mi experiencia. Ya sea que trabajes con grandes mamíferos, especies de compañía de especialidad o con la delicadeza de los pájaros y las aves, mi objetivo es que sientas un apoyo agradable, cercano y transformador en tu día a día.`,
      anclaje_credibilidad: `Especialista en mentoría 1-a-1 y seguimiento continuo. Creador de programas de formación empática y técnica.`,
      promesa_resultado: `Te guiaré paso a paso, haciendo un seguimiento constante para asegurar que domines la producción ${catName.toLowerCase()} de manera fluida y agradable.`,
      estrategia_venta: `Mi estrategia es la empatía y el acompañamiento. Te demostraré cómo un seguimiento 1-a-1 y una guía constante aceleran tu aprendizaje mucho más que la teoría aislada. Vendo transformación acompañada, no solo datos.`,
      foto_url: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop',
      tags: ['Guía 1-a-1', 'Seguimiento', 'Enseñanza Práctica'],
      metrics: { userRating: 4.9, resolutionRate: 98, retentionRate: 95, knowledgeUpdate: 99, innovation: 96 }
    },
    {
      titulo_visible: `Especialista Clínico y Guía ${catName}`,
      especialidad_neuro: 'Enseñanza en el Camino y Seguimiento Clínico',
      biografia_pnl: `Dominar la sanidad en el sector ${catName.toLowerCase()} requiere más que cuidado; requiere un guía que te enseñe mientras avanzas. Mi mentoría se centra en el uno a uno, brindándote un espacio agradable donde el error es parte del aprendizaje. Desde el manejo de rebaños, mascotas de especialidad hasta el cuidado meticuloso de pájaros y aves, estaré ahí para hacer seguimiento a tus casos, enseñándote a ver lo que los libros no muestran.`,
      anclaje_credibilidad: `Ha guiado a cientos de profesionales en su desarrollo clínico mediante seguimiento personalizado 1-a-1.`,
      promesa_resultado: `Adquirirás mi visión clínica a través de un acompañamiento agradable y constante, asegurando la salud de tu producción ${catName.toLowerCase()}.`,
      estrategia_venta: `Mi enfoque es ser tu guía personal. Te mostraré cómo tener a un experto haciendo seguimiento a tus decisiones te ahorra años de ensayo y error. Vendo la seguridad de nunca caminar solo en tu desarrollo profesional.`,
      foto_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
      tags: ['Acompañamiento', 'Visión Clínica', 'Empatía'],
      metrics: { userRating: 4.8, resolutionRate: 96, retentionRate: 92, knowledgeUpdate: 95, innovation: 98 }
    },
    {
      titulo_visible: `Maestro Guía en Etología ${catName}`,
      especialidad_neuro: 'Conexión Empática y Seguimiento Conductual',
      biografia_pnl: `Conocer el comportamiento de la especie ${catName.toLowerCase()} requiere una sensibilidad especial. Como tu maestro y guía, mi enfoque es 100% uno a uno. Te enseñaré sobre el camino a interpretar las señales más sutiles, desde grandes animales, mascotas de especialidad hasta el complejo lenguaje de los pájaros y las aves. Haremos un seguimiento agradable y profundo de tu evolución, asegurando que desarrolles una intuición experta de forma natural y acompañada.`,
      anclaje_credibilidad: `Experto en etología aplicada con un enfoque único en la enseñanza 1-a-1 and el seguimiento conductual a largo plazo.`,
      promesa_resultado: `Desarrollarás una sensibilidad experta mediante mi guía constante y seguimiento personalizado, logrando una conexión real con los animales.`,
      estrategia_venta: `Mi propuesta de valor se basa en ser tu guía en el fascinante mundo del comportamiento animal. Te haré experimentar un aprendizaje agradable y continuo. Vendo la maestría que solo se alcanza cuando alguien te enseña a observar el camino.`,
      foto_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
      tags: ['Manejo Sutil', 'Guía Conductual', 'Intuición Experta'],
      metrics: { userRating: 5.0, resolutionRate: 99, retentionRate: 98, knowledgeUpdate: 100, innovation: 97 }
    }
  ];
  return profiles[index];
};

export const MENTORS: Record<Guide['category'], Mentor[]> = {
  Porcine: [
    { ...getMentorProfile(0, 'Porcine'), id: 'p1', category: 'Porcine', nombre: 'Dr. Elena Rodriguez' },
    { ...getMentorProfile(1, 'Porcine'), id: 'p2', category: 'Porcine', nombre: 'Dr. Marco Silva' },
    { ...getMentorProfile(2, 'Porcine'), id: 'p3', category: 'Porcine', nombre: 'Dra. Ana Lopez' },
  ],
  Bovine: [
    { ...getMentorProfile(0, 'Bovine'), id: 'b1', category: 'Bovine', nombre: 'Ing. Carlos Mendez' },
    { ...getMentorProfile(1, 'Bovine'), id: 'b2', category: 'Bovine', nombre: 'Dr. Juan Perez' },
    { ...getMentorProfile(2, 'Bovine'), id: 'b3', category: 'Bovine', nombre: 'Ing. Maria Garcia' },
  ],
  Canine: [
    { ...getMentorProfile(0, 'Canine'), id: 'c1', category: 'Canine', nombre: 'Dra. Sarah Jenkins' },
    { ...getMentorProfile(1, 'Canine'), id: 'c2', category: 'Canine', nombre: 'Dr. Tom Wilson' },
    { ...getMentorProfile(2, 'Canine'), id: 'c3', category: 'Canine', nombre: 'Dra. Lisa Ray' },
    {
      id: 'c4',
      category: 'Canine',
      nombre: 'Dr. Marcus Thorne',
      titulo_visible: 'Guía Especialista en Rehabilitación Conductual',
      especialidad_neuro: 'Desensibilización y Recuperación de Trauma',
      biografia_pnl: 'Mi vocación es sanar las heridas invisibles. Como tu guía 1-a-1, te acompañaré en el delicado proceso de rehabilitar perros con ansiedad severa o traumas. Apoyado por la IA de Animal Master, haremos un seguimiento diario de los umbrales de tolerancia de tu perro. Te enseñaré sobre el camino a leer sus señales de calma, celebrando cada pequeño avance en un entorno seguro y empático.',
      anclaje_credibilidad: 'Más de 15 años rehabilitando casos críticos. Pionero en el uso de datos biométricos para medir el estrés canino.',
      promesa_resultado: 'Recuperarás la confianza de tu perro a través de un acompañamiento paciente, constante y guiado paso a paso.',
      estrategia_venta: 'Te ofrezco la tranquilidad de no enfrentar los problemas de comportamiento solo. Mi seguimiento continuo garantiza que ajustemos la estrategia en tiempo real.',
      foto_url: 'https://images.unsplash.com/photo-1537151608804-ea6f11840f00?q=80&w=2070&auto=format&fit=crop',
      tags: ['Rehabilitación', 'Trauma', 'Paciencia'],
      metrics: { userRating: 4.9, resolutionRate: 94, retentionRate: 97, knowledgeUpdate: 98, innovation: 95 }
    },
    {
      id: 'c5',
      category: 'Canine',
      nombre: 'Instructora Valeria Costa',
      titulo_visible: 'Guía de Alto Rendimiento Canino',
      especialidad_neuro: 'Optimización Cognitiva y Deportiva',
      biografia_pnl: 'El alto rendimiento requiere precisión y un guía que entienda el potencial de tu perro. Trabajaremos 1-a-1 para potenciar las habilidades de perros de trabajo, deporte o asistencia. Utilizando el análisis de datos de nuestra IA, mediremos su progreso y ajustaremos las cargas de trabajo. Te enseñaré a comunicarte con una claridad absoluta, haciendo del entrenamiento un proceso agradable y altamente estimulante.',
      anclaje_credibilidad: 'Entrenadora de perros campeones en agilidad y unidades de búsqueda y rescate a nivel internacional.',
      promesa_resultado: 'Alcanzarás el máximo potencial cognitivo y físico de tu perro mediante un entrenamiento estructurado, medible y empático.',
      estrategia_venta: 'Vendo resultados medibles. Con nuestro seguimiento impulsado por IA, verás la evolución de tu perro en gráficos de rendimiento reales.',
      foto_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop',
      tags: ['Alto Rendimiento', 'Deporte Canino', 'Precisión'],
      metrics: { userRating: 4.8, resolutionRate: 97, retentionRate: 93, knowledgeUpdate: 99, innovation: 98 }
    },
    {
      id: 'c6',
      category: 'Canine',
      nombre: 'Dra. Emily Chen',
      titulo_visible: 'Mentora en Desarrollo Temprano Canino',
      especialidad_neuro: 'Impronta Positiva y Prevención Conductual',
      biografia_pnl: 'Los primeros meses de un cachorro definen su vida entera. Estoy aquí para ser tu guía personal en esta etapa crucial. Te llevaré de la mano, 1-a-1, enseñándote sobre el camino cómo estructurar su socialización y prevenir miedos futuros. Haremos un seguimiento agradable y constante de sus hitos de desarrollo, asegurando que crezca como un perro adulto equilibrado, seguro y feliz.',
      anclaje_credibilidad: 'Doctora en Medicina Veterinaria con especialidad en pediatría y desarrollo neuro-cognitivo canino.',
      promesa_resultado: 'Construirás una base inquebrantable para tu cachorro, previniendo problemas de comportamiento antes de que ocurran.',
      estrategia_venta: 'La prevención es la mejor inversión. Te guiaré paso a paso para que disfrutes la etapa de cachorro sin estrés ni dudas.',
      foto_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071&auto=format&fit=crop',
      tags: ['Cachorros', 'Prevención', 'Socialización'],
      metrics: { userRating: 5.0, resolutionRate: 99, retentionRate: 96, knowledgeUpdate: 97, innovation: 94 }
    }
  ],
  Feline: [
    { ...getMentorProfile(0, 'Feline'), id: 'f1', category: 'Feline', nombre: 'Dra. Bastet Noir' },
    { ...getMentorProfile(1, 'Feline'), id: 'f2', category: 'Feline', nombre: 'Dr. Felix Aris' },
    { ...getMentorProfile(2, 'Feline'), id: 'f3', category: 'Feline', nombre: 'Dra. Chloe Vance' },
  ],
  Equine: [
    { ...getMentorProfile(0, 'Equine'), id: 'e1', category: 'Equine', nombre: 'Dra. Sarah Jenkins' },
    { ...getMentorProfile(1, 'Equine'), id: 'e2', category: 'Equine', nombre: 'Dr. Tom Wilson' },
    { ...getMentorProfile(2, 'Equine'), id: 'e3', category: 'Equine', nombre: 'Dra. Lisa Ray' },
  ],
  Aquaculture: [
    { ...getMentorProfile(0, 'Aquaculture'), id: 'a1', category: 'Aquaculture', nombre: 'Dr. Elena Rodriguez' },
    { ...getMentorProfile(1, 'Aquaculture'), id: 'a2', category: 'Aquaculture', nombre: 'Dr. Marco Silva' },
    { ...getMentorProfile(2, 'Aquaculture'), id: 'a3', category: 'Aquaculture', nombre: 'Dra. Ana Lopez' },
  ],
  Avian: [
    { ...getMentorProfile(0, 'Avian'), id: 'v1', category: 'Avian', nombre: 'Ing. Carlos Mendez' },
    { ...getMentorProfile(1, 'Avian'), id: 'v2', category: 'Avian', nombre: 'Dr. Juan Perez' },
    { ...getMentorProfile(2, 'Avian'), id: 'v3', category: 'Avian', nombre: 'Ing. Maria Garcia' },
  ],
  SpecialtyPets: [
    { ...getMentorProfile(0, 'SpecialtyPets'), id: 'sm1', category: 'SpecialtyPets', nombre: 'Dra. Sofia Roent' },
    { ...getMentorProfile(1, 'SpecialtyPets'), id: 'sm2', category: 'SpecialtyPets', nombre: 'Dr. Hugo Vant' },
    { ...getMentorProfile(2, 'SpecialtyPets'), id: 'sm3', category: 'SpecialtyPets', nombre: 'Dra. Luna Cavia' },
  ],
};

export const FEDERAL_PROGRAMS = [
  {
    id: 'sembrando-vida',
    name: 'Sembrando Vida & Ecosistemas',
    program: 'Integración Federal Múltiple',
    description: 'Alineado con los esfuerzos de Agroforestería y Resiliencia Ecológica. Domina la salud de especies en sistemas productivos integrales.',
    features: [
      'Asesoría 24/7 en Agronomía Integral',
      'Protocolos de Bienestar Animal (Grandes Especies)',
      'Simulador Multi-especies de Producción',
      'Integración con Prácticas Sustentables',
      'Evaluación de Terrenos y Cargas Animales'
    ],
    highlight: false
  },
  {
    id: 'jovenes-construyendo',
    name: 'Jóvenes Construyendo Experiencia',
    program: 'Capacitación Subsidiada',
    description: 'Para aprendices y becarios en clínicas veterinarias, granjas y centros de zootecnia. Desarrollo de habilidades 100% prácticas guiadas por IA.',
    features: [
      'Acceso al Neural Observer Educativo',
      'Ruta Clínica para Principiantes',
      'Diagnóstico Guiado Paso a Paso',
      'Reportes de Horas y Competencias Adquiridas',
      'Certificados de Competencia Laboral'
    ],
    highlight: true
  },
  {
    id: 'produccion-bienestar',
    name: 'Producción para el Bienestar',
    program: 'Apoyo a Pequeños Productores',
    description: 'Optimización de unidades de producción pecuaria comercial y traspatio (bovinos, porcinos, aves, pequeñas especies) asegurando soberanía alimentaria.',
    features: [
      'Auditoría y Trazabilidad Alimentaria',
      'Prevención de Brotes Infecciosos (Avícolas/Porcinos)',
      'Modelos de Rentabilidad para Micro-Productores',
      'Asistencia Técnica Veterinaria a Distancia',
      'Red de Colaboración de Productores'
    ],
    highlight: false
  }
];

export const FEDERAL_STRATEGY = {
  marketAnalysis: "El campo mexicano y la salud pública veterinaria requieren de innovación accesible. La integración de 'Animal Master' en los programas sociales federales del Gobierno de México fomenta la soberanía alimentaria y la empleabilidad técnica juvenil de manera subsidiada.",
  programsStrategy: "En lugar de un modelo de cobro individual, la academia se alinea con la 'Beca Jóvenes Construyendo el Futuro', 'Producción para el Bienestar' y 'Sembrando Vida'. Al digitalizar el aprendizaje técnico, optimizamos el presupuesto federal y aceleramos la curva de aprendizaje de los becarios frente a especies mayores y menores.",
  roiProjection: "El impacto social se traduce en comunidades capacitadas, prevención de zoonosis y redes agropecuarias más productivas, reduciendo la mortalidad animal por falta de asistencia técnica en un 40% durante los primeros 6 meses de inmersión en la plataforma."
};
