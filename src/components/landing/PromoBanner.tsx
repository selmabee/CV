import { motion } from 'framer-motion';
import { Globe, ExternalLink } from 'lucide-react';

export default function PromoBanner() {
  return (
    <motion.a
      href="https://www.ae2i-algerie.dz/"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group block relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(45deg, transparent 48%, white 49%, white 51%, transparent 52%)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <Globe className="w-8 h-8 shrink-0 animate-pulse" />
        <div className="flex-1">
          <p className="text-lg font-semibold">Découvrez AE2I Algérie</p>
          <p className="text-sm text-blue-100 mt-0.5">
            Votre partenaire en ingénierie et formation professionnelle
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white/15 backdrop-blur-sm rounded-lg text-sm font-medium group-hover:bg-white/25 transition-colors whitespace-nowrap">
          www.ae2i-algerie.dz <ExternalLink className="w-4 h-4" />
        </span>
      </div>
    </motion.a>
  );
}
