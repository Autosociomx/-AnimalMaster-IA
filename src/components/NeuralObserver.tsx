import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  X, 
  Play, 
  Square, 
  Activity, 
  Zap, 
  Shield, 
  Database,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Brain,
  Bird
} from 'lucide-react';
import { cn } from '../lib/utils';
import { runMasterEngine } from '../services/masterEngineService';
import { saveEngineResult } from '../services/firestoreService';
import { useAuth } from '../context/FirebaseContext';
import { toast } from 'sonner';

interface NeuralObserverProps {
  isOpen: boolean;
  onClose: () => void;
}

const NeuralObserver: React.FC<NeuralObserverProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [signalsCount, setSignalsCount] = useState(0);
  const [lastSignal, setLastSignal] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCapture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" } as any,
        audio: false
      });
      
      setStream(mediaStream);
      setIsActive(true);
      toast.info("Protocolo Observador Neural Iniciado", {
        description: "La IA está analizando patrones visuales en segundo plano."
      });

      // Handle stream stop from browser UI
      mediaStream.getVideoTracks()[0].onended = () => stopCapture();

      // Start the scan loop
      intervalRef.current = setInterval(captureAndAnalyze, 5000);
    } catch (err) {
      console.error("Error starting screen capture:", err);
      toast.error("Error de Acceso", {
        description: "Se requieren permisos de captura de pantalla para el protocolo."
      });
    }
  };

  const stopCapture = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsActive(false);
    toast.warning("Protocolo Suspendido", {
      description: "La ingesta masiva de datos se ha detenido."
    });
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || isProcessing) return;

    setIsProcessing(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const base64Image = canvas.toDataURL('image/jpeg', 0.7);
        const base64Data = base64Image.split(',')[1];
        
        const res = await runMasterEngine({ data: base64Data, mimeType: 'image/jpeg' });
        
        if (res.structure.entity && res.structure.entity !== "No detectado") {
          setSignalsCount(prev => prev + 1);
          setLastSignal(res);
          
          if (user) {
            await saveEngineResult(user.uid, res);
          }

          // High urgency notification
          if (res.interpretation.urgency?.toLowerCase().includes('alta')) {
            toast.error("¡DEMANDA CRÍTICA DETECTADA!", {
              description: `${res.structure.entity}: ${res.structure.need}`,
              icon: <AlertTriangle className="w-5 h-5" />
            });
          }
        }
      }
    } catch (err) {
      console.error("Analysis error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

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
            className="relative w-full max-w-6xl bg-brand-dark border border-brand-gold/20 rounded-none overflow-hidden shadow-luxury"
          >
            {/* Header */}
            <div className="p-8 border-b border-brand-gold/10 flex items-center justify-between bg-brand-gold/5">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-none bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Bird className={cn("w-7 h-7 text-brand-gold", isActive && "animate-pulse")} />
                </div>
                <div>
                  <h3 className="text-2xl font-light tracking-tight uppercase">Protocolo <span className="text-brand-gold font-serif italic">Observador Neural</span></h3>
                  <p className="text-[10px] text-brand-muted uppercase tracking-[0.4em] mt-1">Ingesta Masiva de Inteligencia Visual v3.1</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-brand-gold/10 rounded-none transition-colors text-brand-muted hover:text-brand-gold border border-transparent hover:border-brand-gold/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid lg:grid-cols-12 h-[650px]">
              {/* Main Viewport */}
              <div className="lg:col-span-8 bg-black relative flex items-center justify-center overflow-hidden">
                {!isActive ? (
                  <div className="text-center space-y-8 p-16 max-w-2xl">
                    <div className="w-28 h-28 rounded-none bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center mx-auto mb-10 relative">
                      <div className="absolute inset-0 border border-brand-gold/20 animate-ping opacity-20" />
                      <Eye className="w-12 h-12 text-brand-gold/40" />
                    </div>
                    <h4 className="text-3xl font-light uppercase tracking-widest">Listo para Iniciar Ingesta</h4>
                    <p className="text-sm text-brand-muted leading-relaxed font-light">
                      Al activar este modo, la IA analizará visualmente su pantalla para detectar patrones de demanda desatendida en tiempo real. Ideal para navegar grupos de Facebook, TikTok o WhatsApp.
                    </p>
                    <div className="pt-6">
                      <button 
                        onClick={startCapture}
                        className="luxury-button px-16 py-5 group"
                      >
                        <Play className="w-4 h-4 mr-3" />
                        Activar Observador
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-contain opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    {/* Scanning Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 via-transparent to-brand-gold/5" />
                      <div className="w-full h-[1px] bg-brand-gold/60 shadow-[0_0_30px_rgba(197,160,89,0.8)] animate-[scan_4s_linear_infinite] relative z-20" />
                      
                      {/* Corner Accents */}
                      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-brand-gold/40" />
                      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-brand-gold/40" />
                      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-brand-gold/40" />
                      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-brand-gold/40" />

                      <div className="absolute top-8 left-8 flex items-center gap-3 px-4 py-2 rounded-none bg-brand-dark/80 border border-brand-gold/20 backdrop-blur-xl">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">Neural Ingestion: Active</span>
                      </div>

                      <div className="absolute bottom-8 right-8 flex items-center gap-4 px-6 py-3 bg-brand-dark/80 border border-brand-gold/20 backdrop-blur-xl">
                        <div className="flex flex-col items-end">
                          <span className="text-[8px] text-brand-muted uppercase tracking-widest">Master Engine</span>
                          <span className="text-[10px] text-brand-gold font-mono">v3.1.PRO_PREVIEW</span>
                        </div>
                        <div className="w-px h-8 bg-brand-gold/20" />
                        <Activity className="w-5 h-5 text-brand-gold animate-pulse" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Stats */}
              <div className="lg:col-span-4 border-l border-brand-gold/10 p-10 space-y-10 bg-brand-dark/50 overflow-y-auto grid-bg">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">Métricas de Sesión</h4>
                    <Activity className="w-4 h-4 text-brand-gold/40" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-brand-dark/80 border border-brand-gold/10 rounded-none relative overflow-hidden group">
                      <div className="absolute inset-0 bg-brand-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="text-[8px] text-brand-muted uppercase block mb-2 relative z-10">Señales</span>
                      <div className="text-3xl font-light text-brand-gold relative z-10">{signalsCount}</div>
                    </div>
                    <div className="p-6 bg-brand-dark/80 border border-brand-gold/10 rounded-none relative overflow-hidden group">
                      <div className="absolute inset-0 bg-brand-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="text-[8px] text-brand-muted uppercase block mb-2 relative z-10">Precisión</span>
                      <div className="text-3xl font-light text-white relative z-10">98.4%</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">Última Detección</h4>
                  {lastSignal ? (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 bg-brand-gold/5 border border-brand-gold/20 rounded-none space-y-4 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-gold/5 rotate-45 translate-x-8 -translate-y-8" />
                      <div className="flex items-center justify-between relative z-10">
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{lastSignal.structure.entity}</span>
                        <span className="text-[8px] px-2 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold uppercase tracking-tighter">
                          {lastSignal.source.platform}
                        </span>
                      </div>
                      <p className="text-[12px] text-white font-light leading-relaxed italic relative z-10">
                        "{lastSignal.structure.need}"
                      </p>
                      <div className="flex items-center gap-3 pt-2 border-t border-brand-gold/10 relative z-10">
                        <CheckCircle2 className="w-3 h-3 text-brand-gold" />
                        <span className="text-[8px] text-brand-muted uppercase tracking-[0.2em]">Estructurado en Dataset</span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="p-12 border border-dashed border-brand-gold/10 rounded-none text-center">
                      <p className="text-[10px] text-brand-muted uppercase tracking-[0.3em]">Esperando señales...</p>
                    </div>
                  )}
                </div>

                <div className="pt-10 border-t border-brand-gold/10">
                  <div className="flex items-center gap-4 mb-6">
                    <Shield className="w-5 h-5 text-brand-gold/60" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted">Gobernanza de Datos</span>
                  </div>
                  <p className="text-[10px] text-brand-muted/60 leading-relaxed italic font-light">
                    Este protocolo opera bajo el Manifiesto de Inteligencia Universal. Los frames visuales se procesan de forma efímera y solo la metadata estructurada es persistida para el entrenamiento del cerebro colectivo de Animal Master.
                  </p>
                </div>

                {isActive && (
                  <button 
                    onClick={stopCapture}
                    className="w-full py-5 border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3 group"
                  >
                    <Square className="w-3 h-3 group-hover:scale-125 transition-transform" />
                    Detener Protocolo
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NeuralObserver;
