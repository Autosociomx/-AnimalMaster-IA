import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
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
  Shield
} from 'lucide-react';
import { cn } from './lib/utils';
import { ANIMAL_GUIDES, MENTORS, SUBSCRIPTION_PLANS, ECONOMIC_STUDY, Guide } from './data/content';
import { QUIZZES, Quiz, Question } from './data/quizzes';
import { getMentorResponse } from './services/gemini';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            Academia
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <a href="#mentors" className="hover:text-brand-gold transition-colors relative group">
            Mentores
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <a href="#pricing" className="hover:text-brand-gold transition-colors relative group">
            Inversión
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <a href="#ai-assistance" className="hover:text-brand-gold transition-colors relative group">
            Consultoría IA
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <a href="#quizzes" className="hover:text-brand-gold transition-colors relative group">
            Certificaciones
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
          </a>
          <button 
            onClick={() => alert("Función de traducción en desarrollo.")}
            className="text-brand-gold hover:text-white transition-colors"
          >
            ES/EN
          </button>
          <button className="luxury-button">Área Miembros</button>
        </div>
        
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([
    { role: 'model', parts: [{ text: "Hola, soy tu asistente ejecutivo de IA. ¿En qué área técnica o estratégica puedo asistirle hoy?" }] }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMessage }] }]);
    setIsLoading(true);

    try {
      const response = await getMentorResponse(userMessage, messages);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response || "Lo siento, no pude procesar tu solicitud." }] }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: 'Disculpe, he experimentado una interrupción. Por favor, reintente.' }] }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 transition-all"
      >
        <Bot className="w-8 h-8" />
      </button>
      
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-96 h-[500px] glass-panel z-50 flex flex-col shadow-2xl">
          <div className="p-6 border-b border-brand-gold/10 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Consultor IA</span>
            <button onClick={() => setIsOpen(false)}><X className="w-4 h-4 text-brand-muted" /></button>
          </div>
          <div className="flex-grow p-6 overflow-y-auto text-sm text-brand-muted font-light space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn("p-3 rounded", msg.role === 'user' ? "bg-brand-gold/10 text-brand-gold" : "bg-brand-surface text-brand-text")}>
                {msg.parts[0].text}
              </div>
            ))}
            {isLoading && <div className="text-brand-gold animate-pulse">Pensando...</div>}
          </div>
          <div className="p-6 border-t border-brand-gold/10">
            <input 
              type="text" 
              placeholder="Escriba su consulta..." 
              className="w-full bg-brand-dark/50 border border-brand-gold/10 p-3 text-sm focus:outline-none" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
        </div>
      )}
    </>
  );
};

const Hero = () => (
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
        <span className="section-label">Estándar de Excelencia Animal</span>
        <h1 className="text-7xl md:text-[120px] font-light leading-[0.85] mb-10">
          Animal <br />
          <span className="italic text-brand-gold font-serif">Mastery</span>
        </h1>
        <p className="text-xl text-brand-muted max-w-xl mb-12 leading-relaxed font-light">
          La institución de élite dedicada a la maestría en el cuidado y producción animal. 
          Donde la ciencia de vanguardia se encuentra con la sabiduría ancestral.
        </p>
        <div className="flex flex-wrap gap-6">
          <button className="luxury-button group">
            Explorar Currículum <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#mentors" className="outline-button">
            Nuestra Facultad
          </a>
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
              src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2071&auto=format&fit=crop" 
              alt="Luxury Animal Care" 
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2000ms]"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 vertical-text text-[9px] uppercase tracking-[0.5em] text-brand-gold/40">
            Animal Master Academy • Est. 2024
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const AcademySection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  
  const categories = Array.from(new Set(ANIMAL_GUIDES.map(g => g.category)));
  
  const filteredGuides = ANIMAL_GUIDES.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? guide.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="academy" className="py-32 bg-brand-dark border-y border-brand-gold/5">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-12">
          <div className="max-w-2xl">
            <span className="section-label">Biblioteca de Conocimiento de Élite</span>
            <h2 className="text-5xl md:text-6xl font-light mb-6">Currículum Académico Superior</h2>
            <p className="text-brand-muted font-light leading-relaxed">
              Acceda a nuestra colección exclusiva de protocolos de maestría, guías técnicas de alta precisión y estrategias de rentabilidad desarrolladas por los líderes globales de la industria.
            </p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/40" />
            <input 
              type="text" 
              placeholder="Consultar archivo maestro..."
              className="w-full pl-14 pr-6 py-4 bg-brand-surface/50 border border-brand-gold/10 text-sm focus:outline-none focus:border-brand-gold/40 transition-all placeholder:text-brand-muted/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-16">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-8 py-2 text-[9px] font-bold uppercase tracking-[0.3em] transition-all border",
              selectedCategory === null 
                ? "bg-brand-gold text-brand-dark border-brand-gold" 
                : "bg-transparent text-brand-muted border-brand-gold/10 hover:border-brand-gold/30"
            )}
          >
            Todas las Especialidades
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-8 py-2 text-[9px] font-bold uppercase tracking-[0.3em] transition-all border",
                selectedCategory === cat 
                  ? "bg-brand-gold text-brand-dark border-brand-gold" 
                  : "bg-transparent text-brand-muted border-brand-gold/10 hover:border-brand-gold/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredGuides.map((guide, index) => (
              <motion.div 
                key={guide.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedGuide(guide)}
                className="group glass-panel p-10 hover:border-brand-gold/40 transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-brand-gold group-hover:h-full transition-all duration-500" />
                
                <div className="flex justify-between items-start mb-10">
                  <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-brand-gold/60">
                    Especialización {guide.category}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-brand-muted">
                    Nivel {guide.level}
                  </span>
                </div>
                <h3 className="text-3xl font-light mb-6 group-hover:text-brand-gold transition-colors leading-tight">{guide.title}</h3>
                <div className="text-sm text-brand-muted/70 mb-10 line-clamp-3 leading-relaxed font-light">
                  <ReactMarkdown>{guide.content}</ReactMarkdown>
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-brand-gold/5">
                  <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-brand-muted/40">
                    <BookOpen className="w-3 h-3" />
                    {guide.pages} Páginas de Valor Técnico
                  </div>
                  <div className="w-8 h-8 border border-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-dark transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Guide Detail Modal */}
        <AnimatePresence>
          {selectedGuide && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedGuide(null)}
                className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-5xl max-h-[90vh] glass-panel overflow-hidden flex flex-col"
              >
                <div className="p-8 border-b border-brand-gold/10 flex items-center justify-between bg-brand-surface">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-2 block">
                      {selectedGuide.category} • Nivel {selectedGuide.level}
                    </span>
                    <h2 className="text-3xl font-light">{selectedGuide.title}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedGuide(null)}
                    className="w-12 h-12 border border-brand-gold/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-grow overflow-y-auto p-12 markdown-body">
                  <ReactMarkdown>{selectedGuide.content}</ReactMarkdown>
                </div>
                <div className="p-8 border-t border-brand-gold/10 bg-brand-surface flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted">
                    Animal Master Academy — Documento Confidencial para Miembros
                  </span>
                  <button className="luxury-button">Descargar PDF Maestro</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const MentorsSection = () => {
  const categories = Object.keys(MENTORS) as (keyof typeof MENTORS)[];
  const [activeCategory, setActiveCategory] = useState<keyof typeof MENTORS>(categories[0]);
  const [activeMentor, setActiveMentor] = useState(MENTORS[activeCategory][0]);
  const [activeTab, setActiveTab] = useState<'bio' | 'video' | 'testimonials' | 'calendar'>('bio');

  useEffect(() => {
    setActiveMentor(MENTORS[activeCategory][0]);
  }, [activeCategory]);

  return (
    <section id="mentors" className="py-32 bg-brand-dark overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="section-label mx-auto">Facultad de Expertos</span>
          <h2 className="text-5xl md:text-7xl font-light mb-8">Mentores de Élite</h2>
          <p className="text-brand-muted font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Seleccione una especialización para conocer a los tres mentores que dominan esa área.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-2 text-[9px] font-bold uppercase tracking-[0.3em] transition-all border",
                  activeCategory === cat 
                    ? "bg-brand-gold text-brand-dark border-brand-gold" 
                    : "bg-transparent text-brand-muted border-brand-gold/10 hover:border-brand-gold/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Mentor List Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {MENTORS[activeCategory].map((mentor) => (
              <button
                key={mentor.id}
                onClick={() => {
                  setActiveMentor(mentor);
                  setActiveTab('bio');
                }}
                className={cn(
                  "w-full flex items-center gap-6 p-6 transition-all text-left border relative group",
                  activeMentor.id === mentor.id 
                    ? "bg-brand-surface border-brand-gold/40 shadow-2xl" 
                    : "bg-transparent border-brand-gold/5 hover:border-brand-gold/20"
                )}
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-brand-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                <div className="w-20 h-20 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover border border-brand-gold/10" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-light mb-1">{mentor.name}</h4>
                  <p className={cn(
                    "text-[8px] uppercase tracking-[0.3em] font-bold",
                    activeMentor.id === mentor.id ? "text-brand-gold" : "text-brand-muted/40"
                  )}>{mentor.specialty}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Mentor Detail View */}
          <div className="lg:col-span-8">
            <motion.div 
              key={activeMentor.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel overflow-hidden"
            >
              {/* Header Stats */}
              <div className="p-10 bg-brand-surface/80 flex flex-wrap justify-between items-center gap-10 border-b border-brand-gold/10">
                <div className="flex items-center gap-10">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-light text-brand-gold mb-1">{activeMentor.stats.rating}</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-2 h-2 fill-brand-gold text-brand-gold" />)}
                    </div>
                  </div>
                  <div className="w-px h-12 bg-brand-gold/10" />
                  <div>
                    <p className="text-3xl font-light">{activeMentor.stats.students}+</p>
                    <p className="text-[8px] uppercase tracking-[0.4em] text-brand-muted">Alumnos</p>
                  </div>
                  <div className="w-px h-12 bg-brand-gold/10" />
                  <div>
                    <p className="text-3xl font-light">{activeMentor.stats.experience}</p>
                    <p className="text-[8px] uppercase tracking-[0.4em] text-brand-muted">Maestría</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Iniciando proceso de reserva con ${activeMentor.name}. Un asesor ejecutivo se pondrá en contacto con usted.`)}
                  className="luxury-button"
                >
                  Agendar Sesión
                </button>
              </div>

              {/* Tabs Navigation */}
              <div className="flex bg-brand-surface/40">
                {[
                  { id: 'bio', label: 'Perfil', icon: User },
                  { id: 'video', label: 'Visión', icon: Play },
                  { id: 'testimonials', label: 'Impacto', icon: Quote },
                  { id: 'calendar', label: 'Agenda', icon: Calendar },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-3 py-6 text-[9px] font-bold uppercase tracking-[0.3em] transition-all border-b",
                      activeTab === tab.id 
                        ? "border-brand-gold text-brand-gold bg-brand-gold/5" 
                        : "border-transparent text-brand-muted/40 hover:text-brand-muted/60"
                    )}
                  >
                    <tab.icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-12 min-h-[400px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'bio' && (
                    <motion.div 
                      key="bio"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <h3 className="text-4xl font-light leading-tight">{activeMentor.name}</h3>
                      <p className="text-brand-gold font-serif italic text-2xl">{activeMentor.specialty}</p>
                      <p className="text-brand-muted font-light leading-relaxed text-lg max-w-2xl">{activeMentor.bio}</p>
                    </motion.div>
                  )}

                  {activeTab === 'video' && (
                    <motion.div 
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="aspect-video bg-brand-dark relative group overflow-hidden border border-brand-gold/10"
                    >
                      <video 
                        src={activeMentor.videoUrl} 
                        className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
                        controls
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                        <div className="w-24 h-24 border border-brand-gold/30 flex items-center justify-center text-brand-gold backdrop-blur-sm">
                          <Play className="w-8 h-8 fill-current" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'testimonials' && (
                    <motion.div 
                      key="testimonials"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid gap-8"
                    >
                      {activeMentor.testimonials.map((t, i) => (
                        <div key={i} className="p-10 bg-brand-surface/30 border border-brand-gold/5 relative group">
                          <div className="absolute left-0 top-0 w-1 h-0 bg-brand-gold group-hover:h-full transition-all" />
                          <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-gold/5" />
                          <p className="italic text-xl mb-6 text-brand-text font-serif font-light leading-relaxed">"{t.text}"</p>
                          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold">— {t.user}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'calendar' && (
                    <motion.div 
                      key="calendar"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-10"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        {activeMentor.availability.map((slot, i) => (
                          <div key={i} className="flex items-center gap-6 p-6 bg-brand-surface/30 border border-brand-gold/5 group hover:border-brand-gold/20 transition-all">
                            <div className="w-12 h-12 border border-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark transition-all">
                              <Calendar className="w-5 h-5" />
                            </div>
                            <span className="font-light text-sm tracking-wide">{slot}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-brand-muted/40 italic uppercase tracking-widest">* Sesiones sujetas a validación de perfil ejecutivo.</p>
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

const PricingSection = () => (
  <section id="pricing" className="py-32 bg-brand-dark border-y border-brand-gold/5">
    <div className="max-w-screen-2xl mx-auto px-8">
      <div className="text-center mb-24">
        <span className="section-label mx-auto">Inversión en Excelencia</span>
        <h2 className="text-5xl md:text-7xl font-light mb-8">Estructura de Membresía</h2>
        <p className="text-brand-muted font-light max-w-2xl mx-auto leading-relaxed">
          Nuestras membresías están diseñadas para aquellos que buscan el más alto estándar en la industria animal.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-10">
        {SUBSCRIPTION_PLANS.map((plan, index) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "glass-panel p-12 flex flex-col relative group overflow-hidden",
              plan.highlight && "border-brand-gold/40 shadow-[0_0_50px_rgba(197,160,89,0.1)]"
            )}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-brand-gold text-brand-dark text-[8px] font-bold uppercase tracking-[0.3em] px-6 py-2">
                Recomendado
              </div>
            )}
            
            <div className="mb-10">
              <h3 className="text-2xl font-light mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-light text-brand-gold">${plan.price}</span>
                <span className="text-brand-muted/40 text-[10px] uppercase tracking-widest">/ {plan.period}</span>
              </div>
            </div>
            
            <ul className="space-y-6 mb-12 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-brand-muted font-light leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => alert(`Iniciando suscripción al plan ${plan.name}. Redirigiendo a pasarela de pago segura...`)}
              className={cn(
                "w-full py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all border",
                plan.highlight 
                  ? "bg-brand-gold text-brand-dark border-brand-gold" 
                  : "bg-transparent text-brand-gold border-brand-gold/20 hover:bg-brand-gold/5"
              )}
            >
              Adquirir Membresía
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const EconomicStudySection = () => (
  <section className="py-32 bg-brand-surface relative overflow-hidden">
    <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
    
    <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <span className="section-label">Análisis de Valor</span>
          <h2 className="text-5xl md:text-6xl font-light mb-10 leading-tight">Estudio Económico y <br /><span className="italic text-brand-gold font-serif">ROI Proyectado</span></h2>
          <p className="text-brand-muted font-light text-lg mb-12 leading-relaxed">
            Nuestra propuesta no es un gasto, es una inversión estratégica. Analizamos el mercado para asegurar que cada dólar invertido en Animal Master Academy retorne multiplicado en eficiencia y valor de mercado.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="p-8 border border-brand-gold/10 bg-brand-dark/30 group hover:border-brand-gold/30 transition-all">
              <div className="w-12 h-12 border border-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-3 text-brand-gold">Análisis de Mercado</h4>
              <p className="text-sm text-brand-muted font-light leading-relaxed">{ECONOMIC_STUDY.marketAnalysis}</p>
            </div>
            
            <div className="p-8 border border-brand-gold/10 bg-brand-dark/30 group hover:border-brand-gold/30 transition-all">
              <div className="w-12 h-12 border border-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-all">
                <PieChart className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-3 text-brand-gold">Estrategia de Precios</h4>
              <p className="text-sm text-brand-muted font-light leading-relaxed">{ECONOMIC_STUDY.pricingStrategy}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-panel p-12 space-y-10">
          <h3 className="text-2xl font-light border-b border-brand-gold/10 pb-6">Justificación de Inversión</h3>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-10 h-10 border border-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-light mb-2">Proyección de ROI</h4>
                <p className="text-sm text-brand-muted font-light leading-relaxed">{ECONOMIC_STUDY.roiProjection}</p>
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
  const [messages, setMessages] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([
    { role: 'model', parts: [{ text: "Bienvenido al Centro de Consultoría de Animal Master. Soy su asistente ejecutivo de IA. ¿En qué área técnica o estratégica de la gestión animal puedo asistirle hoy?" }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: [{ text: userMessage }] }]);
    setIsLoading(true);

    try {
      const response = await getMentorResponse(userMessage, messages);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response || "Lo siento, no pude procesar tu solicitud." }] }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: 'Disculpe, he experimentado una interrupción en mi conexión con los servidores centrales. Por favor, reintente su consulta.' }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistance" className="py-32 bg-brand-dark">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <span className="section-label">Consultoría 24/7</span>
            <h2 className="text-5xl md:text-6xl font-light mb-10 leading-tight">Asistencia de <br /><span className="italic text-brand-gold font-serif">Inteligencia Superior</span></h2>
            <p className="text-brand-muted font-light text-lg mb-12 leading-relaxed">
              Nuestra IA ha sido entrenada con el corpus de conocimiento más avanzado en medicina veterinaria, zootecnia y gestión agropecuaria de élite.
            </p>
            <div className="space-y-8">
              {[
                "Análisis de protocolos sanitarios",
                "Optimización de dietas de alto rendimiento",
                "Estrategias de escalabilidad productiva",
                "Diagnóstico preliminar asistido"
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
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-brand-gold animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Consultor Ejecutivo Activo</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-gold/20" />
                  <div className="w-2 h-2 rounded-full bg-brand-gold/20" />
                  <div className="w-2 h-2 rounded-full bg-brand-gold/20" />
                </div>
              </div>
              
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
                      "max-w-[85%] p-8 text-sm leading-relaxed font-light relative",
                      msg.role === 'user' 
                        ? "bg-brand-gold text-brand-dark" 
                        : "bg-brand-surface border border-brand-gold/10 text-brand-text"
                    )}>
                      {msg.role === 'model' && (
                        <Bot className="absolute -left-12 top-0 w-8 h-8 text-brand-gold/20" />
                      )}
                      {msg.parts[0].text}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-brand-surface border border-brand-gold/10 p-6 flex gap-2">
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
                    className="w-full bg-brand-dark/50 border border-brand-gold/10 pl-8 pr-20 py-5 text-sm focus:outline-none focus:border-brand-gold/40 transition-all placeholder:text-brand-muted/30"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-brand-gold hover:text-brand-dark hover:bg-brand-gold transition-all disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuizSystem = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    
    setIsAnswered(true);
    if (selectedOption === selectedQuiz?.questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedQuiz) return;
    
    if (currentQuestionIndex + 1 < selectedQuiz.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
  };

  return (
    <section id="quizzes" className="py-32 bg-brand-surface border-y border-brand-gold/5">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="text-center mb-20">
          <span className="section-label mx-auto">Validación de Maestría</span>
          <h2 className="text-5xl md:text-7xl font-light mb-8">Exámenes de Certificación</h2>
          <p className="text-brand-muted font-light max-w-2xl mx-auto leading-relaxed">
            Ponga a prueba sus conocimientos técnicos y obtenga el reconocimiento de Animal Master Academy. Solo los más aptos alcanzan el nivel de Maestro.
          </p>
        </div>

        {!selectedQuiz ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {QUIZZES.map((quiz) => (
              <motion.div 
                key={quiz.id}
                whileHover={{ y: -10 }}
                className="glass-panel p-8 flex flex-col h-full group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-brand-gold">{quiz.category}</span>
                  <span className={cn(
                    "text-[8px] font-bold uppercase tracking-[0.3em] px-2 py-1 border",
                    quiz.difficulty === 'Experto' ? "border-red-500/30 text-red-500" : "border-brand-gold/30 text-brand-gold"
                  )}>
                    {quiz.difficulty}
                  </span>
                </div>
                <h3 className="text-2xl font-light mb-4 group-hover:text-brand-gold transition-colors">{quiz.title}</h3>
                <p className="text-xs text-brand-muted font-light mb-8 flex-grow leading-relaxed">{quiz.description}</p>
                <button 
                  onClick={() => handleStartQuiz(quiz)}
                  className="w-full py-4 border border-brand-gold/20 text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-brand-gold hover:text-brand-dark transition-all"
                >
                  Iniciar Evaluación
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div 
                  key="question"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-panel p-12"
                >
                  <div className="flex justify-between items-center mb-12">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">
                      Pregunta {currentQuestionIndex + 1} de {selectedQuiz.questions.length}
                    </span>
                    <button onClick={resetQuiz} className="text-brand-muted hover:text-brand-gold transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-3xl font-light mb-12 leading-tight">
                    {selectedQuiz.questions[currentQuestionIndex].text}
                  </h3>

                  <div className="space-y-4 mb-12">
                    {selectedQuiz.questions[currentQuestionIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        className={cn(
                          "w-full p-6 text-left border transition-all flex justify-between items-center group",
                          selectedOption === idx 
                            ? "border-brand-gold bg-brand-gold/5 text-brand-gold" 
                            : "border-brand-gold/10 hover:border-brand-gold/30 text-brand-muted",
                          isAnswered && idx === selectedQuiz.questions[currentQuestionIndex].correctAnswer && "border-green-500 bg-green-500/10 text-green-500",
                          isAnswered && selectedOption === idx && idx !== selectedQuiz.questions[currentQuestionIndex].correctAnswer && "border-red-500 bg-red-500/10 text-red-500"
                        )}
                      >
                        <span className="text-sm font-light">{option}</span>
                        {isAnswered && idx === selectedQuiz.questions[currentQuestionIndex].correctAnswer && <CheckCircle2 className="w-4 h-4" />}
                        {isAnswered && selectedOption === idx && idx !== selectedQuiz.questions[currentQuestionIndex].correctAnswer && <X className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>

                  {isAnswered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-brand-surface border border-brand-gold/10 mb-12"
                    >
                      <p className="text-xs text-brand-gold uppercase tracking-widest mb-2 font-bold">Explicación Técnica:</p>
                      <p className="text-sm text-brand-muted font-light italic">
                        {selectedQuiz.questions[currentQuestionIndex].explanation}
                      </p>
                    </motion.div>
                  )}

                  <div className="flex justify-end">
                    {!isAnswered ? (
                      <button 
                        onClick={handleConfirmAnswer}
                        disabled={selectedOption === null}
                        className="luxury-button disabled:opacity-30 disabled:hover:scale-100"
                      >
                        Confirmar Respuesta
                      </button>
                    ) : (
                      <button 
                        onClick={handleNextQuestion}
                        className="luxury-button"
                      >
                        {currentQuestionIndex + 1 < selectedQuiz.questions.length ? 'Siguiente Pregunta' : 'Ver Resultados'}
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-panel p-16 text-center"
                >
                  <div className="w-24 h-24 border border-brand-gold/20 flex items-center justify-center text-brand-gold mx-auto mb-10 rounded-full">
                    <Star className="w-10 h-10 fill-current" />
                  </div>
                  <h3 className="text-5xl font-light mb-6">Evaluación Completada</h3>
                  <p className="text-brand-muted font-light mb-12 text-lg">
                    Has obtenido una puntuación de <span className="text-brand-gold font-bold">{score} de {selectedQuiz.questions.length}</span>.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button 
                      onClick={() => handleStartQuiz(selectedQuiz)}
                      className="outline-button"
                    >
                      Reintentar Examen
                    </button>
                    <button 
                      onClick={resetQuiz}
                      className="luxury-button"
                    >
                      Volver a Certificaciones
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
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
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">Navegación</h4>
          <ul className="space-y-4 text-sm text-brand-muted font-light">
            <li><a href="#academy" className="hover:text-brand-gold transition-colors">Academia</a></li>
            <li><a href="#mentors" className="hover:text-brand-gold transition-colors">Mentores</a></li>
            <li><a href="#pricing" className="hover:text-brand-gold transition-colors">Inversión</a></li>
            <li><a href="#ai-assistance" className="hover:text-brand-gold transition-colors">Consultoría IA</a></li>
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
          © 2024 Animal Master Academy. Todos los derechos reservados.
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

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AcademySection />
      <MentorsSection />
      <QuizSystem />
      <PricingSection />
      <EconomicStudySection />
      <AIChat />
      <Footer />
      <FloatingChatbot />
    </div>
  );
}
