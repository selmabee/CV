import { motion } from 'framer-motion';
import { Upload, Sparkles, Download } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Uploader',
    description: 'Glissez-déposez votre CV existant (PDF, DOCX, TXT ou image). Notre outil l\'analyse instantanément.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Extraction Automatique',
    description: 'Notre outil extrait vos données, structure votre CV automatiquement : expériences, formations, compétences, langues.',
  },
  {
    number: '03',
    icon: Download,
    title: 'Personnaliser & Exporter',
    description: 'Choisissez un modèle, personnalisez couleurs et polices, puis exportez en PDF, PNG ou DOCX professionnel.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Comment ça marche
          </h2>
          <p className="mt-4 text-lg text-slate-600">Trois étapes simples pour un CV professionnel</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center border border-blue-100 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300">
                    <step.icon className="w-7 h-7 text-blue-600" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-bold text-blue-600">{step.number}</span>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-12 h-px bg-gradient-to-r from-slate-200 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
