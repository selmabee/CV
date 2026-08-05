import { motion } from 'framer-motion';
import { FileText, Palette, Download, Shield, Zap, ScanText, CheckCircle, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: ScanText,
    title: 'Extraction Automatique',
    description: 'Uploadez votre CV existant (PDF, DOCX, TXT ou image). Notre outil extrait et structure automatiquement toutes vos informations.',
    color: 'from-emerald-500 to-teal-400',
    badge: 'PDF, DOCX, Image',
  },
  {
    icon: Palette,
    title: '42 Modeles Personnalisables',
    description: 'Choisissez parmi 42 modeles professionnels. Personnalisez les couleurs, les polices et les arriere-plans en temps reel.',
    color: 'from-amber-500 to-orange-400',
    badge: '30+ couleurs',
  },
  {
    icon: Download,
    title: 'Export Multi-format',
    description: 'Exportez votre CV en PDF, PNG ou DOCX. Des fichiers optimises, compatibles ATS et prets a etre envoyes aux recruteurs.',
    color: 'from-rose-500 to-pink-400',
    badge: 'PDF / PNG / DOCX',
  },
  {
    icon: Shield,
    title: 'Confidentialite Totale',
    description: 'Vos donnees restent dans votre navigateur. Aucune donnee n\'est stockee sans votre consentement. Vous etes en controle.',
    color: 'from-blue-500 to-indigo-400',
    badge: '100% local',
  },
  {
    icon: Zap,
    title: 'Rapide et Instantane',
    description: 'Creez votre CV en quelques minutes. L\'extraction est immediate, l\'apercu en temps reel, l\'export en un clic.',
    color: 'from-sky-500 to-cyan-400',
    badge: 'En 2 minutes',
  },
  {
    icon: FileText,
    title: 'Compatible ATS',
    description: 'Tous nos modeles sont concus pour etre parfaitement lisibles par les systemes de tri de candidatures (ATS).',
    color: 'from-violet-500 to-purple-400',
    badge: 'Optimise recruteurs',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm font-medium text-blue-700 mb-4">
            Fonctionnalites Premium
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Tout ce qu'il faut pour un CV
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">qui se demarque</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Une suite complete d'outils pour creer, optimiser et exporter votre CV professionnel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none`} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {['Aucune carte requise', 'Sans filigrane', 'Qualite d\'impression optimale', 'Mises a jour gratuites'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-slate-700">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium text-sm">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
