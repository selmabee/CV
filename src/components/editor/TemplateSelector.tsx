import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { templates } from '../../data';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { CVTemplate, TemplateCategory } from '../../types';

const categoryLabels: { id: TemplateCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'pastel', label: 'Pastel' },
  { id: 'solid', label: 'Solid' },
  { id: 'gradient', label: 'Gradient' },
  { id: 'professional', label: 'Pro' },
  { id: 'creative', label: 'Creative' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'classic', label: 'Classic' },
];

// Helper to make skeleton lines
const Line = ({ w, h = 1, bg = 'bg-slate-200', cls = '' }: { w: string; h?: number; bg?: string; cls?: string }) => (
  <div className={`${w} h-${h} ${bg} rounded ${cls}`} />
);

const T: Record<string, React.ReactNode> = {
  // === PASTEL ===
  'pastel-rose': (
    <div className="w-full h-full flex">
      <div className="w-[35%] h-full bg-rose-50 p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-rose-400 rounded" />
        <div className="w-1/2 h-1 bg-rose-200 rounded" />
        <div className="w-full h-px bg-rose-200 my-1" />
        <div className="w-full h-1 bg-rose-100 rounded" />
        <div className="w-2/3 h-1 bg-rose-100 rounded" />
      </div>
      <div className="w-[65%] h-full p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-3/4 h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'pastel-lavender': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[40%] bg-violet-100 p-1.5">
        <div className="w-3/4 h-1.5 bg-violet-400 rounded" />
        <div className="w-1/2 h-1 bg-violet-300 rounded mt-0.5" />
      </div>
      <div className="flex-1 p-1.5 grid grid-cols-2 gap-1">
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
      </div>
    </div>
  ),
  'pastel-mint': (
    <div className="w-full h-full flex">
      <div className="w-[62%] h-full p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-teal-500 rounded" />
        <div className="w-1/2 h-1 bg-teal-300 rounded" />
        <div className="w-full h-px bg-teal-200 my-1" />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
      </div>
      <div className="w-[38%] h-full bg-teal-50 p-1.5 space-y-1">
        <div className="w-full h-1 bg-teal-200 rounded" />
        <div className="w-2/3 h-1 bg-teal-200 rounded" />
      </div>
    </div>
  ),
  'pastel-peach': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[40%] bg-orange-100 p-1.5 flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-orange-300" />
        <div className="flex-1 space-y-0.5">
          <div className="w-3/4 h-1.5 bg-orange-400 rounded" />
          <div className="w-1/2 h-1 bg-orange-300 rounded" />
        </div>
      </div>
      <div className="flex-1 p-1.5 space-y-1">
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'pastel-sky': (
    <div className="w-full h-full bg-white p-2 flex flex-col items-center">
      <div className="w-3/4 h-1.5 bg-sky-500 rounded" />
      <div className="w-1/2 h-1 bg-sky-300 rounded mt-0.5" />
      <div className="w-8 h-0.5 bg-sky-400 rounded my-1.5" />
      <div className="w-full h-1 bg-slate-200 rounded" />
      <div className="w-3/4 h-1 bg-slate-200 rounded mt-0.5" />
      <div className="w-full h-1 bg-slate-200 rounded mt-0.5" />
    </div>
  ),
  'pastel-butter': (
    <div className="w-full h-full bg-white p-2">
      <div className="flex gap-1.5 items-start">
        <div className="w-0.5 h-8 bg-yellow-500 rounded-full" />
        <div className="space-y-1">
          <div className="w-3/4 h-1.5 bg-yellow-600 rounded" />
          <div className="w-1/2 h-1 bg-yellow-400 rounded" />
        </div>
      </div>
      <div className="w-full h-px bg-yellow-200 my-1.5" />
      <div className="grid grid-cols-2 gap-1">
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
      </div>
    </div>
  ),

  // === SOLID ===
  'solid-navy': (
    <div className="w-full h-full flex">
      <div className="w-[35%] h-full bg-blue-900 p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-white/80 rounded" />
        <div className="w-1/2 h-1 bg-white/50 rounded" />
        <div className="w-full h-px bg-white/20 my-1" />
        <div className="w-full h-1 bg-white/30 rounded" />
        <div className="w-2/3 h-1 bg-white/30 rounded" />
      </div>
      <div className="w-[65%] h-full p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'solid-charcoal': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[35%] bg-slate-700 p-1.5">
        <div className="w-3/4 h-1.5 bg-white/90 rounded" />
        <div className="w-1/2 h-1 bg-white/60 rounded mt-0.5" />
      </div>
      <div className="flex-1 p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="flex gap-1"><div className="w-6 h-2 bg-slate-700 rounded" /><div className="w-6 h-2 bg-slate-700 rounded" /></div>
      </div>
    </div>
  ),
  'solid-forest': (
    <div className="w-full h-full flex">
      <div className="w-[38%] h-full bg-green-800 p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-white/80 rounded" />
        <div className="w-1/2 h-1 bg-white/50 rounded" />
        <div className="w-full h-px bg-white/20 my-1" />
        <div className="w-full h-1 bg-white/30 rounded" />
      </div>
      <div className="w-[62%] h-full p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="flex gap-1"><div className="w-6 h-1 border border-green-800 rounded" /><div className="w-6 h-1 border border-green-800 rounded" /></div>
      </div>
    </div>
  ),
  'solid-burgundy': (
    <div className="w-full h-full flex">
      <div className="w-[40%] h-full bg-rose-900 p-1.5 space-y-1 flex flex-col items-center">
        <div className="w-5 h-5 rounded-full bg-white/20 mb-1" />
        <div className="w-3/4 h-1.5 bg-white/80 rounded" />
        <div className="w-1/2 h-1 bg-white/50 rounded" />
        <div className="w-full h-px bg-white/20 my-1" />
        <div className="w-full h-1 bg-white/30 rounded" />
      </div>
      <div className="w-[60%] h-full p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'solid-slate': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[38%] bg-slate-500 p-1.5 relative">
        <div className="absolute top-0 right-0 w-6 h-6 bg-white/10" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
        <div className="w-3/4 h-1.5 bg-white/90 rounded" />
        <div className="w-1/2 h-1 bg-white/60 rounded mt-0.5" />
      </div>
      <div className="flex-1 p-1.5 grid grid-cols-2 gap-1">
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
      </div>
    </div>
  ),
  'solid-espresso': (
    <div className="w-full h-full bg-white p-2">
      <div className="border-l-2 border-amber-900 pl-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-amber-900 rounded" />
        <div className="w-1/2 h-1 bg-amber-700 rounded" />
      </div>
      <div className="w-full h-px bg-slate-200 my-1.5" />
      <div className="w-full h-1 bg-slate-200 rounded" />
      <div className="w-2/3 h-1 bg-slate-200 rounded mt-0.5" />
      <div className="w-full h-1 bg-slate-200 rounded mt-0.5" />
      <div className="flex gap-1 mt-1"><div className="w-5 h-1.5 bg-amber-900/20 rounded-full" /><div className="w-5 h-1.5 bg-amber-900/20 rounded-full" /></div>
    </div>
  ),

  // === GRADIENT ===
  'grad-sunset': (
    <div className="w-full h-full flex">
      <div className="w-[35%] h-full p-1.5 space-y-1" style={{ background: 'linear-gradient(180deg, #f97316, #db2777)' }}>
        <div className="w-3/4 h-1.5 bg-white/80 rounded" />
        <div className="w-1/2 h-1 bg-white/60 rounded" />
        <div className="w-full h-px bg-white/20 my-1" />
        <div className="w-full h-1 bg-white/40 rounded" />
      </div>
      <div className="w-[65%] h-full p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'grad-ocean': (
    <div className="w-full h-full flex">
      <div className="w-[62%] h-full p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-sky-500 rounded" />
        <div className="w-1/2 h-1 bg-sky-300 rounded" />
        <div className="w-full h-0.5 rounded my-1" style={{ background: 'linear-gradient(90deg, #0ea5e9, #1e40af)' }} />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
      </div>
      <div className="w-[38%] h-full p-1.5 space-y-1" style={{ background: 'linear-gradient(180deg, #0ea5e9, #1e40af)' }}>
        <div className="w-full h-1.5 bg-white/70 rounded" />
        <div className="w-2/3 h-1 bg-white/50 rounded" />
        <div className="w-full h-1 bg-white/30 rounded" />
      </div>
    </div>
  ),
  'grad-aurora': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[38%] p-1.5" style={{ background: 'linear-gradient(135deg, #059669, #0891b2)' }}>
        <div className="w-3/4 h-1.5 bg-white/90 rounded" />
        <div className="w-1/2 h-1 bg-white/70 rounded mt-0.5" />
      </div>
      <div className="flex-1 p-1.5 grid grid-cols-2 gap-1">
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
      </div>
    </div>
  ),
  'grad-twilight': (
    <div className="w-full h-full flex">
      <div className="w-[38%] h-full p-1.5 space-y-1 flex flex-col items-center" style={{ background: 'linear-gradient(180deg, #6366f1, #9333ea)' }}>
        <div className="w-5 h-5 rounded-full bg-white/20 mb-1" />
        <div className="w-3/4 h-1.5 bg-white/80 rounded" />
        <div className="w-1/2 h-1 bg-white/60 rounded" />
        <div className="w-full h-px bg-white/20 my-1" />
        <div className="w-full h-1 bg-white/40 rounded" />
      </div>
      <div className="w-[62%] h-full p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'grad-ember': (
    <div className="w-full h-full flex">
      <div className="w-[60%] h-full p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-orange-600 rounded" />
        <div className="w-1/2 h-1 bg-orange-400 rounded" />
        <div className="w-full h-0.5 rounded my-1" style={{ background: 'linear-gradient(90deg, #dc2626, #ea580c)' }} />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
      </div>
      <div className="w-[40%] h-full p-1.5 space-y-1" style={{ background: 'linear-gradient(180deg, #dc2626, #ea580c)' }}>
        <div className="w-full h-1.5 bg-white/70 rounded" />
        <div className="w-2/3 h-1 bg-white/50 rounded" />
        <div className="w-full h-1 bg-white/30 rounded" />
        <div className="w-3/4 h-1 bg-white/30 rounded" />
      </div>
    </div>
  ),

  // === PROFESSIONAL ===
  'prof-corporate': (
    <div className="w-full h-full flex">
      <div className="w-[30%] h-full bg-blue-50 p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-blue-700 rounded" />
        <div className="w-1/2 h-1 bg-blue-400 rounded" />
        <div className="flex gap-0.5 flex-wrap mt-1">
          <div className="w-5 h-1 border border-blue-700 rounded" /><div className="w-5 h-1 border border-blue-700 rounded" />
        </div>
      </div>
      <div className="w-[70%] h-full p-1.5 space-y-1">
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-full p-1 border border-blue-100 rounded">
          <div className="w-3/4 h-1 bg-slate-300 rounded" />
          <div className="w-1/2 h-0.5 bg-slate-200 rounded mt-0.5" />
        </div>
        <div className="w-full p-1 border border-blue-100 rounded">
          <div className="w-3/4 h-1 bg-slate-300 rounded" />
          <div className="w-1/2 h-0.5 bg-slate-200 rounded mt-0.5" />
        </div>
      </div>
    </div>
  ),
  'prof-executive': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[32%] p-1.5" style={{ background: 'linear-gradient(135deg, #0f172a, #1e40af)' }}>
        <div className="w-3/4 h-2 bg-white/90 rounded" />
        <div className="w-1/2 h-1 bg-white/60 rounded mt-0.5" />
      </div>
      <div className="flex-1 p-1.5 grid grid-cols-3 gap-1">
        <div className="col-span-2 space-y-0.5">
          <div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" />
          <div className="w-full h-1 bg-slate-200 rounded" /><div className="w-3/4 h-1 bg-slate-200 rounded" />
        </div>
        <div className="space-y-0.5">
          <div className="w-full h-1 border border-slate-400 rounded" /><div className="w-2/3 h-1 border border-slate-400 rounded" />
        </div>
      </div>
    </div>
  ),
  'prof-consultant': (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-1 p-1.5 border-l-2 border-slate-800">
        <div className="w-4 h-4 rounded bg-slate-800" />
        <div className="flex-1 space-y-0.5">
          <div className="w-3/4 h-1.5 bg-slate-800 rounded" />
          <div className="w-1/2 h-1 bg-slate-400 rounded" />
        </div>
      </div>
      <div className="flex-1 p-1.5 grid grid-cols-3 gap-1">
        <div className="col-span-2 space-y-0.5">
          <div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" />
          <div className="w-full h-1 bg-slate-200 rounded" />
        </div>
        <div className="space-y-0.5">
          <div className="w-full h-1 border border-slate-700 rounded" /><div className="w-2/3 h-1 border border-slate-700 rounded" />
        </div>
      </div>
    </div>
  ),
  'prof-attorney': (
    <div className="w-full h-full bg-white p-2 flex flex-col items-center">
      <div className="w-3/4 h-1.5 bg-stone-900 rounded" />
      <div className="w-1/2 h-1 bg-stone-400 rounded mt-0.5" />
      <div className="w-full h-px bg-stone-200 my-1.5" />
      <div className="w-full h-1 bg-slate-200 rounded" />
      <div className="w-3/4 h-1 bg-slate-200 rounded mt-0.5" />
      <div className="w-full h-1 bg-slate-200 rounded mt-0.5" />
      <div className="grid grid-cols-2 gap-1 w-full mt-1">
        <div className="space-y-0.5"><div className="w-full h-1 border border-stone-900 rounded" /></div>
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /></div>
      </div>
    </div>
  ),
  'prof-banker': (
    <div className="w-full h-full flex">
      <div className="w-[35%] h-full p-1.5 space-y-1" style={{ backgroundColor: '#1e3a5f' }}>
        <div className="w-3/4 h-1.5 bg-white/80 rounded" />
        <div className="w-1/2 h-1 bg-white/50 rounded" />
        <div className="w-full h-px bg-white/20 my-1" />
        <div className="w-full h-1 bg-white/30 rounded" />
        <div className="w-2/3 h-0.5 bg-white/20 rounded" />
        <div className="w-3/4 h-0.5 bg-white/20 rounded" />
      </div>
      <div className="w-[65%] h-full p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),

  // === CREATIVE ===
  'creat-popart': (
    <div className="w-full h-full bg-white p-2">
      <div className="flex items-end gap-1 mb-1">
        <div className="w-5 h-5 rounded-lg bg-rose-600 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded" />
        </div>
        <div className="flex-1 space-y-0.5">
          <div className="w-3/4 h-2 bg-rose-600 rounded" />
          <div className="w-1/2 h-1 bg-rose-400 rounded" />
        </div>
      </div>
      <div className="flex gap-0.5 my-1">
        <div className="w-4 h-1.5 bg-rose-500 rounded" style={{ transform: 'rotate(-1deg)' }} />
        <div className="w-4 h-1.5 bg-rose-400 rounded" style={{ transform: 'rotate(1deg)' }} />
        <div className="w-4 h-1.5 bg-rose-300 rounded" style={{ transform: 'rotate(-1deg)' }} />
      </div>
      <div className="w-full h-px bg-rose-200 my-1" />
      <div className="w-full h-1 bg-slate-200 rounded" />
      <div className="w-2/3 h-1 bg-slate-200 rounded mt-0.5" />
    </div>
  ),
  'creat-sage': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[38%] rounded-b-xl p-1.5" style={{ background: 'linear-gradient(135deg, #4d7c0f, #4d7c0fcc)' }}>
        <div className="w-3/4 h-1.5 bg-white/90 rounded" />
        <div className="w-1/2 h-1 bg-white/70 rounded mt-0.5" />
      </div>
      <div className="flex-1 p-1.5 grid grid-cols-2 gap-1">
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
      </div>
    </div>
  ),
  'creat-cosmic': (
    <div className="w-full h-full flex">
      <div className="w-[35%] h-full p-1.5 space-y-1 flex flex-col items-center" style={{ background: 'linear-gradient(180deg, #7c3aed, #312e81)' }}>
        <div className="w-5 h-5 rounded-full bg-white/20 mb-1" />
        <div className="w-3/4 h-1.5 bg-white/80 rounded" />
        <div className="w-1/2 h-1 bg-white/60 rounded" />
        <div className="w-full h-px bg-white/20 my-1" />
        <div className="w-full h-1 bg-white/40 rounded" />
      </div>
      <div className="w-[65%] h-full p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'creat-terracotta': (
    <div className="w-full h-full bg-white p-2">
      <div className="flex gap-1.5">
        <div className="w-1 h-10 rounded-full bg-orange-700" />
        <div className="space-y-1">
          <div className="w-3/4 h-2 bg-orange-700 rounded" />
          <div className="w-1/2 h-1 bg-orange-500 rounded" />
        </div>
      </div>
      <div className="border-l-2 border-orange-700 pl-1.5 mt-1.5 space-y-1">
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="flex gap-1"><div className="w-4 h-1.5 bg-orange-700/20 rounded-full" /><div className="w-4 h-1.5 bg-orange-700/20 rounded-full" /></div>
      </div>
    </div>
  ),

  // === MINIMAL ===
  'min-mono': (
    <div className="w-full h-full bg-white p-2 space-y-1">
      <div className="w-3/4 h-1.5 bg-slate-800 rounded" />
      <div className="w-1/2 h-1 bg-slate-400 rounded" />
      <div className="w-full h-px bg-slate-200 my-1" />
      <div className="w-full h-1 bg-slate-200 rounded" />
      <div className="w-2/3 h-1 bg-slate-200 rounded" />
      <div className="w-full h-1 bg-slate-200 rounded" />
    </div>
  ),
  'min-paper': (
    <div className="w-full h-full bg-white p-2 space-y-1">
      <div className="w-3/4 h-1.5 bg-slate-800 rounded" />
      <div className="w-1/2 h-1 bg-slate-400 rounded" />
      <div className="w-full h-1 bg-slate-200 rounded" />
      <div className="w-2/3 h-1 bg-slate-200 rounded" />
      <div className="w-full h-1 bg-slate-200 rounded" />
      <div className="flex gap-1 mt-0.5"><div className="w-4 h-1 bg-slate-100 rounded-full" /><div className="w-4 h-1 bg-slate-100 rounded-full" /></div>
    </div>
  ),
  'min-nordic': (
    <div className="w-full h-full flex">
      <div className="w-[58%] h-full p-2 space-y-1">
        <div className="w-3/4 h-1.5 bg-slate-800 rounded" />
        <div className="w-1/2 h-1 bg-slate-400 rounded" />
        <div className="w-full h-px bg-slate-100 my-1" />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
      </div>
      <div className="w-[42%] h-full bg-slate-50 p-1.5 space-y-1">
        <div className="w-full h-1 bg-cyan-200 rounded" />
        <div className="w-2/3 h-1 bg-cyan-200 rounded" />
        <div className="flex gap-0.5 flex-wrap mt-0.5">
          <div className="w-3 h-1 bg-cyan-100 rounded-full" /><div className="w-3 h-1 bg-cyan-100 rounded-full" />
        </div>
      </div>
    </div>
  ),
  'min-zen': (
    <div className="w-full h-full bg-white p-2 flex flex-col items-center">
      <div className="w-3/4 h-1.5 bg-slate-800 rounded" />
      <div className="w-8 h-px bg-slate-300 my-1" />
      <div className="w-1/2 h-1 bg-slate-400 rounded" />
      <div className="w-full h-1 bg-slate-200 rounded mt-2" />
      <div className="w-2/3 h-1 bg-slate-200 rounded mt-0.5" />
      <div className="w-full h-1 bg-slate-200 rounded mt-0.5" />
      <div className="flex gap-0.5 mt-0.5"><div className="w-4 h-1 border border-slate-600 rounded" /><div className="w-4 h-1 border border-slate-600 rounded" /></div>
    </div>
  ),

  // === CLASSIC ===
  'cls-exec-black': (
    <div className="w-full h-full flex">
      <div className="w-[33%] h-full bg-neutral-900 p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-white/80 rounded" />
        <div className="w-1/2 h-1 bg-white/50 rounded" />
        <div className="w-full h-px bg-white/20 my-1" />
        <div className="w-full h-1 bg-white/30 rounded" />
        <div className="w-2/3 h-1 bg-white/30 rounded" />
      </div>
      <div className="w-[67%] h-full p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'cls-slate': (
    <div className="w-full h-full flex">
      <div className="w-[67%] h-full p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-slate-600 rounded" />
        <div className="w-1/2 h-1 bg-slate-400 rounded" />
        <div className="w-full h-px bg-slate-600 my-1" />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
      </div>
      <div className="w-[33%] h-full bg-slate-50 p-1.5 space-y-1">
        <div className="w-full h-1 border border-slate-600 rounded" />
        <div className="w-2/3 h-1 border border-slate-600 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'cls-navy': (
    <div className="w-full h-full flex">
      <div className="w-[32%] h-full bg-blue-900 p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-white/80 rounded" />
        <div className="w-1/2 h-1 bg-white/50 rounded" />
        <div className="w-full h-px bg-white/20 my-1" />
        <div className="w-full h-1 bg-white/30 rounded" />
        <div className="w-2/3 h-1 bg-white/30 rounded" />
      </div>
      <div className="w-[68%] h-full p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="w-full h-1 bg-slate-200 rounded" />
      </div>
    </div>
  ),
  'cls-charcoal-steel': (
    <div className="w-full h-full flex">
      <div className="w-[68%] h-full p-1.5 space-y-1">
        <div className="w-3/4 h-1.5 bg-gray-700 rounded" />
        <div className="w-1/2 h-1 bg-gray-400 rounded" />
        <div className="w-full h-0.5 bg-gray-700 my-1" />
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
      </div>
      <div className="w-[32%] h-full bg-gray-700 p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-white/80 rounded" />
        <div className="w-2/3 h-1 bg-white/50 rounded" />
        <div className="w-full h-1 bg-white/30 rounded" />
      </div>
    </div>
  ),
  'cls-obsidian': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[35%] bg-slate-900 p-1.5">
        <div className="w-3/4 h-1.5 bg-white/90 rounded" />
        <div className="w-1/2 h-1 bg-white/60 rounded mt-0.5" />
      </div>
      <div className="flex-1 p-1.5 space-y-1">
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="flex gap-1"><div className="w-6 h-2 bg-slate-900 rounded" /><div className="w-6 h-2 bg-slate-900 rounded" /></div>
      </div>
    </div>
  ),
  'cls-steel-blue': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[38%] bg-slate-700 p-1.5 relative">
        <div className="absolute top-0 right-0 w-5 h-5 bg-white/10" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
        <div className="w-3/4 h-1.5 bg-white/90 rounded" />
        <div className="w-1/2 h-1 bg-white/60 rounded mt-0.5" />
      </div>
      <div className="flex-1 p-1.5 grid grid-cols-2 gap-1">
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
        <div className="space-y-0.5"><div className="w-full h-1 border border-slate-700 rounded" /><div className="w-2/3 h-1 border border-slate-700 rounded" /></div>
      </div>
    </div>
  ),
  'cls-graphite': (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-1 p-1.5 border-b-2 border-gray-800">
        <div className="w-4 h-4 rounded-full bg-gray-800" />
        <div className="flex-1 space-y-0.5">
          <div className="w-3/4 h-1.5 bg-gray-800 rounded" />
          <div className="w-1/2 h-1 bg-gray-400 rounded" />
        </div>
      </div>
      <div className="flex-1 p-1.5 space-y-1">
        <div className="w-full h-1 bg-slate-200 rounded" />
        <div className="w-2/3 h-1 bg-slate-200 rounded" />
        <div className="grid grid-cols-2 gap-1 mt-0.5">
          <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /></div>
          <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /></div>
        </div>
      </div>
    </div>
  ),
  'cls-admiral': (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[32%] p-1.5" style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f172a)' }}>
        <div className="w-3/4 h-2 bg-white/90 rounded" />
        <div className="w-1/2 h-1 bg-white/60 rounded mt-0.5" />
      </div>
      <div className="flex-1 p-1.5 grid grid-cols-3 gap-1">
        <div className="col-span-2 space-y-0.5">
          <div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" />
          <div className="w-full h-1 bg-slate-200 rounded" />
        </div>
        <div className="space-y-0.5">
          <div className="w-full h-1 border border-blue-900 rounded" /><div className="w-2/3 h-1 border border-blue-900 rounded" />
        </div>
      </div>
    </div>
  ),
  'cls-ivory-black': (
    <div className="w-full h-full bg-white p-2 flex flex-col items-center">
      <div className="w-3/4 h-1.5 bg-stone-900 rounded" />
      <div className="w-1/2 h-1 bg-stone-400 rounded mt-0.5" />
      <div className="w-full h-px bg-stone-900 my-1.5" />
      <div className="w-full h-1 bg-slate-200 rounded" />
      <div className="w-3/4 h-1 bg-slate-200 rounded mt-0.5" />
      <div className="w-full h-1 bg-slate-200 rounded mt-0.5" />
      <div className="flex gap-0.5 mt-0.5"><div className="w-4 h-1.5 bg-stone-900/15 rounded-full" /><div className="w-4 h-1.5 bg-stone-900/15 rounded-full" /></div>
    </div>
  ),
  'cls-smoke': (
    <div className="w-full h-full bg-white p-2">
      <div className="flex gap-1.5 items-start">
        <div className="w-4 h-4 rounded-full bg-slate-200" />
        <div className="space-y-0.5">
          <div className="w-3/4 h-1.5 bg-zinc-700 rounded" />
          <div className="w-1/2 h-1 bg-zinc-400 rounded" />
        </div>
      </div>
      <div className="w-full h-px bg-zinc-700 my-1.5" />
      <div className="w-full h-1 bg-slate-200 rounded" />
      <div className="w-2/3 h-1 bg-slate-200 rounded mt-0.5" />
      <div className="w-full h-1 bg-slate-200 rounded mt-0.5" />
      <div className="flex gap-0.5 mt-0.5"><div className="w-4 h-1.5 bg-zinc-700/15 rounded-full" /><div className="w-4 h-1.5 bg-zinc-700/15 rounded-full" /></div>
    </div>
  ),
  'cls-midnight': (
    <div className="w-full h-full bg-white p-2">
      <div className="border-b-2 border-slate-800 pb-1 mb-1">
        <div className="w-3/4 h-1.5 bg-slate-800 rounded" />
        <div className="w-1/2 h-1 bg-slate-400 rounded mt-0.5" />
      </div>
      <div className="w-full p-1 border border-slate-100 rounded mb-0.5">
        <div className="w-3/4 h-1 bg-slate-300 rounded" />
        <div className="w-1/2 h-0.5 bg-slate-200 rounded mt-0.5" />
      </div>
      <div className="w-full p-1 border border-slate-100 rounded">
        <div className="w-3/4 h-1 bg-slate-300 rounded" />
        <div className="w-1/2 h-0.5 bg-slate-200 rounded mt-0.5" />
      </div>
    </div>
  ),
  'cls-stone': (
    <div className="w-full h-full bg-white p-2">
      <div className="flex gap-1.5 mb-1">
        <div className="w-4 h-4 rounded bg-slate-100" />
        <div className="space-y-0.5">
          <div className="w-3/4 h-1.5 bg-stone-800 rounded" />
          <div className="w-1/2 h-1 bg-stone-400 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
        <div className="space-y-0.5"><div className="w-full h-1 bg-slate-200 rounded" /><div className="w-2/3 h-1 bg-slate-200 rounded" /></div>
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
        <h3 className="font-semibold text-slate-900">Choisir un modèle</h3>
        <span className="text-sm text-slate-500">{templates.length} modèles</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categoryLabels.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.label}<span className="ml-1 opacity-60">{getCategoryCount(cat.id)}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[520px] overflow-y-auto pr-1">
        {filtered.map((template) => (
          <motion.button
            key={template.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedTemplate(template)}
            className={`relative border-2 rounded-lg overflow-hidden transition-all text-left group ${
              selectedTemplate.id === template.id
                ? 'border-blue-600 ring-2 ring-blue-600/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="aspect-[3/4] w-full bg-slate-50">
              {T[template.thumbnail]}
            </div>
            <div className="absolute top-1.5 right-1.5">
              {selectedTemplate.id === template.id && (
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <div className="px-1.5 py-1.5 bg-white border-t border-slate-100">
              <p className="text-[11px] font-medium text-slate-900 truncate leading-tight">{template.name}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
