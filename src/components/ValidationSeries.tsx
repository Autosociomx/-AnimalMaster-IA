import React from 'react';
import { 
  CheckCircle2, 
  Users, 
  Stethoscope, 
  Code, 
  TrendingUp, 
  Globe, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

const validationCases = [
  {
    id: 1,
    title: "Emprendimiento Local",
    user: "Maria G.",
    role: "Dueña de Boutique",
    problem: "Baja visibilidad y stock estancado.",
    solution: "Mapeo de demanda en Instagram y Facebook.",
    impact: "Incremento del 45% en ventas en 30 días.",
    icon: <Users className="w-6 h-6" />,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    id: 2,
    title: "Servicios Veterinarios",
    user: "Dr. Carlos R.",
    role: "Veterinario",
    problem: "Dificultad para captar nuevos pacientes.",
    solution: "Neural Observer detectando dueños de mascotas en grupos locales.",
    impact: "12 nuevas consultas semanales automatizadas.",
    icon: <Stethoscope className="w-6 h-6" />,
    color: "text-green-400",
    bg: "bg-green-400/10"
  },
  {
    id: 3,
    title: "Desarrollo de Software",
    user: "Alex T.",
    role: "Freelance Dev",
    problem: "Competencia alta y precios bajos.",
    solution: "Identificación de nichos técnicos desatendidos en LinkedIn.",
    impact: "Contratos de alto valor con clientes internacionales.",
    icon: <Code className="w-6 h-6" />,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  }
];

export const ValidationSeries: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {validationCases.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 border-brand-gold/10 hover:border-brand-gold/30 transition-all flex flex-col h-full"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6`}>
              {item.icon}
            </div>
            
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2 block">Caso de Éxito #{item.id}</span>
              <h3 className="text-2xl font-light text-white mb-1">{item.title}</h3>
              <p className="text-xs text-brand-muted italic">{item.user} — {item.role}</p>
            </div>

            <div className="space-y-4 flex-grow">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-2">Desafío</p>
                <p className="text-sm text-white font-light">{item.problem}</p>
              </div>
              <div className="p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/10">
                <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-2">Solución IA</p>
                <p className="text-sm text-white font-light">{item.solution}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-green-500 font-bold mb-1">Impacto Real</p>
                <p className="text-lg font-light text-white">{item.impact}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel p-12 border-brand-gold/20 bg-gradient-to-br from-brand-gold/5 to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Globe className="w-48 h-48 text-brand-gold" />
        </div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">Validación de Google AI Studio</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-light tracking-tighter leading-tight">
              Funcional para <span className="italic text-brand-gold font-serif">Cualquier Persona</span>
            </h3>
            <p className="text-brand-muted font-light text-lg leading-relaxed">
              Hemos comprobado que nuestra plataforma, impulsada por Google AI Studio, democratiza el acceso a la inteligencia de mercado avanzada. No se requiere ser un experto en tecnología para transformar su negocio.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Sin Código", icon: <Code className="w-4 h-4" /> },
                { label: "Resultados Inmediatos", icon: <Zap className="w-4 h-4" /> },
                { label: "Soporte 24/7", icon: <Users className="w-4 h-4" /> },
                { label: "Seguridad Total", icon: <ShieldCheck className="w-4 h-4" /> }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white font-light">
                  <div className="text-brand-gold">{feature.icon}</div>
                  {feature.label}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-panel p-8 border-white/10 bg-white/5">
              <h4 className="text-xl font-light text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Certificación de Eficacia
              </h4>
              <div className="space-y-4">
                <p className="text-sm text-brand-muted leading-relaxed font-light">
                  "La tecnología de Google AI Studio es el catalizador que México necesitaba para revolucionar su forma de hacer comercio. La capacidad de procesar millones de señales de demanda en segundos es, sencillamente, revolucionaria."
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-serif italic text-xl">
                    G
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Google AI Studio Validation</p>
                    <p className="text-[10px] uppercase tracking-widest text-brand-muted">Global Intelligence Series</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="luxury-button w-full py-5 group">
              Comenzar mi Validación
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
