import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/FirebaseContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

const mockData = [
  { name: 'Ene', salud: 85, nutricion: 80, comportamiento: 90 },
  { name: 'Feb', salud: 88, nutricion: 82, comportamiento: 92 },
  { name: 'Mar', salud: 86, nutricion: 85, comportamiento: 94 },
  { name: 'Abr', salud: 90, nutricion: 88, comportamiento: 95 },
  { name: 'May', salud: 92, nutricion: 90, comportamiento: 96 },
  { name: 'Jun', salud: 95, nutricion: 92, comportamiento: 98 },
];

export const AnalyticsDashboard = () => {
  const { user, userProfile } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user && (userProfile?.plan === 'Clinical Professional' || userProfile?.plan === 'Elite Executive')) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [user, userProfile]);

  if (!isVisible) return null;

  return (
    <section id="analytics" className="py-24 bg-brand-dark/95 border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
            <Activity className="w-6 h-6 text-brand-gold" />
          </div>
          <div>
            <h2 className="text-3xl font-serif text-white">Panel de Analítica Privada</h2>
            <p className="text-brand-muted font-light">Evolución de tus animales basada en interacciones con la IA</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black/40 border border-brand-gold/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-medium">Salud General</h3>
            </div>
            <div className="text-4xl font-light text-white mb-2">95%</div>
            <p className="text-sm text-brand-muted">+5% vs mes anterior</p>
          </div>
          <div className="bg-black/40 border border-brand-gold/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-medium">Nutrición</h3>
            </div>
            <div className="text-4xl font-light text-white mb-2">92%</div>
            <p className="text-sm text-brand-muted">+2% vs mes anterior</p>
          </div>
          <div className="bg-black/40 border border-brand-gold/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-brand-gold" />
              <h3 className="text-white font-medium">Comportamiento</h3>
            </div>
            <div className="text-4xl font-light text-white mb-2">98%</div>
            <p className="text-sm text-brand-muted">+3% vs mes anterior</p>
          </div>
        </div>

        <div className="bg-black/40 border border-brand-gold/20 rounded-xl p-8">
          <h3 className="text-xl font-serif text-white mb-8">Evolución Histórica</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" domain={[60, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="salud" stroke="#4ade80" strokeWidth={2} dot={{ r: 4 }} name="Salud" />
                <Line type="monotone" dataKey="nutricion" stroke="#60a5fa" strokeWidth={2} dot={{ r: 4 }} name="Nutrición" />
                <Line type="monotone" dataKey="comportamiento" stroke="#D4AF37" strokeWidth={2} dot={{ r: 4 }} name="Comportamiento" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
