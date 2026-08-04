import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, Gift, FileText, LayoutTemplate, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-20 lg:py-32">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sky-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Créateur de CV professionnel</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <img src="/assets/logo_ae2i copy.png" alt="AE2I" className="h-16 w-auto object-contain" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent">AE2I CV Builder</span>
            <span className="block mt-2 text-slate-800 text-3xl sm:text-4xl lg:text-5xl">
              Votre CV professionnel en quelques minutes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Uploadez votre CV existant, laissez notre outil l'extraire et le structurer,
            choisissez un modèle et exportez en PDF. Gratuit, sans inscription, confidentiel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-200">
              <Gift className="w-4 h-4" /> 100% Gratuit
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200">
              <Zap className="w-4 h-4" /> Sans inscription
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-sm font-medium border border-slate-200">
              <Shield className="w-4 h-4" /> Confidentialité d'abord
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
            >
              <FileText className="w-5 h-5" />
              Uploader mon CV
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
            >
              <LayoutTemplate className="w-5 h-5" />
              Parcourir les modèles
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
