import UploadZone from '../components/editor/UploadZone';
import CVEditor from '../components/editor/CVEditor';
import AIChat from '../components/ai/AIChat';
import { useCV } from '../context/CVContext';
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BuilderPage() {
  const { step } = useCV();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div>
      {step === 'landing' && <UploadZone />}
      {step === 'upload' && <UploadZone />}
      {step === 'editor' && <CVEditor />}

      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-600/30 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Ouvrir le chat IA"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-900">
          IA
        </span>
      </button>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)]"
          >
            <AIChat onClose={() => setChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
