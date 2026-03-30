import React, { useState, useEffect } from 'react';
import { Plus, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Shortcut {
  id: string;
  name: string;
  url: string;
  icon?: string;
}

export function Shortcuts() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('miwebpro_shortcuts');
    if (saved) {
      setShortcuts(JSON.parse(saved));
    } else {
      const initial = [
        { id: '1', name: 'Google', url: 'https://google.com' },
        { id: '2', name: 'YouTube', url: 'https://youtube.com' },
        { id: '3', name: 'GitHub', url: 'https://github.com' },
      ];
      setShortcuts(initial);
      localStorage.setItem('miwebpro_shortcuts', JSON.stringify(initial));
    }
  }, []);

  const saveShortcuts = (newShortcuts: Shortcut[]) => {
    setShortcuts(newShortcuts);
    localStorage.setItem('miwebpro_shortcuts', JSON.stringify(newShortcuts));
  };

  const addShortcut = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newUrl) return;
    
    const formattedUrl = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
    const newShortcut: Shortcut = {
      id: Date.now().toString(),
      name: newName,
      url: formattedUrl,
    };
    
    saveShortcuts([...shortcuts, newShortcut]);
    setNewName('');
    setNewUrl('');
    setIsModalOpen(false);
  };

  const removeShortcut = (id: string) => {
    saveShortcuts(shortcuts.filter(s => s.id !== id));
  };

  return (
    <div className="glass iridescent-border rounded-3xl p-6 h-full flex flex-col antigravity-float">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-headline font-bold text-xl text-primary tracking-tight">Accesos Rápidos</h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto scrollbar-hide flex-grow">
        <AnimatePresence>
          {shortcuts.map((shortcut) => (
            <motion.div
              key={shortcut.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group relative glass rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => window.open(shortcut.url, '_blank')}
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeShortcut(shortcut.id);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all"
              >
                <X size={12} />
              </button>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <ExternalLink size={20} />
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-center truncate w-full">
                {shortcut.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass iridescent-border rounded-3xl p-8 w-full max-w-md"
          >
            <h4 className="text-2xl font-headline font-bold mb-6 text-primary">Añadir Acceso</h4>
            <form onSubmit={addShortcut} className="space-y-4">
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-slate-400 mb-2">Nombre</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all"
                  placeholder="Ej. Google"
                />
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-slate-400 mb-2">URL</label>
                <input 
                  type="text" 
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all"
                  placeholder="Ej. google.com"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-primary text-surface font-bold hover:shadow-[0_0_20px_rgba(57,241,234,0.4)] transition-all"
                >
                  Guardar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
