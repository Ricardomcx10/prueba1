import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('miwebpro_tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('miwebpro_tasks', JSON.stringify(newTasks));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      createdAt: Date.now(),
    };
    
    saveTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    saveTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id: string) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="glass iridescent-border rounded-3xl p-6 h-full flex flex-col antigravity-float">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline font-bold text-xl text-primary tracking-tight">Gestor de Actividades</h3>
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-label uppercase tracking-widest">
          {pendingTasks.length} Pendientes
        </span>
      </div>

      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all text-sm"
          placeholder="Nueva tarea..."
        />
        <button 
          type="submit"
          className="p-3 rounded-xl bg-primary text-surface font-bold hover:shadow-[0_0_20px_rgba(57,241,234,0.4)] transition-all"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="flex-grow overflow-y-auto scrollbar-hide space-y-6">
        {pendingTasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[10px] font-label uppercase tracking-[0.2em] text-slate-400 mb-3">Pendientes</h4>
            <AnimatePresence initial={false}>
              {pendingTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
                >
                  <button onClick={() => toggleTask(task.id)} className="text-slate-500 hover:text-primary transition-colors">
                    <Circle size={20} />
                  </button>
                  <span className="flex-grow text-sm font-light">{task.text}</span>
                  <button 
                    onClick={() => removeTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[10px] font-label uppercase tracking-[0.2em] text-slate-400 mb-3">Completadas</h4>
            <AnimatePresence initial={false}>
              {completedTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 opacity-60"
                >
                  <button onClick={() => toggleTask(task.id)} className="text-primary">
                    <CheckCircle2 size={20} />
                  </button>
                  <span className="flex-grow text-sm font-light line-through text-slate-400">{task.text}</span>
                  <button 
                    onClick={() => removeTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
