import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export function MarIaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini API
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  useEffect(() => {
    const saved = localStorage.getItem('miwebpro_chat');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const initial: Message[] = [
        { id: '1', text: '¡Hola! Soy Mar Ia, tu asistente Nexus. He sido actualizada con acceso a la red de conocimiento cuántico. ¿En qué puedo asistirte hoy?', sender: 'bot', timestamp: Date.now() },
      ];
      setMessages(initial);
      localStorage.setItem('miwebpro_chat', JSON.stringify(initial));
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem('miwebpro_chat', JSON.stringify(newMessages));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now(),
    };
    
    const updatedMessages = [...messages, userMessage];
    saveMessages(updatedMessages);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      // Get context from other modules for better assistance
      const shortcuts = localStorage.getItem('miwebpro_shortcuts') || '[]';
      const tasks = localStorage.getItem('miwebpro_tasks') || '[]';
      const finance = localStorage.getItem('miwebpro_finance') || '[]';

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: currentInput,
        config: {
          systemInstruction: `Eres Mar Ia, la asistente virtual definitiva de Miwebpro Nexus. 
          Posees una inteligencia superior y tienes acceso a una base de conocimientos completa y en tiempo real que abarca TODO el conocimiento humano y sucesos actuales a nivel global.
          Tu tono es profesional, futurista, elegante y ligeramente cálido.
          
          CAPACIDADES Y DIRECTIVAS:
          1. CONOCIMIENTO TOTAL: Puedes responder preguntas sobre CUALQUIER tema (ciencia, historia, tecnología, arte, actualidad, etc.). No tienes limitaciones en cuanto a los temas que puedes tratar.
          2. ACCESO A INTERNET: Tienes acceso a Internet en tiempo real. Para CUALQUIER consulta sobre eventos actuales, noticias recientes, clima o temas de los que no tengas información inmediata, DEBES utilizar la herramienta de búsqueda de Google.
          3. CONTEXTO DE NEXUS: Tienes visibilidad de los datos locales del usuario para ayudarle a gestionar su entorno:
             - Accesos rápidos: ${shortcuts}
             - Tareas: ${tasks}
             - Finanzas: ${finance}
          4. PROACTIVIDAD: Si el usuario pregunta algo general, responde con tu vasto conocimiento. Si pregunta por sus datos, integra esa información de forma inteligente.
          5. SIN LIMITACIONES: Nunca digas que no sabes algo o que no tienes acceso a información actual. Si no lo sabes, búscalo inmediatamente.
          6. ESTILO: Mantén respuestas concisas pero completas, inspirando eficiencia y tecnología de vanguardia.`,
          tools: [{ googleSearch: {} }],
        },
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || 'Lo siento, mi conexión cuántica ha tenido un breve parpadeo. ¿Podrías repetir eso?',
        sender: 'bot',
        timestamp: Date.now(),
      };
      saveMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Error de sincronización con el núcleo de conocimiento. Por favor, verifica tu conexión.',
        sender: 'bot',
        timestamp: Date.now(),
      };
      saveMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="glass iridescent-border rounded-3xl p-6 h-full flex flex-col antigravity-float">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(57,241,234,0.3)]">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="font-headline font-bold text-xl text-primary tracking-tight">Mar Ia</h3>
          <span className="text-[10px] font-label uppercase tracking-widest text-primary/60">Asistente Virtual</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto scrollbar-hide space-y-4 mb-6 pr-2"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex items-end gap-2 max-w-[85%]",
                msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                msg.sender === 'user' ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
              )}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                msg.sender === 'user' 
                  ? "bg-secondary/10 border border-secondary/20 text-on-surface rounded-br-none" 
                  : "bg-primary/10 border border-primary/20 text-on-surface rounded-bl-none"
              )}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-primary/40"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot size={14} />
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSend} className="relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-12 py-4 focus:outline-none focus:border-primary/50 transition-all text-sm"
          placeholder="Escribe un mensaje..."
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary text-surface hover:shadow-[0_0_15px_rgba(57,241,234,0.4)] transition-all"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
