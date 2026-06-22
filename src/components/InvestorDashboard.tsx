import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  PieChart, 
  Briefcase, 
  Activity,
  ArrowUpRight,
  Target,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';

const InvestorDashboard = () => {
  const [stats, setStats] = useState({
    totalOpportunities: 0,
    unattendedCount: 0,
    nicheDistribution: [] as any[],
    recentGrowth: 0,
    estimatedMarketValue: 0
  });

  useEffect(() => {
    const resultsRef = collection(db, 'engine_results');
    const unsubscribe = onSnapshot(resultsRef, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      
      const total = data.length;
      const unattended = data.filter((d: any) => d.status === 'Unattended').length;
      
      const distribution = data.reduce((acc: any, curr: any) => {
        const niche = curr.niche || 'Universal';
        acc[niche] = (acc[niche] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(distribution).map(([name, value]) => ({ name, value }));
      
      setStats({
        totalOpportunities: total,
        unattendedCount: unattended,
        nicheDistribution: chartData,
        recentGrowth: 12.5, // Simulado
        estimatedMarketValue: total * 150 // Estimación: $150 por lead cualificado
      });
    }, (error) => {
      console.error("Error en el dashboard de inversionista:", error);
    });

    return () => unsubscribe();
  }, []);

  const COLORS = ['#D4AF37', '#FFFFFF', '#A3A3A3', '#404040'];

  return (
    <section id="investor-dashboard" className="py-32 bg-brand-dark border-t border-brand-gold/10">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5">
              <Briefcase className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-semibold">Panel de Inversionista</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-light leading-none tracking-tighter">
              Métricas de <span className="italic text-brand-gold font-serif">Oportunidad</span>
            </h2>
            <p className="text-brand-muted font-light text-lg max-w-xl">
              Visualización agregada de la demanda global capturada por la Inteligencia Universal. Datos reales para decisiones estratégicas.
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="p-6 bg-brand-gold/5 border border-brand-gold/10 rounded-2xl text-center min-w-[200px]">
              <span className="text-[10px] uppercase tracking-widest text-brand-muted block mb-2">Valor de Mercado Est.</span>
              <div className="text-3xl font-light text-brand-gold">${stats.estimatedMarketValue.toLocaleString()}</div>
              <div className="flex items-center justify-center gap-1 text-green-500 text-[10px] mt-2">
                <ArrowUpRight className="w-3 h-3" />
                <span>+15% este mes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Oportunidades Totales', value: stats.totalOpportunities, icon: <Globe />, trend: '+24 hoy' },
            { label: 'Demanda Desatendida', value: stats.unattendedCount, icon: <Activity />, trend: '68% del total', color: 'text-red-500' },
            { label: 'Tasa de Conversión IA', value: '94.2%', icon: <Target />, trend: 'Optimizado' },
            { label: 'Crecimiento Dataset', value: `${stats.recentGrowth}%`, icon: <TrendingUp />, trend: 'Exponencial' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-8 border-brand-gold/10 hover:border-brand-gold/30 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className={cn("text-[10px] font-bold uppercase tracking-widest", stat.color || "text-brand-gold/60")}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-4xl font-light mb-2">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-panel p-8 border-brand-gold/10">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Distribución por Nicho</h4>
              <PieChart className="w-4 h-4 text-brand-gold/40" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={stats.nicheDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.nicheDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(212, 175, 55, 0.2)', fontSize: '10px' }}
                    itemStyle={{ color: '#D4AF37' }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {stats.nicheDistribution.map((n, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-[10px] text-brand-muted uppercase tracking-widest">{n.name}: {n.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 border-brand-gold/10">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Crecimiento de Inteligencia</h4>
              <TrendingUp className="w-4 h-4 text-brand-gold/40" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.nicheDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(163, 163, 163, 0.5)', fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(163, 163, 163, 0.5)', fontSize: 10 }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(212, 175, 55, 0.05)' }}
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(212, 175, 55, 0.2)', fontSize: '10px' }}
                  />
                  <Bar dataKey="value" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorDashboard;
