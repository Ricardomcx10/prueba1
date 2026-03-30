import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Cpu, 
  Layers,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary/30 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <Sparkles size={18} />
          </div>
          <span className="text-xl font-headline font-extrabold tracking-tighter">Miwebpro <span className="text-primary">Nexus</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-label uppercase tracking-widest text-slate-400">
          <a href="#features" className="hover:text-primary transition-colors">Características</a>
          <a href="#about" className="hover:text-primary transition-colors">Nosotros</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Precios</a>
        </div>

        <button 
          onClick={onGetStarted}
          className="px-6 py-2 rounded-xl bg-primary text-surface font-bold hover:shadow-[0_0_20px_rgba(57,241,234,0.4)] transition-all text-sm"
        >
          Acceder
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] animate-pulse [animation-delay:2s]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-label uppercase tracking-[0.3em] mb-6 border border-primary/20">
              Bienvenido al Futuro de la Web
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline font-extrabold tracking-tighter mb-8 leading-[0.85]">
              LA RED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">CUÁNTICA</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Miwebpro Nexus no es solo una aplicación, es tu ecosistema digital inteligente. Gestiona tareas, finanzas y conocimiento con la potencia de la IA de vanguardia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={onGetStarted}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary text-surface font-bold text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(57,241,234,0.5)] hover:scale-105 transition-all"
              >
                Comenzar Ahora <ArrowRight size={20} />
              </button>
              <button className="w-full sm:w-auto px-10 py-4 rounded-2xl glass border border-white/10 text-white font-bold text-lg hover:bg-white/5 transition-all">
                Ver Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements Decor */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-24 h-24 glass iridescent-border rounded-3xl opacity-20"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-10 w-32 h-32 glass iridescent-border rounded-[2rem] opacity-20"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-4">Potencia sin Límites</h2>
            <p className="text-slate-500 font-label uppercase tracking-widest text-xs">Módulos integrados de última generación</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-primary" />}
              title="Velocidad Nexus"
              description="Interfaz optimizada para una respuesta instantánea. Sin latencia, sin esperas."
            />
            <FeatureCard 
              icon={<Globe className="text-secondary" />}
              title="Conexión Global"
              description="Accede a toda la información del mundo a través de nuestra IA conectada en tiempo real."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-primary" />}
              title="Seguridad Cuántica"
              description="Tus datos están protegidos con los más altos estándares de encriptación de punto cero."
            />
            <FeatureCard 
              icon={<Cpu className="text-secondary" />}
              title="IA Mar Ia"
              description="Un asistente que aprende de tu flujo de trabajo para optimizar cada segundo de tu día."
            />
            <FeatureCard 
              icon={<Layers className="text-primary" />}
              title="Bento Design"
              description="Organización visual perfecta que se adapta a cualquier dispositivo sin esfuerzo."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="text-secondary" />}
              title="Todo en Uno"
              description="Tareas, finanzas, enlaces y chat. Todo lo que necesitas en un solo ecosistema."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <StatItem value="100K+" label="Usuarios Activos" />
          <StatItem value="99.9%" label="Uptime del Sistema" />
          <StatItem value="24/7" label="Soporte Mar Ia" />
          <StatItem value="0ms" label="Latencia de Datos" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full"></div>
        <div className="max-w-4xl mx-auto glass iridescent-border rounded-[3rem] p-12 md:p-20 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tighter mb-8">¿Listo para evolucionar?</h2>
          <p className="text-lg text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed">
            Únete a los miles de profesionales que ya están utilizando Miwebpro Nexus para dominar su entorno digital.
          </p>
          <button 
            onClick={onGetStarted}
            className="px-12 py-5 rounded-2xl bg-primary text-surface font-bold text-xl hover:shadow-[0_0_50px_rgba(57,241,234,0.6)] hover:scale-105 transition-all"
          >
            Empezar Gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-primary">
            <Sparkles size={14} />
          </div>
          <span className="text-lg font-headline font-extrabold tracking-tighter">Miwebpro <span className="text-primary">Nexus</span></span>
        </div>
        <p className="text-slate-600 text-xs font-label uppercase tracking-widest">
          © 2026 Miwebpro Nexus. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass iridescent-border rounded-3xl p-8 hover:bg-white/5 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-headline font-bold mb-4">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div>
      <h4 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter text-primary mb-2">{value}</h4>
      <p className="text-xs font-label uppercase tracking-widest text-slate-500">{label}</p>
    </div>
  );
}
