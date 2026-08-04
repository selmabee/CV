import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span className="text-sm font-medium text-white">100% Gratuit - Aucune carte requise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Prêt à créer votre CV de rêve ?
          </h2>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            Rejoignez des milliers de candidats qui ont transformé leur CV avec notre outil.
            Sans inscription. Sans limite. Sans engagement.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Créer mon CV maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              Voir les modèles
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
