import { useState, useRef } from 'react';
import { useCV } from '../../context/CVContext';
import { motion } from 'framer-motion';
import { Plus, X, ChevronLeft, ChevronRight, Upload, User, Sparkles, Lightbulb, Loader2, Wand2 } from 'lucide-react';
import TemplateSelector from './TemplateSelector';
import CVPreview from './CVPreview';
import StyleEditor from './StyleEditor';
import ExportPanel from './ExportPanel';
import AIRecommendations from './AIRecommendations';
import { extractCVWithAI } from '../../services/ai';
import { extractCVWithRegex } from '../../services/regexExtraction';
import type { CVData } from '../../types';

type EditorTab = 'content' | 'template' | 'style' | 'ai';

function SkillTags({ skills, onAdd, onRemove }: { skills: string[]; onAdd: (s: string) => void; onRemove: (s: string) => void }) {
  const [input, setInput] = useState('');
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      onAdd(input);
      setInput('');
    }
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill) => (
          <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            {skill}
            <button onClick={() => onRemove(skill)} className="hover:text-blue-900">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
        placeholder="Tapez une compétence et appuyez sur Entrée..."
      />
    </div>
  );
}

function AIResumeGenerator() {
  const { setCVData } = useCV();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    try {
      const regexResult = extractCVWithRegex(text);
      let extracted: Partial<CVData> = regexResult;

      try {
        const aiResult = await extractCVWithAI(text);
        // Merge: AI takes priority, but fill gaps with regex
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
      } catch {
        // AI failed — use regex result only
        extracted = regexResult;
      }

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
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la génération');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div className="flex items-center gap-2 mb-2">
        <Wand2 className="w-5 h-5 text-blue-600" />
        <h3 className="text-sm font-semibold text-slate-900">AI Resume Generator</h3>
      </div>
      <p className="text-xs text-slate-600 mb-3">Paste or type your experience, skills, and education below. AI will structure it into a professional resume.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        placeholder="Ex: Je m'appelle Jean Dupont, je suis développeur Full Stack avec 5 ans d'expérience. J'ai travaillé chez TechCorp de 2020 à 2023 sur React et Node.js. Diplômé de l'EPITECH en 2020. Compétences: JavaScript, React, Node.js, Python, Docker..."
      />
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      <button
        onClick={generate}
        disabled={loading || !text.trim()}
        className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Génération en cours...</> : <><Sparkles className="w-4 h-4" /> Generate Resume with AI</>}
      </button>
    </div>
  );
}

export default function CVEditor() {
  const { cvData, setCVData, setStep, cvStyle, setCVStyle } = useCV();
  const [activeTab, setActiveTab] = useState<EditorTab>('content');
  const [showPreview, setShowPreview] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: string, value: string) => setCVData({ ...cvData, [field]: value });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCVData({ ...cvData, photo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };
  const removePhoto = () => setCVData({ ...cvData, photo: null });

  const addExperience = () => setCVData({ ...cvData, experience: [...cvData.experience, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }] });
  const updateExperience = (id: string, field: string, value: string) => setCVData({ ...cvData, experience: cvData.experience.map((e) => e.id === id ? { ...e, [field]: value } : e) });
  const removeExperience = (id: string) => setCVData({ ...cvData, experience: cvData.experience.filter((e) => e.id !== id) });

  const addEducation = () => setCVData({ ...cvData, education: [...cvData.education, { id: Date.now().toString(), school: '', degree: '', field: '', startDate: '', endDate: '' }] });
  const updateEducation = (id: string, field: string, value: string) => setCVData({ ...cvData, education: cvData.education.map((e) => e.id === id ? { ...e, [field]: value } : e) });
  const removeEducation = (id: string) => setCVData({ ...cvData, education: cvData.education.filter((e) => e.id !== id) });

  const addSkill = (skill: string) => { const t = skill.trim(); if (t && !cvData.skills.includes(t)) setCVData({ ...cvData, skills: [...cvData.skills, t] }); };
  const removeSkill = (skill: string) => setCVData({ ...cvData, skills: cvData.skills.filter((s) => s !== skill) });

  const addLanguage = () => setCVData({ ...cvData, languages: [...cvData.languages, { id: Date.now().toString(), name: '', level: '' }] });
  const updateLanguage = (id: string, field: string, value: string) => setCVData({ ...cvData, languages: cvData.languages.map((l) => l.id === id ? { ...l, [field]: value } : l) });
  const removeLanguage = (id: string) => setCVData({ ...cvData, languages: cvData.languages.filter((l) => l.id !== id) });

  const inputClass = 'w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all';
  const labelClass = 'text-sm font-medium text-slate-700 mb-1 block';

  const tabs: { id: EditorTab; label: string }[] = [
    { id: 'content', label: 'Contenu' },
    { id: 'template', label: 'Modèle' },
    { id: 'style', label: 'Style' },
    { id: 'ai', label: 'IA' },
  ];

  const renderContent = () => (
    <div className="space-y-6">
      <AIResumeGenerator />

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Personal Info</h3>
        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl mb-4">
          <div className="flex-shrink-0">
            {cvData.photo ? (
              <div className="relative">
                <img src={cvData.photo} alt="" className="w-24 h-24 rounded-xl object-cover border-2 border-slate-200" />
                <button onClick={removePhoto} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-xl bg-slate-200 flex items-center justify-center border-2 border-dashed border-slate-300"><User className="w-8 h-8 text-slate-400" /></div>
            )}
          </div>
          <div className="flex-1">
            <label className={labelClass}>Upload Photo</label>
            <p className="text-xs text-slate-500 mb-2">Ajoutez une photo pour personnaliser votre CV.</p>
            <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            <button onClick={() => photoInputRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"><Upload className="w-4 h-4" />{cvData.photo ? 'Changer la photo' : 'Ajouter une photo'}</button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><label className={labelClass}>Poste recherché</label><input type="text" value={cvData.jobTitle} onChange={(e) => updateField('jobTitle', e.target.value)} className={inputClass} placeholder="Ex: Développeur Full Stack" /></div>
          <div><label className={labelClass}>Prénom et Nom</label><input type="text" value={cvData.fullName} onChange={(e) => updateField('fullName', e.target.value)} className={inputClass} placeholder="Jean Dupont" /></div>
          <div><label className={labelClass}>Email</label><input type="email" value={cvData.email} onChange={(e) => updateField('email', e.target.value)} className={inputClass} placeholder="jean@email.com" /></div>
          <div><label className={labelClass}>Téléphone</label><input type="text" value={cvData.phone} onChange={(e) => updateField('phone', e.target.value)} className={inputClass} placeholder="+33 6 12 34 56 78" /></div>
          <div><label className={labelClass}>Localisation</label><input type="text" value={cvData.location} onChange={(e) => updateField('location', e.target.value)} className={inputClass} placeholder="Paris, France" /></div>
        </div>
        <div className="mt-4"><label className={labelClass}>Résumé</label><textarea value={cvData.summary} onChange={(e) => updateField('summary', e.target.value)} className={`${inputClass} h-24 resize-none`} placeholder="Résumé professionnel..." /></div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-semibold text-slate-900">Experience</h3><button onClick={addExperience} className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"><Plus className="w-4 h-4" /> Add</button></div>
        <div className="space-y-3">
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} className={inputClass} placeholder="Poste" />
                <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className={inputClass} placeholder="Entreprise" />
                <input type="text" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className={inputClass} placeholder="Date de début" />
                <input type="text" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} className={inputClass} placeholder="Date de fin" />
              </div>
              <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className={`${inputClass} h-16 resize-none`} placeholder="Description..." />
              <button onClick={() => removeExperience(exp.id)} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"><X className="w-3.5 h-3.5" /> Supprimer</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Skills</h3>
        <SkillTags skills={cvData.skills} onAdd={addSkill} onRemove={removeSkill} />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-semibold text-slate-900">Education</h3><button onClick={addEducation} className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"><Plus className="w-4 h-4" /> Add</button></div>
        <div className="space-y-3">
          {cvData.education.map((edu) => (
            <div key={edu.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} className={inputClass} placeholder="École / Université" />
                <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className={inputClass} placeholder="Diplôme" />
                <input type="text" value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} className={inputClass} placeholder="Domaine" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} className={inputClass} placeholder="Début" />
                  <input type="text" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} className={inputClass} placeholder="Fin" />
                </div>
              </div>
              <button onClick={() => removeEducation(edu.id)} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"><X className="w-3.5 h-3.5" /> Supprimer</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3"><label className={labelClass}>Langues</label><button onClick={addLanguage} className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"><Plus className="w-4 h-4" /> Ajouter</button></div>
        <div className="space-y-3">
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-3">
              <input type="text" value={lang.name} onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)} className={inputClass} placeholder="Langue" />
              <input type="text" value={lang.level} onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)} className={inputClass} placeholder="Niveau" />
              <button onClick={() => removeLanguage(lang.id)} className="text-red-500 hover:text-red-600"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-8 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setStep('upload')} className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Back</button>
            <h2 className="text-xl font-bold text-slate-900">CV Builder</h2>
          </div>
          <button onClick={() => setShowPreview(!showPreview)} className="md:hidden inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
            {showPreview ? <><ChevronLeft className="w-4 h-4" /> Édition</> : <>Aperçu <ChevronRight className="w-4 h-4" /></>}
          </button>
        </div>
        <div className="flex gap-8">
          <div className={`flex-1 ${showPreview ? 'hidden md:block' : ''}`}>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="flex border-b border-slate-200">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>{tab.label}</button>
                ))}
              </div>
              <div className="p-6">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  {activeTab === 'content' && renderContent()}
                  {activeTab === 'template' && <TemplateSelector />}
                  {activeTab === 'style' && <StyleEditor />}
                  {activeTab === 'ai' && <AIRecommendations />}
                </motion.div>
              </div>
            </div>
          </div>
          <div className={`w-[500px] flex-shrink-0 ${showPreview ? '' : 'hidden md:block'}`}>
            <div className="sticky top-24 space-y-4">
              <CVPreview />
              <ExportPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
