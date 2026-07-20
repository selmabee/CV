import { useCV } from '../../context/CVContext';
import { Palette, Type, Check } from 'lucide-react';

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
];

export default function StyleEditor() {
  const { cvStyle, setCVStyle } = useCV();

  const updateColor = (field: keyof typeof cvStyle, value: string) => {
    setCVStyle({ ...cvStyle, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
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
    </div>
  );
}
