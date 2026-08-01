import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { templates } from '../../data';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { CVTemplate, TemplateCategory } from '../../types';

const categoryLabels: { id: TemplateCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Templates' },
  { id: 'pastel', label: 'Pastel' },
  { id: 'solid', label: 'Solid' },
  { id: 'gradient', label: 'Gradient' },
  { id: 'professional', label: 'Professional' },
  { id: 'creative', label: 'Creative' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'classic', label: 'Classic' },
];

const templateThumbnails: Record<string, React.ReactNode> = {
  'two-column': (
    <div className="w-full h-full flex">
      <div className="w-[60%] h-full p-2 space-y-1.5">
        <div className="w-3/4 h-2 bg-slate-800 rounded" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded" />
        <div className="w-full h-px bg-slate-200 my-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
      </div>
      <div className="w-[40%] h-full bg-slate-100 p-2 space-y-1.5">
        <div className="w-5 h-5 bg-slate-300 rounded-full mb-1" />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-3/4 h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'gradient': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[45%] bg-blue-500 p-2 flex flex-col justify-center">
        <div className="w-3/4 h-2 bg-white/80 rounded" />
        <div className="w-1/2 h-1.5 bg-white/60 rounded mt-1" />
      </div>
      <div className="w-full h-[55%] bg-white p-2 space-y-1.5">
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'modern-sidebar': (
    <div className="w-full h-full flex">
      <div className="w-[40%] h-full bg-blue-600 p-2 space-y-1.5">
        <div className="w-5 h-5 bg-white/20 rounded-full mx-auto mb-1" />
        <div className="w-3/4 h-2 bg-white/80 rounded mx-auto" />
        <div className="w-1/2 h-1.5 bg-white/60 rounded mx-auto" />
        <div className="w-full h-px bg-white/30 my-1" />
        <div className="w-full h-1 bg-white/40 rounded" />
      </div>
      <div className="w-[60%] h-full bg-white p-2 space-y-1.5">
        <div className="w-full h-2 bg-slate-200 rounded" />
        <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'minimal': (
    <div className="w-full h-full bg-white flex flex-col p-4 space-y-2">
      <div className="w-1/2 h-2 bg-slate-800 rounded" />
      <div className="w-full h-px bg-slate-200" />
      <div className="w-full h-2 bg-slate-200 rounded" />
      <div className="w-3/4 h-2 bg-slate-200 rounded" />
      <div className="w-full h-2 bg-slate-200 rounded" />
    </div>
  ),
  'classic': (
    <div className="w-full h-full bg-white flex flex-col items-center p-4">
      <div className="w-3/4 h-3 bg-slate-800 rounded" />
      <div className="w-1/2 h-2 bg-slate-300 rounded mt-1" />
      <div className="w-full h-px bg-slate-200 my-3" />
      <div className="w-full h-2 bg-slate-200 rounded" />
      <div className="w-full h-2 bg-slate-200 rounded mt-1" />
      <div className="w-3/4 h-2 bg-slate-200 rounded mt-1" />
    </div>
  ),
  'modern': (
    <div className="w-full h-full bg-white flex">
      <div className="w-1/3 h-full bg-blue-600" />
      <div className="w-2/3 h-full p-3 space-y-2">
        <div className="w-3/4 h-3 bg-slate-800 rounded" />
        <div className="w-1/2 h-2 bg-slate-300 rounded" />
        <div className="w-full h-2 bg-slate-200 rounded" />
        <div className="w-full h-2 bg-slate-200 rounded" />
        <div className="w-2/3 h-2 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'dark': (
    <div className="w-full h-full bg-slate-900 flex flex-col p-3">
      <div className="w-3/4 h-2 bg-white rounded mb-1" />
      <div className="w-1/2 h-1 bg-slate-400 rounded mb-2" />
      <div className="w-full h-px bg-slate-700 mb-2" />
      <div className="w-full h-1.5 bg-slate-700 rounded mb-1" />
      <div className="w-full h-3 bg-slate-800 rounded mb-1" />
      <div className="w-full h-3 bg-slate-800 rounded mb-1" />
      <div className="w-full h-1.5 bg-blue-500 rounded mb-0.5" />
      <div className="w-full h-1.5 bg-blue-400 rounded" />
    </div>
  ),
  'split': (
    <div className="w-full h-full flex">
      <div className="w-[40%] h-full bg-blue-600 p-2 space-y-1.5">
        <div className="w-6 h-6 bg-white/20 rounded-full" />
        <div className="w-3/4 h-2 bg-white/80 rounded" />
        <div className="w-1/2 h-1.5 bg-white/60 rounded" />
        <div className="w-full h-1 bg-white/40 rounded mt-2" />
      </div>
      <div className="w-[60%] h-full bg-white p-2 space-y-1.5">
        <div className="w-full h-2 bg-slate-200 rounded" />
        <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'sidebar-2': (
    <div className="w-full h-full flex">
      <div className="w-[35%] h-full bg-slate-800 p-2 space-y-1.5">
        <div className="w-4 h-4 bg-white/20 rounded-full mb-1" />
        <div className="w-3/4 h-1.5 bg-white/60 rounded" />
        <div className="w-1/2 h-1 bg-white/40 rounded" />
        <div className="w-full h-1 bg-white/20 rounded" />
      </div>
      <div className="w-[65%] h-full bg-white p-2 space-y-1.5">
        <div className="w-full h-2 bg-slate-200 rounded" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'corporate': (
    <div className="w-full h-full bg-white flex flex-col p-3">
      <div className="w-full h-2 bg-slate-900 rounded mb-1" />
      <div className="w-3/4 h-1.5 bg-slate-300 rounded mb-2" />
      <div className="w-full h-px bg-slate-200 mb-2" />
      <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
      <div className="w-2/3 h-1.5 bg-slate-200 rounded mb-1" />
      <div className="w-full h-px bg-slate-200 mb-2" />
      <div className="w-full h-1 bg-slate-200 rounded mb-0.5" />
      <div className="w-3/4 h-1 bg-slate-200 rounded" />
    </div>
  ),
  'bold': (
    <div className="w-full h-full bg-white flex flex-col p-3">
      <div className="w-full h-3 bg-slate-900 rounded mb-1" />
      <div className="w-full h-1 mb-2 bg-blue-600" />
      <div className="w-full h-2 bg-slate-200 rounded mb-1" />
      <div className="w-full h-1.5 bg-blue-500 rounded mb-1" />
      <div className="w-full h-1.5 bg-blue-400 rounded mb-1" />
      <div className="w-full h-2 bg-slate-200 rounded mb-1" />
      <div className="w-full h-1.5 bg-blue-300 rounded mb-0.5" />
      <div className="w-full h-1.5 bg-blue-200 rounded" />
    </div>
  ),
  'elegant': (
    <div className="w-full h-full bg-white flex flex-col p-3 items-center">
      <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
      <div className="w-12 h-px bg-slate-300 my-1" />
      <div className="w-1/2 h-1 bg-slate-300 rounded mb-2" />
      <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
      <div className="w-3/4 h-1 bg-slate-200 rounded mb-1" />
      <div className="w-full h-px bg-slate-200 my-1" />
      <div className="w-3/4 h-1 bg-slate-200 rounded mb-1" />
      <div className="w-full h-px bg-slate-200 my-1" />
      <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
    </div>
  ),
  'compact': (
    <div className="w-full h-full bg-white p-2 space-y-1.5 text-xs">
      <div className="flex gap-2">
        <div className="w-4 h-4 bg-slate-300 rounded" />
        <div className="w-3/4 h-2 bg-slate-800 rounded" />
      </div>
      <div className="w-full h-px bg-slate-200" />
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-slate-200 rounded" />
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
        </div>
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-slate-200 rounded" />
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  ),
  'creative': (
    <div className="w-full h-full bg-white flex flex-col p-3">
      <div className="w-12 h-12 bg-blue-600 rounded-full mb-2" />
      <div className="w-3/4 h-3 bg-slate-800 rounded" />
      <div className="w-1/2 h-2 bg-slate-300 rounded mt-1" />
      <div className="mt-2 flex gap-1">
        <div className="w-8 h-2 bg-blue-400 rounded" />
        <div className="w-8 h-2 bg-blue-300 rounded" />
        <div className="w-8 h-2 bg-blue-200 rounded" />
      </div>
    </div>
  ),
  'minimal-2': (
    <div className="w-full h-full bg-white flex flex-col items-center p-3">
      <div className="w-6 h-6 bg-slate-300 rounded-full mb-2" />
      <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
      <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
      <div className="w-full h-1.5 bg-slate-200 rounded" />
      <div className="w-3/4 h-1.5 bg-slate-200 rounded mt-1" />
      <div className="w-full h-1.5 bg-slate-200 rounded mt-1" />
    </div>
  ),
  'executive': (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="w-full h-[35%] bg-blue-700 p-2 flex flex-col justify-center">
        <div className="w-3/4 h-2 bg-white/80 rounded" />
        <div className="w-1/2 h-1.5 bg-white/60 rounded mt-1" />
      </div>
      <div className="flex-1 p-2">
        <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
        <div className="flex gap-2 mt-1">
          <div className="w-[60%] space-y-1">
            <div className="w-full h-1 bg-slate-200 rounded" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
          <div className="w-[40%] space-y-1">
            <div className="w-full h-1 bg-slate-200 rounded" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  ),
  'tech': (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex items-center gap-2 p-2 border-l-4 border-blue-600">
        <div className="w-5 h-5 bg-blue-600 rounded" />
        <div className="flex-1">
          <div className="w-3/4 h-1.5 bg-slate-800 rounded" />
          <div className="w-1/2 h-1 bg-slate-300 rounded mt-0.5" />
        </div>
      </div>
      <div className="flex gap-2 p-2">
        <div className="w-[60%] space-y-1">
          <div className="w-full h-1 bg-slate-200 rounded" />
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
          <div className="w-full h-1 bg-slate-200 rounded" />
        </div>
        <div className="w-[40%] bg-blue-50 rounded p-1 space-y-1">
          <div className="w-full h-1 bg-blue-200 rounded" />
          <div className="w-3/4 h-1 bg-blue-200 rounded" />
        </div>
      </div>
    </div>
  ),
  'geometric': (
    <div className="w-full h-full bg-white flex flex-col p-2 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 opacity-20" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
      <div className="w-3/4 h-2 bg-slate-800 rounded" />
      <div className="flex items-center gap-1 mt-1">
        <div className="w-4 h-0.5 bg-blue-600" />
        <div className="w-1/2 h-1 bg-slate-300 rounded" />
      </div>
      <div className="border-t-2 border-blue-600 mt-2 pt-2 flex gap-2">
        <div className="w-1/2 space-y-1">
          <div className="w-full h-1 bg-slate-200 rounded" />
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
        </div>
        <div className="w-1/2 space-y-1">
          <div className="w-full h-1 bg-slate-200 rounded" />
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  ),
  'premium': (
    <div className="w-full h-full flex">
      <div className="w-[35%] h-full bg-slate-900 p-2 space-y-1.5">
        <div className="w-3/4 h-1.5 bg-white/70 rounded" />
        <div className="w-1/2 h-1 bg-white/40 rounded" />
        <div className="w-full h-px bg-white/20 my-1" />
        <div className="w-full h-1 bg-white/20 rounded" />
        <div className="w-3/4 h-1 bg-white/20 rounded" />
      </div>
      <div className="w-[65%] h-full bg-white p-2 space-y-1.5">
        <div className="w-full h-3 bg-blue-50 rounded p-1">
          <div className="w-full h-1 bg-slate-200 rounded" />
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'modern-7': (
    <div className="w-full h-full flex">
      <div className="w-[65%] h-full p-2 space-y-1.5">
        <div className="w-3/4 h-2 bg-slate-800 rounded" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded" />
        <div className="w-full h-px bg-slate-200 my-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
      </div>
      <div className="w-[35%] h-full bg-blue-600 p-2 space-y-1.5">
        <div className="w-5 h-5 bg-white/20 rounded-full mb-1" />
        <div className="w-3/4 h-1 bg-white/40 rounded" />
        <div className="w-1/2 h-1 bg-white/40 rounded" />
        <div className="w-full h-1 bg-white/20 rounded" />
      </div>
    </div>
  ),
};

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useCV();
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');

  const filtered = activeCategory === 'all' ? templates : templates.filter(t => t.category === activeCategory);

  const getCategoryCount = (cat: TemplateCategory | 'all') =>
    cat === 'all' ? templates.length : templates.filter(t => t.category === cat).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Choose a Template</h3>
        <span className="text-sm text-slate-500">{templates.length} templates</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {categoryLabels.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.label}<span className="ml-1 opacity-60">{getCategoryCount(cat.id)}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
        {filtered.map((template) => (
          <motion.button
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTemplate(template)}
            className={`relative border-2 rounded-xl overflow-hidden transition-all text-left ${
              selectedTemplate.id === template.id
                ? 'border-blue-600 ring-2 ring-blue-600/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="aspect-[3/4] w-full bg-slate-50">
              {templateThumbnails[template.thumbnail]}
            </div>
            <div className="absolute top-2 right-2">
              {selectedTemplate.id === template.id && (
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="p-2 bg-white border-t border-slate-100">
              <p className="text-sm font-medium text-slate-900 truncate">{template.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{template.description}</p>
            </div>
            <div className="px-2 pb-2">
              <span className={`inline-block w-full text-center py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedTemplate.id === template.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                Use Template
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
