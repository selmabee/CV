import { useState, useCallback } from 'react';
import { useCV } from '../../context/CVContext';
import { motion } from 'framer-motion';
import { Upload, X, PenLine, Loader2, CheckCircle, AlertCircle, FileText, Image as ImageIcon, Shield, Zap, ScanText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import { extractCVWithRegex } from '../../services/regexExtraction';
import type { CVData } from '../../types';

// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@6.1.200/build/pdf.worker.min.mjs';

async function getRawTextFromFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      fullText += strings.join(' ') + '\n';
    }
    if (fullText.trim().length < 30) {
      fullText = await ocrPDF(file, pdf);
    }
    return fullText;
  }
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
    const { data: { text } } = await Tesseract.recognize(file, 'fra+eng');
    return text;
  }
  if (ext === 'txt') {
    return await file.text();
  }
  if (ext === 'docx') {
    const arrayBuffer = await file.arrayBuffer();
    const JSZip = (await import('jszip')).default;
    const zip = await JSZip.loadAsync(arrayBuffer);
    const docXml = await zip.file('word/document.xml')?.async('string');
    if (!docXml) throw new Error('Impossible de lire le DOCX');
    return docXml
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }
  throw new Error('Format non supporte. Utilisez PDF, DOCX, TXT ou image (JPG, PNG).');
}

async function ocrPDF(file: File, pdf: any): Promise<string> {
  let fullText = '';
  const maxPages = Math.min(pdf.numPages, 3);
  for (let i = 1; i <= maxPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
    const { data: { text } } = await Tesseract.recognize(canvas, 'fra+eng');
    fullText += text + '\n';
  }
  return fullText;
}

const trustBadges = [
  { icon: Shield, label: 'Confidentiel', sub: 'Vos donnees restent locales' },
  { icon: Zap, label: 'Instantane', sub: 'Extraction en quelques secondes' },
  { icon: ScanText, label: 'OCR inclus', sub: 'Images et PDF scannes' },
];

const formatBadges = [
  { ext: 'PDF', color: 'text-red-600 bg-red-50 border-red-100' },
  { ext: 'DOCX', color: 'text-blue-600 bg-blue-50 border-blue-100' },
  { ext: 'TXT', color: 'text-slate-600 bg-slate-100 border-slate-200' },
  { ext: 'JPG', color: 'text-amber-600 bg-amber-50 border-amber-100' },
  { ext: 'PNG', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
];

export default function UploadZone() {
  const { setStep, setCVData, setIsExtracting, isExtracting } = useCV();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const extractFromFile = useCallback(async (uploadedFile: File) => {
    setIsExtracting(true);
    setFile(uploadedFile);
    setError('');

    try {
      setStatus('Lecture du fichier...');
      const rawText = await getRawTextFromFile(uploadedFile);

      let extracted: Partial<CVData> = {};
      if (rawText && rawText.trim().length > 20) {
        setStatus('Analyse du CV...');
        extracted = extractCVWithRegex(rawText);
      } else {
        throw new Error('Aucun texte detecte dans le fichier. Pour les images, essayez une meilleure qualite.');
      }

      if (!extracted || (!extracted.fullName && !extracted.email && !extracted.experience?.length && !extracted.education?.length && !extracted.skills?.length)) {
        throw new Error('Impossible d\'extraire les informations. Verifiez votre fichier ou remplissez le CV manuellement.');
      }

      setStatus('Extraction terminee');

      setCVData({
        jobTitle: extracted.jobTitle || '',
        fullName: extracted.fullName || '',
        email: extracted.email || '',
        phone: extracted.phone || '',
        location: extracted.location || '',
        summary: extracted.summary || '',
        photo: null,
        experience: extracted.experience || [],
        education: extracted.education || [],
        skills: extracted.skills || [],
        languages: extracted.languages || [],
      });

      setTimeout(() => setStep('editor'), 800);

    } catch (err: any) {
      console.error('Extraction error:', err);
      setError(err.message || 'Erreur lors de l\'extraction');
      setStatus('');
      setIsExtracting(true);
      return;
    }
    setIsExtracting(false);
  }, [setCVData, setIsExtracting, setStep]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) extractFromFile(droppedFile);
  }, [extractFromFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) extractFromFile(f);
  }, [extractFromFile]);

  const handleManual = useCallback(() => {
    setCVData({
      jobTitle: '', fullName: '', email: '', phone: '', location: '',
      summary: '', photo: null, experience: [], education: [], skills: [], languages: [],
    });
    setStep('editor');
  }, [setCVData, setStep]);

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white min-h-[calc(100vh-4rem)] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-30" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Importer votre CV</h2>
          <p className="mt-3 text-slate-600 max-w-md mx-auto">
            Extraction automatique : nom, email, competences, experiences, formations...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-slate-300 bg-white/80 backdrop-blur-sm hover:border-blue-400 hover:bg-blue-50/50'
            }`}
          >
            {isExtracting ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  {error ? (
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  ) : status.includes('termine') || status.includes('terminee') ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  )}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-900">{error || status}</p>
                  {file && !error && <p className="text-sm text-slate-500 mt-1">{file.name}</p>}
                </div>
                {error && file && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <button
                      onClick={() => extractFromFile(file)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-all"
                    >
                      <Loader2 className="w-4 h-4" />
                      Reessayer
                    </button>
                    <button
                      onClick={handleManual}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium text-sm hover:bg-slate-50 transition-all"
                    >
                      <PenLine className="w-4 h-4" />
                      Remplir manuellement
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-lg">Glissez-deposez votre CV</p>
                  <p className="text-sm text-slate-500 mt-1">ou cliquez sur Parcourir</p>
                </div>
                <label className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 cursor-pointer transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5">
                  <Upload className="w-4 h-4" />
                  Parcourir
                  <input type="file" accept=".pdf,.docx,.txt,.jpg,.jpeg,.png" onChange={handleFileInput} className="hidden" />
                </label>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                  {formatBadges.map(f => (
                    <span key={f.ext} className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${f.color}`}>
                      {f.ext}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {trustBadges.map(badge => (
              <div key={badge.label} className="flex flex-col items-center text-center gap-1 p-3 bg-white/60 rounded-xl border border-slate-200/60">
                <badge.icon className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">{badge.label}</span>
                <span className="text-[10px] text-slate-400 leading-tight">{badge.sub}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleManual}
              className="inline-flex items-center gap-2 px-6 py-3 text-slate-700 bg-white border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-all"
            >
              <PenLine className="w-4 h-4" />
              Remplir manuellement
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
