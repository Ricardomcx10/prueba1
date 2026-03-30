import React, { useState, useEffect } from 'react';
import { Search, X, ExternalLink, CheckSquare, Wallet, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface SearchResult {
  id: string;
  type: 'shortcut' | 'task' | 'finance' | 'chat';
  title: string;
  subtitle?: string;
  data: any;
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const q = query.toLowerCase();

    // Search Shortcuts
    const shortcuts = JSON.parse(localStorage.getItem('miwebpro_shortcuts') || '[]');
    shortcuts.forEach((s: any) => {
      if (s.name.toLowerCase().includes(q) || s.url.toLowerCase().includes(q)) {
        searchResults.push({ id: `s-${s.id}`, type: 'shortcut', title: s.name, subtitle: s.url, data: s });
      }
    });

    // Search Tasks
    const tasks = JSON.parse(localStorage.getItem('miwebpro_tasks') || '[]');
    tasks.forEach((t: any) => {
      if (t.text.toLowerCase().includes(q)) {
        searchResults.push({ id: `t-${t.id}`, type: 'task', title: t.text, subtitle: t.completed ? 'Completada' : 'Pendiente', data: t });
      }
    });

    // Search Finance
    const finance = JSON.parse(localStorage.getItem('miwebpro_finance') || '[]');
    finance.forEach((f: any) => {
      if (f.description.toLowerCase().includes(q)) {
        searchResults.push({ 
          id: `f-${f.id}`, 
          type: 'finance', 
          title: f.description, 
          subtitle: `${f.type === 'income' ? '+' : '-'}$${f.amount.toLocaleString()}`, 
          data: f 
        });
      }
    });

    // Search Chat
    const chat = JSON.parse(localStorage.getItem('miwebpro_chat') || '[]');
    chat.forEach((m: any) => {
      if (m.text.toLowerCase().includes(q)) {
        searchResults.push({ 
          id: `c-${m.id}`, 
          type: 'chat', 
          title: m.text, 
          subtitle: m.sender === 'user' ? 'Tú' : 'Mar Ia', 
          data: m 
        });
      }
    });

    setResults(searchResults);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'shortcut') {
      window.open(result.data.url, '_blank');
    }
    // For other types, we could navigate or highlight, but for now just close
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 transition-all w-full max-w-md group"
      >
        <Search size={18} className="group-hover:text-primary transition-colors" />
        <span className="text-sm font-light flex-grow text-left">Buscar en Nexus...</span>
        <span className="text-[10px] font-label uppercase tracking-widest bg-white/10 px-2 py-1 rounded-lg hidden sm:block">⌘K</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-6 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl glass iridescent-border rounded-[2rem] overflow-hidden shadow-[0_0_100px_-20px_rgba(57,241,234,0.2)]"
            >
              <div className="p-6 border-b border-white/10 flex items-center gap-4">
                <Search size={24} className="text-primary" />
                <input 
                  autoFocus
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-grow bg-transparent border-none outline-none text-xl font-headline font-bold text-on-surface placeholder:text-slate-600"
                  placeholder="¿Qué estás buscando?"
                />
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/5 text-slate-500">
                  <X size={24} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 scrollbar-hide">
                {results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group text-left"
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          result.type === 'shortcut' && "bg-primary/10 text-primary",
                          result.type === 'task' && "bg-secondary/10 text-secondary",
                          result.type === 'finance' && "bg-amber-500/10 text-amber-400",
                          result.type === 'chat' && "bg-indigo-500/10 text-indigo-400"
                        )}>
                          {result.type === 'shortcut' && <ExternalLink size={20} />}
                          {result.type === 'task' && <CheckSquare size={20} />}
                          {result.type === 'finance' && <Wallet size={20} />}
                          {result.type === 'chat' && <MessageSquare size={20} />}
                        </div>
                        <div className="flex-grow">
                          <h5 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{result.title}</h5>
                          <p className="text-[10px] font-label uppercase tracking-widest text-slate-500">{result.subtitle}</p>
                        </div>
                        <ArrowRight size={16} className="text-slate-700 group-hover:text-primary transition-all group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                ) : query ? (
                  <div className="py-20 text-center">
                    <p className="text-slate-500 font-light italic">No se encontraron resultados para "{query}"</p>
                  </div>
                ) : (
                  <div className="py-10 px-6">
                    <h6 className="text-[10px] font-label uppercase tracking-[0.3em] text-slate-500 mb-6">Sugerencias de búsqueda</h6>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <SearchSuggestion icon={<ExternalLink size={14} />} text="Buscar enlaces guardados" />
                      <SearchSuggestion icon={<CheckSquare size={14} />} text="Filtrar tareas pendientes" />
                      <SearchSuggestion icon={<Wallet size={14} />} text="Revisar transacciones" />
                      <SearchSuggestion icon={<MessageSquare size={14} />} text="Historial de chat con Mar Ia" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center text-[10px] font-label uppercase tracking-widest text-slate-500">
                <div className="flex gap-4">
                  <span><kbd className="bg-white/10 px-1 rounded">↑↓</kbd> Navegar</span>
                  <span><kbd className="bg-white/10 px-1 rounded">↵</kbd> Seleccionar</span>
                </div>
                <span>Nexus Search Engine v1.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function SearchSuggestion({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-slate-400 text-xs">
      {icon}
      <span>{text}</span>
    </div>
  );
}
