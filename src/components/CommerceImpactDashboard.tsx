import React from 'react';
import { 
  Globe, 
  TrendingUp, 
  Users, 
  DollarSign, 
  MapPin, 
  ArrowUpRight,
  Activity,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from 'recharts';
import { motion } from 'motion/react';

const data = [
  { name: 'CDMX', opportunities: 450, impact: 1200000 },
  { name: 'Monterrey', opportunities: 320, impact: 850000 },
  { name: 'Guadalajara', opportunities: 280, impact: 720000 },
  { name: 'Querétaro', opportunities: 190, impact: 450000 },
  { name: 'Puebla', opportunities: 150, impact: 380000 },
  { name: 'Mérida', opportunities: 120, impact: 290000 },
];

const trendData = [
  { time: '00:00', value: 400 },
  { time: '04:00', value: 300 },
  { time: '08:00', value: 600 },
  { time: '12:00', value: 800 },
  { time: '16:00', value: 1100 },
  { time: '20:00', value: 950 },
  { time: '23:59', value: 700 },
];

export const CommerceImpactDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Oportunidades Detectadas", value: "1,910", change: "+12%", icon: <Users className="w-5 h-5" /> },
          { label: "Impacto Económico Proyectado", value: "$3.89M", change: "+24%", icon: <DollarSign className="w-5 h-5" /> },
          { label: "Eficiencia de Conversión", value: "94.2%", change: "+5.4%", icon: <Zap className="w-5 h-5" /> },
          { label: "Alcance Global (Nodos)", value: "124", change: "+8", icon: <Globe className="w-5 h-5" /> },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 border-brand-gold/10 hover:border-brand-gold/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold">
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <h4 className="text-xl font-light text-white mb-1">{stat.label}</h4>
            <div className="text-2xl font-light text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 border-brand-gold/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-light text-white flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-gold" />
                Mapa de Calor de Oportunidades (México)
              </h3>
              <p className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">Demanda detectada en tiempo real por región</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <Activity className="w-3 h-3 text-green-500 animate-pulse" />
              <span className="text-[8px] uppercase tracking-widest text-green-500 font-bold">Live Feed</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#ffffff40" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ 
                    backgroundColor: '#0a0a0a', 
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    fontSize: '10px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="opportunities" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#D4AF37' : '#D4AF3740'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 border-brand-gold/10">
          <div className="mb-8">
            <h3 className="text-xl font-light text-white flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-brand-gold" />
              Tendencia de Ingesta
            </h3>
            <p className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">Volumen de datos procesados (24h)</p>
          </div>

          <div className="h-[200px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0a0a0a', 
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    fontSize: '10px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#D4AF37" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
              <span className="text-brand-muted">Precisión de IA</span>
              <span className="text-brand-gold font-bold">98.2%</span>
            </div>
            <div className="w-full h-1 bg-brand-gold/10 rounded-full overflow-hidden">
              <div className="w-[98.2%] h-full bg-brand-gold" />
            </div>
            <p className="text-[9px] text-brand-muted font-light leading-relaxed italic">
              "La Inteligencia Universal está redefiniendo el comercio en México al detectar necesidades antes de que se conviertan en búsquedas."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
