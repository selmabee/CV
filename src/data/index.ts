import { CVTemplate, CVData } from '../types';

export const templates: CVTemplate[] = [
  // === PASTEL (6) ===
  { id: 'pastel-rose', name: 'Rose Garden', description: 'two column•pastel', thumbnail: 'two-column', hasPhoto: false, category: 'pastel', layout: 'two column' },
  { id: 'pastel-lavender', name: 'Lavender Dreams', description: 'banner header•pastel', thumbnail: 'gradient', hasPhoto: false, category: 'pastel', layout: 'banner header' },
  { id: 'pastel-mint', name: 'Mint Fresh', description: 'two column•pastel', thumbnail: 'modern-sidebar', hasPhoto: false, category: 'pastel', layout: 'two column' },
  { id: 'pastel-peach', name: 'Peach Blossom', description: 'banner header•pastel', thumbnail: 'gradient', hasPhoto: false, category: 'pastel', layout: 'banner header' },
  { id: 'pastel-sky', name: 'Sky Breeze', description: 'single column•pastel', thumbnail: 'minimal', hasPhoto: false, category: 'pastel', layout: 'single column' },
  { id: 'pastel-butter', name: 'Buttercream', description: 'single column•pastel', thumbnail: 'classic', hasPhoto: false, category: 'pastel', layout: 'single column' },

  // === SOLID (6) ===
  { id: 'solid-navy', name: 'Navy Executive', description: 'two column•solid', thumbnail: 'modern', hasPhoto: false, category: 'solid', layout: 'two column' },
  { id: 'solid-charcoal', name: 'Charcoal', description: 'banner header•solid', thumbnail: 'dark', hasPhoto: false, category: 'solid', layout: 'banner header' },
  { id: 'solid-forest', name: 'Forest', description: 'two column•solid', thumbnail: 'split', hasPhoto: false, category: 'solid', layout: 'two column' },
  { id: 'solid-burgundy', name: 'Burgundy', description: 'two column•solid', thumbnail: 'sidebar-2', hasPhoto: false, category: 'solid', layout: 'two column' },
  { id: 'solid-slate', name: 'Slate Blue', description: 'banner header•solid', thumbnail: 'corporate', hasPhoto: false, category: 'solid', layout: 'banner header' },
  { id: 'solid-espresso', name: 'Espresso', description: 'single column•solid', thumbnail: 'bold', hasPhoto: false, category: 'solid', layout: 'single column' },

  // === GRADIENT (5) ===
  { id: 'grad-sunset', name: 'Sunset', description: 'two column•gradient', thumbnail: 'gradient', hasPhoto: false, category: 'gradient', layout: 'two column' },
  { id: 'grad-ocean', name: 'Ocean Depth', description: 'two column•gradient', thumbnail: 'modern-sidebar', hasPhoto: false, category: 'gradient', layout: 'two column' },
  { id: 'grad-aurora', name: 'Aurora', description: 'banner header•gradient', thumbnail: 'gradient', hasPhoto: false, category: 'gradient', layout: 'banner header' },
  { id: 'grad-twilight', name: 'Twilight', description: 'two column•gradient', thumbnail: 'split', hasPhoto: false, category: 'gradient', layout: 'two column' },
  { id: 'grad-ember', name: 'Ember', description: 'two column•gradient', thumbnail: 'modern-7', hasPhoto: false, category: 'gradient', layout: 'two column' },

  // === PROFESSIONAL (5) ===
  { id: 'prof-corporate', name: 'Corporate', description: 'two column•professional', thumbnail: 'corporate', hasPhoto: false, category: 'professional', layout: 'two column' },
  { id: 'prof-executive', name: 'Executive Suite', description: 'two column•professional', thumbnail: 'executive', hasPhoto: false, category: 'professional', layout: 'two column' },
  { id: 'prof-consultant', name: 'Consultant', description: 'banner header•professional', thumbnail: 'corporate', hasPhoto: false, category: 'professional', layout: 'banner header' },
  { id: 'prof-attorney', name: 'Attorney', description: 'single column•professional', thumbnail: 'elegant', hasPhoto: false, category: 'professional', layout: 'single column' },
  { id: 'prof-banker', name: 'Banker', description: 'two column•professional', thumbnail: 'premium', hasPhoto: false, category: 'professional', layout: 'two column' },

  // === CREATIVE (4) ===
  { id: 'creat-popart', name: 'Pop Art', description: 'two column•creative', thumbnail: 'bold', hasPhoto: false, category: 'creative', layout: 'two column' },
  { id: 'creat-sage', name: 'Sage Studio', description: 'banner header•creative', thumbnail: 'geometric', hasPhoto: false, category: 'creative', layout: 'banner header' },
  { id: 'creat-cosmic', name: 'Cosmic', description: 'two column•creative', thumbnail: 'tech', hasPhoto: false, category: 'creative', layout: 'two column' },
  { id: 'creat-terracotta', name: 'Terracotta', description: 'two column•creative', thumbnail: 'creative', hasPhoto: false, category: 'creative', layout: 'two column' },

  // === MINIMAL (4) ===
  { id: 'min-mono', name: 'Mono', description: 'single column•minimal', thumbnail: 'minimal', hasPhoto: false, category: 'minimal', layout: 'single column' },
  { id: 'min-paper', name: 'Paper', description: 'single column•minimal', thumbnail: 'classic', hasPhoto: false, category: 'minimal', layout: 'single column' },
  { id: 'min-nordic', name: 'Nordic', description: 'two column•minimal', thumbnail: 'two-column', hasPhoto: false, category: 'minimal', layout: 'two column' },
  { id: 'min-zen', name: 'Zen', description: 'two column•minimal', thumbnail: 'minimal-2', hasPhoto: false, category: 'minimal', layout: 'two column' },

  // === CLASSIC (12) ===
  { id: 'cls-exec-black', name: 'Executive Black', description: 'two column•classic', thumbnail: 'dark', hasPhoto: false, category: 'classic', layout: 'two column' },
  { id: 'cls-slate', name: 'Slate', description: 'two column•classic', thumbnail: 'sidebar-2', hasPhoto: false, category: 'classic', layout: 'two column' },
  { id: 'cls-navy', name: 'Navy Classic', description: 'two column•classic', thumbnail: 'modern', hasPhoto: false, category: 'classic', layout: 'two column' },
  { id: 'cls-charcoal-steel', name: 'Charcoal Steel', description: 'two column•classic', thumbnail: 'modern-sidebar', hasPhoto: false, category: 'classic', layout: 'two column' },
  { id: 'cls-obsidian', name: 'Obsidian', description: 'banner header•classic', thumbnail: 'dark', hasPhoto: false, category: 'classic', layout: 'banner header' },
  { id: 'cls-steel-blue', name: 'Steel Blue', description: 'banner header•classic', thumbnail: 'corporate', hasPhoto: false, category: 'classic', layout: 'banner header' },
  { id: 'cls-graphite', name: 'Graphite', description: 'banner header•classic', thumbnail: 'corporate', hasPhoto: false, category: 'classic', layout: 'banner header' },
  { id: 'cls-admiral', name: 'Admiral', description: 'banner header•classic', thumbnail: 'gradient', hasPhoto: false, category: 'classic', layout: 'banner header' },
  { id: 'cls-ivory-black', name: 'Ivory Black', description: 'single column•classic', thumbnail: 'classic', hasPhoto: false, category: 'classic', layout: 'single column' },
  { id: 'cls-smoke', name: 'Smoke', description: 'single column•classic', thumbnail: 'minimal', hasPhoto: false, category: 'classic', layout: 'single column' },
  { id: 'cls-midnight', name: 'Midnight Blue', description: 'single column•classic', thumbnail: 'elegant', hasPhoto: false, category: 'classic', layout: 'single column' },
  { id: 'cls-stone', name: 'Stone', description: 'single column•classic', thumbnail: 'compact', hasPhoto: false, category: 'classic', layout: 'single column' },
];

export const defaultCVData: CVData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  photo: null,
  experience: [],
  education: [],
  skills: [],
  languages: [],
};

export const faqData = [
  { question: 'Est-ce que AE2I CV Builder est vraiment gratuit ?', answer: 'Oui, AE2I CV Builder est 100% gratuit. Toutes les fonctionnalités sont accessibles sans aucun paiement, sans abonnement et sans carte de crédit.' },
  { question: 'Mes données sont-elles stockées sur vos serveurs ?', answer: 'Non, absolument pas. Tout le traitement se fait localement dans votre navigateur. Vos données ne quittent jamais votre appareil.' },
  { question: 'Quels formats de fichier sont acceptés pour l\'upload ?', answer: 'Nous acceptons les fichiers PDF, DOCX, TXT et les images (JPG, PNG). Notre outil analysera le contenu de votre document pour extraire automatiquement vos informations.' },
  { question: 'Comment fonctionne l\'extraction automatique ?', answer: 'Notre système d\'extraction utilise des algorithmes avancés pour identifier et parser les informations structurées de votre CV. Le traitement est instantané et entièrement local.' },
  { question: 'Quels formats d\'export sont disponibles ?', answer: 'Vous pouvez exporter votre CV en PDF (recommandé), PNG ou DOCX. Le format PDF est optimisé pour une mise en page professionnelle.' },
  { question: 'Mon CV est-il compatible avec les ATS ?', answer: 'Oui, tous nos modèles sont conçus pour être parfaitement lisibles par les ATS. Les recruteurs pourront analyser votre CV sans problème.' },
];

export const companyLogos = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Airbnb', 'Spotify',
  'Uber', 'LinkedIn', 'Salesforce', 'Adobe', 'IBM', 'Oracle', 'SAP', 'Tesla',
];

export const fontOptions = [
  { value: 'Inter', label: 'Inter', category: 'Sans-serif' },
  { value: 'DM Sans', label: 'DM Sans', category: 'Sans-serif' },
  { value: 'Roboto', label: 'Roboto', category: 'Sans-serif' },
  { value: 'Open Sans', label: 'Open Sans', category: 'Sans-serif' },
  { value: 'Lato', label: 'Lato', category: 'Sans-serif' },
  { value: 'Poppins', label: 'Poppins', category: 'Sans-serif' },
  { value: 'Outfit', label: 'Outfit', category: 'Sans-serif' },
  { value: 'Montserrat', label: 'Montserrat', category: 'Sans-serif' },
  { value: 'Nunito', label: 'Nunito', category: 'Sans-serif' },
  { value: 'Raleway', label: 'Raleway', category: 'Sans-serif' },
  { value: 'Source Sans 3', label: 'Source Sans 3', category: 'Sans-serif' },
  { value: 'Work Sans', label: 'Work Sans', category: 'Sans-serif' },
  { value: 'Rubik', label: 'Rubik', category: 'Sans-serif' },
  { value: 'Manrope', label: 'Manrope', category: 'Sans-serif' },
  { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', category: 'Sans-serif' },
  { value: 'Karla', label: 'Karla', category: 'Sans-serif' },
  { value: 'Josefin Sans', label: 'Josefin Sans', category: 'Sans-serif' },
  { value: 'Georgia', label: 'Georgia', category: 'Serif' },
  { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
  { value: 'Lora', label: 'Lora', category: 'Serif' },
  { value: 'Merriweather', label: 'Merriweather', category: 'Serif' },
  { value: 'PT Serif', label: 'PT Serif', category: 'Serif' },
  { value: 'Libre Baskerville', label: 'Libre Baskerville', category: 'Serif' },
  { value: 'Crimson Text', label: 'Crimson Text', category: 'Serif' },
  { value: 'EB Garamond', label: 'EB Garamond', category: 'Serif' },
  { value: 'Cormorant Garamond', label: 'Cormorant Garamond', category: 'Serif' },
  { value: 'Bitter', label: 'Bitter', category: 'Serif' },
  { value: 'Noto Serif', label: 'Noto Serif', category: 'Serif' },
  { value: 'DM Serif Display', label: 'DM Serif Display', category: 'Serif' },
  { value: 'Abril Fatface', label: 'Abril Fatface', category: 'Display' },
  { value: 'Bebas Neue', label: 'Bebas Neue', category: 'Display' },
  { value: 'Oswald', label: 'Oswald', category: 'Display' },
  { value: 'Space Mono', label: 'Space Mono', category: 'Monospace' },
  { value: 'JetBrains Mono', label: 'JetBrains Mono', category: 'Monospace' },
  { value: 'Fira Code', label: 'Fira Code', category: 'Monospace' },
  { value: 'IBM Plex Mono', label: 'IBM Plex Mono', category: 'Monospace' },
];

export const defaultCVStyle = {
  primaryColor: '#1e40af',
  secondaryColor: '#1e293b',
  accentColor: '#3b82f6',
  textColor: '#1e293b',
  backgroundColor: '#ffffff',
  dividerColor: '#cbd5e1',
  fontFamily: 'Inter',
  backgroundImage: null,
  sectionDividers: true,
};
