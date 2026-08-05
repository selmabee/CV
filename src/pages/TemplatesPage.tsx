import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Palette, Download } from 'lucide-react';
import { templates } from '../data';
import TemplateSelector from '../components/editor/TemplateSelector';

export default function TemplatesPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="relative bg-gradient-to-b from-slate-50 to-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-10 right-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm font-medium text-blue-700 mb-4">
              {templates.length} modeles disponibles
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Choisissez un modele
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              {templates.length} modeles professionnels, personnalisables et compatibles ATS
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-700 text-sm font-medium border border-slate-200 shadow-sm">
                <Palette className="w-4 h-4 text-blue-600" /> Personnalisable
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-700 text-sm font-medium border border-slate-200 shadow-sm">
                <Zap className="w-4 h-4 text-amber-500" /> Apercu temps reel
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-700 text-sm font-medium border border-slate-200 shadow-sm">
                <Download className="w-4 h-4 text-emerald-600" /> Export PDF/PNG/DOCX
              </span>
            </div>
          </motion.div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <TemplateSelector />
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/builder"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Commencer a creer mon CV
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-sm text-slate-500">Aucune inscription requise. 100% gratuit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
