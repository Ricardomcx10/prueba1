import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginProps {
  onLogin: (user: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      onLogin(email.split('@')[0]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-surface overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] animate-pulse [animation-delay:2s]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md glass iridescent-border rounded-[2.5rem] p-10 shadow-[0_0_100px_-20px_rgba(57,241,234,0.15)]"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-surface shadow-[0_0_30px_rgba(57,241,234,0.3)] mb-6"
          >
            <Sparkles size={40} />
          </motion.div>
          <h1 className="text-5xl font-headline font-extrabold tracking-tighter mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Miwebpro
          </h1>
          <p className="text-sm font-label uppercase tracking-[0.3em] text-primary/60">Quantum Interface</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                <User size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-primary/50 transition-all text-sm"
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-primary/50 transition-all text-sm"
                placeholder="Contraseña"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-container text-surface font-bold text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(57,241,234,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-surface/30 border-t-surface rounded-full animate-spin"></div>
            ) : (
              <>
                {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-slate-400 hover:text-primary transition-colors"
          >
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] font-label uppercase tracking-widest text-slate-500">
          <ShieldCheck size={12} />
          <span>Acceso Encriptado de Punto Cero</span>
        </div>
      </motion.div>
    </div>
  );
}
