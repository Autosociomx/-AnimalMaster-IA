import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Globe, 
  Zap, 
  Shield, 
  Database, 
  Cpu, 
  Workflow, 
  Activity,
  Brain,
  Layers,
  Target,
  RefreshCw,
  ArrowRight,
  Bird
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ProtocolManifestoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProtocolManifesto: React.FC<ProtocolManifestoProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/95 backdrop-blur-2xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-brand-dark border border-brand-gold/20 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-12 space-y-12 overflow-y-auto max-h-[80vh]">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mx-auto mb-8 rotate-45">
                  <Globe className="w-10 h-10 text-brand-gold -rotate-45" />
                </div>
                <h3 className="text-4xl md:text-6xl font-light tracking-tighter">
                  Manifiesto de <br />
                  <span className="italic text-brand-gold font-serif">Inteligencia Universal</span>
                </h3>
                <p className="text-brand-muted font-light text-lg max-w-2xl mx-auto leading-relaxed">
                  El protocolo definitivo para la ingesta, estructuración y gobernanza de datos reales en la era de la IA.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Ingesta Visual No Invasiva",
                    desc: "El Modo Observador Neural permite capturar la demanda real sin APIs restrictivas ni interacción directa con plataformas, operando como un observador humano potenciado por IA.",
                    icon: <Bird className="w-6 h-6" />
                  },
                  {
                    title: "Gobernanza de Datos Ética",
                    desc: "Los datos visuales son efímeros. Solo la metadata estructurada (intención, nicho, valor) es persistida para el entrenamiento del cerebro colectivo.",
                    icon: <Shield className="w-6 h-6" />
                  },
                  {
                    title: "Escalabilidad Multi-Nicho",
                    desc: "El protocolo es agnóstico al dominio. Se puede replicar en Animal Master, AutoSocio, Gobernanza Digital o cualquier industria con demanda latente.",
                    icon: <Layers className="w-6 h-6" />
                  },
                  {
                    title: "Estructuración en Tiempo Real",
                    desc: "Cada señal detectada se convierte instantáneamente en una entrada de dataset estructurada, lista para ser monetizada o resuelta.",
                    icon: <Zap className="w-6 h-6" />
                  }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-brand-gold/5 border border-brand-gold/10 rounded-2xl space-y-4">
                    <div className="text-brand-gold">{item.icon}</div>
                    <h4 className="text-xl font-light text-white">{item.title}</h4>
                    <p className="text-sm text-brand-muted font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-8 border border-brand-gold/20 bg-brand-gold/5 rounded-2xl text-center space-y-6">
                <h4 className="text-2xl font-light">¿Cómo Publicar este Método?</h4>
                <p className="text-sm text-brand-muted font-light max-w-2xl mx-auto leading-relaxed">
                  Este protocolo no es solo un archivo; es una metodología de **Ingeniería de Demanda**. Para replicarlo en otras aplicaciones de Google AI Studio, simplemente integre el componente `NeuralObserver` y conecte su salida al motor de estructuración de su nicho específico.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="px-4 py-2 bg-brand-dark border border-brand-gold/10 rounded-lg text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                    Protocolo v1.0.4
                  </div>
                  <div className="px-4 py-2 bg-brand-dark border border-brand-gold/10 rounded-lg text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                    Universal Intelligence Core
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={onClose}
                  className="luxury-button px-12 py-4 group"
                >
                  Entendido, Proceder con la Ingesta
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProtocolManifesto;
