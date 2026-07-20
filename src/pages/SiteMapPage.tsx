import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FileText, LayoutTemplate, Mail, Map, FileCheck, Shield } from 'lucide-react';

const sections = [
  {
    title: 'Principal',
    links: [
      { to: '/', label: 'Accueil', icon: Home },
      { to: '/builder', label: 'Créer un CV', icon: FileText },
      { to: '/templates', label: 'Modèles', icon: LayoutTemplate },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { to: '/contact', label: 'Contact & Support', icon: Mail },
      { to: '/site-map', label: 'Plan du site', icon: Map },
    ],
  },
  {
    title: 'Légal',
    links: [
      { to: '/terms', label: 'Conditions d\'utilisation', icon: FileCheck },
      { to: '/privacy', label: 'Politique de confidentialité', icon: Shield },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <div className="py-16 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12">Plan du site</h1>

          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
                className="bg-white rounded-xl border border-slate-200 p-6"
              >
                <h2 className="text-lg font-semibold text-slate-900 mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm"
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
