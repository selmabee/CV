import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Building2, ExternalLink, Globe } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Contactez-Nous</h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
              Nous sommes à votre disposition pour toute demande d'information ou de proposition.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Adresses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Nos Adresses</h2>
            </div>

            <div className="space-y-6">
              <div className="flex gap-3">
                <Building2 className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800">Siège Alger</h3>
                  <p className="mt-1 text-slate-600 leading-relaxed">
                    126 Coopérative ESSALEM 2<br />Birkhadem 16029 - Alger
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex gap-3">
                <Building2 className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800">Siège Oran</h3>
                  <p className="mt-1 text-slate-600 leading-relaxed">
                    06, 07 zone de siéges USTO<br />Oran
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Téléphones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Phone className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Nos Téléphones</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800">Contact Alger</h3>
                <p className="mt-1 text-slate-600 tracking-wide">
                  0770 – 284 - 828<br />0770 – 431 - 516
                </p>
              </div>

              <div className="h-px bg-slate-100" />

              <div>
                <h3 className="font-semibold text-slate-800">Contact Oran</h3>
                <p className="mt-1 text-slate-600 tracking-wide">
                  0770 - 177 - 776<br />046 - 821 - 393
                </p>
              </div>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                <Mail className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Email</h2>
            </div>
            <a
              href="mailto:ae2i.algerie@ae2i-aerh.com"
              className="text-blue-600 hover:text-blue-700 font-medium break-all transition-colors"
            >
              ae2i.algerie@ae2i-aerh.com
            </a>
          </motion.div>

          {/* Horaires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Horaires</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">Dim - Jeu</span><br />
              09h00 - 17h00
            </p>
          </motion.div>
        </div>
      </div>

      {/* Promotional banner */}
      <motion.a
        href="https://www.ae2i-algerie.dz/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="group block relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white"
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, transparent 48%, white 49%, white 51%, transparent 52%)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Globe className="w-8 h-8 shrink-0 animate-pulse" />
          <div className="flex-1">
            <p className="text-lg font-semibold">Découvrez AE2I Algérie</p>
            <p className="text-sm text-blue-100 mt-0.5">Votre partenaire en ingénierie et formation professionnelle</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white/15 backdrop-blur-sm rounded-lg text-sm font-medium group-hover:bg-white/25 transition-colors whitespace-nowrap">
            www.ae2i-algerie.dz <ExternalLink className="w-4 h-4" />
          </span>
        </div>
      </motion.a>
    </div>
  );
}
