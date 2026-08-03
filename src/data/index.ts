import { CVTemplate, CVData } from '../types';

export const templates: CVTemplate[] = [
  // === PASTEL — soft, contemporary (6) ===
  { id: 'pastel-rose', name: 'Circulaire Rose', description: 'two column•pastel', thumbnail: 'pastel-rose', renderKey: 'pastelRose', hasPhoto: false, category: 'pastel', layout: 'two column' },
  { id: 'pastel-lavender', name: 'Élégant Lavande', description: 'banner header•pastel', thumbnail: 'pastel-lavender', renderKey: 'pastelLavender', hasPhoto: false, category: 'pastel', layout: 'banner header' },
  { id: 'pastel-mint', name: 'Vertical Menthe', description: 'two column•pastel', thumbnail: 'pastel-mint', renderKey: 'pastelMint', hasPhoto: false, category: 'pastel', layout: 'two column' },
  { id: 'pastel-peach', name: 'Moderne Pêche', description: 'banner header•pastel', thumbnail: 'pastel-peach', renderKey: 'pastelPeach', hasPhoto: false, category: 'pastel', layout: 'banner header' },
  { id: 'pastel-sky', name: 'Horizontal Ciel', description: 'single column•pastel', thumbnail: 'pastel-sky', renderKey: 'pastelSky', hasPhoto: false, category: 'pastel', layout: 'single column' },
  { id: 'pastel-butter', name: 'Chrono Beurre', description: 'single column•pastel', thumbnail: 'pastel-butter', renderKey: 'pastelButter', hasPhoto: false, category: 'pastel', layout: 'single column' },

  // === SOLID — strong contrast, professional (6) ===
  { id: 'solid-navy', name: 'Professionnel Marine', description: 'two column•solid', thumbnail: 'solid-navy', renderKey: 'solidNavy', hasPhoto: false, category: 'solid', layout: 'two column' },
  { id: 'solid-charcoal', name: 'Élégant Anthracite', description: 'banner header•solid', thumbnail: 'solid-charcoal', renderKey: 'solidCharcoal', hasPhoto: false, category: 'solid', layout: 'banner header' },
  { id: 'solid-forest', name: 'Vertical Forêt', description: 'two column•solid', thumbnail: 'solid-forest', renderKey: 'solidForest', hasPhoto: false, category: 'solid', layout: 'two column' },
  { id: 'solid-burgundy', name: 'Circulaire Bordeaux', description: 'two column•solid', thumbnail: 'solid-burgundy', renderKey: 'solidBurgundy', hasPhoto: false, category: 'solid', layout: 'two column' },
  { id: 'solid-slate', name: 'Moderne Ardoise', description: 'banner header•solid', thumbnail: 'solid-slate', renderKey: 'solidSlate', hasPhoto: false, category: 'solid', layout: 'banner header' },
  { id: 'solid-espresso', name: 'Horizontal Espresso', description: 'single column•solid', thumbnail: 'solid-espresso', renderKey: 'solidEspresso', hasPhoto: false, category: 'solid', layout: 'single column' },

  // === GRADIENT — contemporary, eye-catching (5) ===
  { id: 'grad-sunset', name: 'Moderne Sunset', description: 'two column•gradient', thumbnail: 'grad-sunset', renderKey: 'gradSunset', hasPhoto: false, category: 'gradient', layout: 'two column' },
  { id: 'grad-ocean', name: 'Vertical Ocean', description: 'two column•gradient', thumbnail: 'grad-ocean', renderKey: 'gradOcean', hasPhoto: false, category: 'gradient', layout: 'two column' },
  { id: 'grad-aurora', name: 'Élégant Aurora', description: 'banner header•gradient', thumbnail: 'grad-aurora', renderKey: 'gradAurora', hasPhoto: false, category: 'gradient', layout: 'banner header' },
  { id: 'grad-twilight', name: 'Circulaire Twilight', description: 'two column•gradient', thumbnail: 'grad-twilight', renderKey: 'gradTwilight', hasPhoto: false, category: 'gradient', layout: 'two column' },
  { id: 'grad-ember', name: 'Professionnel Ember', description: 'two column•gradient', thumbnail: 'grad-ember', renderKey: 'gradEmber', hasPhoto: false, category: 'gradient', layout: 'two column' },

  // === PROFESSIONAL — tradition and precision (5) ===
  { id: 'prof-corporate', name: 'Professionnel Corporate', description: 'two column•professional', thumbnail: 'prof-corporate', renderKey: 'profCorporate', hasPhoto: false, category: 'professional', layout: 'two column' },
  { id: 'prof-executive', name: 'Élégant Executive', description: 'two column•professional', thumbnail: 'prof-executive', renderKey: 'profExecutive', hasPhoto: false, category: 'professional', layout: 'two column' },
  { id: 'prof-consultant', name: 'Consultant', description: 'banner header•professional', thumbnail: 'prof-consultant', renderKey: 'profConsultant', hasPhoto: false, category: 'professional', layout: 'banner header' },
  { id: 'prof-attorney', name: 'Horizontal Attorney', description: 'single column•professional', thumbnail: 'prof-attorney', renderKey: 'profAttorney', hasPhoto: false, category: 'professional', layout: 'single column' },
  { id: 'prof-banker', name: 'Vertical Banker', description: 'two column•professional', thumbnail: 'prof-banker', renderKey: 'profBanker', hasPhoto: false, category: 'professional', layout: 'two column' },

  // === CREATIVE — bold, original (4) ===
  { id: 'creat-popart', name: 'Informel Pop', description: 'two column•creative', thumbnail: 'creat-popart', renderKey: 'creatPopArt', hasPhoto: false, category: 'creative', layout: 'two column' },
  { id: 'creat-sage', name: 'Moderne Sage', description: 'banner header•creative', thumbnail: 'creat-sage', renderKey: 'creatSage', hasPhoto: false, category: 'creative', layout: 'banner header' },
  { id: 'creat-cosmic', name: 'Circulaire Cosmic', description: 'two column•creative', thumbnail: 'creat-cosmic', renderKey: 'creatCosmic', hasPhoto: false, category: 'creative', layout: 'two column' },
  { id: 'creat-terracotta', name: 'Élégant Terracotta', description: 'two column•creative', thumbnail: 'creat-terracotta', renderKey: 'creatTerracotta', hasPhoto: false, category: 'creative', layout: 'two column' },

  // === MINIMAL — simplicity and content focus (4) ===
  { id: 'min-mono', name: 'Horizontal Mono', description: 'single column•minimal', thumbnail: 'min-mono', renderKey: 'minMono', hasPhoto: false, category: 'minimal', layout: 'single column' },
  { id: 'min-paper', name: 'Épuré Paper', description: 'single column•minimal', thumbnail: 'min-paper', renderKey: 'minPaper', hasPhoto: false, category: 'minimal', layout: 'single column' },
  { id: 'min-nordic', name: 'Vertical Nordic', description: 'two column•minimal', thumbnail: 'min-nordic', renderKey: 'minNordic', hasPhoto: false, category: 'minimal', layout: 'two column' },
  { id: 'min-zen', name: 'Chrono Zen', description: 'two column•minimal', thumbnail: 'min-zen', renderKey: 'minZen', hasPhoto: false, category: 'minimal', layout: 'two column' },

  // === CLASSIC — timeless, structured (12) ===
  { id: 'cls-exec-black', name: 'Professionnel Black', description: 'two column•classic', thumbnail: 'cls-exec-black', renderKey: 'clsExecBlack', hasPhoto: false, category: 'classic', layout: 'two column' },
  { id: 'cls-slate', name: 'Élégant Slate', description: 'two column•classic', thumbnail: 'cls-slate', renderKey: 'clsSlate', hasPhoto: false, category: 'classic', layout: 'two column' },
  { id: 'cls-navy', name: 'Professionnel Navy', description: 'two column•classic', thumbnail: 'cls-navy', renderKey: 'clsNavy', hasPhoto: false, category: 'classic', layout: 'two column' },
  { id: 'cls-charcoal-steel', name: 'Vertical Steel', description: 'two column•classic', thumbnail: 'cls-charcoal-steel', renderKey: 'clsCharcoalSteel', hasPhoto: false, category: 'classic', layout: 'two column' },
  { id: 'cls-obsidian', name: 'Moderne Obsidian', description: 'banner header•classic', thumbnail: 'cls-obsidian', renderKey: 'clsObsidian', hasPhoto: false, category: 'classic', layout: 'banner header' },
  { id: 'cls-steel-blue', name: 'Élégant Steel Blue', description: 'banner header•classic', thumbnail: 'cls-steel-blue', renderKey: 'clsSteelBlue', hasPhoto: false, category: 'classic', layout: 'banner header' },
  { id: 'cls-graphite', name: 'Professionnel Graphite', description: 'banner header•classic', thumbnail: 'cls-graphite', renderKey: 'clsGraphite', hasPhoto: false, category: 'classic', layout: 'banner header' },
  { id: 'cls-admiral', name: 'Élégant Admiral', description: 'banner header•classic', thumbnail: 'cls-admiral', renderKey: 'clsAdmiral', hasPhoto: false, category: 'classic', layout: 'banner header' },
  { id: 'cls-ivory-black', name: 'Horizontal Ivory', description: 'single column•classic', thumbnail: 'cls-ivory-black', renderKey: 'clsIvoryBlack', hasPhoto: false, category: 'classic', layout: 'single column' },
  { id: 'cls-smoke', name: 'Chrono Smoke', description: 'single column•classic', thumbnail: 'cls-smoke', renderKey: 'clsSmoke', hasPhoto: false, category: 'classic', layout: 'single column' },
  { id: 'cls-midnight', name: 'Professionnel Midnight', description: 'single column•classic', thumbnail: 'cls-midnight', renderKey: 'clsMidnight', hasPhoto: false, category: 'classic', layout: 'single column' },
  { id: 'cls-stone', name: 'Épuré Stone', description: 'single column•classic', thumbnail: 'cls-stone', renderKey: 'clsStone', hasPhoto: false, category: 'classic', layout: 'single column' },
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
