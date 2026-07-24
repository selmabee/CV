import { useCV } from '../../context/CVContext';
import { templates } from '../../data';
import { motion } from 'framer-motion';
import { Check, Image, FileText } from 'lucide-react';

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate, cvData } = useCV();

  const templatesWithPhoto = templates.filter(t => t.hasPhoto);
  const templatesWithoutPhoto = templates.filter(t => !t.hasPhoto);

  const templateThumbnails: Record<string, React.ReactNode> = {
    modern: (
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
    classic: (
      <div className="w-full h-full bg-white flex flex-col items-center p-4">
        <div className="w-3/4 h-3 bg-slate-800 rounded" />
        <div className="w-1/2 h-2 bg-slate-300 rounded mt-1" />
        <div className="w-full h-px bg-slate-200 my-3" />
        <div className="w-full h-2 bg-slate-200 rounded" />
        <div className="w-full h-2 bg-slate-200 rounded mt-1" />
        <div className="w-3/4 h-2 bg-slate-200 rounded mt-1" />
      </div>
    ),
    creative: (
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
    minimal: (
      <div className="w-full h-full bg-white flex flex-col p-4 space-y-2">
        <div className="w-1/2 h-2 bg-slate-800 rounded" />
        <div className="w-full h-px bg-slate-200" />
        <div className="w-full h-2 bg-slate-200 rounded" />
        <div className="w-3/4 h-2 bg-slate-200 rounded" />
        <div className="w-full h-2 bg-slate-200 rounded" />
      </div>
    ),
    gradient: (
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
    card: (
      <div className="w-full h-full bg-slate-50 flex flex-col p-2 space-y-2">
        <div className="w-full h-2 bg-slate-800 rounded" />
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="w-full bg-white rounded-lg p-2 space-y-1.5 border border-slate-100">
          <div className="w-full h-1.5 bg-slate-200 rounded" />
          <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
        </div>
        <div className="w-full bg-white rounded-lg p-2 space-y-1 border border-slate-100">
          <div className="w-full h-1.5 bg-slate-200 rounded" />
          <div className="w-3/4 h-1.5 bg-slate-200 rounded" />
        </div>
      </div>
    ),
    timeline: (
      <div className="w-full h-full bg-white flex flex-col p-2 space-y-2">
        <div className="w-3/4 h-2 bg-slate-800 rounded" />
        <div className="w-full h-1.5 bg-slate-300 rounded" />
        <div className="flex gap-2 h-full">
          <div className="w-1/2 space-y-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <div className="w-full h-1 bg-slate-200 rounded" />
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
          <div className="w-1/2 space-y-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <div className="w-full h-1 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    ),
    split: (
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
    corporate: (
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
    bold: (
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
    elegant: (
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
    dark: (
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
    centered: (
      <div className="w-full h-full bg-white flex flex-col items-center p-3">
        <div className="w-6 h-6 bg-slate-300 rounded-full mb-2" />
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="w-full h-px bg-slate-200 mb-2" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-2/3 h-1.5 bg-slate-200 rounded mt-1" />
      </div>
    ),
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
    compact: (
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
    'creative-2': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-blue-500" />
          <div className="w-3/4 h-2 bg-slate-800 rounded" />
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-2/3 h-1.5 bg-slate-200 rounded mt-1" />
        <div className="w-full h-px bg-slate-200 my-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
      </div>
    ),
    'modern-2': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="flex items-start gap-2 mb-2">
          <div className="w-5 h-5 bg-slate-300 rounded" />
          <div className="w-full">
            <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
            <div className="w-1/2 h-1.5 bg-slate-300 rounded" />
          </div>
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-2/3 h-1.5 bg-slate-200 rounded mt-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded mt-1" />
      </div>
    ),
    'classic-2': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="w-full h-[25%] bg-slate-100 rounded mb-2 p-2 flex flex-col justify-center">
          <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
          <div className="w-1/2 h-1.5 bg-slate-300 rounded" />
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded mt-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded mt-1" />
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
    'photo-focus': (
      <div className="w-full h-full bg-white flex flex-col items-center p-2">
        <div className="w-8 h-8 bg-blue-500 rounded mb-2" />
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="w-full h-px bg-slate-200 mb-2" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded mt-1" />
      </div>
    ),
    'modern-3': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="flex items-start gap-2 mb-2">
          <div className="w-full">
            <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
            <div className="w-1/2 h-1.5 bg-slate-300 rounded" />
            <div className="w-full h-1 bg-slate-200 rounded mt-1" />
          </div>
          <div className="w-5 h-5 bg-slate-300 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="w-full h-1.5 bg-slate-200 rounded" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
          <div className="space-y-1 p-1 bg-slate-50 rounded">
            <div className="w-full h-1 bg-slate-200 rounded" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    ),
    'modern-4': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded mt-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded mt-1" />
        <div className="w-full h-px bg-slate-200 my-1" />
        <div className="w-full h-3 bg-slate-100 rounded p-1">
          <div className="w-full h-1 bg-slate-200 rounded mb-1" />
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
        </div>
      </div>
    ),
    'modern-5': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-slate-300 rounded-full" />
          <div className="w-3/4 h-2 bg-slate-800 rounded" />
        </div>
        <div className="w-full h-1 bg-slate-200 rounded mb-1" />
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="w-full h-1.5 bg-slate-200 rounded" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-slate-200 rounded" />
            <div className="w-full h-1 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    ),
    'timeline-2': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-slate-300 rounded-full" />
          <div className="w-3/4 h-2 bg-slate-800 rounded" />
        </div>
        <div className="w-full h-1 bg-slate-200 rounded mb-1" />
        <div className="flex gap-2">
          <div className="w-1 h-8 bg-blue-500 rounded-full mt-1" />
          <div className="w-full space-y-1">
            <div className="w-full h-1.5 bg-slate-200 rounded" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
            <div className="w-full h-1.5 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    ),
    'two-column-2': (
      <div className="w-full h-full flex">
        <div className="w-[55%] h-full p-2 space-y-1.5">
          <div className="w-3/4 h-2 bg-slate-800 rounded" />
          <div className="w-1/2 h-1.5 bg-slate-300 rounded" />
          <div className="w-full h-px bg-slate-200 my-1" />
          <div className="w-full h-1.5 bg-slate-200 rounded" />
          <div className="w-2/3 h-1.5 bg-slate-200 rounded" />
        </div>
        <div className="w-[45%] h-full bg-blue-50 p-2 space-y-1.5">
          <div className="w-full h-8 bg-slate-200 rounded mb-1" />
          <div className="w-full h-1 bg-blue-200 rounded" />
          <div className="w-3/4 h-1 bg-blue-200 rounded" />
        </div>
      </div>
    ),
    'classic-3': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-full h-3 bg-slate-50 rounded border border-slate-200 mb-1 p-1">
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
          <div className="w-1/2 h-1 bg-slate-200 rounded mt-1" />
        </div>
        <div className="w-full h-3 bg-slate-50 rounded border border-slate-200 mb-1 p-1">
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
          <div className="w-1/2 h-1 bg-slate-200 rounded mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="w-full h-1 bg-slate-200 rounded" />
          <div className="w-full h-1 bg-slate-200 rounded" />
        </div>
      </div>
    ),
    'modern-6': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="w-full h-3 bg-slate-100 rounded p-1">
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
            <div className="w-1/2 h-1 bg-slate-200 rounded mt-1" />
          </div>
          <div className="w-full h-3 bg-slate-100 rounded p-1">
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
            <div className="w-1/2 h-1 bg-slate-200 rounded mt-1" />
          </div>
        </div>
        <div className="w-full h-1 bg-slate-200 rounded mt-2" />
        <div className="w-3/4 h-1 bg-slate-200 rounded mt-1" />
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
    'classic-4': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-blue-500 rounded" />
          <div className="w-3/4 h-2 bg-slate-800 rounded" />
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded mb-1" />
        <div className="w-full h-px bg-slate-200 mb-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-2/3 h-1.5 bg-slate-200 rounded mt-1" />
      </div>
    ),
    'modern-8': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
        <div className="w-full h-3 bg-slate-100 rounded p-1 mb-1">
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
          <div className="w-1/2 h-1 bg-slate-200 rounded mt-1" />
          <div className="w-full h-px bg-slate-200 mt-1" />
        </div>
        <div className="w-full h-3 bg-slate-100 rounded p-1 mb-1">
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
          <div className="w-1/2 h-1 bg-slate-200 rounded mt-1" />
          <div className="w-full h-px bg-slate-200 mt-1" />
        </div>
        <div className="w-full h-1 bg-slate-200 rounded mt-1" />
      </div>
    ),
    'modern-9': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="flex items-start gap-2 mb-2">
          <div className="w-full">
            <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
            <div className="w-1/2 h-1.5 bg-slate-300 rounded" />
            <div className="w-full h-1 bg-slate-200 rounded mt-1" />
          </div>
          <div className="w-8 h-8 bg-blue-500 rounded" />
        </div>
        <div className="w-full h-px bg-slate-200 mb-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded mt-1" />
      </div>
    ),
    'classic-5': (
      <div className="w-full h-full bg-white flex flex-col items-center p-3">
        <div className="w-5 h-5 bg-blue-500 rounded-full mb-2" />
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded mt-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded mt-1" />
      </div>
    ),
    'classic-6': (
      <div className="w-full h-full flex">
        <div className="w-[30%] h-full bg-slate-700 p-2 space-y-1.5">
          <div className="w-full h-1 bg-slate-200 rounded" />
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
          <div className="w-full h-1 bg-slate-200 rounded" />
        </div>
        <div className="w-[70%] h-full p-2 space-y-1.5">
          <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
          <div className="w-full h-px bg-slate-200" />
          <div className="w-full h-1.5 bg-slate-200 rounded" />
          <div className="w-3/4 h-1.5 bg-slate-200 rounded" />
        </div>
      </div>
    ),
    'modern-10': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded mb-1" />
        <div className="w-full h-px bg-slate-200 mb-1" />
        <div className="flex items-start gap-2 mt-1">
          <div className="w-5 h-5 bg-blue-500 rounded" />
          <div className="w-full">
            <div className="w-full h-1 bg-slate-200 rounded mb-1" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    ),
    'modern-11': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded mb-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
        <div className="w-full h-px bg-slate-200 mb-2" />
        <div className="w-6 h-6 bg-blue-500 rounded mx-auto mb-1" />
      </div>
    ),
    'classic-7': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-blue-500 rounded" />
          <div className="w-3/4 h-2 bg-slate-800 rounded" />
        </div>
        <div className="w-full h-1 bg-slate-200 rounded mb-1" />
        <div className="grid grid-cols-2 gap-2">
          <div className="w-full h-3 bg-slate-100 rounded p-1">
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
            <div className="w-1/2 h-1 bg-slate-200 rounded mt-1" />
          </div>
          <div className="w-full h-3 bg-slate-100 rounded p-1">
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
            <div className="w-1/2 h-1 bg-slate-200 rounded mt-1" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="w-full h-1 bg-slate-200 rounded" />
          <div className="w-full h-1 bg-slate-200 rounded" />
        </div>
      </div>
    ),
    'modern-12': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-blue-500 rounded" />
          <div className="w-3/4 h-2 bg-slate-800 rounded" />
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded mb-1" />
        <div className="w-3/4 h-1.5 bg-slate-200 rounded mb-1" />
        <div className="w-full h-px bg-slate-200 mb-1" />
        <div className="w-full h-1.5 bg-slate-200 rounded" />
      </div>
    ),
    'modern-13': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-blue-500 rounded-full" />
          <div className="w-full">
            <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
            <div className="w-1/2 h-1.5 bg-slate-300 rounded" />
            <div className="w-full h-1 bg-slate-200 rounded mt-1" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="w-full h-1.5 bg-slate-200 rounded" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-slate-200 rounded" />
            <div className="w-full h-1 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    ),
    'modern-14': (
      <div className="w-full h-full bg-white flex flex-col items-center p-3">
        <div className="w-5 h-5 bg-blue-500 rounded-full mb-2" />
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="space-y-1">
            <div className="w-full h-1.5 bg-slate-200 rounded" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-slate-200 rounded" />
            <div className="w-full h-1 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    ),
    'modern-15': (
      <div className="w-full h-full bg-white flex flex-col p-2">
        <div className="w-3/4 h-2 bg-slate-800 rounded mb-1" />
        <div className="w-1/2 h-1.5 bg-slate-300 rounded mb-2" />
        <div className="grid grid-cols-2 gap-2">
          <div className="w-full h-4 bg-blue-50 rounded p-1">
            <div className="w-full h-1 bg-slate-200 rounded mb-1" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
          <div className="w-full h-4 bg-blue-50 rounded p-1">
            <div className="w-full h-1 bg-slate-200 rounded mb-1" />
            <div className="w-3/4 h-1 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="w-full h-4 bg-slate-100 rounded p-1 mt-2">
          <div className="w-full h-1 bg-slate-200 rounded mb-1" />
          <div className="w-3/4 h-1 bg-slate-200 rounded" />
        </div>
      </div>
    ),
    executive: (
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
    tech: (
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
    geometric: (
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
    premium: (
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
    fresh: (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="w-full h-[40%] bg-gradient-to-br from-blue-500 to-cyan-400 p-2 flex flex-col justify-end rounded-b-2xl">
          <div className="w-3/4 h-2 bg-white/80 rounded" />
          <div className="w-1/2 h-1.5 bg-white/60 rounded mt-1" />
        </div>
        <div className="flex-1 p-2 space-y-1.5">
          <div className="w-full h-1.5 bg-slate-200 rounded" />
          <div className="flex gap-2">
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
      </div>
    ),
  };

  const hasPhoto = !!cvData.photo;

  const renderTemplateGrid = (templateList: CVTemplate[], title: string, icon: React.ReactNode) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="font-semibold text-slate-700">{title}</h4>
        <span className="text-xs text-slate-400">({templateList.length})</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {templateList.map((template) => (
          <motion.button
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTemplate(template)}
            className={`relative border-2 rounded-xl overflow-hidden transition-all ${
              selectedTemplate.id === template.id
                ? 'border-blue-600 ring-2 ring-blue-600/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="aspect-[3/4] w-full bg-slate-50">
              {templateThumbnails[template.id]}
            </div>
            <div className="absolute top-2 right-2">
              {selectedTemplate.id === template.id && (
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="p-2 bg-white border-t border-slate-100">
              <p className="text-sm font-medium text-slate-900">{template.name}</p>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{template.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-slate-900">Modèles</h3>
      {hasPhoto ? (
        <>
          {renderTemplateGrid(templatesWithPhoto, 'Modèles avec photo', <Image className="w-4 h-4 text-blue-600" />)}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-700">Votre CV contient une photo. Les modèles ci-dessus mettent en valeur votre image.</p>
          </div>
        </>
      ) : (
        <>
          {renderTemplateGrid(templatesWithoutPhoto, 'Modèles sans photo', <FileText className="w-4 h-4 text-slate-600" />)}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
            <p className="text-sm text-amber-700">Votre CV ne contient pas de photo. Ajoutez une photo dans l'onglet Contenu pour débloquer les modèles avec photo.</p>
          </div>
        </>
      )}
    </div>
  );
}

import { CVTemplate } from '../../types';
