import { motion } from 'framer-motion';
import { FileText, Palette, Download, Shield, Zap, Sparkles, ScanText } from 'lucide-react';

const features = [
  {
    icon: ScanText,
    title: 'Extraction Automatique',
    description: 'Uploadez votre CV existant (PDF, DOCX, TXT ou image). Notre outil extrait et structure automatiquement toutes vos informations.',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Palette,
    title: '42 Modèles Personnalisables',
    description: 'Choisissez parmi 42 modèles professionnels. Personnalisez les couleurs, les polices et les arrière-plans en temps réel.',
    color: 'from-amber-500 to-orange-400',
  },
  {
    icon: Download,
    title: 'Export Multi-format',
    description: 'Exportez votre CV en PDF, PNG ou DOCX. Des fichiers optimisés, compatibles ATS et prêts à être envoyés aux recruteurs.',
    color: 'from-rose-500 to-pink-400',
  },
  {
    icon: Shield,
    title: 'Confidentialité Totale',
    description: 'Vos données restent dans votre navigateur. Aucune donnée n\'est stockée sans votre consentement. Vous êtes en contrôle.',
    color: 'from-violet-500 to-purple-400',
  },
  {
    icon: Zap,
    title: 'Rapide et Instantané',
    description: 'Créez votre CV en quelques minutes. L\'extraction est immédiate, l\'aperçu en temps réel, l\'export en un clic.',
    color: 'from-sky-500 to-blue-400',
  },
  {
    icon: FileText,
    title: 'Compatible ATS',
    description: 'Tous nos modèles sont conçus pour être parfaitement lisibles par les systèmes de tri de candidatures (ATS).',
    color: 'from-blue-500 to-cyan-400',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Fonctionnalités Premium</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Tout ce qu'il faut pour un CV
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">qui se démarque</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Une suite complète d'outils pour créer, optimiser et exporter votre CV professionnel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
