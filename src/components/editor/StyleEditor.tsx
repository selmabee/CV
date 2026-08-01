import { useCV } from '../../context/CVContext';
import { Palette, Type, Check, Sparkles, Image as ImageIcon, X, Minus } from 'lucide-react';
import { useRef } from 'react';

const presetColors = [
  { name: 'Bleu', value: '#1e40af' },
  { name: 'Bleu Clair', value: '#0ea5e9' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Émeraude', value: '#059669' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Ambre', value: '#d97706' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Slate', value: '#334155' },
  { name: 'Vert', value: '#16a34a' },
  { name: 'Rouge', value: '#dc2626' },
  { name: 'Turquoise', value: '#0891b2' },
  { name: 'Lavande', value: '#9333ea' },
  { name: 'Gris', value: '#475569' },
  { name: 'Noir', value: '#111827' },
  { name: 'Marron', value: '#78350f' },
  { name: 'Or', value: '#b45309' },
  { name: 'Zinc', value: '#3f3f46' },
  { name: 'Corail', value: '#f43f5e' },
  { name: 'Olive', value: '#4d7c0f' },
  { name: 'Bronze', value: '#a16207' },
  { name: 'Marine', value: '#1e3a8a' },
  { name: 'Saphir', value: '#2563eb' },
  { name: 'Flotsam', value: '#0284c7' },
  { name: 'Nénuphar', value: '#5eead4' },
  { name: 'Menthe', value: '#10b981' },
  { name: 'Citron', value: '#84cc16' },
  { name: 'Tournesol', value: '#facc15' },
];

const themePresets = [
  { name: 'Océan', primary: '#1e40af', accent: '#0ea5e9', bg: '#ffffff', text: '#1e293b' },
  { name: 'Forêt', primary: '#059669', accent: '#84cc16', bg: '#ffffff', text: '#1e293b' },
  { name: 'Coucher de soleil', primary: '#ea580c', accent: '#f43f5e', bg: '#fffef5', text: '#1c1917' },
  { name: 'Monochrome', primary: '#111827', accent: '#475569', bg: '#ffffff', text: '#1e293b' },
  { name: 'Corail', primary: '#e11d48', accent: '#fb7185', bg: '#fff5f6', text: '#1e293b' },
  { name: 'Arctique', primary: '#0d9488', accent: '#5eead4', bg: '#f0fdfa', text: '#134e4a' },
  { name: 'Lavande', primary: '#7c3aed', accent: '#c4b5fd', bg: '#faf8ff', text: '#3b0764' },
  { name: 'Or Antique', primary: '#b45309', accent: '#f59e0b', bg: '#fffef0', text: '#422006' },
  { name: 'Nuit', primary: '#1e1b4b', accent: '#6366f1', bg: '#ffffff', text: '#1e1b4b' },
  { name: 'Rose Poudré', primary: '#be185d', accent: '#f9a8d4', bg: '#fff1f7', text: '#500724' },
  { name: 'Émeraude Pro', primary: '#047857', accent: '#34d399', bg: '#ecfdf5', text: '#064e3b' },
  { name: 'Acier', primary: '#334155', accent: '#94a3b8', bg: '#f8fafc', text: '#0f172a' },
  { name: 'Bordeaux', primary: '#881337', accent: '#f43f5e', bg: '#fff1f2', text: '#4c0519' },
  { name: 'Carbone', primary: '#27272a', accent: '#a1a1aa', bg: '#fafafa', text: '#18181b' },
  { name: 'Soleil', primary: '#ca8a04', accent: '#fde047', bg: '#fffef0', text: '#422006' },
  { name: 'Sarcelle', primary: '#0f766e', accent: '#2dd4bf', bg: '#f0fdfa', text: '#134e4a' },
  { name: 'Mahoni', primary: '#7c2d12', accent: '#fb923c', bg: '#fff7ed', text: '#431407' },
  { name: 'Pétrole', primary: '#134e4a', accent: '#14b8a6', bg: '#f0fdfa', text: '#042f2e' },
  { name: 'Cuivre', primary: '#9a3412', accent: '#fb923c', bg: '#fff7ed', text: '#7c2d12' },
  { name: 'Minimaliste', primary: '#0a0a0a', accent: '#737373', bg: '#ffffff', text: '#0a0a0a' },
];

export default function StyleEditor() {
  const { cvStyle, setCVStyle } = useCV();
  const bgInputRef = useRef<HTMLInputElement>(null);

  const updateColor = (field: keyof typeof cvStyle, value: string) => {
    setCVStyle({ ...cvStyle, [field]: value });
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCVStyle({ ...cvStyle, backgroundImage: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const removeBgImage = () => setCVStyle({ ...cvStyle, backgroundImage: null });

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <label className="text-sm font-medium text-slate-700">Thèmes prédéfinis</label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {themePresets.map((theme) => (
            <button
              key={theme.name}
              onClick={() => {
                updateColor('primaryColor', theme.primary);
                updateColor('accentColor', theme.accent);
                updateColor('backgroundColor', theme.bg);
                updateColor('textColor', theme.text);
              }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all text-left"
            >
              <div className="flex shrink-0">
                <div className="w-5 h-5 rounded-full border border-white" style={{ backgroundColor: theme.primary }} />
                <div className="w-5 h-5 rounded-full border border-white -ml-2" style={{ backgroundColor: theme.accent }} />
              </div>
              <span className="text-xs font-medium text-slate-700 truncate">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-slate-600" />
          <label className="text-sm font-medium text-slate-700">Couleur principale</label>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {presetColors.map((color) => (
            <button
              key={color.value}
              onClick={() => updateColor('primaryColor', color.value)}
              className={`relative w-full aspect-square rounded-lg border-2 transition-all ${
                cvStyle.primaryColor === color.value
                  ? 'border-slate-900 scale-110 shadow-md'
                  : 'border-slate-200 hover:scale-105'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {cvStyle.primaryColor === color.value && (
                <Check className="absolute inset-0 m-auto w-4 h-4 text-white" />
              )}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="color"
            value={cvStyle.primaryColor}
            onChange={(e) => updateColor('primaryColor', e.target.value)}
            className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
          />
          <input
            type="text"
            value={cvStyle.primaryColor}
            onChange={(e) => updateColor('primaryColor', e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono"
            placeholder="#1e40af"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-slate-600" />
          <label className="text-sm font-medium text-slate-700">Couleur d'accent</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={cvStyle.accentColor}
            onChange={(e) => updateColor('accentColor', e.target.value)}
            className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
          />
          <input
            type="text"
            value={cvStyle.accentColor}
            onChange={(e) => updateColor('accentColor', e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-4 h-4 text-slate-600" />
          <label className="text-sm font-medium text-slate-700">Police</label>
        </div>
        <select
          value={cvStyle.fontFamily}
          onChange={(e) => updateColor('fontFamily', e.target.value)}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          style={{ fontFamily: cvStyle.fontFamily }}
        >
          <optgroup label="Sans-serif">
            {['Inter', 'DM Sans', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Outfit', 'Montserrat', 'Nunito', 'Raleway', 'Source Sans 3', 'Work Sans', 'Rubik', 'Manrope', 'Plus Jakarta Sans', 'Karla', 'Josefin Sans'].map(f => (
              <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
            ))}
          </optgroup>
          <optgroup label="Serif">
            {['Georgia', 'Playfair Display', 'Lora', 'Merriweather', 'PT Serif', 'Libre Baskerville', 'Crimson Text', 'EB Garamond', 'Cormorant Garamond', 'Bitter', 'Noto Serif', 'DM Serif Display'].map(f => (
              <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
            ))}
          </optgroup>
          <optgroup label="Display">
            {['Abril Fatface', 'Bebas Neue', 'Oswald'].map(f => (
              <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
            ))}
          </optgroup>
          <optgroup label="Monospace">
            {['Space Mono', 'JetBrains Mono', 'Fira Code', 'IBM Plex Mono'].map(f => (
              <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
            ))}
          </optgroup>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">Couleur de fond</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={cvStyle.backgroundColor}
            onChange={(e) => updateColor('backgroundColor', e.target.value)}
            className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
          />
          <input
            type="text"
            value={cvStyle.backgroundColor}
            onChange={(e) => updateColor('backgroundColor', e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 mb-2 block">Couleur du texte</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={cvStyle.textColor}
            onChange={(e) => updateColor('textColor', e.target.value)}
            className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
          />
          <input
            type="text"
            value={cvStyle.textColor}
            onChange={(e) => updateColor('textColor', e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Minus className="w-4 h-4 text-slate-600" />
          <label className="text-sm font-medium text-slate-700">Section Dividers</label>
        </div>
        <button
          onClick={() => setCVStyle({ ...cvStyle, sectionDividers: !cvStyle.sectionDividers })}
          className={`relative w-12 h-6 rounded-full transition-colors ${cvStyle.sectionDividers ? 'bg-blue-600' : 'bg-slate-300'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${cvStyle.sectionDividers ? 'translate-x-6' : ''}`} />
        </button>
        <p className="text-xs text-slate-500 mt-2">Affiche des lignes de séparation entre les sections du CV.</p>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center gap-2 mb-3">
          <ImageIcon className="w-4 h-4 text-slate-600" />
          <label className="text-sm font-medium text-slate-700">Background Image</label>
        </div>
        {cvStyle.backgroundImage ? (
          <div className="relative">
            <img src={cvStyle.backgroundImage} alt="Background" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
            <button onClick={removeBgImage} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"><X className="w-4 h-4" /></button>
          </div>
        ) : (
          <>
            <input ref={bgInputRef} type="file" accept="image/*" onChange={handleBgUpload} className="hidden" />
            <button onClick={() => bgInputRef.current?.click()} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
              <ImageIcon className="w-4 h-4" /> Upload Background Image
            </button>
          </>
        )}
      </div>
    </div>
  );
}
