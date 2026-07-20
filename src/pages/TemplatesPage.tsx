import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { templates } from '../data';
import TemplateSelector from '../components/editor/TemplateSelector';

export default function TemplatesPage() {
  return (
    <div className="py-16 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Choisissez un modèle
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {templates.length} modèles professionnels, personnalisables et compatibles ATS
          </p>
        </motion.div>

        <TemplateSelector />

        <div className="mt-12 text-center">
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
          >
            Commencer à créer mon CV
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
