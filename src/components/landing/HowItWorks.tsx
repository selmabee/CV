import { motion } from 'framer-motion';
import { Upload, ScanText, Download, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Uploader votre CV',
    description: 'Glissez-deposez votre CV existant (PDF, DOCX, TXT ou image). Notre outil l\'analyse instantanement.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    number: '02',
    icon: ScanText,
    title: 'Extraction Automatique',
    description: 'Notre outil extrait vos donnees, structure votre CV automatiquement : experiences, formations, competences, langues.',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    number: '03',
    icon: Download,
    title: 'Personnaliser & Exporter',
    description: 'Choisissez un modele, personnalisez couleurs et polices, puis exportez en PDF, PNG ou DOCX professionnel.',
    color: 'from-amber-500 to-orange-400',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm font-medium text-blue-700 mb-4">
            Processus simple
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Comment ca marche
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Trois etapes simples pour un CV professionnel qui se demarque
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-6">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-emerald-200 to-amber-200" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group text-center"
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <step.icon className="w-9 h-9 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shadow-sm">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed max-w-xs mx-auto text-sm">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center mt-4">
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
