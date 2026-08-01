import { useState, useCallback } from 'react';
import { useCV } from '../../context/CVContext';
import { motion } from 'framer-motion';
import { Upload, X, PenLine, Loader2, CheckCircle, AlertCircle, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import { generateRecommendations, extractCVWithAI } from '../../services/ai';
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
    // If PDF has no text layer (scanned), fall back to OCR
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
  throw new Error('Format non supporté. Utilisez PDF, DOCX, TXT ou image (JPG, PNG).');
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

export default function UploadZone() {
  const { setStep, setCVData, setIsExtracting, isExtracting, setRecommendations } = useCV();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [useAI, setUseAI] = useState(true);

  const extractFromFile = useCallback(async (uploadedFile: File) => {
    setIsExtracting(true);
    setFile(uploadedFile);
    setError('');

    try {
      setStatus('Lecture du fichier...');
      const rawText = await getRawTextFromFile(uploadedFile);
      console.log('Raw extracted text length:', rawText.length, 'preview:', rawText.slice(0, 200));

      let extracted: Partial<CVData> = {};
      if (rawText && rawText.trim().length > 20) {
        setStatus('Analyse du CV par IA...');
        const regexResult = extractCVWithRegex(rawText);
        try {
          const aiResult = await extractCVWithAI(rawText);
          // Merge: AI takes priority, fill gaps with regex
          extracted = {
            fullName: aiResult.fullName || regexResult.fullName || '',
            jobTitle: aiResult.jobTitle || regexResult.jobTitle || '',
            email: aiResult.email || regexResult.email || '',
            phone: aiResult.phone || regexResult.phone || '',
            location: aiResult.location || regexResult.location || '',
            summary: aiResult.summary || regexResult.summary || '',
            skills: (aiResult.skills?.length ? aiResult.skills : regexResult.skills) || [],
            languages: (aiResult.languages?.length ? aiResult.languages : regexResult.languages) || [],
            experience: (aiResult.experience?.length ? aiResult.experience : regexResult.experience) || [],
            education: (aiResult.education?.length ? aiResult.education : regexResult.education) || [],
            photo: null,
          };
          console.log('AI extracted:', aiResult, 'Merged:', extracted);
        } catch (aiErr) {
          console.warn('AI extraction failed, using regex:', aiErr);
          setStatus('Extraction locale des informations...');
          extracted = regexResult;
          console.log('Regex extracted:', extracted);
        }
      } else {
        throw new Error('Aucun texte détecté dans le fichier. Pour les images, essayez une meilleure qualité.');
      }

      if (!extracted || (!extracted.fullName && !extracted.email && !extracted.experience?.length && !extracted.education?.length && !extracted.skills?.length)) {
        throw new Error('L\'IA n\'a pas pu extraire les informations. Vérifiez votre fichier ou remplissez le CV manuellement.');
      }

      setStatus('Extraction terminée');

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

      if (useAI) {
        setStatus('Génération des recommandations IA...');
        const recs = await generateRecommendations({
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
        setRecommendations(recs);
      }

      setTimeout(() => setStep('editor'), 800);

    } catch (err: any) {
      console.error('Extraction error:', err);
      setError(err.message || 'Erreur lors de l\'extraction');
      setStatus('');
      // keep isExtracting true so error UI (with retry/manual buttons) stays visible
      setIsExtracting(true);
      return;
    }
    setIsExtracting(false);
  }, [setCVData, setIsExtracting, setStep, useAI, setRecommendations]);

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
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Importer votre CV</h2>
          <p className="mt-3 text-slate-600">
            Extraction automatique : nom, email, compétences, expériences, formations...
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
            }`}
          >
            {isExtracting ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  {error ? (
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  ) : status.includes('terminé') || status.includes('terminée') ? (
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
                      Réessayer
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
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Glissez-déposez votre CV</p>
                  <p className="text-sm text-slate-500 mt-1">PDF, DOCX, TXT ou image (JPG, PNG)</p>
                </div>
                <label className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 cursor-pointer transition-all shadow-md">
                  <Upload className="w-4 h-4" />
                  Parcourir
                  <input type="file" accept=".pdf,.docx,.txt,.jpg,.jpeg,.png" onChange={handleFileInput} className="hidden" />
                </label>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> PDF/DOCX/TXT</span>
                  <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" /> OCR Image</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useAI}
                onChange={(e) => setUseAI(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Générer des recommandations IA
              </span>
            </label>
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
