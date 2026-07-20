import { useState, useRef } from 'react';
import { useCV } from '../../context/CVContext';
import { motion } from 'framer-motion';
import { FileText, Image as ImageIcon, FileType, Loader2, Download, CheckCircle, Sparkles } from 'lucide-react';
import { sanitizeFileName, downloadBlob } from '../../utils';

type ExportFormat = 'pdf' | 'png' | 'docx';

export default function ExportPanel() {
  const { cvData, selectedTemplate, cvStyle } = useCV();
  const [exporting, setExporting] = useState<ExportFormat | null>(null);
  const [success, setSuccess] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = async (format: ExportFormat) => {
    setExporting(format);
    setSuccess(false);
    try {
      const safeName = sanitizeFileName(cvData.fullName || 'mon-cv');

      if (format === 'pdf') {
        const element = document.querySelector('.cv-preview-content') as HTMLElement;
        if (!element) throw new Error('Aperçu non trouvé');
        const html2pdf = (await import('html2pdf.js')).default;
        await html2pdf().set({
          margin: 0,
          filename: `${safeName}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        }).from(element).save();
      } else if (format === 'png') {
        const element = document.querySelector('.cv-preview-content') as HTMLElement;
        if (!element) throw new Error('Aperçu non trouvé');
        const { toPng } = await import('html-to-image');
        const dataUrl = await toPng(element, {
          pixelRatio: 2,
          cacheBust: true,
          backgroundColor: '#ffffff',
        });
        const link = document.createElement('a');
        link.download = `${safeName}.png`;
        link.href = dataUrl;
        link.click();
      } else if (format === 'docx') {
        const { Document, Packer, Paragraph, TextRun, AlignmentType } = await import('docx');
        const doc = buildDocx(cvData, cvStyle, { Document, Paragraph, TextRun, AlignmentType });
        const blob = await Packer.toBlob(doc);
        downloadBlob(blob, `${safeName}.docx`);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Export error:', err);
      alert('Erreur lors de l\'export. Veuillez réessayer.');
    } finally {
      setExporting(null);
    }
  };

  const formats: { format: ExportFormat; label: string; icon: typeof FileText; description: string }[] = [
    { format: 'pdf', label: 'PDF', icon: FileText, description: 'Recommandé pour les recruteurs' },
    { format: 'png', label: 'PNG', icon: ImageIcon, description: 'Image haute qualité' },
    { format: 'docx', label: 'DOCX', icon: FileType, description: 'Éditable dans Word' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <Download className="w-5 h-5 text-slate-700" />
        <h3 className="font-semibold text-slate-900">Exporter</h3>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {formats.map(({ format, label, icon: Icon, description }) => (
          <button
            key={format}
            onClick={() => handleExport(format)}
            disabled={exporting !== null}
            className="group flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all disabled:opacity-50"
          >
            {exporting === format ? (
              <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
            ) : success && exporting === null ? (
              <CheckCircle className="w-7 h-7 text-green-500" />
            ) : (
              <Icon className="w-7 h-7 text-slate-600 group-hover:text-blue-600 transition-colors" />
            )}
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <span className="text-[10px] text-slate-400 text-center hidden sm:block">{description}</span>
          </button>
        ))}
      </div>
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 p-2.5 bg-green-50 text-green-700 rounded-lg text-sm"
        >
          <CheckCircle className="w-4 h-4" />
          Export réussi ! Vérifiez vos téléchargements.
        </motion.div>
      )}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Compatible ATS - Optimisé pour les recruteurs</span>
      </div>
    </div>
  );
}

function buildDocx(cvData: any, style: CVStyle, docx: any): any {
  const { Document, Paragraph, TextRun, AlignmentType } = docx;
  const children: any[] = [];

  children.push(new Paragraph({
    children: [new TextRun({ text: cvData.fullName || '', bold: true, size: 48, color: style.primaryColor.replace('#', '') })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }));

  if (cvData.jobTitle) {
    children.push(new Paragraph({
      children: [new TextRun({ text: cvData.jobTitle, size: 28, color: style.accentColor.replace('#', '') })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }));
  }

  const contactInfo = [cvData.email, cvData.phone, cvData.location].filter(Boolean).join(' | ');
  if (contactInfo) {
    children.push(new Paragraph({
      children: [new TextRun({ text: contactInfo, size: 20, color: '666666' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }));
  }

  if (cvData.summary) {
    children.push(new Paragraph({
      children: [new TextRun({ text: 'PROFIL', bold: true, size: 24, color: style.primaryColor.replace('#', '') })],
      spacing: { before: 200, after: 100 },
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: cvData.summary, size: 22 })],
      spacing: { after: 200 },
    }));
  }

  if (cvData.experience?.length > 0) {
    children.push(new Paragraph({
      children: [new TextRun({ text: 'EXPÉRIENCE PROFESSIONNELLE', bold: true, size: 24, color: style.primaryColor.replace('#', '') })],
      spacing: { before: 200, after: 100 },
    }));
    cvData.experience.forEach((exp: any) => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: exp.position || '', bold: true, size: 22 }),
          new TextRun({ text: ` - ${exp.company || ''}`, size: 22, color: '666666' }),
        ],
        spacing: { after: 50 },
      }));
      if (exp.startDate || exp.endDate) {
        children.push(new Paragraph({
          children: [new TextRun({ text: `${exp.startDate || ''} - ${exp.endDate || ''}`, italics: true, size: 20, color: '888888' })],
          spacing: { after: 50 },
        }));
      }
      if (exp.description) {
        children.push(new Paragraph({
          children: [new TextRun({ text: exp.description, size: 22 })],
          spacing: { after: 200 },
        }));
      }
    });
  }

  if (cvData.education?.length > 0) {
    children.push(new Paragraph({
      children: [new TextRun({ text: 'FORMATION', bold: true, size: 24, color: style.primaryColor.replace('#', '') })],
      spacing: { before: 200, after: 100 },
    }));
    cvData.education.forEach((edu: any) => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: edu.degree || '', bold: true, size: 22 }),
          new TextRun({ text: ` - ${edu.school || ''}`, size: 22, color: '666666' }),
        ],
        spacing: { after: 50 },
      }));
      if (edu.startDate || edu.endDate) {
        children.push(new Paragraph({
          children: [new TextRun({ text: `${edu.startDate || ''} - ${edu.endDate || ''}`, italics: true, size: 20, color: '888888' })],
          spacing: { after: 200 },
        }));
      }
    });
  }

  if (cvData.skills?.length > 0) {
    children.push(new Paragraph({
      children: [new TextRun({ text: 'COMPÉTENCES', bold: true, size: 24, color: style.primaryColor.replace('#', '') })],
      spacing: { before: 200, after: 100 },
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: cvData.skills.join(' • '), size: 22 })],
      spacing: { after: 200 },
    }));
  }

  if (cvData.languages?.length > 0) {
    children.push(new Paragraph({
      children: [new TextRun({ text: 'LANGUES', bold: true, size: 24, color: style.primaryColor.replace('#', '') })],
      spacing: { before: 200, after: 100 },
    }));
    children.push(new Paragraph({
      children: [new TextRun({ text: cvData.languages.map((l: any) => `${l.name} (${l.level})`).join(' • '), size: 22 })],
    }));
  }

  return new Document({
    sections: [{ properties: {}, children }],
  });
}
