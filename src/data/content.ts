export interface Guide {
  id: string;
  category: 'Porcine' | 'Bovine' | 'Canine' | 'Equine' | 'Aquaculture' | 'Avian';
  title: string;
  pages: number;
  level: 'Fundamentos' | 'Intermedio' | 'Avanzado';
  content: string;
}

export const ANIMAL_GUIDES: Guide[] = [
  {
    id: 'aquaculture-1',
    category: 'Aquaculture',
    title: 'Escuela Acuícola Casera: Tilapia y Camarón',
    pages: 45,
    level: 'Fundamentos',
    content: `## 🐟🏠 ESCUELA ACÚICOLA CASERA — GUÍA ESPECIAL
*Tilapia y Camarón para Principiantes | AnimalMaster | 45 páginas | Nivel: Fundamentos Prácticos*

### 📋 ÍNDICE DE LA GUÍA
1. **¿Es posible cultivar en casa?** Mitos y realidades (8 págs)
2. **Sistemas caseros**: tanques, IBC, estanques pequeños (10 págs)
3. **Tilapia casera**: desde alevín hasta tu mesa (9 págs)
4. **Camarón en casa**: retos y soluciones prácticas (9 págs)
5. **Agua, alimentación y cosecha**: lo esencial simplificado (9 págs)

### 📘 SECCIÓN 1: ¿ES POSIBLE CULTIVAR EN CASA?
*Mitos vs. Realidades:*
- ❌ MITO: "Necesito un estanque gigante" -> ✅ REALIDAD: Un tanque de 500-1,000 litros es suficiente.
- ❌ MITO: "El camarón es imposible sin laboratorio" -> ✅ REALIDAD: Puedes comprar postlarvas certificadas.

### 📘 SECCIÓN 2: SISTEMAS CASEROS
*Opciones de tanques:*
- **IBC Tote reciclado (1,000 litros)**: Económico ($80-150 USD), resistente y fácil de conseguir.
- **Tanque de concreto o fibra de vidrio**: Duradero, buen aislamiento térmico.
- **Estanque excavado con liner**: Integración con jardín, ideal para acuaponía.

### 📘 SECCIÓN 3: TILAPIA CASERA
*Manejo de agua simplificado:*
- **Temperatura**: 26-30°C ideal.
- **pH**: 6.5-8.5.
- **Amoníaco**: <0.5 mg/L (Crítico).
- **Oxígeno**: >5 mg/L.

### 📘 SECCIÓN 4: CAMARÓN EN CASA
*Retos y Soluciones:*
- **Salinidad**: 5-15 ppt es manejable en casa (agua + sal marina sin yodo).
- **Alimentación**: Uso de bandejas para revisar consumo y evitar contaminación del fondo.

### 📘 SECCIÓN 5: AGUA, ALIMENTACIÓN Y COSECHA
*Ciclo del Nitrógeno:*
Amoníaco (tóxico) → Nitrito (tóxico) → Nitrato (poco tóxico). El uso de biofiltros caseros es esencial para la estabilidad del sistema.`
  },
  {
    id: 'porcine-1',
    category: 'Porcine',
    title: 'Producción Porcina Sustentable',
    pages: 42,
    level: 'Fundamentos',
    content: `## 🐷 ESCUELA PORCINA — MÓDULO 1
*Producción Porcina Sustentable | AnimalMaster | 42 páginas | Nivel: Fundamentos*

### 📋 CONTENIDO DESTACADO
1. **Sistemas de Producción**: Intensivo, semi-intensivo y traspatio.
2. **Instalaciones**: Diseño bioclimático y flujo unidireccional (Gestación -> Maternidad -> Engorda).
3. **Genética**: Uso de razas maternas (Large White, Landrace) y terminales (Duroc, Pietrain).
4. **Nutrición de Precisión**: Dietas específicas de pre-inicio a finalización.
5. **Bienestar Animal**: Las 5 libertades aplicadas a la porcicultura moderna.

> 💡 **Insight clave**: No existe el sistema "perfecto". Existe el sistema óptimo para TU contexto: capital, mercado y clima.`
  },
  {
    id: 'porcine-2',
    category: 'Porcine',
    title: 'Bioseguridad Porcina Avanzada',
    pages: 45,
    level: 'Intermedio',
    content: `## 🐷 ESCUELA PORCINA — MÓDULO 2
*Bioseguridad Porcina | AnimalMaster | 45 páginas | Nivel: Intermedio*

### 🔒 BARRERAS QUE SALVAN VIDAS
- **Zonificación**: Zona Roja (Exterior), Amarilla (Transición), Verde (Producción).
- **Cuarentena Estricta**: Protocolo de 60 días para reemplazos con monitoreo serológico.
- **Control de Vectores**: Manejo integrado de roedores, aves e insectos.
- **Programa de Vacunación**: Escudo inmunológico contra PRRS, Influenza y PCV2.

🎯 **Regla de oro**: "Más vale prevenir un brote que lamentar mil muertes".`
  },
  {
    id: 'porcine-3',
    category: 'Porcine',
    title: 'Farrowing y Manejo de la Madre',
    pages: 48,
    level: 'Avanzado',
    content: `## 🐷 ESCUELA PORCINA — MÓDULO 3
*Farrowing y Manejo de la Madre | AnimalMaster | 48 páginas | Nivel: Avanzado*

### 🍼 MOMENTOS CRÍTICOS
- **Preparación de la Sala**: Protocolo de 7 pasos de limpieza y desinfección.
- **Asistencia al Parto**: Identificación de distocias e intervención manual segura.
- **Manejo del Lechón**: Secado, calor (32-35°C) y consumo de calostro en las primeras 6 horas.
- **Supervivencia Neonatal**: Prevención de hipotermia y aplastamientos.`
  },
  {
    id: 'avian-1',
    category: 'Avian',
    title: 'Crianza Básica de Aves de Corral',
    pages: 35,
    level: 'Fundamentos',
    content: `## 🦜 ESCUELA AVIAR — MÓDULO 1
*Crianza Básica | AnimalMaster | 35 páginas | Nivel: Fundamentos*

### 🏠 INFRAESTRUCTURA Y MANEJO
- **Instalaciones**: Ventilación cruzada, nidos privados (1 cada 5 gallinas) y perchas.
- **Protección**: Malla de 1/2" contra depredadores y perímetro enterrado.
- **Nutrición**: Requerimientos de proteína del 20% en iniciador al 16% en postura.
- **Producción de Huevos**: Manejo del fotoperiodo (14-16 horas de luz).`
  },
  {
    id: 'avian-2',
    category: 'Avian',
    title: 'Salud Aviar Preventiva',
    pages: 40,
    level: 'Intermedio',
    content: `## 🦜 ESCUELA AVIAR — MÓDULO 2
*Salud Aviar Preventiva | AnimalMaster | 40 páginas | Nivel: Intermedio*

### 🚨 VIGILANCIA SANITARIA
- **Examen Físico**: Checklist de 10 puntos para detección temprana.
- **Enfermedades Prioritarias**: Newcastle, Influenza Aviar, Bronquitis y Gumboro.
- **Manejo de Brotes**: Protocolo de contención, diagnóstico y comunicación oficial.
- **Uso Responsable de Antibióticos**: Evitar la resistencia y respetar tiempos de retiro.`
  },
  {
    id: 'canine-1',
    category: 'Canine',
    title: 'Maestría en Comportamiento Canino',
    pages: 158,
    level: 'Intermedio',
    content: `## 🐕 ESCUELA CANINA — MÓDULO COMPLETO
*AnimalMaster | 5 Guías | 158 páginas | Nivel: Fundamentos a Intermedio*

### 📋 ESTRUCTURA DEL MÓDULO
1. **Lenguaje Corporal**: Las 5 zonas que hablan y señales de calma.
2. **Refuerzo Positivo**: Ciencia del aprendizaje y jerarquía de reforzadores.
3. **Comandos Esenciales**: Sentado, Echado, Ven (Recall), Quédate y Junto.
4. **Ansiedad por Separación**: Desensibilización sistemática y enriquecimiento.
5. **Reactividad**: Manejo del umbral y técnica "Mira a eso" (LAT).`
  },
  {
    id: 'equine-1',
    category: 'Equine',
    title: 'Maestría Equina Integral',
    pages: 217,
    level: 'Avanzado',
    content: `## 🐴 ESCUELA EQUINA — MÓDULO COMPLETO
*AnimalMaster | 5 Guías | 217 páginas | Nivel: Fundamentos a Avanzado*

### 📋 ESTRUCTURA DEL MÓDULO
1. **Lenguaje Corporal**: Oídos como radar emocional y secuencia de amenaza.
2. **Nutrición Fundamental**: Forraje primero (1.5% peso corporal) y manejo de concentrados.
3. **Primeros Auxilios**: Signos vitales y protocolo de emergencia ante cólicos.
4. **Doma Clásica**: La pirámide del adiestramiento (Ritmo, Suavidad, Rectitud...).
5. **Reproducción**: Ciclo estral, IA vs Monta Natural y cuidados del potro neonato.`
  },
  {
    id: 'bovine-1',
    category: 'Bovine',
    title: 'Maestría Bovina: Leche y Carne',
    pages: 230,
    level: 'Avanzado',
    content: `## 🐄 ESCUELA BOVINA — MÓDULO COMPLETO
*AnimalMaster | 5 Guías | 230 páginas | Nivel: Fundamentos a Avanzado*

### 📋 ESTRUCTURA DEL MÓDULO
1. **Manejo y Bienestar**: Diseño de instalaciones (Bud Box) y manejo de bajo estrés.
2. **Nutrición de Precisión**: Fisiología del rumen y formulación de dietas (NRC/CNCPS).
3. **Control de Mastitis**: Protocolo de ordeño de 5 pasos y terapia al secado.
4. **Inseminación Artificial**: Técnica rectovaginal y protocolos de TAI (Ovsynch).
5. **Mejora Genética**: Uso de EBVs, genómica y selección por índices económicos.`
  }
];

export interface Mentor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  videoUrl: string;
  availability: string[];
  testimonials: { user: string; text: string; }[];
  stats: { students: number; rating: number; experience: string; };
}

export const MENTORS: Record<Guide['category'], Mentor[]> = {
  Porcine: [
    {
      id: 'p1',
      name: 'Dr. Elena Rodriguez',
      specialty: 'Especialista en Bienestar Porcino',
      bio: 'PhD en Medicina Veterinaria por la Universidad de Utrecht. Experta en sistemas de producción sustentable y etología porcina aplicada.',
      image: 'https://picsum.photos/seed/p1/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Lun 10:00 - 14:00', 'Mie 15:00 - 18:00'],
      testimonials: [{ user: "Granja El Porvenir", text: "Transformó nuestra eficiencia en un 30%." }],
      stats: { students: 1200, rating: 4.9, experience: '20+ años' }
    },
    {
      id: 'p2',
      name: 'Dr. Marco Silva',
      specialty: 'Experto en Bioseguridad Porcina',
      bio: 'Consultor internacional en control de enfermedades transfronterizas. Especialista en diseño de granjas de alta seguridad biológica.',
      image: 'https://picsum.photos/seed/p2/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Mar 09:00 - 12:00', 'Jue 15:00 - 19:00'],
      testimonials: [{ user: "AgroPork Global", text: "Su protocolo de bioseguridad salvó nuestro hato de un brote de PRRS." }],
      stats: { students: 850, rating: 5.0, experience: '15+ años' }
    },
    {
      id: 'p3',
      name: 'Dra. Ana Lopez',
      specialty: 'Especialista en Farrowing',
      bio: 'Dedicada a la optimización de la supervivencia neonatal y manejo de la cerda hiperprolífica. Autora de protocolos de maternidad de élite.',
      image: 'https://picsum.photos/seed/p3/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Vie 08:00 - 13:00'],
      testimonials: [{ user: "Genética Porcina", text: "Logramos reducir la mortalidad en maternidad al 6% bajo su guía." }],
      stats: { students: 950, rating: 4.8, experience: '12+ años' }
    }
  ],
  Bovine: [
    {
      id: 'b1',
      name: 'Ing. Carlos Mendez',
      specialty: 'Experto en Nutrición Bovina',
      bio: 'Especialista en formulación de dietas de precisión (NRC/CNCPS) para hatos lecheros de alta producción. Consultor en optimización de forrajes.',
      image: 'https://picsum.photos/seed/b1/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Lun 08:00 - 12:00', 'Jue 14:00 - 18:00'],
      testimonials: [{ user: "Lechería Los Alpes", text: "Redujo costos de alimentación manteniendo la producción máxima." }],
      stats: { students: 1500, rating: 5.0, experience: '18+ años' }
    },
    {
      id: 'b2',
      name: 'Dr. Juan Perez',
      specialty: 'Especialista en Reproducción e IA',
      bio: 'Experto en protocolos de IATF y biotecnologías reproductivas. PhD en Ciencias Veterinarias con enfoque en fertilidad bovina.',
      image: 'https://picsum.photos/seed/b2/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Mar 10:00 - 14:00', 'Vie 15:00 - 18:00'],
      testimonials: [{ user: "Ganadería El Triunfo", text: "Nuestra tasa de preñez subió del 45% al 62% con sus protocolos." }],
      stats: { students: 1100, rating: 4.9, experience: '15+ años' }
    },
    {
      id: 'b3',
      name: 'Ing. Maria Garcia',
      specialty: 'Genetista Bovina',
      bio: 'Especialista en selección genómica y apareamientos planificados. Consultora para asociaciones de razas puras en Latinoamérica.',
      image: 'https://picsum.photos/seed/b3/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Mie 09:00 - 13:00'],
      testimonials: [{ user: "Asociación Holstein", text: "Su visión genómica ha acelerado nuestro progreso genético décadas." }],
      stats: { students: 780, rating: 4.9, experience: '10+ años' }
    }
  ],
  Canine: [
    {
      id: 'c1',
      name: 'Dra. Sarah Jenkins',
      specialty: 'Etóloga Canina Clínica',
      bio: 'Especialista en modificación de conducta y ansiedad por separación. PhD en Comportamiento Animal por la Universidad de Lincoln.',
      image: 'https://picsum.photos/seed/c1/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Lun 15:00 - 19:00', 'Jue 09:00 - 13:00'],
      testimonials: [{ user: "Rescate Canino", text: "Logró rehabilitar casos de reactividad que dábamos por perdidos." }],
      stats: { students: 2500, rating: 5.0, experience: '15+ años' }
    },
    {
      id: 'c2',
      name: 'Dr. Tom Wilson',
      specialty: 'Experto en Adiestramiento Positivo',
      bio: 'Certificado por la KPA y CPDT-KA. Especialista en obediencia avanzada y perros de servicio mediante refuerzo positivo.',
      image: 'https://picsum.photos/seed/c2/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Mar 08:00 - 12:00', 'Vie 14:00 - 18:00'],
      testimonials: [{ user: "Escuela de Guías", text: "Su metodología de shaping es la más clara y efectiva que he visto." }],
      stats: { students: 3200, rating: 4.9, experience: '20+ años' }
    },
    {
      id: 'c3',
      name: 'Dra. Lisa Ray',
      specialty: 'Especialista en Reactividad',
      bio: 'Dedicada al estudio de la reactividad por miedo y frustración. Creadora de protocolos de manejo ambiental y desensibilización.',
      image: 'https://picsum.photos/seed/c3/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Mie 10:00 - 15:00'],
      testimonials: [{ user: "Dueño de Reactivo", text: "Ahora puedo pasear a mi perro sin miedo gracias a sus técnicas." }],
      stats: { students: 1800, rating: 4.8, experience: '12+ años' }
    }
  ],
  Equine: [
    {
      id: 'e1',
      name: 'Dra. Elena Vazquez',
      specialty: 'Etóloga y Domadora Clásica',
      bio: 'Especialista en la pirámide del adiestramiento y etología equina. Autora de "La Conexión Invisible".',
      image: 'https://picsum.photos/seed/e1/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Lun 09:00 - 13:00', 'Jue 15:00 - 19:00'],
      testimonials: [{ user: "Hípica Real", text: "Su enfoque en la ligereza cambió totalmente mi forma de montar." }],
      stats: { students: 2100, rating: 5.0, experience: '22+ años' }
    },
    {
      id: 'e2',
      name: 'Dr. Ricardo Maza',
      specialty: 'Veterinario Especialista en Cólicos',
      bio: 'Experto en medicina interna equina y cuidados críticos. Consultor en prevención nutricional de trastornos digestivos.',
      image: 'https://picsum.photos/seed/e2/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Mar 10:00 - 14:00', 'Vie 08:00 - 12:00'],
      testimonials: [{ user: "Centro Ecuestre", text: "Su guía de primeros auxilios debería estar en cada caballeriza." }],
      stats: { students: 1400, rating: 4.9, experience: '18+ años' }
    },
    {
      id: 'e3',
      name: 'Dra. Sofia Luna',
      specialty: 'Especialista en Reproducción Equina',
      bio: 'Experta en IA, transferencia de embriones y cuidados del potro neonato. PhD en Biotecnología Reproductiva.',
      image: 'https://picsum.photos/seed/e3/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Mie 14:00 - 18:00'],
      testimonials: [{ user: "Yeguada del Sol", text: "Logramos una tasa de concepción récord bajo su supervisión." }],
      stats: { students: 900, rating: 4.9, experience: '14+ años' }
    }
  ],
  Aquaculture: [
    {
      id: 'a1',
      name: 'Dr. Luis Arenas',
      specialty: 'Experto en Acuicultura Casera',
      bio: 'Especialista en sistemas de recirculación (RAS) a pequeña escala y producción familiar de tilapia.',
      image: 'https://picsum.photos/seed/a1/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Lun 10:00 - 14:00', 'Mie 15:00 - 18:00'],
      testimonials: [{ user: "Familia Gomez", text: "Nuestra granja casera de tilapia es un éxito gracias a sus consejos." }],
      stats: { students: 1300, rating: 4.8, experience: '15+ años' }
    },
    {
      id: 'a2',
      name: 'Ing. Silvia Mar',
      specialty: 'Especialista en Camarón',
      bio: 'Consultora en cultivo de camarón en sistemas controlados. Experta en manejo de postlarvas y calidad de agua.',
      image: 'https://picsum.photos/seed/a2/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Mar 09:00 - 13:00', 'Jue 14:00 - 18:00'],
      testimonials: [{ user: "Acuícola del Norte", text: "Su manejo de la salinidad en sistemas cerrados es impecable." }],
      stats: { students: 950, rating: 4.9, experience: '12+ años' }
    },
    {
      id: 'a3',
      name: 'Dr. Jorge Rio',
      specialty: 'Experto en Acuaponía',
      bio: 'Pionero en la integración de peces y hortalizas en sistemas urbanos. PhD en Ingeniería Hidráulica.',
      image: 'https://picsum.photos/seed/a3/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Vie 10:00 - 15:00'],
      testimonials: [{ user: "Huerto Urbano", text: "Logramos un ciclo perfecto de nitrógeno con su diseño." }],
      stats: { students: 1100, rating: 5.0, experience: '10+ años' }
    }
  ],
  Avian: [
    {
      id: 'v1',
      name: 'Ing. Roberto Pluma',
      specialty: 'Experto en Producción Aviar',
      bio: 'Especialista en manejo de aves de corral de traspatio y pequeña escala. Consultor en nutrición y postura.',
      image: 'https://picsum.photos/seed/v1/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Lun 08:00 - 12:00', 'Jue 15:00 - 19:00'],
      testimonials: [{ user: "Granja La Puesta", text: "Nuestra producción de huevos se estabilizó en el 90% con su guía." }],
      stats: { students: 2200, rating: 4.9, experience: '25+ años' }
    },
    {
      id: 'v2',
      name: 'Dra. Clara Alas',
      specialty: 'Veterinaria Aviar Preventiva',
      bio: 'Especialista en bioseguridad y control de enfermedades virales en aves. Experta en programas de vacunación.',
      image: 'https://picsum.photos/seed/v2/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Mar 10:00 - 14:00', 'Vie 09:00 - 13:00'],
      testimonials: [{ user: "Avícola del Sur", text: "Su protocolo contra Newcastle es la base de nuestra sanidad." }],
      stats: { students: 1600, rating: 5.0, experience: '18+ años' }
    },
    {
      id: 'v3',
      name: 'Dr. Samuel Pico',
      specialty: 'Experto en Bienestar Aviar',
      bio: 'Dedicado al estudio del comportamiento y enriquecimiento ambiental en sistemas de producción ética.',
      image: 'https://picsum.photos/seed/v3/400/400',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      availability: ['Mie 11:00 - 16:00'],
      testimonials: [{ user: "Huevos Orgánicos", text: "Sus técnicas de enriquecimiento eliminaron el picaje en nuestro hato." }],
      stats: { students: 1200, rating: 4.8, experience: '15+ años' }
    }
  ],
};

export const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Essential',
    price: 499,
    period: 'mes',
    description: 'Acceso completo a la biblioteca de guías y comunidad.',
    features: [
      'Acceso a todas las guías (PDF)',
      'Webinars mensuales en vivo',
      'Certificados de participación',
      'Comunidad exclusiva de alumnos'
    ],
    highlight: false
  },
  {
    id: 'premium',
    name: 'Mastery',
    price: 1299,
    period: 'mes',
    description: 'El plan más popular para productores y profesionales serios.',
    features: [
      'Todo lo del plan Essential',
      'Asistencia 1-a-1 con Mentor AI ilimitada',
      '1 Sesión grupal de mentoría al mes',
      'Acceso anticipado a nuevas guías',
      'Descuentos en eventos presenciales'
    ],
    highlight: true
  },
  {
    id: 'elite',
    name: 'Elite Executive',
    price: 4500,
    period: 'año',
    description: 'Para empresas y grandes explotaciones que buscan excelencia total.',
    features: [
      'Todo lo del plan Mastery',
      '2 Sesiones privadas con mentores al mes',
      'Auditoría técnica anual de tu proyecto',
      'Soporte prioritario 24/7',
      'Acceso para hasta 5 miembros del equipo'
    ],
    highlight: false
  }
];

export const ECONOMIC_STUDY = {
  marketAnalysis: "El mercado de la educación agropecuaria de alta gama está creciendo un 12% anual. Existe una brecha entre la educación tradicional y la aplicación técnica de vanguardia.",
  pricingStrategy: "Nuestra estrategia se basa en el 'Valor Percibido'. Un solo consejo técnico de nuestros mentores puede ahorrar miles de dólares en producción, justificando el ticket alto.",
  roiProjection: "Se estima que un alumno de Animal Master recupera su inversión en la suscripción anual en los primeros 3-4 meses mediante la optimización de recursos y reducción de mortalidad animal."
};
