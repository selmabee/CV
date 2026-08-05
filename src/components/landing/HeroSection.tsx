import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, Gift, FileText, LayoutTemplate, ArrowRight, CheckCircle, Star, Download, Palette } from 'lucide-react';

function StatsBar() {
  const stats = [
    { value: '42', label: 'Modèles pro' },
    { value: '100%', label: 'Gratuit' },
    { value: '3', label: 'Formats export' },
    { value: '0', label: 'Inscription' },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
          className="text-center"
        >
          <div className="text-2xl font-bold text-slate-900">{s.value}</div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function CVMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-20 bg-white rounded-xl shadow-2xl shadow-slate-900/20 overflow-hidden border border-slate-200"
      >
        <div className="bg-slate-900 px-5 py-4 flex items-center justify-between">
          <div>
            <div className="w-24 h-2 bg-white/90 rounded-full mb-1.5" />
            <div className="w-16 h-1.5 bg-blue-400 rounded-full" />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20" />
        </div>
        <div className="flex">
          <div className="w-1/3 bg-slate-50 p-3 space-y-2">
            <div className="w-full h-1.5 bg-slate-300 rounded" />
            <div className="w-2/3 h-1 bg-slate-200 rounded" />
            <div className="space-y-1.5 pt-2">
              <div className="w-full h-1 bg-blue-200 rounded" />
              <div className="w-5/6 h-1 bg-blue-100 rounded" />
              <div className="w-3/4 h-1 bg-blue-100 rounded" />
            </div>
            <div className="pt-2 space-y-1.5">
              <div className="w-full h-1 bg-slate-200 rounded" />
              <div className="w-2/3 h-1 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="flex-1 p-3 space-y-2">
            <div className="w-full h-1.5 bg-slate-800 rounded" />
            <div className="w-2/3 h-1 bg-slate-300 rounded" />
            <div className="space-y-1 pt-1">
              <div className="w-full h-1 bg-slate-200 rounded" />
              <div className="w-5/6 h-1 bg-slate-200 rounded" />
              <div className="w-3/4 h-1 bg-slate-200 rounded" />
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded mt-2" />
            <div className="w-2/3 h-1 bg-slate-300 rounded" />
            <div className="space-y-1 pt-1">
              <div className="w-full h-1 bg-slate-200 rounded" />
              <div className="w-5/6 h-1 bg-slate-200 rounded" />
            </div>
            <div className="flex gap-1.5 pt-2">
              <div className="px-2 py-0.5 bg-blue-100 rounded text-[8px] text-blue-700 font-medium">React</div>
              <div className="px-2 py-0.5 bg-blue-100 rounded text-[8px] text-blue-700 font-medium">Node</div>
              <div className="px-2 py-0.5 bg-blue-100 rounded text-[8px] text-blue-700 font-medium">Python</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -right-6 top-16 z-30 bg-white rounded-xl shadow-xl border border-slate-200 px-4 py-3 animate-float"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-900">CV exporte</div>
            <div className="text-[10px] text-slate-500">PDF pret</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute -left-4 bottom-12 z-30 bg-white rounded-xl shadow-xl border border-slate-200 px-4 py-3 animate-float-delayed"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <Palette className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-900">42 modeles</div>
            <div className="text-[10px] text-slate-500">Personnalisables</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
            >
              <div className="flex -space-x-1">
                {[0,1,2,3,4].map(i => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" style={{ zIndex: 5 - i }} />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">Createur de CV professionnel</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-4"
            >
              <img src="/assets/logo_ae2i copy.png" alt="AE2I" className="h-16 w-auto object-contain" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]"
            >
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent animated-gradient-text">AE2I CV Builder</span>
              <span className="block mt-3 text-slate-800 text-3xl sm:text-4xl lg:text-5xl">
                Votre CV professionnel<br />en quelques minutes
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Uploadez votre CV existant, laissez notre outil l'extraire et le structurer,
              choisissez un modele et exportez en PDF. Gratuit, sans inscription, confidentiel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-200">
                <Gift className="w-4 h-4" /> 100% Gratuit
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-200">
                <Zap className="w-4 h-4" /> Sans inscription
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200">
                <Shield className="w-4 h-4" /> Confidentiel
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                to="/builder"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
              >
                <FileText className="w-5 h-5" />
                Uploader mon CV
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
              >
                <LayoutTemplate className="w-5 h-5" />
                Parcourir les modeles
              </Link>
            </motion.div>

            <StatsBar />
          </div>

          <div className="hidden lg:block">
            <CVMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
