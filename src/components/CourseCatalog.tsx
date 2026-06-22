import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Target, 
  Users, 
  Clock, 
  ChevronRight, 
  Play, 
  FileText, 
  Video, 
  GraduationCap,
  Filter,
  Search,
  X,
  ArrowUp
} from 'lucide-react';
import { Course, COURSES, MENTORS } from '../data/content';
import { cn } from '../lib/utils';

const CourseCard = ({ course, onClick }: { course: Course; onClick: () => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer bg-brand-surface border border-brand-gold/10 overflow-hidden hover:border-brand-gold/30 transition-all duration-500"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-widest">
            {course.level}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          <Clock className="w-3 h-3 text-brand-gold" />
          <span className="text-[10px] font-medium uppercase tracking-wider">{course.duration}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            {course.category}
          </span>
        </div>
        <h3 className="text-xl font-light mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-brand-muted font-light line-clamp-3 mb-6">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-brand-gold/5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-brand-muted">
              <Video className="w-3 h-3" />
              <span className="text-[9px] uppercase tracking-tighter">Video</span>
            </div>
            <div className="flex items-center gap-1 text-brand-muted">
              <FileText className="w-3 h-3" />
              <span className="text-[9px] uppercase tracking-tighter">PDF</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-brand-gold text-[10px] font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
            Detalles <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CourseModal = ({ course, onClose }: { course: Course; onClose: () => void }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (modalRef.current) {
        setShowScrollTop(modalRef.current.scrollTop > 300);
      }
    };
    const currentModal = modalRef.current;
    currentModal?.addEventListener('scroll', handleScroll);
    return () => currentModal?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    modalRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnroll = () => {
    // Find the first mentor for this course's category
    const categoryMentors = MENTORS[course.category as keyof typeof MENTORS];
    const mentor = (categoryMentors && categoryMentors.length > 0) ? categoryMentors[0] : null;
    const event = new CustomEvent('openMentorChat', { detail: mentor });
    window.dispatchEvent(event);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-brand-dark/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        ref={modalRef}
        className="relative max-w-5xl w-full max-h-[90vh] bg-brand-surface border border-brand-gold/20 overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-brand-dark/50 text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scroll to Top inside Modal */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="fixed bottom-12 right-12 z-50 p-3 bg-brand-gold text-brand-dark rounded-full shadow-2xl hover:scale-110 transition-all"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <img 
              src={course.imageUrl} 
              alt={course.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-surface via-transparent to-transparent hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent md:hidden" />
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-widest border border-brand-gold/20">
                {course.level}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">
                {course.category}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-light mb-6 leading-tight">
              {course.title}
            </h2>
            
            <p className="text-brand-muted font-light leading-relaxed mb-8">
              {course.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/5 flex items-center justify-center border border-brand-gold/10">
                  <Clock className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-brand-muted">Duración</p>
                  <p className="text-sm font-medium">{course.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/5 flex items-center justify-center border border-brand-gold/10">
                  <GraduationCap className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-brand-muted">Formato</p>
                  <p className="text-sm font-medium">{course.format.split(',')[0]}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  <Target className="w-4 h-4" /> Objetivos de Aprendizaje
                </h4>
                <ul className="space-y-3">
                  {course.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-brand-muted font-light">
                      <div className="w-1 h-1 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
                    <Users className="w-4 h-4" /> Audiencia
                  </h4>
                  <p className="text-sm text-brand-muted font-light">{course.targetAudience}</p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
                    <BookOpen className="w-4 h-4" /> Prerrequisitos
                  </h4>
                  <p className="text-sm text-brand-muted font-light">{course.prerequisites}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-brand-gold/10 flex flex-wrap gap-4">
              <button 
                onClick={handleEnroll}
                className="luxury-button px-8 py-3 flex items-center gap-2"
              >
                Inscribirme Ahora <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={handleEnroll}
                className="px-8 py-3 border border-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold/5 transition-all"
              >
                Ver Programa Completo
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const CourseCatalog = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Scroll to top when a course is selected
  useEffect(() => {
    if (selectedCourse) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCourse]);

  const categories = ['All', ...Array.from(new Set(COURSES.map(c => c.category)))];
  const levels = ['All', 'Guía de Inmersión', 'Curso de Especialidad', 'Maestría de Élite'];

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'All' || course.level === levelFilter;
    
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      course.title.toLowerCase().includes(searchLower) || 
      course.description.toLowerCase().includes(searchLower) ||
      course.learningObjectives.some(obj => obj.toLowerCase().includes(searchLower));
      
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <section id="academy" className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 mb-6"
            >
              <GraduationCap className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold">Academia Animal Master</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-light tracking-tighter mb-6"
            >
              Catálogo de <span className="text-brand-gold italic font-serif">Maestría</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-muted font-light leading-relaxed"
            >
              Programas de formación de alto nivel diseñados para transformar tu relación con el mundo animal a través de la ciencia y la tecnología.
            </motion.p>
          </div>

          <div className="flex flex-col gap-8 w-full lg:w-auto lg:min-w-[400px]">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted group-focus-within:text-brand-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar por título, descripción o temas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-brand-surface border border-brand-gold/10 p-4 pl-12 text-sm focus:outline-none focus:border-brand-gold/40 transition-all rounded-none placeholder:text-brand-muted/50"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-gold/60">
                  <Filter className="w-3 h-3" /> Nivel Académico
                </div>
                <div className="flex flex-wrap gap-2">
                  {levels.map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(lvl)}
                      className={cn(
                        "px-4 py-2 text-[9px] font-bold uppercase tracking-widest border transition-all",
                        levelFilter === lvl 
                          ? "bg-brand-gold text-brand-dark border-brand-gold" 
                          : "bg-transparent text-brand-muted border-brand-gold/10 hover:border-brand-gold/30"
                      )}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-gold/60">
                  <Target className="w-3 h-3" /> Categoría
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={cn(
                        "px-4 py-2 text-[9px] font-bold uppercase tracking-widest border transition-all",
                        categoryFilter === cat 
                          ? "bg-brand-gold text-brand-dark border-brand-gold" 
                          : "bg-transparent text-brand-muted border-brand-gold/10 hover:border-brand-gold/30"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onClick={() => setSelectedCourse(course)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center border border-dashed border-brand-gold/10"
          >
            <div className="w-16 h-16 rounded-full bg-brand-gold/5 flex items-center justify-center mx-auto mb-6 border border-brand-gold/10">
              <Search className="w-8 h-8 text-brand-gold/40" />
            </div>
            <h3 className="text-xl font-light text-white mb-2">No se encontraron resultados</h3>
            <p className="text-brand-muted font-light italic">Intenta ajustar tus filtros o términos de búsqueda.</p>
            <button 
              onClick={() => {
                setCategoryFilter('All');
                setLevelFilter('All');
                setSearch('');
              }}
              className="mt-8 text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors underline underline-offset-8"
            >
              Limpiar todos los filtros
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedCourse && (
          <CourseModal 
            course={selectedCourse} 
            onClose={() => setSelectedCourse(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};
