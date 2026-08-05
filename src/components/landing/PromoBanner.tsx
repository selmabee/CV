import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromoBanner() {
  return (
    <section className="relative py-6 bg-gradient-to-r from-blue-50 via-cyan-50 to-sky-50 border-y border-blue-100/60 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm sm:text-base">
                {">"} 42 modeles professionnels disponibles gratuitement
              </p>
              <p className="text-xs text-slate-500 hidden sm:block">Personnalisez couleurs, polices et arriere-plans en temps reel</p>
            </div>
          </div>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 rounded-lg font-medium text-sm border border-blue-200 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md whitespace-nowrap"
          >
            Voir les modeles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
