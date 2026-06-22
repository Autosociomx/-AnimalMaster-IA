import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Brain, 
  CheckCircle2, 
  Activity,
  Zap,
  Shield,
  BarChart3,
  MessageSquare,
  Star
} from 'lucide-react';
import { cn } from '../lib/utils';

interface TestSubject {
  id: string;
  name: string;
  plan: 'Personal Guide' | 'Clinical Professional' | 'Elite Executive';
  progress: number;
  retentionScore: number;
  applicationScore: number;
  roiImpact: string;
  feedback: string;
  status: 'Active' | 'Completed' | 'Struggling';
}

const BETA_SUBJECTS: TestSubject[] = [
  // Personal Guide
  { id: '1', name: 'Carlos M.', plan: 'Personal Guide', progress: 85, retentionScore: 92, applicationScore: 88, roiImpact: 'Reducción 40% estrés canino', feedback: 'El mentor 1-a-1 cambió mi relación con mi perro.', status: 'Active' },
  { id: '2', name: 'Elena R.', plan: 'Personal Guide', progress: 100, retentionScore: 95, applicationScore: 98, roiImpact: 'Cero incidentes en parto porcino', feedback: 'La guía de neonatología es infalible.', status: 'Completed' },
  { id: '3', name: 'Juan K.', plan: 'Personal Guide', progress: 45, retentionScore: 78, applicationScore: 70, roiImpact: 'Mejora en dieta aviar', feedback: 'Necesito más tiempo con el mentor.', status: 'Active' },
  { id: '4', name: 'Sofía L.', plan: 'Personal Guide', progress: 92, retentionScore: 88, applicationScore: 94, roiImpact: 'Control total de ansiedad felina', feedback: 'Increíble precisión en el diagnóstico.', status: 'Active' },
  
  // Clinical Professional
  { id: '5', name: 'Dr. Aris', plan: 'Clinical Professional', progress: 75, retentionScore: 96, applicationScore: 92, roiImpact: 'Diagnóstico 30% más rápido', feedback: 'El Neural Observer es mi mano derecha.', status: 'Active' },
  { id: '6', name: 'Dra. Vance', plan: 'Clinical Professional', progress: 100, retentionScore: 99, applicationScore: 100, roiImpact: 'Certificación Elite obtenida', feedback: 'La maestría técnica es de otro nivel.', status: 'Completed' },
  { id: '7', name: 'MVZ Pedro', plan: 'Clinical Professional', progress: 60, retentionScore: 85, applicationScore: 82, roiImpact: 'Optimización de protocolos quirúrgicos', feedback: 'Aprendiendo a usar la visión artificial.', status: 'Active' },
  { id: '8', name: 'Dra. Elena', plan: 'Clinical Professional', progress: 30, retentionScore: 90, applicationScore: 85, roiImpact: 'Mapeo de patologías raras', feedback: 'La IA detectó lo que yo no vi.', status: 'Struggling' },

  // Elite Executive
  { id: '9', name: 'AgroCorp', plan: 'Elite Executive', progress: 95, retentionScore: 98, applicationScore: 97, roiImpact: '+$120k USD en 30 días', feedback: 'El mapeo de demanda B2B es una mina de oro.', status: 'Active' },
  { id: '10', name: 'Equine Elite', plan: 'Elite Executive', progress: 100, retentionScore: 100, applicationScore: 100, roiImpact: 'Dominio total del nicho regional', feedback: 'La consultoría estratégica en 72h es real.', status: 'Completed' },
  { id: '11', name: 'BioFarm', plan: 'Elite Executive', progress: 80, retentionScore: 94, applicationScore: 90, roiImpact: 'Reducción 15% costos operativos', feedback: 'El dataset de 10k casos es impresionante.', status: 'Active' },
  { id: '12', name: 'VetChain', plan: 'Elite Executive', progress: 55, retentionScore: 88, applicationScore: 85, roiImpact: 'Expansión a 3 nuevas ciudades', feedback: 'La inteligencia universal nos guía.', status: 'Active' },
];

export const BetaLabDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState<TestSubject | null>(null);

  const stats = {
    avgRetention: Math.round(BETA_SUBJECTS.reduce((acc, s) => acc + s.retentionScore, 0) / 12),
    avgApplication: Math.round(BETA_SUBJECTS.reduce((acc, s) => acc + s.applicationScore, 0) / 12),
    successRate: Math.round((BETA_SUBJECTS.filter(s => s.status === 'Completed' || s.progress > 80).length / 12) * 100),
  };

  return (
    <section id="beta-lab" className="py-32 bg-brand-dark relative overflow-hidden grid-bg">
      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-gold/10 border border-brand-gold/20 mb-6">
              <Activity className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Protocolo de Validación: Beta Lab</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.85] mb-8">
              Midiendo la <span className="italic text-brand-gold font-serif">Promesa Real</span>
            </h2>
            <p className="text-brand-muted text-xl font-light leading-relaxed">
              Hemos seleccionado a 12 "Conejillos de Indias" estratégicos (4 por nivel) para auditar la efectividad de nuestra inteligencia. No medimos solo clics, medimos **transformación de vida y ROI económico**.
            </p>
          </div>
          
          <div className="flex gap-6">
            <div className="text-right">
              <div className="text-4xl font-light text-brand-gold">{stats.successRate}%</div>
              <div className="text-[10px] uppercase tracking-widest text-brand-muted">Tasa de Éxito</div>
            </div>
            <div className="w-px h-12 bg-brand-gold/20" />
            <div className="text-right">
              <div className="text-4xl font-light text-white">{stats.avgRetention}%</div>
              <div className="text-[10px] uppercase tracking-widest text-brand-muted">Retención Cognitiva</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Subjects Grid */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            {BETA_SUBJECTS.map((subject) => (
              <motion.div
                key={subject.id}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                }}
                onClick={() => setSelectedSubject(subject)}
                className={cn(
                  "p-8 glass-panel cursor-pointer transition-all duration-500 relative overflow-hidden group border-l-4",
                  selectedSubject?.id === subject.id 
                    ? "border-l-brand-gold bg-brand-gold/5 shadow-[0_20px_50px_rgba(212,175,55,0.1)]" 
                    : "border-l-transparent hover:border-l-brand-gold/40"
                )}
              >
                {/* Scanning Line Effect */}
                <motion.div 
                  initial={{ top: "-100%" }}
                  whileHover={{ top: "200%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent z-20 pointer-events-none"
                />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                      <h4 className="text-xl font-light text-white tracking-tight">{subject.name}</h4>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-brand-gold/60 font-bold">{subject.plan}</span>
                  </div>
                  <div className={cn(
                    "px-3 py-1 text-[8px] font-bold uppercase tracking-widest border backdrop-blur-md",
                    subject.status === 'Completed' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                    subject.status === 'Struggling' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                    "bg-brand-gold/10 text-brand-gold border-brand-gold/20"
                  )}>
                    {subject.status}
                  </div>
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] uppercase tracking-[0.4em] text-brand-muted/60">
                      <span>Integración Cognitiva</span>
                      <span className="font-mono">{subject.progress}%</span>
                    </div>
                    <div className="w-full h-[2px] bg-brand-gold/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-brand-gold/20 via-brand-gold to-brand-gold/20"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-brand-gold/5">
                    <div className="flex gap-1">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "w-1 h-3 rounded-full transition-all duration-500",
                            i < (subject.progress / 12.5) ? "bg-brand-gold/40" : "bg-brand-gold/5"
                          )} 
                        />
                      ))}
                    </div>
                    <div className="text-[7px] font-mono text-brand-gold/30 uppercase tracking-widest">
                      ID_NODE_{subject.id.padStart(3, '0')}
                    </div>
                  </div>
                </div>

                {/* Background Decorative Element */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                  <Brain className="w-32 h-32 text-brand-gold" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Analysis */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              {selectedSubject ? (
                <motion.div
                  key={selectedSubject.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-panel p-10 sticky top-32 space-y-10 border-brand-gold/40 bg-brand-dark/40 backdrop-blur-xl"
                >
                  <div className="relative">
                    <div className="absolute -left-10 top-0 w-1 h-12 bg-brand-gold" />
                    <div className="space-y-2">
                      <h3 className="text-3xl font-light text-white uppercase tracking-tighter leading-none">
                        Escultura de <br />
                        <span className="text-brand-gold italic font-serif">Datos Vivos</span>
                      </h3>
                      <p className="text-[10px] text-brand-muted uppercase tracking-[0.5em] font-bold">
                        {selectedSubject.name} // {selectedSubject.plan}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-brand-gold" />
                        <span className="text-[8px] text-brand-muted uppercase tracking-widest block">Retención</span>
                      </div>
                      <div className="relative">
                        <div className="text-5xl font-light text-brand-gold tracking-tighter">{selectedSubject.retentionScore}%</div>
                        <div className="text-[8px] font-mono text-brand-gold/20 absolute -bottom-4">HEX_VAL_0x{selectedSubject.retentionScore.toString(16).toUpperCase()}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-white" />
                        <span className="text-[8px] text-brand-muted uppercase tracking-widest block">Aplicación</span>
                      </div>
                      <div className="relative">
                        <div className="text-5xl font-light text-white tracking-tighter">{selectedSubject.applicationScore}%</div>
                        <div className="text-[8px] font-mono text-white/20 absolute -bottom-4">HEX_VAL_0x{selectedSubject.applicationScore.toString(16).toUpperCase()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-brand-surface/30 border border-brand-gold/10 relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-4 h-4 text-brand-gold animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">ROI / Resultado Real</span>
                    </div>
                    <p className="text-2xl font-light text-white leading-tight tracking-tight italic font-serif">
                      "{selectedSubject.roiImpact}"
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-brand-gold/10" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-muted/40">Testimonio Auditado</span>
                      <div className="h-px flex-1 bg-brand-gold/10" />
                    </div>
                    <p className="text-sm text-brand-muted font-light italic leading-relaxed text-center px-4">
                      "{selectedSubject.feedback}"
                    </p>
                  </div>

                  <div className="pt-8">
                    <button className="luxury-button w-full group relative overflow-hidden">
                      <span className="relative z-10">Auditar Dataset Completo</span>
                      <motion.div 
                        className="absolute inset-0 bg-brand-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                      />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="glass-panel p-12 h-[600px] flex flex-col items-center justify-center text-center space-y-8 border-dashed border-brand-gold/10">
                  <div className="relative">
                    <Users className="w-20 h-20 text-brand-gold/5" />
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.5, 0.2]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 bg-brand-gold/10 rounded-full blur-3xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.5em]">Esperando Selección</p>
                    <p className="text-xs font-light text-brand-muted uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
                      Seleccione un nodo de datos para activar la escultura de análisis
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
