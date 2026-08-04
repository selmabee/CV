import { useRef } from 'react';
import { useCV } from '../../context/CVContext';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Wrench, Languages } from 'lucide-react';

export default function CVPreview() {
  const { cvData, selectedTemplate, cvStyle } = useCV();
  const previewRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Logo fixed top-right on ALL templates — white background for visibility
  const LogoBadge = () => (
    <div className="absolute top-2 right-2 z-10 bg-white rounded-md px-1.5 py-1 shadow-sm">
      <img src="/assets/logo_ae2i.png" alt="AE2I" className="h-4 w-auto" />
    </div>
  );

  // ============ SHARED PARTIALS ============

  const ContactRow = ({ color = 'text-slate-500', iconColor, centered, size = 'text-[11px]' }: { color?: string; iconColor?: string; centered?: boolean; size?: string }) => {
    const items = [];
    if (cvData.email) items.push({ icon: <Mail className="w-3 h-3" />, text: cvData.email });
    if (cvData.phone) items.push({ icon: <Phone className="w-3 h-3" />, text: cvData.phone });
    if (cvData.location) items.push({ icon: <MapPin className="w-3 h-3" />, text: cvData.location });
    if (items.length === 0) return null;
    return (
      <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${size} ${centered ? 'justify-center' : ''}`}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span style={{ color: iconColor || cvStyle.primaryColor }}>{item.icon}</span>
            <span className={color}>{item.text}</span>
          </span>
        ))}
      </div>
    );
  };

  // Section title — clean uppercase with thin underline
  const SectionTitle = ({ children, color, icon, centered, underline = true }: { children: React.ReactNode; color: string; icon?: React.ReactNode; centered?: boolean; underline?: boolean }) => (
    <div className="mb-4">
      <div className={`flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
        {icon && <span style={{ color }}>{icon}</span>}
        <h3 className="font-bold text-[10px] uppercase tracking-[0.12em]" style={{ color }}>{children}</h3>
      </div>
      {underline && <div className="h-px mt-1.5" style={{ backgroundColor: color, opacity: 0.2 }} />}
    </div>
  );

  // Experience — clean timeline or structured list
  const ExpList = ({ color, bullets = false }: { color: string; bullets?: boolean }) => {
    if (cvData.experience.length === 0) return null;
    return (
      <div className="space-y-4">
        {cvData.experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-semibold text-[12px] text-slate-900">{exp.position}</span>
              <span className="text-[10px] text-slate-400 whitespace-nowrap">{formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Présent'}</span>
            </div>
            <p className="text-[11px] font-medium mb-0.5" style={{ color }}>{exp.company}</p>
            {exp.description && (
              bullets ? (
                <ul className="mt-1 space-y-0.5">
                  {exp.description.split('\n').filter(Boolean).slice(0, 4).map((line, i) => (
                    <li key={i} className="text-[10px] text-slate-600 leading-relaxed flex gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[10px] text-slate-600 leading-relaxed">{exp.description}</p>
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  // Education — compact, structured
  const EduList = ({ color }: { color: string }) => {
    if (cvData.education.length === 0) return null;
    return (
      <div className="space-y-3">
        {cvData.education.map((edu) => (
          <div key={edu.id}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-semibold text-[12px] text-slate-900">{edu.degree}{edu.field && ` — ${edu.field}`}</span>
              <span className="text-[10px] text-slate-400 whitespace-nowrap">{formatDate(edu.startDate)} — {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</span>
            </div>
            <p className="text-[11px] font-medium" style={{ color }}>{edu.school}</p>
          </div>
        ))}
      </div>
    );
  };

  // Skills — pills/tags style (cv.fr style)
  const SkillsTags = ({ color, dark = false }: { color: string; dark?: boolean }) => {
    if (cvData.skills.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-1.5">
        {cvData.skills.map((s, i) => (
          <span key={i} className="px-2.5 py-1 text-[10px] font-medium rounded"
            style={dark ? { backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' } : { backgroundColor: color + '12', color }}>
            {s}
          </span>
        ))}
      </div>
    );
  };

  // Skills — dot list (minimal style)
  const SkillsDots = ({ color, dark = false }: { color: string; dark?: boolean }) => {
    if (cvData.skills.length === 0) return null;
    return (
      <div className="space-y-1.5">
        {cvData.skills.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: dark ? 'rgba(255,255,255,0.6)' : color }} />
            <span className={`text-[10px] ${dark ? 'text-white/85' : 'text-slate-700'}`}>{s}</span>
          </div>
        ))}
      </div>
    );
  };

  // Skills — progress bars
  const SkillsBars = ({ color, dark = false }: { color: string; dark?: boolean }) => {
    if (cvData.skills.length === 0) return null;
    return (
      <div className="space-y-2">
        {cvData.skills.map((s, i) => (
          <div key={i}>
            <span className={`text-[10px] ${dark ? 'text-white/85' : 'text-slate-700'}`}>{s}</span>
            <div className={`h-1 rounded-full mt-0.5 overflow-hidden ${dark ? 'bg-white/15' : 'bg-slate-100'}`}>
              <div className="h-full rounded-full" style={{ width: '80%', backgroundColor: dark ? 'rgba(255,255,255,0.7)' : color }} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Languages — compact list
  const LangList = ({ color, dark = false }: { color: string; dark?: boolean }) => {
    if (cvData.languages.length === 0) return null;
    return (
      <div className="space-y-1.5">
        {cvData.languages.map((lang) => (
          <div key={lang.id} className="flex items-center justify-between">
            <span className={`text-[10px] ${dark ? 'text-white/85' : 'text-slate-700'}`}>{lang.name}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${dark ? 'bg-white/15 text-white/70' : ''}`}
              style={!dark ? { backgroundColor: color + '10', color } : undefined}>
              {lang.level}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Summary
  const Summary = () => {
    if (!cvData.summary) return null;
    return <p className="text-[11px] leading-relaxed text-slate-600 mb-6">{cvData.summary}</p>;
  };

  // Header variants
  const HeaderLeft = ({ color, name, role }: { color: string; name: string; role: string }) => (
    <div className="mb-6">
      <h1 className="text-xl font-bold text-slate-900 leading-tight">{name}</h1>
      <p className="text-[12px] mt-0.5" style={{ color }}>{role}</p>
    </div>
  );

  const HeaderCenter = ({ color, name, role }: { color: string; name: string; role: string }) => (
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-slate-900 leading-tight">{name}</h1>
      <p className="text-[12px] mt-0.5 uppercase tracking-widest" style={{ color }}>{role}</p>
    </div>
  );

  // Dark sidebar (for sidebar templates)
  const DarkSidebar = ({ bg, accent }: { bg: string; accent?: string }) => (
    <div className="w-[35%] pt-10 p-5 flex flex-col gap-6" style={{ backgroundColor: bg }}>
      {cvData.photo && (
        <img src={cvData.photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white/20" />
      )}
      <div>
        <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Contact</h3>
        <div className="space-y-1.5 text-[10px] text-white/70">
          {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5 shrink-0" /> {cvData.email}</p>}
          {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5 shrink-0" /> {cvData.phone}</p>}
          {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5 shrink-0" /> {cvData.location}</p>}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Compétences</h3>
        <SkillsDots color={accent || bg} dark />
      </div>
      <div>
        <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Langues</h3>
        <LangList color={accent || bg} dark />
      </div>
    </div>
  );

  // Light main content (for sidebar templates)
  const LightMain = ({ color, bullets = true }: { color: string; bullets?: boolean }) => (
    <div className="flex-1 pt-10 p-6">
      <h1 className="text-lg font-bold text-slate-900 leading-tight">{cvData.fullName || 'Votre Nom'}</h1>
      <p className="text-[12px] mb-6" style={{ color }}>{cvData.jobTitle || 'Votre Poste'}</p>
      <Summary />
      <div className="mb-6">
        <SectionTitle color={color} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle>
        <ExpList color={color} bullets={bullets} />
      </div>
      <div>
        <SectionTitle color={color} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle>
        <EduList color={color} />
      </div>
    </div>
  );

  // ============ PASTEL — soft, contemporary ============

  const renderPastelRose = () => {
    const c = '#e11d48';
    return (
      <div className="flex h-full">
        <div className="w-[35%] pt-10 p-5" style={{ backgroundColor: c + '0a' }}>
          <h1 className="text-base font-bold leading-tight" style={{ color: c }}>{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[11px] mb-3" style={{ color: c + 'cc' }}>{cvData.jobTitle || 'Votre Poste'}</p>
          <div className="space-y-1.5 text-[10px] text-slate-600 mb-4">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" style={{ color: c }} /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" style={{ color: c }} /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5" style={{ color: c }} /> {cvData.location}</p>}
          </div>
          <div className="mb-4">
            <SectionTitle color={c}>Compétences</SectionTitle>
            <SkillsTags color={c} />
          </div>
          <div>
            <SectionTitle color={c}>Langues</SectionTitle>
            <LangList color={c} />
          </div>
        </div>
        <div className="flex-1 pt-10 p-5">
          <Summary />
          <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        </div>
      </div>
    );
  };

  const renderPastelLavender = () => {
    const c = '#7c3aed';
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-8 pb-4" style={{ backgroundColor: c + '06' }}>
          <h1 className="text-xl font-bold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px] mb-2" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-slate-500" iconColor={c} />
        </div>
        <div className="flex-1 p-6">
          <Summary />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
            </div>
            <div>
              <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
              <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPastelMint = () => {
    const c = '#0d9488';
    return (
      <div className="flex h-full">
        <div className="flex-1 pt-10 p-5">
          <HeaderLeft color={c} name={cvData.fullName || 'Votre Nom'} role={cvData.jobTitle || 'Votre Poste'} />
          <ContactRow color="text-slate-500" iconColor={c} />
          <div className="h-px my-4" style={{ backgroundColor: c, opacity: 0.2 }} />
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        </div>
        <div className="w-[33%] pt-10 p-5" style={{ backgroundColor: c + '06' }}>
          <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
          <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
        </div>
      </div>
    );
  };

  const renderPastelPeach = () => {
    const c = '#ea580c';
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-8 pb-4 flex items-center gap-4" style={{ backgroundColor: c + '06' }}>
          {cvData.photo ? <img src={cvData.photo} alt="" className="w-14 h-14 rounded-full object-cover border-2" style={{ borderColor: c }} /> : <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: c }}>{cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}</div>}
          <div>
            <h1 className="text-xl font-bold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
            <p className="text-[12px]" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
            <ContactRow color="text-slate-500" iconColor={c} />
          </div>
        </div>
        <div className="flex-1 p-6">
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          <div className="grid grid-cols-2 gap-6">
            <div><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderPastelSky = () => {
    const c = '#0284c7';
    return (
      <div className="h-full pt-10 p-6 flex flex-col items-center text-center">
        <HeaderCenter color={c} name={cvData.fullName || 'Votre Nom'} role={cvData.jobTitle || 'Votre Poste'} />
        <ContactRow centered color="text-slate-500" iconColor={c} />
        <div className="w-12 h-0.5 my-4 rounded-full" style={{ backgroundColor: c }} />
        <div className="w-full text-left">
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />} underline={false} centered>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />} underline={false} centered>Formation</SectionTitle><EduList color={c} /></div>
          <div className="grid grid-cols-2 gap-6">
            <div><SectionTitle color={c} underline={false} centered>Compétences</SectionTitle><SkillsTags color={c} /></div>
            <div><SectionTitle color={c} underline={false} centered>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderPastelButter = () => {
    const c = '#ca8a04';
    return (
      <div className="h-full pt-10 p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-1 h-14 rounded-full" style={{ backgroundColor: c }} />
          <div>
            <h1 className="text-xl font-bold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
            <p className="text-[12px]" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
            <ContactRow color="text-slate-500" iconColor={c} />
          </div>
        </div>
        <div className="h-px mb-4" style={{ backgroundColor: c, opacity: 0.2 }} />
        <Summary />
        <div className="grid grid-cols-2 gap-6">
          <div>
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
            <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          </div>
          <div>
            <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  // ============ SOLID — strong contrast ============

  const renderSolidNavy = () => { const c = '#1e3a8a'; return (<div className="flex h-full"><DarkSidebar bg={c} /><LightMain color={c} bullets /></div>); };
  const renderSolidForest = () => {
    const c = '#166534';
    return (
      <div className="flex h-full">
        <div className="w-[36%] pt-10 p-5 text-white" style={{ backgroundColor: c }}>
          <h1 className="text-base font-bold leading-tight">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[11px] text-white/60 mb-3">{cvData.jobTitle || 'Votre Poste'}</p>
          <div className="space-y-1.5 text-[10px] text-white/70 mb-4">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5" /> {cvData.location}</p>}
          </div>
          <div className="mb-4">
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-2">Profil</h3>
            <p className="text-[10px] text-white/70 leading-relaxed">{cvData.summary || 'Votre résumé...'}</p>
          </div>
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Langues</h3>
          <LangList color={c} dark />
        </div>
        <div className="flex-1 pt-10 p-5">
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          <SectionTitle color={c}>Compétences</SectionTitle>
          <SkillsTags color={c} />
        </div>
      </div>
    );
  };

  const renderSolidCharcoal = () => {
    const c = '#334155';
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-8 pb-4 text-white" style={{ backgroundColor: c }}>
          <h1 className="text-xl font-bold">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px] text-white/60 mb-4">{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-white/70" iconColor="white" />
        </div>
        <div className="flex-1 p-6">
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          <div className="grid grid-cols-2 gap-6">
            <div><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderSolidBurgundy = () => {
    const c = '#9f1239';
    return (
      <div className="flex h-full">
        <div className="w-[36%] pt-10 p-5 text-white flex flex-col items-center text-center" style={{ backgroundColor: c }}>
          {cvData.photo ? <img src={cvData.photo} alt="" className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-white/20" /> : <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xl mb-3">{cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}</div>}
          <h1 className="text-base font-bold leading-tight">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[11px] text-white/60 mb-3">{cvData.jobTitle || 'Votre Poste'}</p>
          <div className="w-full space-y-1.5 text-[10px] text-white/70 text-left mb-4">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5" /> {cvData.location}</p>}
          </div>
          <div className="w-full text-left">
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Compétences</h3>
            <SkillsDots color={c} dark />
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-2 mt-4">Langues</h3>
            <LangList color={c} dark />
          </div>
        </div>
        <LightMain color={c} bullets />
      </div>
    );
  };

  const renderSolidSlate = () => {
    const c = '#475569';
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-8 pb-4 text-white" style={{ backgroundColor: c }}>
          <h1 className="text-xl font-bold">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px] text-white/60 mb-4">{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-white/70" iconColor="white" />
        </div>
        <div className="flex-1 pt-10 p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Summary />
            <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          </div>
          <div>
            <SectionTitle color={c}>Compétences</SectionTitle>
            <SkillsBars color={c} />
            <div className="mt-4"><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderSolidEspresso = () => {
    const c = '#451a03';
    return (
      <div className="h-full pt-10 p-6">
        <div className="border-l-4 pl-4 mb-4" style={{ borderColor: c }}>
          <h1 className="text-xl font-bold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px]" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-slate-500" iconColor={c} />
        </div>
        <Summary />
        <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        <div className="grid grid-cols-2 gap-6">
          <div><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
          <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
        </div>
      </div>
    );
  };

  // ============ GRADIENT — contemporary ============

  const renderGradSunset = () => {
    const c = '#f97316'; const grad = 'linear-gradient(180deg, #f97316, #db2777)';
    return (
      <div className="flex h-full">
        <div className="w-[35%] pt-10 p-5 text-white" style={{ background: grad }}>
          {cvData.photo && <img src={cvData.photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white/20" />}
          <h1 className="text-base font-bold text-center leading-tight">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[11px] text-white/70 text-center mb-3">{cvData.jobTitle || 'Votre Poste'}</p>
          <div className="space-y-1.5 text-[10px] text-white/80 mb-4">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5" /> {cvData.location}</p>}
          </div>
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Compétences</h3>
          <SkillsDots color={c} dark />
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-2 mt-4">Langues</h3>
          <LangList color={c} dark />
        </div>
        <LightMain color={c} bullets />
      </div>
    );
  };

  const renderGradOcean = () => {
    const c = '#0ea5e9'; const grad = 'linear-gradient(180deg, #0ea5e9, #1e40af)';
    return (
      <div className="flex h-full">
        <div className="flex-1 pt-10 p-5">
          <HeaderLeft color={c} name={cvData.fullName || 'Votre Nom'} role={cvData.jobTitle || 'Votre Poste'} />
          <ContactRow color="text-slate-500" iconColor={c} />
          <div className="h-0.5 my-4 rounded-full" style={{ background: grad }} />
          <Summary />
          <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        </div>
        <div className="w-[35%] pt-10 p-5 text-white" style={{ background: grad }}>
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Compétences</h3>
          <SkillsBars color={c} dark />
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-2 mt-4">Langues</h3>
          <LangList color={c} dark />
        </div>
      </div>
    );
  };

  const renderGradAurora = () => {
    const c = '#059669'; const grad = 'linear-gradient(135deg, #059669, #0891b2)';
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-8 pb-4 text-white" style={{ background: grad }}>
          <h1 className="text-xl font-bold">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px] text-white/70 mb-4">{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-white/80" iconColor="white" />
        </div>
        <div className="flex-1 pt-10 p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Summary />
            <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          </div>
          <div>
            <SectionTitle color={c}>Compétences</SectionTitle>
            <SkillsBars color={c} />
            <div className="mt-4"><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderGradTwilight = () => {
    const c = '#6366f1'; const grad = 'linear-gradient(180deg, #6366f1, #9333ea)';
    return (
      <div className="flex h-full">
        <div className="w-[36%] pt-10 p-5 text-white flex flex-col items-center text-center" style={{ background: grad }}>
          {cvData.photo ? <img src={cvData.photo} alt="" className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-white/20" /> : <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xl mb-3">{cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}</div>}
          <h1 className="text-base font-bold leading-tight">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[11px] text-white/70 mb-3">{cvData.jobTitle || 'Votre Poste'}</p>
          <div className="w-full space-y-1.5 text-[10px] text-white/80 text-left mb-4">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5" /> {cvData.location}</p>}
          </div>
          <div className="w-full text-left">
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Compétences</h3>
            <SkillsDots color={c} dark />
            <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-2 mt-4">Langues</h3>
            <LangList color={c} dark />
          </div>
        </div>
        <LightMain color={c} bullets />
      </div>
    );
  };

  const renderGradEmber = () => {
    const c = '#dc2626'; const grad = 'linear-gradient(180deg, #dc2626, #ea580c)';
    return (
      <div className="flex h-full">
        <div className="flex-1 pt-10 p-5">
          <HeaderLeft color={c} name={cvData.fullName || 'Votre Nom'} role={cvData.jobTitle || 'Votre Poste'} />
          <ContactRow color="text-slate-500" iconColor={c} />
          <div className="h-0.5 my-4 rounded-full" style={{ background: grad }} />
          <Summary />
          <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        </div>
        <div className="w-[35%] pt-10 p-5 text-white" style={{ background: grad }}>
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Compétences</h3>
          <SkillsBars color={c} dark />
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-2 mt-4">Langues</h3>
          <LangList color={c} dark />
        </div>
      </div>
    );
  };

  // ============ PROFESSIONAL — tradition and precision ============

  const renderProfCorporate = () => {
    const c = '#1e40af';
    return (
      <div className="flex h-full">
        <div className="w-[30%] pt-10 p-5" style={{ backgroundColor: c + '05' }}>
          <h1 className="text-sm font-bold text-slate-900 leading-tight">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[10px] mb-3" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
          <div className="space-y-1.5 text-[10px] text-slate-600 mb-4">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" style={{ color: c }} /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" style={{ color: c }} /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5" style={{ color: c }} /> {cvData.location}</p>}
          </div>
          <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsBars color={c} /></div>
          <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
        </div>
        <div className="flex-1 pt-10 p-5">
          <Summary />
          <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        </div>
      </div>
    );
  };

  const renderProfExecutive = () => {
    const c = '#0f172a';
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-8 pb-4 text-white" style={{ background: `linear-gradient(135deg, ${c}, ${cvStyle.primaryColor})` }}>
          <h1 className="text-2xl font-light">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px] text-white/60 mb-4">{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-white/50" iconColor="white" />
        </div>
        <div className="flex-1 pt-10 p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Summary />
            <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          </div>
          <div>
            <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsDots color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfConsultant = () => {
    const c = '#1e293b';
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 px-6 pt-8 py-4 border-l-4" style={{ borderColor: c }}>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: c }}>{cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}</div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
            <p className="text-[11px]" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
            <ContactRow color="text-slate-500" iconColor={c} />
          </div>
        </div>
        <div className="flex-1 pt-10 p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Summary />
            <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          </div>
          <div>
            <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsDots color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfAttorney = () => {
    const c = '#1c1917';
    return (
      <div className="h-full pt-10 p-6 flex flex-col items-center text-center">
        <HeaderCenter color={c} name={cvData.fullName || 'Votre Nom'} role={cvData.jobTitle || 'Votre Poste'} />
        <ContactRow centered color="text-slate-500" iconColor={c} />
        <div className="w-full h-px my-4" style={{ backgroundColor: c }} />
        <div className="w-full text-left">
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />} underline={false} centered>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />} underline={false} centered>Formation</SectionTitle><EduList color={c} /></div>
          <div className="grid grid-cols-2 gap-6">
            <div><SectionTitle color={c} underline={false} centered>Compétences</SectionTitle><SkillsDots color={c} /></div>
            <div><SectionTitle color={c} underline={false} centered>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfBanker = () => { const c = '#1e3a5f'; return (<div className="flex h-full"><DarkSidebar bg={c} /><LightMain color={c} bullets /></div>); };

  // ============ CREATIVE — bold, original ============

  const renderCreatPopArt = () => {
    const c = '#e11d48';
    return (
      <div className="h-full pt-10 p-6">
        <div className="flex items-end gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl" style={{ backgroundColor: c }}>{cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}</div>
          <div>
            <h1 className="text-xl font-black text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
          </div>
        </div>
        <ContactRow color="text-slate-500" iconColor={c} />
        <div className="h-px my-4" style={{ backgroundColor: c }} />
        <Summary />
        <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        <div className="grid grid-cols-2 gap-6">
          <div><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
          <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
        </div>
      </div>
    );
  };

  const renderCreatSage = () => {
    const c = '#4d7c0f';
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-8 pb-4 text-white" style={{ background: `linear-gradient(135deg, ${c}, #65a30d)` }}>
          <h1 className="text-xl font-bold">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px] text-white/70 mb-4">{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-white/60" iconColor="white" />
        </div>
        <div className="flex-1 pt-10 p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Summary />
            <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          </div>
          <div>
            <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderCreatCosmic = () => {
    const c = '#7c3aed';
    return (
      <div className="flex h-full">
        <div className="w-[35%] pt-10 p-5 text-white" style={{ background: 'linear-gradient(180deg, #7c3aed, #312e81)' }}>
          {cvData.photo ? <img src={cvData.photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white/20" /> : <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">{cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}</div>}
          <h1 className="text-base font-bold text-center leading-tight">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[11px] text-white/60 text-center mb-3">{cvData.jobTitle || 'Votre Poste'}</p>
          <div className="space-y-1.5 text-[10px] text-white/80 mb-4">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5" /> {cvData.location}</p>}
          </div>
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Compétences</h3>
          <SkillsDots color={c} dark />
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-2 mt-4">Langues</h3>
          <LangList color={c} dark />
        </div>
        <LightMain color={c} bullets />
      </div>
    );
  };

  const renderCreatTerracotta = () => {
    const c = '#c2410c';
    return (
      <div className="h-full pt-10 p-6">
        <div className="flex gap-4 mb-4">
          <div className="w-1.5 h-14 rounded-full" style={{ backgroundColor: c }} />
          <div>
            <h1 className="text-xl font-bold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
            <p className="text-[12px]" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
            <ContactRow color="text-slate-500" iconColor={c} />
          </div>
        </div>
        <div className="border-l-2 pl-4" style={{ borderColor: c + '30' }}>
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          <div className="grid grid-cols-2 gap-6">
            <div><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  // ============ MINIMAL — simplicity ============

  const renderMinMono = () => {
    const c = '#334155';
    return (
      <div className="h-full pt-10 p-6">
        <h1 className="text-xl font-light tracking-tight text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
        <p className="text-[12px] text-slate-500 mb-3">{cvData.jobTitle || 'Votre Poste'}</p>
        <ContactRow color="text-slate-400" iconColor="#94a3b8" />
        <div className="w-full h-px my-4 bg-slate-200" />
        <Summary />
        <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        <div className="grid grid-cols-2 gap-6">
          <div><SectionTitle color={c}>Compétences</SectionTitle><SkillsDots color={c} /></div>
          <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
        </div>
      </div>
    );
  };

  const renderMinPaper = () => {
    const c = '#334155';
    return (
      <div className="h-full pt-10 p-6">
        <h1 className="text-xl font-semibold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
        <p className="text-[12px] text-slate-500 mb-3">{cvData.jobTitle || 'Votre Poste'}</p>
        <ContactRow color="text-slate-400" iconColor="#94a3b8" />
        <div className="h-px my-4 bg-slate-100" />
        <Summary />
        <div className="mb-4"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />} underline={false}>Expérience</SectionTitle><ExpList color={c} /></div>
        <div className="mb-4"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />} underline={false}>Formation</SectionTitle><EduList color={c} /></div>
        <div className="grid grid-cols-2 gap-6">
          <div><SectionTitle color={c} underline={false}>Compétences</SectionTitle><SkillsTags color={c} /></div>
          <div><SectionTitle color={c} underline={false}>Langues</SectionTitle><LangList color={c} /></div>
        </div>
      </div>
    );
  };

  const renderMinNordic = () => {
    const c = '#0891b2';
    return (
      <div className="flex h-full">
        <div className="w-[60%] pt-10 p-6">
          <h1 className="text-xl font-light text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px] text-slate-500 mb-2">{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-slate-400" iconColor={c} />
          <div className="h-px my-4 bg-slate-100" />
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        </div>
        <div className="w-[40%] p-6 bg-slate-50">
          <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
          <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
        </div>
      </div>
    );
  };

  const renderMinZen = () => {
    const c = '#78716c';
    return (
      <div className="h-full pt-10 p-6 flex flex-col items-center text-center">
        <h1 className="text-xl font-light text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
        <div className="w-10 h-px bg-slate-300 my-2" />
        <p className="text-[12px] text-slate-500">{cvData.jobTitle || 'Votre Poste'}</p>
        <ContactRow centered color="text-slate-400" iconColor={c} />
        <div className="w-full text-left mt-4">
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />} underline={false} centered>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />} underline={false} centered>Formation</SectionTitle><EduList color={c} /></div>
          <div className="grid grid-cols-2 gap-6">
            <div><SectionTitle color={c} underline={false} centered>Compétences</SectionTitle><SkillsDots color={c} /></div>
            <div><SectionTitle color={c} underline={false} centered>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  // ============ CLASSIC — timeless, structured ============

  const renderClsExecBlack = () => { const c = '#18181b'; return (<div className="flex h-full"><DarkSidebar bg={c} /><LightMain color={c} bullets /></div>); };
  const renderClsNavy = () => { const c = '#1e3a8a'; return (<div className="flex h-full"><DarkSidebar bg={c} /><LightMain color={c} bullets /></div>); };

  const renderClsSlate = () => {
    const c = '#475569';
    return (
      <div className="flex h-full">
        <div className="w-[66%] pt-10 p-5">
          <HeaderLeft color={c} name={cvData.fullName || 'Votre Nom'} role={cvData.jobTitle || 'Votre Poste'} />
          <ContactRow color="text-slate-500" iconColor={c} />
          <div className="h-px my-4" style={{ backgroundColor: c }} />
          <Summary />
          <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        </div>
        <div className="w-[34%] pt-10 p-5" style={{ backgroundColor: c + '05' }}>
          <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsDots color={c} /></div>
          <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
        </div>
      </div>
    );
  };

  const renderClsCharcoalSteel = () => {
    const c = '#374151';
    return (
      <div className="flex h-full">
        <div className="w-[66%] pt-10 p-5">
          <HeaderLeft color={c} name={cvData.fullName || 'Votre Nom'} role={cvData.jobTitle || 'Votre Poste'} />
          <ContactRow color="text-slate-500" iconColor={c} />
          <div className="h-0.5 my-4" style={{ backgroundColor: c }} />
          <Summary />
          <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        </div>
        <div className="w-[34%] pt-10 p-5 text-white" style={{ backgroundColor: c }}>
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-3">Compétences</h3>
          <SkillsDots color={c} dark />
          <h3 className="font-bold text-[10px] uppercase tracking-wider text-white/90 mb-2 mt-4">Langues</h3>
          <LangList color={c} dark />
        </div>
      </div>
    );
  };

  const renderClsObsidian = () => {
    const c = '#0f172a';
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-8 pb-4 text-white" style={{ backgroundColor: c }}>
          <h1 className="text-xl font-bold">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px] text-white/60 mb-4">{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-white/70" iconColor="white" />
        </div>
        <div className="flex-1 p-6">
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          <div className="grid grid-cols-2 gap-6">
            <div><SectionTitle color={c}>Compétences</SectionTitle><SkillsDots color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderClsSteelBlue = () => {
    const c = '#334155';
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-8 pb-4 text-white" style={{ backgroundColor: c }}>
          <h1 className="text-xl font-bold">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px] text-white/60 mb-4">{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-white/70" iconColor="white" />
        </div>
        <div className="flex-1 pt-10 p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Summary />
            <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          </div>
          <div>
            <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsBars color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderClsGraphite = () => {
    const c = '#1f2937';
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 px-6 pt-8 py-4 border-b-2" style={{ borderColor: c }}>
          {cvData.photo ? <img src={cvData.photo} alt="" className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: c }} /> : <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: c }}>{cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}</div>}
          <div>
            <h1 className="text-lg font-bold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
            <p className="text-[11px]" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
            <ContactRow color="text-slate-500" iconColor={c} />
          </div>
        </div>
        <div className="flex-1 p-6">
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          <div className="grid grid-cols-2 gap-6">
            <div><SectionTitle color={c}>Compétences</SectionTitle><SkillsDots color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderClsAdmiral = () => {
    const c = '#1e3a5f';
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 pt-8 pb-4 text-white" style={{ background: `linear-gradient(135deg, ${c}, #0f172a)` }}>
          <h1 className="text-2xl font-light">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px] text-white/60 mb-4">{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-white/50" iconColor="white" />
        </div>
        <div className="flex-1 pt-10 p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Summary />
            <div><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          </div>
          <div>
            <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsDots color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderClsIvoryBlack = () => {
    const c = '#1c1917';
    return (
      <div className="h-full pt-10 p-6 flex flex-col items-center text-center">
        <HeaderCenter color={c} name={cvData.fullName || 'Votre Nom'} role={cvData.jobTitle || 'Votre Poste'} />
        <ContactRow centered color="text-slate-500" iconColor={c} />
        <div className="w-full h-px my-4" style={{ backgroundColor: c }} />
        <div className="w-full text-left">
          <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />} underline={false} centered>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />} underline={false} centered>Formation</SectionTitle><EduList color={c} /></div>
          <div className="grid grid-cols-2 gap-6">
            <div><SectionTitle color={c} underline={false} centered>Compétences</SectionTitle><SkillsDots color={c} /></div>
            <div><SectionTitle color={c} underline={false} centered>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderClsSmoke = () => {
    const c = '#52525b';
    return (
      <div className="h-full pt-10 p-6">
        <div className="flex items-center gap-4 mb-4">
          {cvData.photo && <img src={cvData.photo} alt="" className="w-14 h-14 rounded-full object-cover border-2" style={{ borderColor: c }} />}
          <div>
            <h1 className="text-lg font-bold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
            <p className="text-[12px]" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
            <ContactRow color="text-slate-500" iconColor={c} />
          </div>
        </div>
        <div className="h-px mb-4" style={{ backgroundColor: c }} />
        <Summary />
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          <div className="grid grid-cols-2 gap-6">
            <div><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
      </div>
    );
  };

  const renderClsMidnight = () => {
    const c = '#1e293b';
    return (
      <div className="h-full pt-10 p-6">
        <div className="pb-3 mb-4 border-b-2" style={{ borderColor: c }}>
          <h1 className="text-lg font-bold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
          <p className="text-[12px]" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
          <ContactRow color="text-slate-500" iconColor={c} />
        </div>
        <Summary />
        <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
          <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
        <div className="grid grid-cols-2 gap-6">
          <div><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
          <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
        </div>
      </div>
    );
  };

  const renderClsStone = () => {
    const c = '#44403c';
    return (
      <div className="h-full pt-10 p-6">
        <div className="flex items-center gap-4 mb-4">
          {cvData.photo ? <img src={cvData.photo} alt="" className="w-14 h-14 rounded-lg object-cover border-2" style={{ borderColor: c }} /> : <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-[10px]">Photo</div>}
          <div>
            <h1 className="text-lg font-bold text-slate-900">{cvData.fullName || 'Votre Nom'}</h1>
            <p className="text-[12px]" style={{ color: c }}>{cvData.jobTitle || 'Votre Poste'}</p>
            <ContactRow color="text-slate-500" iconColor={c} />
          </div>
        </div>
        <Summary />
        <div className="grid grid-cols-2 gap-6">
          <div>
          <div className="mb-6"><SectionTitle color={c} icon={<Briefcase className="w-3 h-3" />}>Expérience</SectionTitle><ExpList color={c} /></div>
            <div className="mb-6"><SectionTitle color={c} icon={<GraduationCap className="w-3 h-3" />}>Formation</SectionTitle><EduList color={c} /></div>
          </div>
          <div>
            <div className="mb-6"><SectionTitle color={c}>Compétences</SectionTitle><SkillsTags color={c} /></div>
            <div><SectionTitle color={c}>Langues</SectionTitle><LangList color={c} /></div>
          </div>
        </div>
      </div>
    );
  };

  // ============ REGISTRY ============

  const renderers: Record<string, () => React.ReactNode> = {
    pastelRose: renderPastelRose, pastelLavender: renderPastelLavender, pastelMint: renderPastelMint, pastelPeach: renderPastelPeach, pastelSky: renderPastelSky, pastelButter: renderPastelButter,
    solidNavy: renderSolidNavy, solidCharcoal: renderSolidCharcoal, solidForest: renderSolidForest, solidBurgundy: renderSolidBurgundy, solidSlate: renderSolidSlate, solidEspresso: renderSolidEspresso,
    gradSunset: renderGradSunset, gradOcean: renderGradOcean, gradAurora: renderGradAurora, gradTwilight: renderGradTwilight, gradEmber: renderGradEmber,
    profCorporate: renderProfCorporate, profExecutive: renderProfExecutive, profConsultant: renderProfConsultant, profAttorney: renderProfAttorney, profBanker: renderProfBanker,
    creatPopArt: renderCreatPopArt, creatSage: renderCreatSage, creatCosmic: renderCreatCosmic, creatTerracotta: renderCreatTerracotta,
    minMono: renderMinMono, minPaper: renderMinPaper, minNordic: renderMinNordic, minZen: renderMinZen,
    clsExecBlack: renderClsExecBlack, clsSlate: renderClsSlate, clsNavy: renderClsNavy, clsCharcoalSteel: renderClsCharcoalSteel, clsObsidian: renderClsObsidian, clsSteelBlue: renderClsSteelBlue, clsGraphite: renderClsGraphite, clsAdmiral: renderClsAdmiral, clsIvoryBlack: renderClsIvoryBlack, clsSmoke: renderClsSmoke, clsMidnight: renderClsMidnight, clsStone: renderClsStone,
  };

  const renderFn = renderers[selectedTemplate.renderKey] || renderers.pastelRose;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-4 bg-slate-100">
        <div className="max-w-[210mm] mx-auto">
          <div
            className="bg-white shadow-lg aspect-[210/297] overflow-hidden relative"
            style={cvStyle.backgroundImage ? { backgroundImage: `url(${cvStyle.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
          >
            <LogoBadge />
            <div style={{ fontFamily: cvStyle.fontFamily }} className="h-full">{renderFn()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
