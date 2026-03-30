import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Grid3X3, 
  LayoutDashboard, 
  CheckSquare, 
  Wallet, 
  MessageSquare, 
  Bell, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from './lib/utils';
import { Login } from './components/Login';
import { Shortcuts } from './components/Shortcuts';
import { TodoList } from './components/TodoList';
import { FinanceDashboard } from './components/FinanceDashboard';
import { MarIaChat } from './components/MarIaChat';
import { GlobalSearch } from './components/GlobalSearch';
import { LandingPage } from './components/LandingPage';

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [user, setUser] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('miwebpro_user');
    if (savedUser) {
      setUser(savedUser);
      setView('dashboard');
    }
    
    // Simulate initial loading for "takeoff" effect
    setTimeout(() => setIsLoaded(true), 1000);
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
    setView('dashboard');
    localStorage.setItem('miwebpro_user', username);
  };

  const handleLogout = () => {
    setView('landing');
    setUser('');
    localStorage.removeItem('miwebpro_user');
  };

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('login')} />;
  }

  if (view === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-surface relative">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px] animate-pulse [animation-delay:2s]"></div>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col items-center py-8 gap-10 w-24 border-r border-white/5 bg-transparent z-20">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(57,241,234,0.2)]">
          <Grid3X3 size={24} />
        </div>
        
        <nav className="flex flex-col gap-8 flex-grow">
          <NavItem 
            icon={<LayoutDashboard size={24} />} 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem 
            icon={<CheckSquare size={24} />} 
            active={activeTab === 'tasks'} 
            onClick={() => setActiveTab('tasks')}
          />
          <NavItem 
            icon={<Wallet size={24} />} 
            active={activeTab === 'finance'} 
            onClick={() => setActiveTab('finance')}
          />
          <NavItem 
            icon={<MessageSquare size={24} />} 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
          />
        </nav>

        <button 
          onClick={handleLogout}
          className="p-3 rounded-2xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-full z-10 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/5 bg-transparent">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-headline font-extrabold tracking-tighter text-on-surface">
              Miwebpro <span className="text-primary">Nexus</span>
            </h2>
            <p className="text-[10px] font-label uppercase tracking-[0.3em] text-slate-500">Quantum Dashboard v1.0</p>
          </div>

          <div className="hidden lg:flex flex-grow justify-center px-10">
            <GlobalSearch />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl glass border border-white/10">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User size={16} />
              </div>
              <span className="text-sm font-bold tracking-tight hidden sm:block">{user}</span>
            </div>
            <button 
              className="md:hidden p-2 rounded-full hover:bg-white/5 text-slate-400 transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Bento Grid / Module View */}
        <div className="flex-grow overflow-y-auto scrollbar-hide p-6 md:p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div 
                key="dashboard"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto auto-rows-[minmax(300px,auto)]"
              >
                {/* Row 1 */}
                <BentoItem className="md:col-span-8 lg:col-span-4">
                  <Shortcuts />
                </BentoItem>
                
                <BentoItem className="md:col-span-4 lg:col-span-4">
                  <TodoList />
                </BentoItem>

                <BentoItem className="md:col-span-12 lg:col-span-4">
                  <FinanceDashboard />
                </BentoItem>

                {/* Row 2 */}
                <BentoItem className="md:col-span-12 lg:col-span-8">
                  <div className="glass iridescent-border rounded-3xl p-8 h-full flex flex-col justify-center relative overflow-hidden antigravity-float">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                      <Grid3X3 size={200} className="text-primary" />
                    </div>
                    <div className="relative z-10">
                      <span className="font-label text-xs text-primary tracking-[0.3em] uppercase mb-4 block">Estado del Sistema</span>
                      <h3 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-6 leading-none">
                        Tu entorno está <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Sincronizado</span>
                      </h3>
                      <p className="text-on-surface-variant max-w-md font-light leading-relaxed mb-8">
                        Todos los módulos están operando al 100%. La latencia de datos es de 0.002ms. Tu asistente Mar Ia está lista para procesar nuevas solicitudes.
                      </p>
                      <button 
                        onClick={() => setActiveTab('chat')}
                        className="px-8 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold hover:bg-primary/20 transition-all"
                      >
                        Hablar con Mar Ia
                      </button>
                    </div>
                  </div>
                </BentoItem>

                <BentoItem className="md:col-span-12 lg:col-span-4">
                  <MarIaChat />
                </BentoItem>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl mx-auto h-full"
              >
                <div className="flex items-center gap-4 mb-8">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 transition-all"
                  >
                    <X size={20} />
                  </button>
                  <h3 className="text-3xl font-headline font-extrabold tracking-tighter capitalize">
                    {activeTab === 'tasks' ? 'Gestor de Tareas' : 
                     activeTab === 'finance' ? 'Control Financiero' : 
                     activeTab === 'chat' ? 'Asistente Mar Ia' : activeTab}
                  </h3>
                </div>
                
                <div className="h-[calc(100%-80px)]">
                  {activeTab === 'tasks' && <TodoList />}
                  {activeTab === 'finance' && <FinanceDashboard />}
                  {activeTab === 'chat' && <MarIaChat />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] glass backdrop-blur-3xl flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-headline font-extrabold tracking-tighter">Nexus <span className="text-primary">Menu</span></h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full bg-white/5">
                <X size={32} />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-2xl font-headline font-bold">
              <button 
                onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} 
                className={cn("text-left transition-colors", activeTab === 'dashboard' ? "text-primary" : "text-slate-400")}
              >
                Dashboard
              </button>
              <button 
                onClick={() => { setActiveTab('tasks'); setIsMobileMenuOpen(false); }} 
                className={cn("text-left transition-colors", activeTab === 'tasks' ? "text-primary" : "text-slate-400")}
              >
                Tareas
              </button>
              <button 
                onClick={() => { setActiveTab('finance'); setIsMobileMenuOpen(false); }} 
                className={cn("text-left transition-colors", activeTab === 'finance' ? "text-primary" : "text-slate-400")}
              >
                Finanzas
              </button>
              <button 
                onClick={() => { setActiveTab('chat'); setIsMobileMenuOpen(false); }} 
                className={cn("text-left transition-colors", activeTab === 'chat' ? "text-primary" : "text-slate-400")}
              >
                Asistente
              </button>
              <button onClick={handleLogout} className="text-red-400 text-left mt-10">Cerrar Sesión</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ icon, active = false, onClick }: { icon: React.ReactNode, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-4 rounded-2xl transition-all duration-500 relative group",
        active ? "text-primary bg-primary/10" : "text-slate-500 hover:text-cyan-200 hover:bg-white/5"
      )}
    >
      {icon}
      {active && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full shadow-[0_0_15px_#39f1ea]"
        />
      )}
    </button>
  );
}

function BentoItem({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 }
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}
