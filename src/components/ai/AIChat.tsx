import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Loader2, Square, RotateCcw, Copy, Trash2, Check, Bot, User } from 'lucide-react';
import { streamText, getChatSuggestions } from '../../services/ai';
import { useCV } from '../../context/CVContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { ChatMessage } from '../../types';
import { generateId } from '../../utils';

export default function AIChat({ onClose }: { onClose: () => void }) {
  const { cvData } = useCV();
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>('cvbuilder_chat', []);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = getChatSuggestions();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formatContext = useCallback(() => {
    if (!cvData.fullName && !cvData.jobTitle && !cvData.summary) return undefined;
    let ctx = '';
    if (cvData.fullName) ctx += `Nom: ${cvData.fullName}\n`;
    if (cvData.jobTitle) ctx += `Poste: ${cvData.jobTitle}\n`;
    if (cvData.summary) ctx += `Résumé: ${cvData.summary}\n`;
    if (cvData.experience.length) {
      ctx += `Expériences:\n`;
      cvData.experience.forEach((e) => {
        ctx += `- ${e.position} chez ${e.company}: ${e.description}\n`;
      });
    }
    if (cvData.skills.length) ctx += `Compétences: ${cvData.skills.join(', ')}\n`;
    return ctx;
  }, [cvData]);

  const handleSend = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || isStreaming) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      createdAt: Date.now(),
    };
    setMessages([...messages, userMsg]);
    setInput('');
    setIsStreaming(true);

    const assistantId = generateId();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, assistantMsg]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      await streamText(
        content,
        formatContext(),
        (chunk) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
          );
        },
        controller.signal
      );
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: 'Désolé, une erreur est survenue. Vérifiez votre connexion et réessayez.' }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
  };

  const handleRegenerate = async () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) return;
    const newMessages = messages.filter((m) => m.id !== messages[messages.length - 1].id);
    setMessages(newMessages);
    setTimeout(() => handleSend(lastUserMsg.content), 100);
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Assistant IA</h3>
            <p className="text-xs text-blue-100">Propulsé par OpenRouter</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Effacer la conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-slate-800">Bonjour ! Je suis votre assistant IA</h4>
            <p className="mt-1 text-sm text-slate-500 max-w-xs">
              Posez-moi une question sur votre CV, ou choisissez une suggestion ci-dessous.
            </p>
            <div className="mt-6 grid gap-2 w-full max-w-xs">
              {suggestions.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-left px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  msg.role === 'user'
                    ? 'bg-slate-200'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-400'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-slate-600" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`group relative max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-md'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-tl-md'
                  }`}
                >
                  {msg.content || (isStreaming ? <TypingIndicator /> : '')}
                </div>
                {msg.role === 'assistant' && msg.content && (
                  <button
                    onClick={() => handleCopy(msg.content, msg.id)}
                    className="absolute -bottom-5 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    {copiedId === msg.id ? (
                      <><Check className="w-3 h-3" /> Copié</>
                    ) : (
                      <><Copy className="w-3 h-3" /> Copier</>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="px-4 py-3 bg-white border-t border-slate-200">
        {isStreaming && (
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleStop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100"
            >
              <Square className="w-3 h-3" /> Arrêter
            </button>
            {!isStreaming && messages.length > 0 && (
              <button
                onClick={handleRegenerate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200"
              >
                <RotateCcw className="w-3 h-3" /> Régénérer
              </button>
            )}
          </div>
        )}
        {!isStreaming && messages.length > 0 && (
          <button
            onClick={handleRegenerate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200"
          >
            <RotateCcw className="w-3 h-3" /> Régénérer
          </button>
        )}
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isStreaming}
            placeholder="Posez votre question..."
            className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={isStreaming || !input.trim()}
            className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isStreaming ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-slate-400 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}
