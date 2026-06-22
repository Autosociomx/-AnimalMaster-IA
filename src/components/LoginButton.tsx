import React from 'react';
import { useAuth } from '../context/FirebaseContext';

export const LoginButton: React.FC = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  if (user) {
    return (
      <button 
        onClick={logout}
        className="px-6 py-2 bg-brand-dark border border-brand-gold text-brand-gold text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all"
      >
        Cerrar Sesión ({user.email})
      </button>
    );
  }

  return (
    <button 
      onClick={signInWithGoogle}
      className="px-6 py-2 bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold/90 transition-all"
    >
      Iniciar Sesión
    </button>
  );
};
