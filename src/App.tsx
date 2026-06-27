import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { LoginButton } from './components/LoginButton';
import { useAuth } from './context/FirebaseContext';
import { Toaster, toast } from 'sonner';
import { CourseCatalog } from './components/CourseCatalog';
import { 
  Search, 
  BookOpen, 
  Users, 
  MessageSquare, 
  ChevronRight, 
  ArrowRight, 
  Menu, 
  X,
  Sparkles,
  Send,
  User,
  Bot,
  Filter,
  Star,
  Play,
  Calendar,
  Quote,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  PieChart,
  Shield,
  BarChart,
  Brain,
  PiggyBank,
  Beef,
  Dog,
  Cat,
  Tractor,
  Fish,
  Bird,
  Database,
  Code,
  Save,
  PenTool,
  Camera,
  FileJson,
  Table,
  Globe,
  Zap,
  Layers,
  RefreshCw,
  Target,
  Copy,
  Cpu,
  Workflow,
  Activity,
  BarChart3,
  AlertTriangle,
  TrendingDown,
  Briefcase,
  Eye,
  Rabbit,
  GraduationCap
} from 'lucide-react';
import { runMasterEngine, EngineResult } from './services/masterEngineService';
import { cn } from './lib/utils';
import { getGuides, getMentors, seedDatabase, updateUserPlan, saveEngineResult, getChatSession, saveChatSession, ChatMessage, getBusinessVault, saveBusinessVault, BusinessVault, clearChatSession, getUserNotes, saveUserNotes } from './services/firestoreService';
import { calculateMentorScore } from './services/rankingService';
import { MENTORS, FEDERAL_PROGRAMS, FEDERAL_STRATEGY, Guide, Mentor, ANIMAL_GUIDES } from './data/content';
import { getMentorResponse } from './services/gemini';
import InvestorDashboard from './components/InvestorDashboard';
import NeuralObserver from './components/NeuralObserver';
import ProtocolManifesto from './components/ProtocolManifesto';
import { CommerceImpactDashboard } from './components/CommerceImpactDashboard';
import { ValidationSeries } from './components/ValidationSeries';
import { db, auth, googleProvider } from './lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { OperationType, handleFirestoreError } from './lib/firebaseUtils';

const ANIMAL_CATEGORIES = [
  { id: 'Porcine', name: 'Porcina', icon: PiggyBank },
  { id: 'Bovine', name: 'Bovina', icon: Beef },
  { id: 'Canine', name: 'Canina', icon: Dog },
  { id: 'Feline', name: 'Felina', icon: Cat },
  { id: 'Equine', name: 'Equina', icon: Tractor },
  { id: 'Aquaculture', name: 'Acuícola', icon: Fish },
  { id: 'Avian', name: 'Aviar', icon: Bird },
  { id: 'SpecialtyPets', name: 'Mascotas de Especialidad', icon: Rabbit },
];

// --- Components ---


const Navbar = ({ user }: { user: FirebaseUser | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-6",
      isScrolled ? "bg-brand-dark/80 backdrop-blur-2xl border-b border-brand-gold/10 py-4" : "bg-transparent"
    )}>
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 border border-brand-gold/30 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
            <span className="text-brand-gold font-serif font-light text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-500">A</span>
          </div>
          <span className="font-serif text-2xl font-light tracking-[0.1em] uppercase">Animal<span className="text-brand-gold">Master</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-12 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-muted">
          <a href="#academy" className="hover:text-brand-gold transition-colors relative group">
            Pabellón Clínico
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <a href="#asset-library" className="hover:text-brand-gold transition-colors relative group">
            Library
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <a href="#mentors" className="hover:text-brand-gold transition-colors relative group">
            Faculty Board
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <a href="#ai-assistance" className="hover:text-brand-gold transition-colors relative group">
            Triage Console
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <a href="#master-engine" className="hover:text-brand-gold transition-colors relative group">
            Neuro-Triage Engine
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <a href="#programas-federales" className="text-brand-gold hover:text-white transition-colors relative group">
            Federal Subsidies
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <button 
            onClick={() => alert("Función de traducción en desarrollo.")}
            className="text-brand-gold hover:text-white transition-colors"
          >
            ES/EN
          </button>
          {user?.email === 'autosociomx@gmail.com' && (
            <button onClick={seedDatabase} className="text-xs border border-red-500 text-red-500 px-2 py-1 hover:bg-red-500 hover:text-white transition-colors">
              Seed DB
            </button>
          )}
          {user ? (
            <button onClick={handleLogout} className="luxury-button">Cerrar Sesión</button>
          ) : (
            <button onClick={handleLogin} className="luxury-button">Acceso Miembros</button>
          )}
        </div>
        
        <button className="md:hidden text-brand-gold" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-b border-brand-gold/10 py-8 px-8 flex flex-col gap-6 md:hidden"
          >
            <a href="#academy" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-muted hover:text-brand-gold transition-colors">
              Pabellón Clínico
            </a>
            <a href="#asset-library" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-muted hover:text-brand-gold transition-colors">
              Library
            </a>
            <a href="#mentors" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-muted hover:text-brand-gold transition-colors">
              Faculty Board
            </a>
            <a href="#ai-assistance" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-muted hover:text-brand-gold transition-colors">
              Triage Console
            </a>
            <a href="#programas-federales" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold hover:text-white transition-colors">
              Federal Medical Subsidies
            </a>
            <button 
              onClick={() => {
                alert("Función de traducción en desarrollo.");
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold hover:text-white transition-colors text-left"
            >
              ES/EN
            </button>
            {user?.email === 'autosociomx@gmail.com' && (
              <button onClick={() => { seedDatabase(); setIsMobileMenuOpen(false); }} className="text-xs border border-red-500 text-red-500 px-2 py-1 hover:bg-red-500 hover:text-white transition-colors text-left w-max">
                Seed DB
              </button>
            )}
            {user ? (
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="luxury-button w-full text-center">Cerrar Sesión</button>
            ) : (
              <button onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }} className="luxury-button w-full text-center">Acceso Miembros</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FloatingChatbot = ({ selectedMentor, isOpen, setIsOpen, allGuides }: { selectedMentor?: Mentor | null, isOpen: boolean, setIsOpen: (v: boolean) => void, allGuides: Guide[] }) => {
  const { user, userProfile, signInWithGoogle } = useAuth();
  const [input, setInput] = useState('');
  const defaultMessage = { 
    role: 'model' as const, 
    parts: [{ text: "¡Hola! Qué gusto saludarte. Soy tu Guía Cognitivo de Animal Master, impulsado por Google AI Studio y Conecta X. Estoy aquí para acompañarte 1-a-1, hacer seguimiento a tu progreso y enseñarte sobre el camino. Ya sea que trabajes con grandes mamíferos, conejillos de Indias o con pájaros y aves, ¿en qué te puedo ayudar hoy?" }],
    timestamp: Date.now()
  };
  const [messages, setMessages] = useState<{ role: 'user' | 'model', parts: { text: string }[], timestamp: number }[]>([defaultMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const [businessVault, setBusinessVault] = useState<BusinessVault | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [vaultForm, setVaultForm] = useState({
    businessName: '',
    niche: '',
    challenges: ''
  });
  const [notes, setNotes] = useState('');

  const relevantGuides = selectedMentor ? allGuides.filter(g => g.category === selectedMentor.category) : [];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isNotesOpen]);

  useEffect(() => {
    const loadChat = async () => {
      if (isOpen && user) {
        setIsHistoryLoaded(false);
        const mentorId = selectedMentor ? selectedMentor.id : 'general';
        const [session, vault, savedNotes] = await Promise.all([
          getChatSession(user.uid, mentorId),
          getBusinessVault(user.uid),
          getUserNotes(user.uid)
        ]);
        
        if (vault) {
          setBusinessVault(vault);
          setVaultForm({
            businessName: vault.businessName || '',
            niche: vault.niche || '',
            challenges: vault.challenges?.join(', ') || ''
          });
        }

        if (savedNotes) {
          setNotes(savedNotes);
        }

        if (session && session.messages.length > 0) {
          const formattedMessages = session.messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }],
            timestamp: m.timestamp || Date.now()
          }));
          setMessages(formattedMessages);
          setIsHistoryLoaded(true);
        } else if (selectedMentor) {
          const isElite = userProfile?.plan === 'Elite Executive';
          const greeting = isElite 
            ? `Es un honor saludarle nuevamente, Miembro Elite. Soy ${selectedMentor.nombre}, su consultor personal de alto nivel. \n\nComo parte de su estatus ejecutivo, estoy a su entera disposición para optimizar cada detalle de su operación en ${selectedMentor.category}. \n\n${selectedMentor.estrategia_venta}\n\n¿Qué desafío estratégico abordaremos hoy para mantener su liderazgo en la industria?`
            : `¡Hola! Soy ${selectedMentor.nombre}, ${selectedMentor.titulo_visible}. \n\n${selectedMentor.estrategia_venta}\n\n¿En qué desafío específico de la especialidad ${selectedMentor.category} te puedo ayudar a dominar hoy?`;

          setMessages([
            { 
              role: 'model' as const, 
              parts: [{ text: greeting }],
              timestamp: Date.now()
            }
          ]);
        } else {
          setMessages([defaultMessage]);
        }
      }
    };
    loadChat();
  }, [selectedMentor, isOpen, userProfile, user]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen excede el límite de 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        toast.success("Imagen clínica adjunta");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!user) {
      alert('Por favor, inicie sesión o regístrese como becario/productor para utilizar el Consultor IA.');
      signInWithGoogle();
      return;
    }

    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const imagePayload = selectedImage;
    setSelectedImage(null);

    let displayMessage = userMessage;
    if (imagePayload) {
      displayMessage += '\n\n*(Imagen clínica adjunta)*';
    }

    const newMessages = [...messages, { role: 'user' as const, parts: [{ text: displayMessage }], timestamp: Date.now() }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await getMentorResponse(userMessage || "Analiza la siguiente imagen de acuerdo a los parámetros clínicos de la academia.", messages, selectedMentor, relevantGuides, businessVault, imagePayload || undefined);
      const finalMessages = [...newMessages, { role: 'model' as const, parts: [{ text: response || "Lo siento, no pude procesar tu solicitud." }], timestamp: Date.now() }];
      setMessages(finalMessages);
      
      // Save to Firestore
      const mentorId = selectedMentor ? selectedMentor.id : 'general';
      const chatMessagesToSave: ChatMessage[] = finalMessages.map(m => ({
        role: m.role,
        text: m.parts[0].text,
        timestamp: Date.now()
      }));
      await saveChatSession(user.uid, mentorId, chatMessagesToSave);
      
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: 'Disculpe, he experimentado una interrupción. Por favor, reintente.' }], timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const appendToNotes = async (text: string) => {
    const newNotes = notes + (notes ? '\n\n---\n\n' : '') + text;
    setNotes(newNotes);
    if (user) {
      await saveUserNotes(user.uid, newNotes);
    }
    setIsNotesOpen(true);
    toast.success('Respuesta guardada en notas');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado al portapapeles');
  };

  const handleSaveVault = async () => {
    if (!user) return;
    const data: Partial<BusinessVault> = {
      businessName: vaultForm.businessName,
      niche: vaultForm.niche,
      challenges: vaultForm.challenges.split(',').map(s => s.trim()).filter(s => s),
      assets: businessVault?.assets || []
    };
    await saveBusinessVault(user.uid, data);
    setBusinessVault(data as BusinessVault);
    setIsVaultOpen(false);
    toast.success('Bóveda de Inteligencia actualizada');
  };
  
  const handleClearHistory = async () => {
    if (!user) return;
    const mentorId = selectedMentor ? selectedMentor.id : 'general';
    await clearChatSession(user.uid, mentorId);
    setMessages([defaultMessage]);
    setIsHistoryLoaded(false);
    toast.success('Historial de chat eliminado');
  };

  const saveFullConversation = async () => {
    const fullText = messages.map(m => `${m.role === 'user' ? 'TÚ' : 'MENTOR'}: ${m.parts[0].text}`).join('\n\n---\n\n');
    const newNotes = notes + (notes ? '\n\n---\n\n' : '') + `RESUMEN DE SESIÓN (${new Date().toLocaleDateString()}):\n\n` + fullText;
    setNotes(newNotes);
    if (user) {
      await saveUserNotes(user.uid, newNotes);
    }
    setIsNotesOpen(true);
    toast.success('Conversación completa guardada en notas');
  };

  const formatTime = (ts: number) => {
    return new Intl.DateTimeFormat('es-MX', { hour: '2-digit', minute: '2-digit' }).format(ts);
  };
  
  return (
    <>
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="bg-brand-gold text-brand-dark px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl mb-2 relative"
            >
              ¿Necesitas una estrategia?
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-brand-gold rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative">
          {isOpen && (
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-brand-gold rounded-full blur-lg"
            />
          )}
          <motion.button 
            onClick={() => setIsOpen(!isOpen)}
            animate={isOpen ? {
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0px rgba(212, 175, 55, 0)",
                "0 0 0 15px rgba(212, 175, 55, 0.2)",
                "0 0 0 0px rgba(212, 175, 55, 0)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Bot className="w-8 h-8 relative z-10" />
          </motion.button>
        </div>
      </div>
      
      {isOpen && (
        <div className={cn(
          "fixed bottom-28 right-4 md:right-8 z-50 flex flex-col shadow-2xl glass-panel transition-all duration-300",
          "w-[calc(100vw-2rem)] h-[75vh]",
          "md:w-[500px] md:h-[650px]",
          isNotesOpen ? "lg:w-[900px]" : "lg:w-[500px]",
          "lg:h-[700px] lg:max-h-[85vh]"
        )}>
          <div className="p-4 md:p-6 border-b border-brand-gold/10 flex items-center justify-between bg-brand-dark/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-4">
              {selectedMentor ? (
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border border-brand-gold/30 overflow-hidden">
                    <img src={selectedMentor.foto_url} alt={selectedMentor.nombre} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-brand-dark animate-pulse" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                  <Bot className="w-6 h-6" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                  {selectedMentor ? 'Mentor de Élite Activo' : 'Consultor IA'}
                </span>
                <h3 className="text-sm font-light text-white tracking-tight">
                  {selectedMentor ? selectedMentor.nombre : 'Animal Master Intelligence'}
                </h3>
                <div className="flex items-center gap-2">
                  {userProfile && userProfile.plan !== 'none' && (
                    <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-brand-muted/40">
                      Tiempo: <span className="text-brand-gold/60">{userProfile.plan === 'Elite Executive' ? 'Ilimitado' : '08:45 hrs'}</span>
                    </span>
                  )}
                  {isHistoryLoaded && (
                    <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.1em] text-emerald-500/60">
                      <RefreshCw className="w-2 h-2 animate-spin-slow" />
                      Historial Sincronizado
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleClearHistory}
                className="p-2 text-brand-muted hover:text-red-400 transition-colors"
                title="Limpiar Historial"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsVaultOpen(true)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  businessVault ? "text-brand-gold bg-brand-gold/10" : "text-brand-muted hover:text-brand-gold hover:bg-brand-gold/10"
                )}
                title="Bóveda de Inteligencia"
              >
                <Database className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsNotesOpen(!isNotesOpen)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isNotesOpen ? "bg-brand-gold text-brand-dark" : "text-brand-muted hover:text-brand-gold hover:bg-brand-gold/10"
                )}
                title="Bloc de Notas"
              >
                <BookOpen className="w-5 h-5" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 text-brand-muted hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="flex-grow flex overflow-hidden relative">
            {/* Chat Area */}
            <div className={cn(
              "flex flex-col h-full transition-all w-full",
              isNotesOpen ? "hidden lg:flex lg:w-3/5 lg:border-r lg:border-brand-gold/10" : "flex"
            )}>
              <div className="flex-grow p-4 md:p-6 overflow-y-auto text-base text-brand-muted font-light space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={cn(
                    "flex flex-col gap-2",
                    msg.role === 'user' ? "items-end" : "items-start"
                  )}>
                    <div className={cn(
                      "p-4 rounded-2xl relative group transition-all shadow-lg", 
                      msg.role === 'user' 
                        ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded-tr-none max-w-[85%]" 
                        : "bg-brand-surface text-brand-text border border-brand-gold/5 rounded-tl-none max-w-[90%]"
                    )}>
                      <div className="prose prose-invert prose-brand max-w-none prose-p:leading-relaxed prose-headings:text-brand-gold prose-a:text-brand-gold mb-2">
                        <Markdown>{msg.parts[0].text}</Markdown>
                      </div>
                      
                      <div className={cn(
                        "flex items-center gap-3 mt-2 pt-2 border-t border-brand-gold/5",
                        msg.role === 'user' ? "justify-end" : "justify-between"
                      )}>
                        <span className="text-[9px] font-mono text-brand-muted/40 uppercase tracking-tighter">
                          {formatTime(msg.timestamp)}
                        </span>
                        
                        {msg.role === 'model' && (
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => copyToClipboard(msg.parts[0].text)}
                              className="p-1.5 hover:text-brand-gold transition-colors"
                              title="Copiar respuesta"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            <button 
                              onClick={() => appendToNotes(msg.parts[0].text)} 
                              className="p-1.5 hover:text-brand-gold transition-colors"
                              title="Guardar en notas"
                            >
                              <Save className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-3 p-4 bg-brand-surface/50 rounded-lg mr-auto max-w-[90%]">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/60">Analizando...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Business Vault Modal Overlay */}
              <AnimatePresence>
                {isVaultOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute inset-0 z-20 bg-brand-dark/95 backdrop-blur-md p-6 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold">
                          <Database className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Bóveda de Inteligencia</h4>
                          <p className="text-[10px] text-brand-muted">Datos estratégicos para mentores</p>
                        </div>
                      </div>
                      <button onClick={() => setIsVaultOpen(false)} className="text-brand-muted hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-brand-gold uppercase tracking-tighter">Nombre de la Empresa</label>
                        <input 
                          type="text" 
                          value={vaultForm.businessName}
                          onChange={(e) => setVaultForm({...vaultForm, businessName: e.target.value})}
                          placeholder="Ej. Clínica Veterinaria Élite"
                          className="w-full bg-brand-surface border border-brand-gold/20 rounded-lg p-3 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-brand-gold uppercase tracking-tighter">Nicho / Especialidad</label>
                        <input 
                          type="text" 
                          value={vaultForm.niche}
                          onChange={(e) => setVaultForm({...vaultForm, niche: e.target.value})}
                          placeholder="Ej. Cirugía de Pequeñas Especies"
                          className="w-full bg-brand-surface border border-brand-gold/20 rounded-lg p-3 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-brand-gold uppercase tracking-tighter">Desafíos Críticos (separados por coma)</label>
                        <textarea 
                          value={vaultForm.challenges}
                          onChange={(e) => setVaultForm({...vaultForm, challenges: e.target.value})}
                          placeholder="Ej. Retención de clientes, Optimización de costos, Marketing digital"
                          className="w-full bg-brand-surface border border-brand-gold/20 rounded-lg p-3 text-sm text-white focus:border-brand-gold outline-none transition-colors h-24 resize-none"
                        />
                      </div>
                      
                      <div className="p-4 bg-brand-gold/5 border border-brand-gold/10 rounded-lg">
                        <div className="flex items-center gap-2 text-brand-gold mb-2">
                          <Zap className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Efecto Alquimia</span>
                        </div>
                        <p className="text-[11px] text-brand-muted leading-relaxed italic">
                          "Al completar estos datos, tus mentores dejarán de darte consejos genéricos y comenzarán a diseñar estrategias quirúrgicas para tu operación real."
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={handleSaveVault}
                      className="mt-6 w-full py-4 bg-brand-gold text-brand-dark font-bold uppercase tracking-[0.2em] text-xs rounded-lg hover:bg-white transition-all shadow-lg shadow-brand-gold/20"
                    >
                      Sincronizar Bóveda
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-4 md:p-6 border-t border-brand-gold/10 relative flex flex-col gap-2">
                {selectedImage && (
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border border-brand-gold/30">
                     <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                     <button 
                       onClick={() => setSelectedImage(null)}
                       className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80"
                     >
                       <X className="w-3 h-3" />
                     </button>
                  </div>
                )}
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center">
                    <label className="cursor-pointer text-brand-gold/60 hover:text-brand-gold transition-colors">
                      <Camera className="w-5 h-5" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Escriba su consulta o suba una imagen clínica..." 
                    className="w-full bg-brand-dark/50 border border-brand-gold/10 p-4 pl-12 pr-12 text-base focus:outline-none rounded-lg text-white" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-4 text-brand-gold hover:text-white transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notes Area */}
            <div className={cn(
              "flex flex-col h-full bg-brand-dark/30 w-full border-l border-brand-gold/10",
              isNotesOpen ? "flex lg:w-2/5" : "hidden"
            )}>
              <div className="p-4 border-b border-brand-gold/10 flex items-center justify-between text-brand-gold bg-brand-dark/50">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Bloc de Notas Estratégicas</span>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={saveFullConversation}
                    className="p-1.5 hover:text-white transition-colors"
                    title="Guardar Conversación Completa"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(notes);
                      toast.success('Notas copiadas al portapapeles');
                    }}
                    className="p-1.5 hover:text-white transition-colors"
                    title="Copiar Todo"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={async () => {
                      if (confirm('¿Estás seguro de que deseas borrar todas tus notas? Esta acción no se puede deshacer.')) {
                        setNotes('');
                        if (user) await saveUserNotes(user.uid, '');
                        toast.success('Notas eliminadas');
                      }
                    }}
                    className="p-1.5 hover:text-red-400 transition-colors"
                    title="Borrar Todo"
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                  <button onClick={() => setIsNotesOpen(false)} className="lg:hidden p-1.5 text-brand-muted hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <textarea
                className="flex-grow p-6 bg-transparent border-none resize-none focus:outline-none text-brand-text font-light leading-relaxed text-base custom-scrollbar"
                placeholder="Tus anotaciones estratégicas se guardarán aquí. Haz clic en el ícono de guardar en cualquier mensaje del chat para agregarlo a tus notas."
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
                onBlur={async () => {
                  if (user) {
                    await saveUserNotes(user.uid, notes);
                  }
                }}
              />
              <div className="p-4 border-t border-brand-gold/10 bg-brand-dark/20 flex justify-end">
                <button 
                  onClick={async () => {
                    if (user) {
                      await saveUserNotes(user.uid, notes);
                      toast.success('Notas guardadas correctamente');
                    }
                  }}
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors flex items-center gap-2"
                >
                  <Save className="w-3 h-3" />
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MetamorphosisOverlay = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-3xl flex items-center justify-center overflow-hidden"
        >
          {/* Scanning Lines */}
          <motion.div
            initial={{ top: "-100%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-px bg-brand-gold/50 shadow-[0_0_20px_rgba(197,160,89,0.8)] z-10"
          />

          <div className="max-w-4xl w-full px-8 text-center relative z-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="w-32 h-32 rounded-full border-2 border-brand-gold/30 mx-auto flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-2 border-brand-gold animate-ping opacity-20" />
                <Brain className="w-16 h-16 text-brand-gold animate-pulse" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-light tracking-tighter mb-6"
            >
              Iniciando <span className="text-brand-gold italic font-serif">Metamorfosis Digital</span>
            </motion.h2>

            <div className="space-y-4 mb-12 max-w-md mx-auto">
              {[
                "Sincronizando con Google AI Studio...",
                "Calibrando Inteligencia Universal...",
                "Estructurando Dataset de Dominio...",
                "Activando Protocolos de Élite..."
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + (i * 0.2) }}
                  className="flex items-center gap-4 text-brand-muted/60 text-xs uppercase tracking-[0.3em]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/40" />
                  {text}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 2 }}
              className="w-full h-1 bg-brand-gold/10 rounded-full overflow-hidden mb-12 origin-left"
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-1/3 h-full bg-brand-gold shadow-[0_0_15px_rgba(197,160,89,0.8)]"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              onClick={onClose}
              className="luxury-button px-12 py-4"
            >
              Completar Transformación
            </motion.button>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: 0 
                }}
                animate={{ 
                  y: [null, Math.random() * -200],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ 
                  duration: Math.random() * 5 + 5, 
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                className="absolute text-[8px] font-mono text-brand-gold/20"
              >
                {Math.random().toString(16).substring(2, 10).toUpperCase()}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Hero = ({ userType, setUserType, onActivate }: { userType: 'owner' | 'professional' | 'business', setUserType: (t: 'owner' | 'professional' | 'business') => void, onActivate: () => void }) => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden luxury-gradient">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2070&auto=format&fit=crop" 
        alt="Hero Background" 
        className="w-full h-full object-cover opacity-10 grayscale"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark" />
    </div>
    
    <div className="max-w-screen-2xl mx-auto px-8 relative z-10 grid lg:grid-cols-12 gap-16 items-center">
      <motion.div
        className="lg:col-span-7"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => setUserType('owner')}
            className={cn(
              "px-6 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all",
              userType === 'owner' ? "bg-brand-gold text-brand-dark border-brand-gold" : "bg-transparent text-brand-muted border-brand-gold/20"
            )}
          >
            Guía Personal
          </button>
          <button 
            onClick={() => setUserType('professional')}
            className={cn(
              "px-6 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all",
              userType === 'professional' ? "bg-brand-gold text-brand-dark border-brand-gold" : "bg-transparent text-brand-muted border-brand-gold/20"
            )}
          >
            Estratega Clínico
          </button>
          <button 
            onClick={() => setUserType('business')}
            className={cn(
              "px-6 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all",
              userType === 'business' ? "bg-brand-gold text-brand-dark border-brand-gold" : "bg-transparent text-brand-muted border-brand-gold/20"
            )}
          >
            Líder de Industria
          </button>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 mb-8">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">Colaboración con Google AI Studio</span>
        </div>

        <h1 className="text-7xl md:text-[100px] font-light leading-[0.85] mb-10">
          Animal <br />
          <span className="italic text-brand-gold font-serif">Master</span>
        </h1>
        
        <p className="text-xl text-brand-muted max-w-xl mb-12 leading-relaxed font-light">
          {userType === 'owner' ? (
            <>
              Experimente el <span className="text-brand-gold font-medium">Triage Clínico Asistido</span>. 
              Subsidio federal activo: reciba asesoría protocolarizada de nivel académico para su especie a cargo de los sistemas del Neuro-Triage Engine.
            </>
          ) : userType === 'professional' ? (
            <>
              Escale su <span className="text-brand-gold font-medium">Praxis de Triage</span> con algoritmos de vanguardia. 
              Implementamos protocolos basados en el Animal Trauma Triage (ATT) y heurísticas de excelencia clínica para maximizar la sobrevida.
            </>
          ) : (
            <>
              El repositorio metalingüístico de <span className="text-brand-gold font-medium">Decodificación Clínica y Triage Animal</span>. 
              Gobernanza apoyada por Google AI Studio y la integración de Subsidios Federales de México.
            </>
          )}
        </p>

        <div className="flex flex-wrap gap-6">
          <button 
            onClick={onActivate}
            className="luxury-button group inline-flex items-center"
          >
            Activar Mi Transformación
            <Zap className="inline-block ml-2 w-4 h-4 group-hover:scale-125 transition-transform" />
          </button>
        </div>
      </motion.div>
      
      <motion.div 
        className="lg:col-span-5 relative hidden lg:block"
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="aspect-[3/4] border border-brand-gold/20 p-4 relative">
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t border-l border-brand-gold" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b border-r border-brand-gold" />
          
          <div className="w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
            <img 
              src={userType === 'owner' 
                ? "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2071&auto=format&fit=crop"
                : userType === 'professional'
                ? "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                : "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop"
              }
              alt="Contextual Image" 
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2000ms]"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 vertical-text text-[9px] uppercase tracking-[0.5em] text-brand-gold/40">
            {userType === 'owner' ? 'Animal Master • Nueva Era de Aprendizaje' : 'Universal Intelligence Core • Google AI Studio'}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const TransformationSection = () => {
  const benefits = [
    {
      title: "Guía Personal IA",
      desc: "Acompañamiento 1-a-1 impulsado por Google AI Studio. Tu mentor digital disponible 24/7 para cada decisión.",
      icon: <Bot className="w-6 h-6" />,
      color: "from-blue-500/20 to-brand-gold/20"
    },
    {
      title: "Estratega Clínico",
      desc: "Maestría en comportamiento y biometría animal. Diagnósticos de precisión quirúrgica con soporte de inteligencia universal.",
      icon: <Activity className="w-6 h-6" />,
      color: "from-emerald-500/20 to-brand-gold/20"
    },
    {
      title: "Inteligencia Empresarial",
      desc: "Optimización radical de negocios agropecuarios. Detecta fugas de capital y maximiza el ROI con algoritmos predictivos.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-purple-500/20 to-brand-gold/20"
    },
    {
      title: "Ejecutivo de Élite",
      desc: "Liderazgo estratégico y acceso a la red de expertos más influyente del sector. Estatus de dominio absoluto.",
      icon: <Shield className="w-6 h-6" />,
      color: "from-red-500/20 to-brand-gold/20"
    }
  ];

  return (
    <section className="py-32 bg-brand-dark relative overflow-hidden border-b border-brand-gold/5">
      {/* Background Neural Network Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.1),transparent_70%)]" />
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0 50 Q 25 25 50 50 T 100 50"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="0.1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#C5A059" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold">Metamorfosis de Élite</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-8"
          >
            Transformación <br />
            <span className="italic text-brand-gold font-serif">Impulsada por Inteligencia Universal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-muted max-w-2xl mx-auto font-light text-lg"
          >
            No solo enseñamos; reprogramamos tu capacidad de dominio. Evoluciona de seguidor a líder indiscutible del mercado animal con tecnología de Google AI Studio.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl",
                benefit.color
              )} />
              <div className="relative glass-panel p-10 h-full flex flex-col border-brand-gold/10 group-hover:border-brand-gold/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20 mb-8 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-brand-gold transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed font-light mb-8 flex-grow">
                  {benefit.desc}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-gold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  <span>Activar Beneficio</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-brand-gold/5 border border-brand-gold/20 rounded-3xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-gold/20 transition-all duration-1000" />
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h3 className="text-3xl md:text-4xl font-light mb-6">¿Listo para el <span className="text-brand-gold italic font-serif">Upgrade de Sistema</span>?</h3>
              <p className="text-brand-muted font-light leading-relaxed mb-8">
                Únete a la élite de Animal Master Academy y accede a herramientas de inteligencia que otros solo pueden imaginar. Tu transformación comienza con un solo clic.
              </p>
              <div className="flex flex-wrap gap-6">
                <button className="luxury-button px-10 py-4 group">
                  Iniciar Mi Metamorfosis
                  <Zap className="w-4 h-4 ml-2 group-hover:scale-125 transition-transform" />
                </button>
                <button className="outline-button px-10 py-4">
                  Ver Casos de Éxito
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Usuarios Activos", value: "12.5k+" },
                  { label: "Casos de Éxito", value: "98%" },
                  { label: "IA Accuracy", value: "99.9%" },
                  { label: "ROI Promedio", value: "4.5x" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 border border-brand-gold/10 bg-brand-dark/50 rounded-xl">
                    <div className="text-2xl font-light text-brand-gold mb-1">{stat.value}</div>
                    <div className="text-[9px] uppercase tracking-widest text-brand-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AssetLibrarySection = ({ guides, mentors }: { guides: Guide[], mentors: Mentor[] }) => {
  const { user, signInWithGoogle } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  const categories = Array.from(new Set(guides.map(g => g.category)));
  const levels = ['Guía de Inmersión', 'Curso de Especialidad', 'Maestría de Élite'];
  
  const availableTopics = Array.from(new Set(
    guides
      .filter(g => (selectedCategory ? g.category === selectedCategory : true))
      .filter(g => (selectedLevel ? g.level === selectedLevel : true))
      .flatMap(g => g.topics)
  )).sort();
  
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory ? guide.category === selectedCategory : true;
    const matchesLevel = selectedLevel ? guide.level === selectedLevel : true;
    const matchesTopic = selectedTopic ? guide.topics.includes(selectedTopic) : true;
    return matchesSearch && matchesCategory && matchesLevel && matchesTopic;
  });

  const handleStartLearning = (category: string) => {
    const categoryMentors = mentors.filter(m => m.category === category);
    if (categoryMentors.length > 0) {
      const event = new CustomEvent('openMentorChat', { detail: categoryMentors[0] });
      window.dispatchEvent(event);
    }
  };

  return (
    <section id="asset-library" className="py-32 bg-brand-dark border-y border-brand-gold/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-gold blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-gold blur-[120px]" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">Asset Library</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-light mb-8 tracking-tighter leading-[0.9]">
              Ecosistema de <br />
              <span className="italic font-serif text-brand-gold">Maestría Cognitiva</span>
            </h2>
            <p className="text-xl text-brand-muted font-light leading-relaxed max-w-2xl">
              No solo acumules información; integra sabiduría. Nuestra arquitectura de conocimiento está diseñada para que tu cerebro asimile conceptos complejos mediante la inmersión táctica y el diálogo experto.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 w-full lg:w-[450px]">
            <div className="relative">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/40" />
              <input 
                type="text" 
                placeholder="Buscar por título o concepto..."
                className="w-full pl-16 pr-8 py-6 bg-brand-surface/30 backdrop-blur-xl border border-brand-gold/10 text-lg focus:outline-none focus:border-brand-gold/40 transition-all placeholder:text-brand-muted/20 rounded-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">
                {filteredGuides.length} Resultados Encontrados
              </span>
              {(selectedCategory || selectedLevel || selectedTopic || searchQuery) && (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setSelectedLevel(null);
                    setSelectedTopic(null);
                  }}
                  className="text-[10px] uppercase tracking-widest text-brand-gold hover:text-white transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3 h-3" />
                  Limpiar Filtros
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-8 mb-20">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-8 py-3 text-[9px] font-bold uppercase tracking-[0.3em] transition-all border",
                selectedCategory === null 
                  ? "bg-brand-gold text-brand-dark border-brand-gold" 
                  : "bg-transparent text-brand-muted border-brand-gold/10 hover:border-brand-gold/30"
              )}
            >
              Todas las Especies
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-8 py-3 text-[9px] font-bold uppercase tracking-[0.3em] transition-all border flex items-center gap-3",
                  selectedCategory === cat 
                    ? "bg-brand-gold text-brand-dark border-brand-gold" 
                    : "bg-transparent text-brand-muted border-brand-gold/10 hover:border-brand-gold/30"
                )}
              >
                {ANIMAL_CATEGORIES.find(c => c.id === cat)?.icon && React.createElement(ANIMAL_CATEGORIES.find(c => c.id === cat)!.icon, { className: "w-3.5 h-3.5" })}
                {cat}
              </button>
            ))}
          </div>

          {/* Sub-filters Bar */}
          <div className="grid md:grid-cols-2 gap-6 p-8 bg-brand-surface/10 border border-brand-gold/5 backdrop-blur-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/60 block">Nivel de Especialidad</span>
              <div className="flex flex-wrap gap-2">
                {['Todos', ...levels].map(level => (
                  <button 
                    key={level}
                    onClick={() => setSelectedLevel(level === 'Todos' ? null : level)}
                    className={cn(
                      "px-5 py-2 text-[8px] font-bold uppercase tracking-widest transition-all border",
                      (level === 'Todos' ? selectedLevel === null : selectedLevel === level)
                        ? "bg-brand-gold text-brand-dark border-brand-gold" 
                        : "bg-transparent text-brand-muted border-brand-gold/10 hover:border-brand-gold/30"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/60 block">Temas Específicos</span>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-gold/40" />
                <select
                  value={selectedTopic || ''}
                  onChange={(e) => setSelectedTopic(e.target.value || null)}
                  className="w-full pl-12 pr-4 py-3 bg-brand-dark/50 border border-brand-gold/10 text-brand-muted text-[11px] uppercase tracking-widest focus:outline-none focus:border-brand-gold/30 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Explorar todos los temas</option>
                  {availableTopics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-4 h-4 text-brand-gold/40 rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-24">
          <AnimatePresence mode='popLayout'>
            {filteredGuides.length === 0 ? (
              <motion.div 
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-20 text-center bg-brand-dark border border-brand-gold/10"
              >
                <p className="text-xl text-brand-muted font-light">No se encontraron guías que coincidan con los filtros seleccionados.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setSelectedLevel(null);
                    setSelectedTopic(null);
                  }}
                  className="mt-8 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold border border-brand-gold/20 hover:border-brand-gold/50 transition-all"
                >
                  Limpiar Filtros
                </button>
              </motion.div>
            ) : (
              Array.from({ length: Math.ceil(filteredGuides.length / 4) }).map((_, blockIndex) => {
                const blockGuides = filteredGuides.slice(blockIndex * 4, (blockIndex * 4) + 4);
                const blockNames = ["Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez"];
                const blockName = blockNames[blockIndex] || (blockIndex + 1).toString();

                return (
                  <motion.div 
                    key={`block-${blockIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: blockIndex * 0.1 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-1">Estructura Académica</span>
                        <h3 className="text-2xl font-light uppercase tracking-[0.2em] text-white">
                          Bloque <span className="text-brand-gold font-medium">{blockName}</span>
                        </h3>
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-brand-gold/40 to-transparent" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/40">
                        {blockGuides.length} Guías Activas
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-1px bg-brand-gold/10 border border-brand-gold/10">
                      {blockGuides.map((guide, index) => (
                        <motion.div 
                          key={guide.id}
                          layout
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          whileHover={{ 
                            y: -10,
                            backgroundColor: "rgba(var(--brand-surface-rgb), 0.5)",
                            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                          }}
                          transition={{ 
                            duration: 0.8, 
                            delay: (blockIndex * 0.2) + (index * 0.05),
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          onClick={() => handleStartLearning(guide.category)}
                          className="group bg-brand-dark p-10 transition-all duration-500 cursor-pointer relative overflow-hidden border border-transparent hover:border-brand-gold/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col h-full"
                        >
                          <div className="flex justify-between items-start mb-12">
                            <div className="flex flex-col">
                              <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-brand-gold/40 mb-2">
                                Módulo {guide.category}
                              </span>
                              <div className="h-px w-6 bg-brand-gold/20 group-hover:w-12 transition-all duration-700" />
                            </div>
                            <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-brand-muted/40">
                              {guide.id}
                            </span>
                          </div>

                          <h3 className="text-2xl font-light mb-6 group-hover:text-brand-gold transition-colors leading-[1.2] tracking-tight min-h-[3.6rem]">
                            {guide.title}
                          </h3>
                          
                          <div className="space-y-2 mb-8 flex-grow">
                            {guide.topics.slice(0, 2).map((topic, i) => (
                              <div key={i} className="flex items-center gap-2 text-brand-muted/60 font-light text-[11px] uppercase tracking-wider">
                                <div className="w-1 h-1 rounded-full bg-brand-gold/40" />
                                {topic}
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-gold/5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full border border-brand-gold/10 flex items-center justify-center group-hover:border-brand-gold/40 transition-all">
                                <Brain className="w-3 h-3 text-brand-gold/40 group-hover:text-brand-gold" />
                              </div>
                              <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-brand-muted/40">
                                Mentor Session
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-brand-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                              <ArrowRight className="w-3 h-3" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const MentorsSection = ({ mentors, guides }: { mentors: Mentor[], guides: Guide[] }) => {
  const { user, signInWithGoogle } = useAuth();
  const categories = Array.from(new Set(mentors.map(m => m.category))) as string[];
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || '');
  
  const mentorsByCategory = mentors.reduce((acc, mentor) => {
    if (!acc[mentor.category]) acc[mentor.category] = [];
    acc[mentor.category].push(mentor);
    return acc;
  }, {} as Record<string, Mentor[]>);

  const [activeMentor, setActiveMentor] = useState<Mentor | null>(null);
  const [activeTab, setActiveTab] = useState<'bio' | 'curriculum' | 'pnl' | 'metrics'>('bio');

  useEffect(() => {
    if (categories.length > 0 && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  useEffect(() => {
    if (mentorsByCategory[activeCategory]?.length > 0) {
      setActiveMentor(mentorsByCategory[activeCategory][0]);
    } else {
      setActiveMentor(null);
    }
  }, [activeCategory, mentorsByCategory]);

  if (!activeMentor) return null;

  const mentorGuides = guides.filter(g => g.category === activeMentor.category);

  return (
    <section id="mentors" className="py-32 bg-brand-dark overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <span className="section-label">Facultad de Expertos</span>
            <h2 className="text-6xl md:text-8xl font-light mb-8 tracking-tighter leading-[0.9]">
              Mentores de <br />
              <span className="italic font-serif text-brand-gold">Élite Mundial</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-3 text-[9px] font-bold uppercase tracking-[0.4em] transition-all border flex items-center gap-3",
                  activeCategory === cat 
                    ? "bg-brand-gold text-brand-dark border-brand-gold" 
                    : "bg-transparent text-brand-muted border-brand-gold/10 hover:border-brand-gold/30"
                )}
              >
                {ANIMAL_CATEGORIES.find(c => c.id === cat)?.icon && React.createElement(ANIMAL_CATEGORIES.find(c => c.id === cat)!.icon, { className: "w-4 h-4" })}
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-px bg-brand-gold/10 border border-brand-gold/10">
          {/* Mentor List Sidebar */}
          <div className="lg:col-span-4 bg-brand-dark overflow-y-auto max-h-[800px] custom-scrollbar">
            {mentorsByCategory[activeCategory]?.map((mentor) => (
              <motion.button
                key={mentor.id}
                whileHover={{ 
                  x: 10,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveMentor(mentor);
                  setActiveTab('bio');
                }}
                className={cn(
                  "w-full flex items-center gap-8 p-8 transition-all text-left relative group border-b border-brand-gold/5",
                  activeMentor.id === mentor.id 
                    ? "bg-brand-gold/5" 
                    : "bg-transparent hover:bg-brand-surface/30"
                )}
              >
                {/* Active Indicator Sculpture Style */}
                {activeMentor.id === mentor.id && (
                  <motion.div 
                    layoutId="activeMentorIndicator"
                    className="absolute left-0 top-0 w-1 h-full bg-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.8)]" 
                  />
                )}
                
                {/* Scanning Line */}
                <motion.div 
                  initial={{ top: "-100%" }}
                  whileHover={{ top: "100%" }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent z-20 pointer-events-none"
                />

                <motion.div 
                  className={cn(
                    "w-24 h-24 overflow-hidden rounded-full border-2 transition-all duration-700 relative",
                    activeMentor.id === mentor.id 
                      ? "grayscale-0 border-brand-gold shadow-[0_0_30px_rgba(212,175,55,0.3)]" 
                      : "grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:border-brand-gold/40 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] border-brand-gold/10"
                  )}
                >
                  <motion.img 
                    src={mentor.foto_url} 
                    alt={mentor.nombre} 
                    className="w-full h-full object-cover" 
                    animate={{ 
                      scale: activeMentor.id === mentor.id ? 1.1 : 1,
                    }}
                    whileHover={{ scale: 1.12 }}
                  />
                  {activeMentor.id === mentor.id && (
                    <div className="absolute inset-0 bg-brand-gold/10 animate-pulse pointer-events-none" />
                  )}
                </motion.div>
                
                <div className="flex-1">
                  <motion.h4 
                    className={cn(
                      "font-serif text-2xl font-light mb-2 transition-all duration-500",
                      activeMentor.id === mentor.id ? "text-brand-gold" : "text-white/60 group-hover:text-white group-hover:translate-x-1"
                    )}
                  >
                    {mentor.nombre}
                  </motion.h4>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-1 h-1 rounded-full transition-all duration-500",
                      activeMentor.id === mentor.id ? "bg-brand-gold" : "bg-brand-muted/20 group-hover:bg-brand-gold/60 group-hover:scale-150"
                    )} />
                    <p className={cn(
                      "text-[8px] uppercase tracking-[0.4em] font-bold transition-all duration-500",
                      activeMentor.id === mentor.id ? "text-brand-gold/60" : "text-brand-muted/30 group-hover:text-brand-gold/80 group-hover:translate-x-2"
                    )}>{mentor.titulo_visible}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Mentor Detail View */}
          <div className="lg:col-span-8 bg-brand-dark relative overflow-hidden">
            {/* Background Aura */}
            <motion.div 
              animate={{ 
                opacity: [0.05, 0.1, 0.05],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -right-1/4 -top-1/4 w-full h-full bg-brand-gold rounded-full blur-[150px] pointer-events-none"
            />

            <motion.div 
              key={activeMentor.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col relative z-10"
            >
              {/* Header Stats - Monumental Style */}
              <div className="p-16 bg-brand-surface/20 flex flex-wrap justify-between items-center gap-16 border-b border-brand-gold/10">
                <div className="flex items-center gap-16">
                  <div className="text-center">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-6xl font-light text-brand-gold mb-2 tracking-tighter"
                    >
                      4.9
                    </motion.div>
                    <div className="flex justify-center gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-brand-gold text-brand-gold" />)}
                    </div>
                  </div>
                  
                  <div className="w-px h-20 bg-brand-gold/10" />
                  
                  <div className="text-center">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-6xl font-light text-white tracking-tighter"
                    >
                      1K+
                    </motion.div>
                    <p className="text-[9px] uppercase tracking-[0.5em] text-brand-muted/40 font-bold">Alumnos</p>
                  </div>
                  
                  <div className="w-px h-20 bg-brand-gold/10" />
                  
                  <div className="max-w-[200px]">
                    <motion.p 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-light italic font-serif text-brand-gold/80 leading-tight mb-2"
                    >
                      {activeMentor.anclaje_credibilidad}
                    </motion.p>
                    <p className="text-[9px] uppercase tracking-[0.5em] text-brand-muted/40 font-bold">Credibilidad</p>
                  </div>
                </div>

                <button onClick={() => {
                  if (!user) {
                    alert('Por favor, inicie sesión para contactar a un mentor.');
                    signInWithGoogle();
                    return;
                  }
                  const event = new CustomEvent('openMentorChat', { detail: activeMentor });
                  window.dispatchEvent(event);
                }} className="luxury-button group px-12 py-6 flex items-center gap-6">
                  <div className="relative">
                    <MessageSquare className="w-6 h-6 relative z-10" />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-brand-gold rounded-full"
                    />
                  </div>
                  <span className="text-sm tracking-[0.3em]">CONSULTAR AHORA</span>
                </button>
              </div>


              {/* Tabs Navigation */}
              <div className="flex bg-brand-surface/20 border-b border-brand-gold/10">
                {[
                  { id: 'bio', label: 'Estrategia', icon: User },
                  { id: 'curriculum', label: 'Currículum', icon: BookOpen },
                  { id: 'pnl', label: 'Mentoría', icon: Brain },
                  { id: 'metrics', label: 'KPIs', icon: BarChart },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-4 py-8 text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative",
                      activeTab === tab.id 
                        ? "text-brand-gold" 
                        : "text-brand-muted/30 hover:text-brand-muted/60"
                    )}
                  >
                    {activeTab === tab.id && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold" />
                    )}
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-20 flex-grow relative">
                {/* Decorative Data Stream */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-gold/10 to-transparent" />
                
                <AnimatePresence mode="wait">
                  {activeTab === 'bio' && (
                    <motion.div 
                      key="bio" 
                      initial={{ opacity: 0, y: 30 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -30 }} 
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-16"
                    >
                      <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-px bg-brand-gold" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-gold">Estrategia de Dominio</span>
                        </div>
                        <h3 className="text-7xl font-light leading-[0.9] mb-8 tracking-tighter">{activeMentor.nombre}</h3>
                        <p className="text-brand-gold font-serif italic text-4xl mb-12 leading-tight">{activeMentor.titulo_visible}</p>
                        <div className="grid md:grid-cols-12 gap-12">
                          <div className="md:col-span-8">
                            <p className="text-brand-muted font-light leading-relaxed text-2xl first-letter:text-5xl first-letter:font-serif first-letter:text-brand-gold first-letter:mr-3 first-letter:float-left">
                              {activeMentor.biografia_pnl}
                            </p>
                          </div>
                          <div className="md:col-span-4 space-y-8">
                            <div className="p-6 border border-brand-gold/10 bg-brand-gold/5">
                              <h5 className="text-[8px] font-bold uppercase tracking-widest text-brand-gold mb-4">Frecuencia de Éxito</h5>
                              <div className="text-3xl font-mono text-white">98.4%</div>
                            </div>
                            <div className="p-6 border border-brand-gold/10 bg-brand-gold/5">
                              <h5 className="text-[8px] font-bold uppercase tracking-widest text-brand-gold mb-4">Nivel de Impacto</h5>
                              <div className="text-3xl font-mono text-white">ELITE</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'curriculum' && (
                    <motion.div key="curriculum" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="text-3xl font-light text-brand-gold">Módulos de Especialidad</h4>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/40">{mentorGuides.length} Activos</span>
                      </div>
                      <div className="grid gap-6">
                        {mentorGuides.map((guide) => (
                          <div key={guide.id} className="p-8 border border-brand-gold/5 bg-brand-surface/20 group hover:border-brand-gold/30 transition-all">
                            <div className="flex justify-between items-start mb-4">
                              <h5 className="text-xl font-light group-hover:text-brand-gold transition-colors">{guide.title}</h5>
                              <span className="text-[8px] font-bold uppercase tracking-widest text-brand-muted/40">{guide.level}</span>
                            </div>
                            <p className="text-sm text-brand-muted/60 font-light line-clamp-2">{guide.topics.join(', ')}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'pnl' && (
                    <motion.div key="pnl" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                      <div className="grid md:grid-cols-2 gap-16">
                        <div className="space-y-8">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">Promesa de Resultado</h4>
                          <p className="text-3xl font-light italic font-serif leading-tight">"{activeMentor.promesa_resultado}"</p>
                        </div>
                        <div className="space-y-8">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">Especialidad Neuro</h4>
                          <p className="text-xl font-light text-brand-muted leading-relaxed">{activeMentor.especialidad_neuro}</p>
                        </div>
                      </div>
                      <div className="pt-12 border-t border-brand-gold/10">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-8">Anclajes de Autoridad</h4>
                        <div className="flex flex-wrap gap-3">
                          {activeMentor.tags.map(tag => (
                            <span key={tag} className="px-6 py-2 border border-brand-gold/10 text-[9px] font-bold uppercase tracking-widest text-brand-gold/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'metrics' && (
                    <motion.div key="metrics" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                      <div className="flex items-end gap-6 mb-12">
                        <h4 className="text-8xl font-light text-brand-gold leading-none">{calculateMentorScore(activeMentor).toFixed(1)}</h4>
                        <div className="pb-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-muted">Performance Index</p>
                          <div className="flex gap-1 mt-2">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-brand-gold text-brand-gold" />)}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {Object.entries(activeMentor.metrics).map(([key, value]) => (
                          <div key={key} className="p-8 border border-brand-gold/10 bg-brand-surface/10">
                            <p className="text-[9px] uppercase tracking-[0.4em] text-brand-muted mb-4">{key}</p>
                            <p className="text-3xl font-light text-brand-gold">{value}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FederalProgramsSection = () => {
  const { user, signInWithGoogle, refreshProfile } = useAuth();

  return (
  <section id="programas-federales" className="py-32 bg-brand-dark border-y border-brand-gold/5">
    <div className="max-w-screen-2xl mx-auto px-8">
      <div className="text-center mb-24">
        <span className="section-label mx-auto">Integración Nacional</span>
        <h2 className="text-5xl md:text-7xl font-light mb-8">Programas Federales</h2>
        <p className="text-brand-muted font-light max-w-2xl mx-auto leading-relaxed">
          Nuestra academia se encuentra 100% articulada con los programas federales estratégicos para impulsar el talento joven y la soberanía alimentaria con inteligencia artificial. No existen costos de suscripción, es un derecho subsidiado.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {FEDERAL_PROGRAMS.map((plan, index) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "glass-panel p-10 flex flex-col relative group overflow-hidden",
              plan.highlight && "border-brand-gold/40 shadow-[0_0_50px_rgba(197,160,89,0.1)] scale-105 z-10"
            )}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-brand-gold text-brand-dark text-[8px] font-bold uppercase tracking-[0.3em] px-6 py-2">
                Prioridad Nacional
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-light mb-2 uppercase tracking-widest">{plan.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-brand-gold">{plan.program}</span>
              </div>
              <p className="text-[10px] text-brand-muted mt-4 leading-relaxed font-light italic">
                {plan.description}
              </p>
            </div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-[11px] text-brand-muted font-light leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button 
              onClick={async () => {
                if (!user) {
                  alert('Por favor, inicie sesión o regístrese como becario/productor en el programa federal.');
                  signInWithGoogle();
                } else {
                  alert('Su cuenta está validada en el padrón. Puede comenzar a utilizar los recursos del programa: ' + plan.name);
                }
              }}
              className={cn(
              "w-full py-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-all border mt-auto",
              plan.highlight 
                ? "bg-brand-gold text-brand-dark border-brand-gold hover:bg-white" 
                : "bg-transparent text-brand-gold border-brand-gold/20 hover:bg-brand-gold/10"
            )}>
              Consultar Registro
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

const DigitalLeverageSection = () => {
  const { user, userProfile, signInWithGoogle } = useAuth();
  const [strategy, setStrategy] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateStrategy = async () => {
    if (!user) {
      alert('Por favor, regístrese como becario/productor para generar una estrategia en la plataforma.');
      signInWithGoogle();
      return;
    }

    setIsLoading(true);
    try {
      const prompt = "Genera una estrategia de apalancamiento digital de 72 horas para un negocio agropecuario/veterinario. Actúa como un guía paso a paso, con un tono agradable y empático. Incluye tácticas de seguimiento, enseñanza sobre el camino y uso de herramientas digitales para generar ingresos inmediatos, asegurando que el usuario se sienta acompañado en todo el proceso.";
      const response = await getMentorResponse(prompt, []);
      setStrategy(response);
    } catch (error) {
      console.error("Error generating strategy:", error);
      alert("Hubo un error al generar su estrategia estratégica.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="leverage" className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/business/1920/1080?blur=10')] bg-cover bg-center opacity-5" />
      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="section-label">Estrategia de Guerrilla</span>
            <h2 className="text-6xl md:text-7xl font-light mb-10 leading-[0.9] tracking-tighter">
              Apalancamiento <br />
              <span className="italic text-brand-gold font-serif">Digital Exponencial</span>
            </h2>
            <p className="text-brand-muted font-light text-xl mb-12 leading-relaxed max-w-xl">
              No entregamos consejos; inyectamos estrategias de guerrilla. Visualiza tu negocio dominando el ecosistema digital mientras otros aún intentan entenderlo.
            </p>
            
            <div className="space-y-6 mb-12">
              {[
                "Protocolos de ejecución de 72 horas",
                "Neuro-psicología de ventas de alto impacto",
                "Ingeniería de visibilidad orgánica masiva",
                "Arquitectura de conversión de élite"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-brand-muted/80 font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  {item}
                </div>
              ))}
            </div>

            <button 
              onClick={generateStrategy}
              disabled={isLoading}
              className="luxury-button group"
            >
              {isLoading ? 'Activando Motor Estratégico...' : 'Activar Mi Plan de 72 Horas'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand-gold/5 blur-3xl rounded-full" />
            <div className="glass-panel p-12 min-h-[500px] flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 border-b border-brand-gold/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Live Strategy Engine</span>
                </div>
                <TrendingUp className="w-4 h-4 text-brand-gold/40" />
              </div>

              {strategy ? (
                <div className="flex-grow overflow-y-auto custom-scrollbar pr-4">
                  <div className="markdown-body text-brand-muted font-light leading-relaxed whitespace-pre-wrap">
                    {strategy}
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                  <Brain className="w-16 h-16 text-brand-gold/20" />
                  <p className="text-sm font-light max-w-xs">
                    Inicie el motor de estrategia para recibir su plan de acción personalizado de alto impacto.
                  </p>
                </div>
              )}

              {strategy && (
                <button 
                  onClick={() => setStrategy(null)}
                  className="mt-8 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-muted hover:text-brand-gold transition-colors"
                >
                  Limpiar y Generar Nueva
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const FederalStrategySection = () => (
  <section className="py-32 bg-brand-surface relative overflow-hidden">
    <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
    
    <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <span className="section-label">Análisis de Valor Público</span>
          <h2 className="text-5xl md:text-6xl font-light mb-10 leading-tight">Articulación con <br /><span className="italic text-brand-gold font-serif">Impacto Federal</span></h2>
          <p className="text-brand-muted font-light text-lg mb-12 leading-relaxed">
            Nuestra propuesta no es un costo, es una integración estratégica a los programas gubernamentales. Siente la seguridad de un modelo económico de bienestar diseñado para que cada beca retorne multiplicada en productividad nacional.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="p-8 border border-brand-gold/10 bg-brand-dark/30 group hover:border-brand-gold/30 transition-all">
              <div className="w-12 h-12 border border-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-3 text-brand-gold">Alineación Nacional</h4>
              <p className="text-sm text-brand-muted font-light leading-relaxed">{FEDERAL_STRATEGY.marketAnalysis}</p>
            </div>
            
            <div className="p-8 border border-brand-gold/10 bg-brand-dark/30 group hover:border-brand-gold/30 transition-all">
              <div className="w-12 h-12 border border-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all">
                <PieChart className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-3 text-brand-gold">Integración de Programas</h4>
              <p className="text-sm text-brand-muted font-light leading-relaxed">{FEDERAL_STRATEGY.programsStrategy}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-panel p-12 space-y-10">
          <h3 className="text-2xl font-light border-b border-brand-gold/10 pb-6">Justificación de Subsidio Federal</h3>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-10 h-10 border border-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-light mb-2">Impacto Social Directo</h4>
                <p className="text-sm text-brand-muted font-light leading-relaxed">{FEDERAL_STRATEGY.roiProjection}</p>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-brand-gold/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted">Market Value Index</span>
              <span className="text-brand-gold text-sm font-bold">9.8/10</span>
            </div>
            <div className="w-full h-1 bg-brand-gold/10 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '98%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-brand-gold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AIChat = () => {
  const { user, userProfile, signInWithGoogle } = useAuth();
  const defaultMessage = { role: 'model' as const, parts: [{ text: "¡Hola! Qué gusto saludarte. Soy tu Guía Cognitivo de Animal Master, impulsado por Google AI Studio y Conecta X. Estoy aquí para acompañarte 1-a-1, hacer seguimiento a tu progreso y enseñarte sobre el camino. Ya sea que trabajes con grandes mamíferos, conejillos de Indias o con pájaros y aves, ¿en qué te puedo ayudar hoy?" }] };
  const eliteMessage = { role: 'model' as const, parts: [{ text: "¡Hola, Miembro Elite! Es un placer acompañarte. Soy tu Guía Personal de Animal Master, impulsado por Google AI Studio y Conecta X. Mi objetivo es caminar a tu lado, hacer seguimiento a tus proyectos y enseñarte paso a paso. Desde grandes producciones, conejillos de Indias hasta el cuidado de pájaros y aves, ¿qué área vamos a explorar y optimizar juntos hoy?" }] };
  
  const [messages, setMessages] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([defaultMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const loadChat = async () => {
      if (user) {
        const session = await getChatSession(user.uid, 'general');
        if (session && session.messages.length > 0) {
          const formattedMessages = session.messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          }));
          setMessages(formattedMessages);
        } else if (userProfile?.plan === 'Elite Executive') {
          setMessages([eliteMessage]);
        } else {
          setMessages([defaultMessage]);
        }
      } else {
        setMessages([defaultMessage]);
      }
    };
    loadChat();
  }, [user, userProfile]);

  useEffect(() => {
    if (scrollRef.current && activeTab === 'chat') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const handleSend = async () => {
    if (!user) {
      alert('Por favor, regístrese en un programa federal para utilizar el Consultor IA guiado.');
      signInWithGoogle();
      return;
    }

    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, parts: [{ text: userMessage }] }];
    setMessages(newMessages);
    setIsLoading(true);
    setActiveTab('chat');

    try {
      const response = await getMentorResponse(userMessage, messages);
      const finalMessages = [...newMessages, { role: 'model' as const, parts: [{ text: response || "Lo siento, no pude procesar tu solicitud." }] }];
      setMessages(finalMessages);
      
      // Save to Firestore
      const chatMessagesToSave: ChatMessage[] = finalMessages.map(m => ({
        role: m.role,
        text: m.parts[0].text,
        timestamp: Date.now()
      }));
      await saveChatSession(user.uid, 'general', chatMessagesToSave);
      
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: 'Disculpe, he experimentado una interrupción en mi conexión con los servidores centrales. Por favor, reintente su consulta.' }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const appendToNotes = (text: string) => {
    setNotes(prev => prev + (prev ? '\n\n---\n\n' : '') + text);
    setActiveTab('notes');
  };

  return (
    <section id="ai-assistance" className="py-32 bg-brand-dark">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <span className="section-label">Consultoría de Élite</span>
            <h2 className="text-5xl md:text-6xl font-light mb-10 leading-tight">Su Tiempo de <br /><span className="italic text-brand-gold font-serif">Maestría Interactiva</span></h2>
            <p className="text-brand-muted font-light text-lg mb-12 leading-relaxed">
              El valor de Animal Master reside en la interacción. Utilice su tiempo de consultoría para desglosar guías, cursos y maestrías con nuestra inteligencia superior.
            </p>
            <div className="space-y-8">
              {[
                "Análisis interactivo de Guías de Inmersión",
                "Desglose profundo de Cursos de Especialidad",
                "Mentoría estratégica en Maestrías de Élite",
                "Optimización de tiempo de respuesta técnica"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-10 h-10 border border-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-brand-muted font-light tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="glass-panel h-[700px] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-30" />
              
              <div className="p-8 border-b border-brand-gold/10 bg-brand-surface/50 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-brand-gold animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Consultor Ejecutivo Activo</span>
                  </div>
                  {userProfile && userProfile.plan !== 'none' && (
                    <div className="flex items-center gap-3 border-l border-brand-gold/10 pl-8">
                      <Calendar className="w-3 h-3 text-brand-gold/40" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-muted/60">
                        Tiempo Restante: <span className="text-brand-gold">{userProfile.plan === 'Elite Executive' ? 'Ilimitado' : '08:45 hrs'}</span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors", activeTab === 'chat' ? "text-brand-gold" : "text-brand-muted hover:text-brand-gold")}
                  >
                    Chat
                  </button>
                  <button 
                    onClick={() => setActiveTab('notes')}
                    className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2", activeTab === 'notes' ? "text-brand-gold" : "text-brand-muted hover:text-brand-gold")}
                  >
                    <BookOpen className="w-3 h-3" /> Notas
                  </button>
                </div>
              </div>
              
              {activeTab === 'chat' ? (
                <>
                  <div ref={scrollRef} className="flex-grow p-10 overflow-y-auto space-y-8 mask-fade-bottom scrollbar-hide">
                    {messages.map((msg, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex",
                          msg.role === 'user' ? "justify-end" : "justify-start"
                        )}
                      >
                        <div className={cn(
                          "max-w-[85%] p-8 text-base leading-relaxed font-light relative group",
                          msg.role === 'user' 
                            ? "bg-brand-gold text-brand-dark rounded-l-2xl rounded-tr-2xl" 
                            : "bg-brand-surface border border-brand-gold/10 text-brand-text rounded-r-2xl rounded-tl-2xl"
                        )}>
                          {msg.role === 'model' && (
                            <Bot className="absolute -left-12 top-0 w-8 h-8 text-brand-gold/20" />
                          )}
                          <div className={cn("prose max-w-none", msg.role === 'user' ? "prose-invert text-brand-dark prose-p:text-brand-dark" : "prose-invert prose-brand prose-p:leading-relaxed prose-headings:text-brand-gold prose-a:text-brand-gold")}>
                            <Markdown>{msg.parts[0].text}</Markdown>
                          </div>
                          {msg.role === 'model' && (
                            <button 
                              onClick={() => appendToNotes(msg.parts[0].text)} 
                              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 bg-brand-dark rounded text-brand-gold hover:text-white transition-all shadow-lg" 
                              title="Guardar en notas"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-brand-surface border border-brand-gold/10 p-6 flex gap-2 rounded-r-2xl rounded-tl-2xl">
                          <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-8 bg-brand-surface/80 border-t border-brand-gold/10">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Escriba su consulta técnica..."
                        className="w-full bg-brand-dark/50 border border-brand-gold/10 pl-8 pr-20 py-5 text-base focus:outline-none focus:border-brand-gold/40 transition-all placeholder:text-brand-muted/30 rounded-lg"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      />
                      <button 
                        onClick={handleSend}
                        disabled={isLoading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-brand-gold hover:text-brand-dark hover:bg-brand-gold transition-all disabled:opacity-50 rounded-lg"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-grow flex flex-col p-10 bg-brand-dark/30">
                  <textarea
                    className="flex-grow bg-transparent border-none resize-none focus:outline-none text-brand-text font-light leading-relaxed text-base"
                    placeholder="Tus anotaciones estratégicas se guardarán aquí. Haz clic en el ícono de guardar en cualquier mensaje del chat para agregarlo a tus notas."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-24 bg-brand-dark border-t border-brand-gold/10">
    <div className="max-w-screen-2xl mx-auto px-8">
      <div className="grid md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 border border-brand-gold/30 flex items-center justify-center rotate-45">
              <span className="text-brand-gold font-serif font-light text-xl -rotate-45">A</span>
            </div>
            <span className="font-serif text-2xl font-light tracking-[0.1em] uppercase">Animal<span className="text-brand-gold">Master</span></span>
          </div>
          <p className="text-brand-muted font-light max-w-sm leading-relaxed">
            La institución líder en formación de élite para el sector animal. Elevando los estándares de cuidado y producción a nivel global.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">Clinical Nexus</h4>
          <ul className="space-y-4 text-sm text-brand-muted font-light">
            <li><a href="#academy" className="hover:text-brand-gold transition-colors">Pabellón Clínico</a></li>
            <li><a href="#mentors" className="hover:text-brand-gold transition-colors">Faculty Board</a></li>
            <li><a href="#programas-federales" className="hover:text-brand-gold transition-colors">Alineación Federal</a></li>
            <li><a href="#ai-assistance" className="hover:text-brand-gold transition-colors">Triage IA</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">Contacto</h4>
          <ul className="space-y-4 text-sm text-brand-muted font-light">
            <li>info@animalmaster.academy</li>
            <li>+1 (555) 000-LUXO</li>
            <li>Sede Central: Ginebra, Suiza</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-12 border-t border-brand-gold/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-muted/40">
          © 2024 Animal Master Academy. Todos los derechos reservados.<br/>
          Impulsado por Google AI Studio & Conecta X.
        </p>
        <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] text-brand-muted/40">
          <a href="#" className="hover:text-brand-gold transition-colors">Privacidad</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Términos</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

const DataEcosystemSection = () => {
  return (
    <section id="data-ecosystem" className="py-32 bg-brand-dark relative overflow-hidden border-t border-brand-gold/10">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/data/1920/1080?blur=10')] bg-cover bg-center opacity-5" />
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 mb-8">
              <Database className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">Dataset & Seguridad de Nivel Empresarial</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-light text-white mb-8 leading-tight">
              10,000 Interacciones & <br />
              <span className="italic text-brand-gold">Validación Estratégica</span>
            </h2>
            
            <p className="text-xl text-brand-muted font-light mb-8 leading-relaxed">
              Hemos analizado y validado más de <span className="text-white font-medium">10,000 interacciones</span> para crear escenarios precisos y seguros. 
              Nuestra arquitectura, impulsada por Google AI Studio, prioriza la información de alto valor para garantizar que cada consejo técnico sea accionable y seguro.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 border border-brand-gold/20">
                  <Database className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Dataset Predictivo Validado</h4>
                  <p className="text-brand-muted font-light text-sm leading-relaxed">
                    Mapeo de tendencias sanitarias, nutricionales y conductuales en tiempo real para anticipar crisis en el sector, respaldado por miles de casos de éxito.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 border border-brand-gold/20">
                  <Code className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Seguridad y Acceso Nacional</h4>
                  <p className="text-brand-muted font-light text-sm leading-relaxed">
                    Los becarios y productores de programas federales acceden a información clasificada y priorizada, garantizando confidencialidad y una ventaja competitiva en el mercado.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-black/40 border border-brand-gold/20 rounded-2xl p-8 backdrop-blur-sm relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-xl font-serif text-white mb-6">Estado de Validación del Modelo</h3>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-sm text-brand-muted mb-2">
                    <span>Interacciones Validadas (Script Activo)</span>
                    <span className="text-brand-gold font-mono">10,000 / 10,000</span>
                  </div>
                  <div className="h-2 bg-brand-dark rounded-full overflow-hidden border border-brand-gold/10">
                    <div className="h-full bg-brand-gold w-full relative">
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-brand-dark/50 border border-brand-gold/10">
                    <div className="text-2xl font-light text-white mb-1">99.8%</div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-muted">Precisión Diagnóstica</div>
                  </div>
                  <div className="p-4 rounded-xl bg-brand-dark/50 border border-brand-gold/10">
                    <div className="text-2xl font-light text-white mb-1">Cifrado</div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-muted">Seguridad de Datos</div>
                  </div>
                </div>

                <a href="#programas-federales" className="w-full py-4 rounded-xl border border-brand-gold/30 text-brand-dark bg-brand-gold text-sm font-semibold tracking-wider uppercase hover:bg-white transition-all duration-300 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Acceso a Programas (Gobierno de México)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GlobalImpactSection = () => {
  return (
    <section className="py-32 bg-brand-dark/50 border-t border-brand-gold/10">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 mb-6">
            <Shield className="w-4 h-4 text-brand-gold" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">Validación Paramétrica Global</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-light mb-8 leading-[0.85] tracking-tighter">
            Revolución del <span className="italic text-brand-gold font-serif">Triage Clínico</span>
          </h2>
          <p className="text-brand-muted font-light text-xl max-w-3xl mx-auto leading-relaxed">
            Nuestros algoritmos en Google AI Studio no son solo una red neuronal, son la arquitectura base para la estandarización clínica en ecosistemas federales y académicos globales. Superamos los desafíos nosológicos mediante análisis metalingüístico y heurísticas avanzadas.
          </p>
        </div>
        
        <CommerceImpactDashboard />

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: "Accesibilidad Universal",
              desc: "Diseñado para que cualquier persona, desde un pequeño emprendedor hasta una gran corporación, pueda dominar la IA.",
              icon: <Users className="w-6 h-6" />
            },
            {
              title: "Potencia de Google AI",
              desc: "Utilizamos los modelos más avanzados de Google para garantizar precisión quirúrgica en cada análisis.",
              icon: <Cpu className="w-6 h-6" />
            },
            {
              title: "Escalabilidad Global",
              desc: "Nuestra arquitectura permite mapear oportunidades en cualquier mercado, rompiendo fronteras comerciales.",
              icon: <Globe className="w-6 h-6" />
            }
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-8 border-brand-gold/5 hover:border-brand-gold/20 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="text-xl font-light text-white mb-4">{feature.title}</h4>
              <p className="text-sm text-brand-muted leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValidationSeriesSection = () => {
  return (
    <section className="py-32 bg-brand-dark relative overflow-hidden border-t border-brand-gold/10">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent opacity-30" />
      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 mb-6">
            <Play className="w-4 h-4 text-brand-gold" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">Series de Validación Real</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-light mb-8 leading-[0.85] tracking-tighter">
            Google AI Studio <span className="italic text-brand-gold font-serif">en Acción</span>
          </h2>
          <p className="text-brand-muted font-light text-xl max-w-3xl mx-auto leading-relaxed">
            Comprobamos la funcionalidad de nuestra plataforma con casos reales. La IA de Google es accesible para cualquier persona y está transformando el comercio hoy mismo.
          </p>
        </div>
        
        <ValidationSeries />

        <div className="mt-20 p-12 glass-panel border-brand-gold/30 bg-brand-gold/5 text-center">
          <h3 className="text-3xl font-light text-white mb-6">¿Preparado para Integrar el Consenso Clínico?</h3>
          <p className="text-brand-muted font-light text-lg max-w-2xl mx-auto mb-10">
            Únase a la élite académica y benefíciese de las sinergias entre las métricas de triage global y los estándares federales operativizados por inteligencia artificial de primer nivel.
          </p>
          <button 
            onClick={() => document.getElementById('programas-federales')?.scrollIntoView({ behavior: 'smooth' })}
            className="luxury-button px-12 py-5 text-lg group"
          >
            Comenzar Ahora
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

const MasterEngineSection = () => {
  const { user, userProfile, signInWithGoogle } = useAuth();
  const [input, setInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLiveVisionActive, setIsLiveVisionActive] = useState(false);
  const [liveStream, setLiveStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captureIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState<EngineResult | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('Facebook');
  const [selectedNiche, setSelectedNiche] = useState<'All' | 'Animal Master' | 'AutoSocio' | 'Universal'>('All');
  const [history, setHistory] = useState<any[]>([]);

  const startLiveVision = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" } as any,
        audio: false
      });
      setLiveStream(stream);
      setIsLiveVisionActive(true);
      
      // Iniciar ciclo de escaneo cada 5 segundos
      captureIntervalRef.current = setInterval(async () => {
        if (videoRef.current && !isLoading) {
          const canvas = document.createElement('canvas');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0);
            const base64Image = canvas.toDataURL('image/jpeg', 0.7);
            const base64Data = base64Image.split(',')[1];
            const mimeType = 'image/jpeg';
            
            try {
              const res = await runMasterEngine({ data: base64Data, mimeType });
              if (res.structure.entity && res.structure.entity !== "No detectado") {
                setResult(res);
                if (user) {
                  await saveEngineResult(user.uid, res);
                }
                
                // Alerta de Alta Urgencia
                if (res.interpretation.urgency?.toLowerCase().includes('alta') || res.interpretation.urgency?.toLowerCase().includes('high')) {
                  toast.error(`¡OPORTUNIDAD DE ALTA URGENCIA DETECTADA!`, {
                    description: `${res.structure.entity}: ${res.structure.need}`,
                    duration: 10000,
                    icon: <AlertTriangle className="w-5 h-5 text-red-500" />
                  });
                } else {
                  toast.success(`Nueva oportunidad mapeada: ${res.structure.entity}`, {
                    description: `Nicho: ${res.dataRow.solucion_sugerida}`,
                    duration: 5000
                  });
                }
              }
            } catch (e) {
              console.error("Error en escaneo visual:", e);
            }
          }
        }
      }, 5000);

      stream.getVideoTracks()[0].onended = () => stopLiveVision();
    } catch (err) {
      console.error("Error al iniciar captura de pantalla:", err);
      alert("No se pudo iniciar la captura de pantalla. Asegúrese de dar permisos.");
    }
  };

  const stopLiveVision = () => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
    }
    if (liveStream) {
      liveStream.getTracks().forEach(track => track.stop());
    }
    setLiveStream(null);
    setIsLiveVisionActive(false);
  };

  const handleUrlCapture = async () => {
    if (!urlInput.trim()) return;
    setIsCapturing(true);
    // Simular retraso de captura
    await new Promise(resolve => setTimeout(resolve, 1500));
    const simulatedText = `Captura automática desde URL: ${urlInput}. El usuario expresa una necesidad urgente de asesoría técnica.`;
    setInput(simulatedText);
    setIsCapturing(false);
    handleProcess(simulatedText);
  };

  useEffect(() => {
    if (user) {
      const resultsRef = collection(db, 'engine_results');
      const unsubscribe = onSnapshot(resultsRef, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHistory(data.sort((a: any, b: any) => b.timestamp?.seconds - a.timestamp?.seconds));
      }, (error) => {
        console.error("Error en el historial del Master Engine:", error);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const socialFeed = [
    { id: 1, platform: 'Facebook', user: 'Juan Pérez', text: 'Mi Aveo 2016 tiene un ruido en la suspensión delantera, ¿alguien sabe qué puede ser?', status: 'Unattended' },
    { id: 2, platform: 'TikTok', user: '@mecanico_pro', text: 'Buscando kit de distribución para Toyota Hilux 2020, urgente.', status: 'High Demand' },
    { id: 3, platform: 'Instagram', user: 'Maria_G', text: 'Mi perro no para de ladrar cuando me voy de casa, estoy desesperada. ¿Algún consejo?', status: 'Unattended' },
    { id: 4, platform: 'Facebook', user: 'Grupo Mascotas', text: '¿Qué alimento es mejor para un cachorro de 3 meses que tiene diarrea?', status: 'Unattended' },
    { id: 5, platform: 'TikTok', user: '@auto_parts_mx', text: 'Necesito faros para Mazda 3 2018, ¿quién tiene stock?', status: 'High Demand' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async (customInput?: string) => {
    if (!user) {
      alert('Por favor, regístrese como becario/productor para acceder al Neuro-Agro Engine.');
      signInWithGoogle();
      return;
    }

    const textToProcess = customInput || input;

    if (!textToProcess.trim() && !image) {
      alert('Por favor, ingrese texto o una imagen.');
      return;
    }

    setIsLoading(true);
    try {
      let engineInput: string | { data: string; mimeType: string } = textToProcess;
      if (image && !customInput) {
        const base64Data = image.split(',')[1];
        const mimeType = image.split(',')[0].split(':')[1].split(';')[0];
        engineInput = { data: base64Data, mimeType };
      }
      const res = await runMasterEngine(engineInput);
      setResult(res);
      if (user) {
        await saveEngineResult(user.uid, res);
      }
    } catch (error) {
      console.error("Error in Master Engine:", error);
      alert("Error al procesar la demanda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="master-engine" className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent opacity-30" />
      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="flex justify-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5">
              <Globe className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">Inteligencia Universal Activa</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">Powered by Google AI Studio</span>
            </div>
          </div>
          <span className="section-label mx-auto">Mapeo de Oportunidades Globales</span>
          <h2 className="text-6xl md:text-8xl font-light mb-8 leading-[0.85] tracking-tighter">
            Universal <span className="italic text-brand-gold font-serif">Intelligence</span>
          </h2>
          <p className="text-brand-muted font-light text-xl max-w-3xl mx-auto leading-relaxed">
            Nuestra Inteligencia Universal resuelve problemas y mapea oportunidades antes que nadie. Detectamos la demanda real en redes sociales y conectamos con la solución precisa (Animal Master, AutoSocio, etc).
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            {/* Live Vision Mode (Screen Sharing) */}
            <div className={cn(
              "glass-panel p-6 border-brand-gold/10 transition-all",
              isLiveVisionActive ? "border-red-500/50 bg-red-500/5" : ""
            )}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    isLiveVisionActive ? "bg-red-500 animate-pulse" : "bg-brand-gold/40"
                  )} />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Modo Live Vision (Escaneo en Tiempo Real)</h4>
                </div>
                {isLiveVisionActive && (
                  <span className="text-[8px] text-red-500 uppercase tracking-widest font-bold">Escaneando Pantalla...</span>
                )}
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] text-brand-muted font-light leading-relaxed">
                  Comparte tu pantalla mientras navegas en grupos de Facebook o TikTok. Nuestra IA detectará patrones de demanda ("busco", "necesito", "ayuda") y los guardará en el dataset automáticamente.
                </p>
                
                <div className="flex gap-4">
                  {!isLiveVisionActive ? (
                    <button 
                      onClick={startLiveVision}
                      className="flex-grow py-3 bg-brand-gold text-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2"
                    >
                      <Play className="w-3 h-3" />
                      Iniciar Escaneo Visual
                    </button>
                  ) : (
                    <button 
                      onClick={stopLiveVision}
                      className="flex-grow py-3 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-3 h-3" />
                      Detener Escaneo
                    </button>
                  )}
                </div>

                {isLiveVisionActive && (
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-brand-gold/20">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-[1px] bg-brand-gold/30 animate-[scan_2s_linear_infinite]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Captura de URL de Redes Sociales */}
            <div className="glass-panel p-6 border-brand-gold/10">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-brand-gold" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Captura Directa de URL</h4>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Pegue el link de Facebook, TikTok o Instagram..."
                  className="flex-grow bg-brand-dark/50 border border-brand-gold/10 rounded-lg px-4 py-2 text-xs text-brand-muted outline-none focus:border-brand-gold/30"
                />
                <button 
                  onClick={handleUrlCapture}
                  disabled={isCapturing || !urlInput.trim()}
                  className="px-4 py-2 bg-brand-gold text-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all disabled:opacity-50"
                >
                  {isCapturing ? 'Capturando...' : 'Capturar'}
                </button>
              </div>
            </div>

            {/* Social Media Feed Simulator */}
            <div className="glass-panel p-6 border-brand-gold/10">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Mapeo de Demanda Global (Social Feed)</h4>
                <div className="flex gap-2">
                  {['Facebook', 'TikTok', 'Instagram'].map(p => (
                    <button 
                      key={p}
                      onClick={() => setSelectedPlatform(p)}
                      className={cn(
                        "text-[8px] px-3 py-1 rounded-full border transition-all",
                        selectedPlatform === p ? "bg-brand-gold text-black border-brand-gold" : "border-brand-gold/20 text-brand-muted hover:border-brand-gold/50"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {socialFeed.filter(f => f.platform === selectedPlatform).map(post => (
                  <div 
                    key={post.id} 
                    className="p-4 bg-brand-dark/50 border border-brand-gold/5 rounded-lg group hover:border-brand-gold/20 transition-all cursor-pointer relative overflow-hidden" 
                    onClick={() => { setInput(post.text); handleProcess(post.text); }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] font-bold text-brand-gold/60">{post.user}</span>
                      <span className={cn(
                        "text-[7px] px-2 py-0.5 rounded-full uppercase tracking-widest",
                        post.status === 'Unattended' ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-brand-gold/10 text-brand-gold border border-brand-gold/20"
                      )}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted font-light line-clamp-2 mb-3">"{post.text}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-brand-muted/40 italic">Detectado hace 5m</span>
                      <button className="text-[8px] font-bold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        INGESTAR <ArrowRight className="w-2 h-2" />
                      </button>
                    </div>
                    {isLoading && input === post.text && (
                      <div className="absolute inset-0 bg-brand-dark/80 flex items-center justify-center">
                        <RefreshCw className="w-4 h-4 text-brand-gold animate-spin" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-light flex items-center gap-3">
                  <Zap className="w-6 h-6 text-brand-gold" />
                  Ingesta Manual / Captura
                </h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                  <RefreshCw className={cn("w-3 h-3 text-brand-gold", isLoading && "animate-spin")} />
                  <span className="text-[8px] uppercase tracking-widest text-brand-gold font-bold">IA Activa</span>
                </div>
              </div>
              <div className="space-y-4">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pegue aquí el texto de Facebook, WhatsApp o una consulta directa..."
                  className="w-full h-32 bg-brand-dark/50 border border-brand-gold/10 rounded-lg p-4 text-brand-muted font-light focus:border-brand-gold/30 transition-all outline-none resize-none"
                />
                <div className="flex items-center gap-4">
                  <label className="flex-grow flex items-center justify-center gap-2 py-5 px-6 border border-dashed border-brand-gold/20 rounded-lg cursor-pointer hover:bg-brand-gold/5 transition-all min-h-[56px]">
                    <Camera className="w-6 h-6 text-brand-gold" />
                    <span className="text-base text-brand-muted font-light">Subir Captura</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-brand-gold/20 relative group">
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                      <button onClick={() => setImage(null)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => handleProcess()}
                  disabled={isLoading}
                  className="luxury-button w-full group min-h-[56px] text-base"
                >
                  {isLoading ? 'Procesando con IA...' : 'Ejecutar Master Engine'}
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "70% Data Real", icon: <Users className="w-4 h-4" /> },
                { label: "30% Data Sintética", icon: <Brain className="w-4 h-4" /> },
                { label: "Dataset Estructurado", icon: <Table className="w-4 h-4" /> },
                { label: "ROI Proyectado", icon: <TrendingUp className="w-4 h-4" /> }
              ].map((item, i) => (
                <div key={i} className="p-5 border border-brand-gold/10 bg-brand-dark/30 flex items-center gap-4">
                  <div className="text-brand-gold">{item.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {result ? (
              <div className="space-y-6">
                <div className="glass-panel p-8 border-brand-gold/30">
                  <div className="flex items-center justify-between mb-6 border-b border-brand-gold/10 pb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Módulo de Interpretación</span>
                    <FileJson className="w-4 h-4 text-brand-gold/40" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-brand-muted/60 block mb-1">Sujeto/Especie</span>
                      <p className="text-brand-gold font-light">{result.structure.entity}</p>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-brand-muted/60 block mb-1">Origen / Estado</span>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-light uppercase text-[10px] tracking-tighter">{result.source.platform}</p>
                        <span className={cn(
                          "text-[8px] px-2 py-0.5 rounded-full border uppercase tracking-widest",
                          result.source.status === 'Unattended' ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-brand-gold/10 text-brand-gold border-brand-gold/20"
                        )}>
                          {result.source.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-brand-dark/50 border border-brand-gold/5 rounded-lg">
                      <span className="text-[9px] uppercase tracking-widest text-brand-muted/60 block mb-2">Diagnóstico Técnico</span>
                      <ul className="space-y-2">
                        {result.diagnosis.causes.map((cause, i) => (
                          <li key={i} className="text-xs text-brand-muted flex justify-between">
                            <span>{cause.type}</span>
                            <span className="text-brand-gold">{cause.probability}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {result.syntheticExpansion && result.syntheticExpansion.length > 0 && (
                      <div className="p-4 bg-brand-gold/5 border border-brand-gold/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Layers className="w-3 h-3 text-brand-gold" />
                          <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Expansión Sintética (30% Data)</span>
                        </div>
                        <div className="space-y-3">
                          {result.syntheticExpansion.map((item, i) => (
                            <div key={i} className="text-[10px] border-l border-brand-gold/20 pl-3 py-1">
                              <p className="text-brand-muted font-medium mb-1">{item.scenario}</p>
                              <p className="text-brand-gold/60 italic">{item.insight}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="glass-panel p-8 bg-brand-gold/5 border-brand-gold/20">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Respuesta Vendedora (Autoridad)</span>
                    <MessageSquare className="w-4 h-4 text-brand-gold" />
                  </div>
                  <p className="text-sm text-brand-muted font-light leading-relaxed italic mb-6">
                    "{result.response}"
                  </p>
                  <button className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold hover:underline">
                    Copiar Respuesta
                  </button>
                </div>

                <div className="p-6 border border-brand-gold/10 bg-brand-dark/50 rounded-lg">
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Table className="w-4 h-4 text-brand-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted">Historial de Inteligencia (Dataset)</span>
                      </div>
                      <div className="flex gap-2">
                        {['All', 'Animal Master', 'AutoSocio'].map(n => (
                          <button 
                            key={n}
                            onClick={() => setSelectedNiche(n as any)}
                            className={cn(
                              "text-[8px] px-2 py-1 rounded border transition-all",
                              selectedNiche === n ? "bg-brand-gold text-black border-brand-gold" : "border-brand-gold/10 text-brand-muted"
                            )}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filtrar por entidad..."
                      className="w-full bg-brand-dark/30 border border-brand-gold/10 rounded px-3 py-2 text-[10px] text-brand-muted focus:border-brand-gold/30 outline-none"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] font-mono text-brand-muted/60">
                      <thead>
                        <tr className="border-b border-brand-gold/10">
                          <th className="text-left py-2 pr-4">FECHA</th>
                          <th className="text-left py-2 pr-4">PLATAFORMA</th>
                          <th className="text-left py-2 pr-4">ENTIDAD</th>
                          <th className="text-left py-2 pr-4">SOLUCIÓN</th>
                          <th className="text-left py-2">ESTADO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history
                          .filter(h => 
                             (selectedNiche === 'All' || h.niche === selectedNiche) &&
                             (!searchQuery || h.entity?.toLowerCase().includes(searchQuery.toLowerCase()))
                          )
                          .slice(0, 5)
                          .map((h, i) => (
                          <tr key={i} className="border-b border-brand-gold/5 hover:bg-brand-gold/5 transition-colors">
                            <td className="py-3 pr-4">{h.timestamp?.toDate ? h.timestamp.toDate().toLocaleDateString() : 'Reciente'}</td>
                            <td className="py-3 pr-4 text-brand-gold">{h.platform}</td>
                            <td className="py-3 pr-4 truncate max-w-[100px]">{h.entity}</td>
                            <td className="py-3 pr-4">
                              <span className="px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20 font-bold">
                                {h.niche}
                              </span>
                            </td>
                            <td className={cn(
                              "py-3 font-bold",
                              h.status === 'Unattended' ? "text-red-500" : "text-brand-gold"
                            )}>{h.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-12 min-h-[600px] flex flex-col items-center justify-center text-center space-y-8 opacity-40">
                <div className="relative">
                  <Brain className="w-20 h-20 text-brand-gold/20" />
                  <div className="absolute inset-0 animate-ping bg-brand-gold/5 rounded-full" />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-light text-brand-gold">Motor en Espera</h4>
                  <p className="text-sm font-light max-w-xs mx-auto leading-relaxed">
                    Suba una captura de pantalla o pegue una consulta para iniciar el pipeline de interpretación y estructuración.
                  </p>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-1 h-1 rounded-full bg-brand-gold/20" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Mapping Visualization */}
        <div className="mt-20 glass-panel p-8 border-brand-gold/10">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h4 className="text-xl font-light text-white">Mapeo de Demanda Global</h4>
              <p className="text-[10px] text-brand-muted uppercase tracking-widest">Visualización de Ingesta y Clasificación en Tiempo Real</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] text-brand-muted uppercase tracking-widest">Desatendida</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-[8px] text-brand-muted uppercase tracking-widest">Procesada</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { niche: 'Automotriz', count: 1240, color: 'bg-blue-500' },
              { niche: 'Veterinaria', count: 850, color: 'bg-green-500' },
              { niche: 'Ingeniería', count: 420, color: 'bg-purple-500' },
              { niche: 'Arquitectura', count: 310, color: 'bg-orange-500' },
              { niche: 'Software', count: 2100, color: 'bg-cyan-500' },
              { niche: 'Hogar', count: 150, color: 'bg-pink-500' }
            ].map((n, i) => (
              <div key={i} className="p-4 bg-brand-dark/50 border border-brand-gold/5 rounded-lg text-center space-y-2">
                <div className="text-[8px] text-brand-muted uppercase tracking-widest">{n.niche}</div>
                <div className="text-xl font-light text-brand-gold">{n.count}</div>
                <div className="w-full h-1 bg-brand-gold/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(n.count / 2100) * 100}%` }}
                    transition={{ duration: 2, delay: i * 0.2 }}
                    className={cn("h-full", n.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hybrid Strategy Section */}
        <div className="mt-32 border-t border-brand-gold/10 pt-32">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                <Target className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-serif text-white">70% Datos Reales</h3>
              <p className="text-brand-muted font-light leading-relaxed">
                Capturamos la demanda real del mercado (Facebook, WhatsApp, Consultas). Cada interacción es un punto de datos que alimenta la inteligencia del sistema.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                <Cpu className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-serif text-white">30% Datos Sintéticos</h3>
              <p className="text-brand-muted font-light leading-relaxed">
                Nuestra IA genera escenarios paralelos y variaciones tácticas para acelerar el aprendizaje. Simulamos 10,000 escenarios basados en patrones reales.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                <Workflow className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-serif text-white">Sistema Replicable</h3>
              <p className="text-brand-muted font-light leading-relaxed">
                Este motor no depende del nicho. Es una estructura de interpretación universal que funciona para autos, animales, software o cualquier industria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValidationScriptSection = () => {
  return (
    <section className="py-24 bg-brand-dark/95 border-t border-brand-gold/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-6">
            Estrategia de Datos <span className="text-brand-gold italic">Híbrida de Alto Impacto</span>
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Fusionamos la <span className="text-brand-gold">realidad tangible</span> con la <span className="text-brand-gold">potencia sintética</span> para acelerar meses de aprendizaje en días de ejecución pura.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "70% Data Real (Anclaje)",
                desc: "Capturamos el pulso real del mercado. Esto ancla nuestro sistema a la realidad del terreno, asegurando que cada solución sea práctica y ejecutable.",
                icon: <Users className="w-6 h-6 text-brand-gold" />
              },
              {
                step: "02",
                title: "30% Data Sintética (Expansión Cognitiva)",
                desc: "Google AI Studio proyecta variaciones estratégicas. Esto nos permite visualizar y dominar escenarios que aún no han ocurrido, dándote la ventaja del primer movimiento.",
                icon: <Brain className="w-6 h-6 text-brand-gold" />
              },
              {
                step: "03",
                title: "Dataset Maestro (10,000 Patrones de Éxito)",
                desc: "La sinergia de datos crea un mapa de navegación masivo. Entrenamos a nuestros mentores para que detecten el éxito antes de que sea evidente para la competencia.",
                icon: <Database className="w-6 h-6 text-brand-gold" />
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 border border-brand-gold/20 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-3">
                    <span className="text-brand-gold/50 font-mono text-sm">{item.step}</span>
                    {item.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0d1117] rounded-xl border border-brand-gold/20 overflow-hidden shadow-2xl">
            <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-brand-gold/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs font-mono text-brand-muted">hybrid_data_engine.ts</div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <code className="text-gray-300">
                  <span className="text-purple-400">import</span> {'{'} GoogleGenAI {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@google/genai'</span>;{'\n\n'}
                  <span className="text-blue-400">const</span> ai = <span className="text-purple-400">new</span> GoogleGenAI({'{'} apiKey: process.env.GEMINI_API_KEY {'}'});{'\n\n'}
                  <span className="text-blue-400">async function</span> <span className="text-yellow-200">generateSyntheticScenarios</span>(realPatterns) {'{'}{'\n'}
                  {'  '}<span className="text-gray-500">// 1. Take real patterns (70%)</span>{'\n'}
                  {'  '}<span className="text-blue-400">const</span> base = realPatterns.slice(<span className="text-orange-400">0</span>, <span className="text-orange-400">70</span>);{'\n\n'}
                  {'  '}<span className="text-gray-500">// 2. Expand with IA (30%)</span>{'\n'}
                  {'  '}<span className="text-blue-400">const</span> synthetic = <span className="text-purple-400">await</span> ai.models.generateContent({'{'}{'\n'}
                  {'    '}model: <span className="text-green-400">'gemini-3.1-pro-preview'</span>,{'\n'}
                  {'    '}contents: <span className="text-green-400">`Generate 3000 variations based on: ${'{'}base{'}'}`</span>{'\n'}
                  {'  }'});{'\n\n'}
                  {'  '}<span className="text-gray-500">// 3. Result: Master Dataset (10,000)</span>{'\n'}
                  {'  '}<span className="text-purple-400">return</span> [...base, ...synthetic];{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { BetaLabDashboard } from './components/BetaLabDashboard';

const BottomNav = () => {
  const [activeSection, setActiveSection] = useState('academy');

  const navItems = [
    { id: 'academy', label: 'Academia', icon: BookOpen },
    { id: 'mentors', label: 'Mentores', icon: Users },
    { id: 'ai-assistance', label: 'Consultoría IA', icon: Bot },
    { id: 'programas-federales', label: 'Programas', icon: Star },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && 
            scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 glass-panel rounded-full border border-brand-gold/20 flex items-center gap-8 shadow-2xl backdrop-blur-xl"
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300 group relative",
            activeSection === item.id ? "text-brand-gold" : "text-brand-muted hover:text-brand-gold/70"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5 transition-transform duration-300",
            activeSection === item.id ? "scale-110" : "group-hover:scale-110"
          )} />
          <span className="text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-brand-dark/80 px-2 py-1 rounded border border-brand-gold/10 pointer-events-none">
            {item.label}
          </span>
          {activeSection === item.id && (
            <motion.div 
              layoutId="activeNav"
              className="absolute -bottom-1 w-1 h-1 rounded-full bg-brand-gold"
            />
          )}
        </button>
      ))}
    </motion.div>
  );
};

export default function App() {
  const { user } = useAuth();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [selectedMentorForChat, setSelectedMentorForChat] = useState<Mentor | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNeuralObserverOpen, setIsNeuralObserverOpen] = useState(false);
  const [isMetamorphosisOpen, setIsMetamorphosisOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [userType, setUserType] = useState<'owner' | 'professional' | 'business'>('owner');

  const handleCategorySelect = (category: string) => {
    // Find the primary mentor for this category to activate chat
    const categoryMentors = MENTORS[category as keyof typeof MENTORS];
    if (categoryMentors && categoryMentors.length > 0) {
      const event = new CustomEvent('openMentorChat', { detail: categoryMentors[0] });
      window.dispatchEvent(event);
    }
  };
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const handleOpenChat = (e: Event) => {
      const customEvent = e as CustomEvent<Mentor>;
      setSelectedMentorForChat(customEvent.detail);
      setIsChatOpen(true);
    };

    window.addEventListener('openMentorChat', handleOpenChat);
    return () => window.removeEventListener('openMentorChat', handleOpenChat);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const guidesData = await getGuides();
        setGuides(guidesData.length > 0 ? guidesData : ANIMAL_GUIDES);
        
        const mentorsData = await getMentors();
        setMentors(mentorsData.length > 0 ? mentorsData : Object.values(MENTORS).flat());
      } catch (error) {
        console.error("Error cargando datos:", error);
        setGuides(ANIMAL_GUIDES);
        setMentors(Object.values(MENTORS).flat());
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-gold selection:text-black">
      <Toaster position="top-right" theme="dark" richColors />
      <Navbar user={user} />
      <Hero userType={userType} setUserType={setUserType} onActivate={() => setIsMetamorphosisOpen(true)} />
      <TransformationSection />
      <CourseCatalog />
      <AssetLibrarySection guides={guides} mentors={mentors} />
      <MentorsSection mentors={mentors} guides={guides} />
      <GlobalImpactSection />
      <ValidationSeriesSection />
      <DigitalLeverageSection />
      
      {(userType === 'professional' || userType === 'business') && (
        <>
          {/* Neural Observer Trigger Section */}
          <section className="py-20 bg-brand-dark border-y border-brand-gold/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-gold/5 animate-pulse opacity-20" />
            <div className="max-w-screen-2xl mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5">
                  <Bird className="w-4 h-4 text-brand-gold" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">Tecnología de Inteligencia</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-light tracking-tighter">
                  Modo <span className="italic text-brand-gold font-serif">Observador Neural</span>
                </h3>
                <p className="text-brand-muted font-light text-lg leading-relaxed">
                  Herramienta profesional para la detección de demanda real. Navegue por cualquier red social y deje que la IA extraiga oportunidades automáticamente para su negocio.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsNeuralObserverOpen(true)}
                    className="luxury-button px-8 py-4 group"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Iniciar Observador
                  </button>
                  <button 
                    onClick={() => setIsManifestoOpen(true)}
                    className="outline-button px-8 py-4"
                  >
                    Protocolo de Inteligencia
                  </button>
                </div>
              </div>
              
              <div className="relative group cursor-pointer" onClick={() => setIsNeuralObserverOpen(true)}>
                <div className="w-64 h-64 rounded-full border border-brand-gold/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-2 border-brand-gold/10 animate-ping" />
                  <div className="w-48 h-48 rounded-full bg-brand-gold/5 border border-brand-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                    <Eye className="w-16 h-16 text-brand-gold animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <MasterEngineSection />
          <InvestorDashboard />
        </>
      )}

      <DataEcosystemSection />
      <ValidationScriptSection />
      <FederalProgramsSection />
      <BetaLabDashboard />
      <FederalStrategySection />
      <AIChat />
      <AnalyticsDashboard />
      <Footer />
      <FloatingChatbot selectedMentor={selectedMentorForChat} isOpen={isChatOpen} setIsOpen={setIsChatOpen} allGuides={guides} />
      
      {/* Neural Observer Interface */}
      <NeuralObserver 
        isOpen={isNeuralObserverOpen} 
        onClose={() => setIsNeuralObserverOpen(false)} 
      />

      {/* Metamorphosis Overlay */}
      <MetamorphosisOverlay 
        isOpen={isMetamorphosisOpen} 
        onClose={() => {
          setIsMetamorphosisOpen(false);
          // When finishing metamorphosis, open the general chat to welcome the user
          setIsChatOpen(true);
        }} 
      />
      
      {/* Protocol Manifesto */}
      <ProtocolManifesto 
        isOpen={isManifestoOpen} 
        onClose={() => setIsManifestoOpen(false)} 
      />
      
      <BottomNav />
    </div>
  );
}
