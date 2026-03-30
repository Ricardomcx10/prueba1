import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '../lib/utils';

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: number;
}

export function FinanceDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  useEffect(() => {
    const saved = localStorage.getItem('miwebpro_finance');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  const saveTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    localStorage.setItem('miwebpro_finance', JSON.stringify(newTransactions));
  };

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      type,
      description,
      date: Date.now(),
    };
    
    saveTransactions([transaction, ...transactions]);
    setAmount('');
    setDescription('');
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const chartData = [
    { name: 'Ingresos', value: totalIncome, color: '#39f1ea' },
    { name: 'Egresos', value: totalExpense, color: '#ff6a9c' },
  ];

  return (
    <div className="glass iridescent-border rounded-3xl p-6 h-full flex flex-col antigravity-float">
      <h3 className="font-headline font-bold text-xl text-primary tracking-tight mb-6">Dashboard Financiero</h3>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass rounded-2xl p-4 border border-primary/20">
          <div className="flex items-center gap-2 text-primary mb-1">
            <TrendingUp size={16} />
            <span className="text-[10px] font-label uppercase tracking-widest">Ingresos</span>
          </div>
          <p className="text-xl font-headline font-bold">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="glass rounded-2xl p-4 border border-secondary/20">
          <div className="flex items-center gap-2 text-secondary mb-1">
            <TrendingDown size={16} />
            <span className="text-[10px] font-label uppercase tracking-widest">Egresos</span>
          </div>
          <p className="text-xl font-headline font-bold">${totalExpense.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex-grow flex flex-col min-h-[200px]">
        <div className="h-40 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#181826', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#e7e3f4' }}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <form onSubmit={addTransaction} className="space-y-3">
          <div className="flex gap-2">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-1/3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary/50 transition-all text-sm"
              placeholder="$"
            />
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary/50 transition-all text-sm"
              placeholder="Descripción..."
            />
          </div>
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={() => setType('income')}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-label uppercase tracking-widest transition-all",
                type === 'income' ? "bg-primary text-surface font-bold" : "bg-white/5 text-slate-400 hover:bg-white/10"
              )}
            >
              Ingreso
            </button>
            <button 
              type="button"
              onClick={() => setType('expense')}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-label uppercase tracking-widest transition-all",
                type === 'expense' ? "bg-secondary text-surface font-bold" : "bg-white/5 text-slate-400 hover:bg-white/10"
              )}
            >
              Egreso
            </button>
            <button 
              type="submit"
              className="p-2 rounded-xl bg-white/10 text-primary hover:bg-white/20 transition-all"
            >
              <Plus size={20} />
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
        <span className="text-xs font-label uppercase tracking-widest text-slate-400">Balance Total</span>
        <span className={cn(
          "text-2xl font-headline font-bold tracking-tighter",
          balance >= 0 ? "text-primary" : "text-secondary"
        )}>
          ${balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
