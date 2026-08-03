import { useRef } from 'react';
import { useCV } from '../../context/CVContext';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Wrench, Languages, Star } from 'lucide-react';

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

  const LogoBadge = ({ color = 'opacity-70' }: { color?: string }) => (
    <div className={`absolute top-3 right-3 ${color}`}>
      <img src="/assets/logo_ae2i.png" alt="AE2I" className="h-5 w-auto" />
    </div>
  );

  // ============ SHARED COMPONENTS ============

  const Name = ({ className, color }: { className?: string; color?: string }) => (
    <h1 className={`font-bold ${className || 'text-2xl'}`} style={color ? { color } : undefined}>
      {cvData.fullName || 'Votre Nom'}
    </h1>
  );

  const JobTitle = ({ className, color }: { className?: string; color?: string }) => (
    <p className={className || 'text-base'} style={{ color: color || cvStyle.primaryColor }}>
      {cvData.jobTitle || 'Votre Poste'}
    </p>
  );

  const Contact = ({ centered, className, color = 'text-slate-500', iconColor }: { centered?: boolean; className?: string; color?: string; iconColor?: string }) => {
    const items = [];
    if (cvData.email) items.push({ icon: <Mail className="w-3.5 h-3.5" />, text: cvData.email });
    if (cvData.phone) items.push({ icon: <Phone className="w-3.5 h-3.5" />, text: cvData.phone });
    if (cvData.location) items.push({ icon: <MapPin className="w-3.5 h-3.5" />, text: cvData.location });
    if (items.length === 0) return null;
    return (
      <div className={`flex flex-wrap items-center gap-3 text-sm ${centered ? 'justify-center' : ''} ${className || ''}`}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            <span style={{ color: iconColor || cvStyle.primaryColor }}>{item.icon}</span>
            <span className={color}>{item.text}</span>
          </span>
        ))}
      </div>
    );
  };

  const SectionTitle = ({ children, icon, color, centered }: { children: React.ReactNode; icon?: React.ReactNode; color?: string; centered?: boolean }) => (
    <div className={`flex items-center gap-2 mb-2 ${centered ? 'justify-center' : ''}`}>
      {icon && <span style={{ color: color || cvStyle.primaryColor }}>{icon}</span>}
      <h3 className="font-semibold text-sm uppercase tracking-wider" style={{ color: color || cvStyle.primaryColor }}>{children}</h3>
    </div>
  );

  const Experience = ({ className, variant = 'default', color }: { className?: string; variant?: 'default' | 'timeline' | 'card' | 'inline'; color?: string }) => {
    if (cvData.experience.length === 0) return null;
    const titleColor = color || cvStyle.primaryColor;
    if (variant === 'timeline') {
      return (
        <div className={`mb-4 ${className || ''}`}>
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: titleColor }}>Expérience</h3>
          <div className="relative pl-5 border-l-2" style={{ borderColor: titleColor }}>
            {cvData.experience.map((exp) => (
              <div key={exp.id} className="mb-4 relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full" style={{ backgroundColor: titleColor }} />
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-sm text-slate-900">{exp.position}</span>
                  <span className="text-xs text-slate-400">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}</span>
                </div>
                <p className="text-sm font-medium text-slate-600">{exp.company}</p>
                {exp.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (variant === 'card') {
      return (
        <div className={`mb-4 ${className || ''}`}>
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: titleColor }}>Expérience</h3>
          <div className="space-y-3">
            {cvData.experience.map((exp) => (
              <div key={exp.id} className="p-3 rounded-lg border" style={{ borderColor: cvStyle.primaryColor + '20' }}>
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-sm text-slate-900">{exp.position}</span>
                  <span className="text-xs text-slate-400">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}</span>
                </div>
                <p className="text-sm font-medium text-slate-600">{exp.company}</p>
                {exp.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className={`mb-4 ${className || ''}`}>
        <SectionTitle icon={<Briefcase className="w-4 h-4" />} color={titleColor}>Expérience</SectionTitle>
        <div className="space-y-3">
          {cvData.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-sm text-slate-900">{exp.position}</span>
                <span className="text-xs text-slate-400">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}</span>
              </div>
              <p className="text-sm font-medium text-slate-600">{exp.company}</p>
              {exp.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{exp.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Education = ({ className, variant = 'default', color }: { className?: string; variant?: 'default' | 'timeline' | 'card'; color?: string }) => {
    if (cvData.education.length === 0) return null;
    const titleColor = color || cvStyle.primaryColor;
    if (variant === 'timeline') {
      return (
        <div className={`mb-4 ${className || ''}`}>
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: titleColor }}>Formation</h3>
          <div className="relative pl-5 border-l-2" style={{ borderColor: titleColor }}>
            {cvData.education.map((edu) => (
              <div key={edu.id} className="mb-4 relative">
                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full" style={{ backgroundColor: titleColor }} />
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-sm text-slate-900">{edu.degree} {edu.field && `- ${edu.field}`}</span>
                  <span className="text-xs text-slate-400">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</span>
                </div>
                <p className="text-sm font-medium text-slate-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (variant === 'card') {
      return (
        <div className={`mb-4 ${className || ''}`}>
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: titleColor }}>Formation</h3>
          <div className="space-y-3">
            {cvData.education.map((edu) => (
              <div key={edu.id} className="p-3 rounded-lg border" style={{ borderColor: cvStyle.primaryColor + '20' }}>
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-sm text-slate-900">{edu.degree} {edu.field && `- ${edu.field}`}</span>
                  <span className="text-xs text-slate-400">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</span>
                </div>
                <p className="text-sm font-medium text-slate-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className={`mb-4 ${className || ''}`}>
        <SectionTitle icon={<GraduationCap className="w-4 h-4" />} color={titleColor}>Formation</SectionTitle>
        <div className="space-y-3">
          {cvData.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-sm text-slate-900">{edu.degree} {edu.field && `- ${edu.field}`}</span>
                <span className="text-xs text-slate-400">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</span>
              </div>
              <p className="text-sm font-medium text-slate-600">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Skills = ({ variant = 'pill', className, color }: { variant?: 'pill' | 'block' | 'outlined' | 'bars'; className?: string; color?: string }) => {
    if (cvData.skills.length === 0) return null;
    const c = color || cvStyle.primaryColor;
    if (variant === 'bars') {
      return (
        <div className={`mb-4 ${className || ''}`}>
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-3" style={{ color: c }}>Compétences</h3>
          <div className="space-y-2">
            {cvData.skills.map((skill, i) => (
              <div key={i}>
                <span className="text-xs text-slate-700">{skill}</span>
                <div className="h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '75%', backgroundColor: c }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className={`mb-4 ${className || ''}`}>
        <SectionTitle icon={<Wrench className="w-4 h-4" />} color={c}>Compétences</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {cvData.skills.map((skill, i) => (
            <span
              key={i}
              className={`px-3 py-1 text-xs font-medium ${variant === 'block' ? 'rounded text-white' : variant === 'outlined' ? 'rounded border' : 'rounded-full'}`}
              style={variant === 'block' ? { backgroundColor: c } : variant === 'outlined' ? { borderColor: c, color: c } : { backgroundColor: c + '15', color: c }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const Languages = ({ className, tags, color, dark }: { className?: string; tags?: boolean; color?: string; dark?: boolean }) => {
    if (cvData.languages.length === 0) return null;
    const c = color || cvStyle.primaryColor;
    return (
      <div className={`mb-4 ${className || ''}`}>
        <SectionTitle icon={<Languages className="w-4 h-4" />} color={c}>Langues</SectionTitle>
        {tags ? (
          <div className="flex flex-wrap gap-2">
            {cvData.languages.map((lang) => (
              <span key={lang.id} className="px-3 py-1 text-xs rounded-full font-medium" style={{ backgroundColor: dark ? 'rgba(255,255,255,0.15)' : 'bg-slate-100', color: dark ? 'white' : undefined }}>
                {dark ? `${lang.name} • ${lang.level}` : <><span style={{ color: c }}>{lang.name}</span> <span className="text-slate-500">• {lang.level}</span></>}
              </span>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {cvData.languages.map((lang) => (
              <div key={lang.id} className="flex items-center justify-between text-sm">
                <span className={dark ? 'text-white/80' : 'text-slate-900'}>{lang.name}</span>
                <span className={`text-xs ${dark ? 'text-white/50' : 'text-slate-500'}`}>{lang.level}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const Divider = ({ color }: { color?: string }) => (
    <div className="w-full h-px my-4" style={{ backgroundColor: color || cvStyle.dividerColor }} />
  );

  const Summary = ({ className, color }: { className?: string; color?: string }) => {
    if (!cvData.summary) return null;
    return (
      <div className={`mb-4 ${className || ''}`}>
        <p className="text-sm leading-relaxed" style={{ color: color || 'text-slate-700' }}>{cvData.summary}</p>
      </div>
    );
  };

  const Photo = ({ size = 'md', rounded = false, className, border }: { size?: 'sm' | 'md' | 'lg'; rounded?: boolean; className?: string; border?: boolean }) => {
    const sizeClasses = { sm: 'w-16 h-16', md: 'w-24 h-24', lg: 'w-32 h-32' };
    if (!cvData.photo) return null;
    return (
      <img
        src={cvData.photo}
        alt="Photo"
        className={`${sizeClasses[size]} ${rounded ? 'rounded-full' : 'rounded-xl'} object-cover ${border ? 'border-2' : ''} ${className || ''}`}
        style={border ? { borderColor: cvStyle.primaryColor } : undefined}
      />
    );
  };

  // ============ PASTEL RENDERERS ============

  const renderPastelRose = () => {
    const c = '#e11d48';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[35%] p-5" style={{ backgroundColor: c + '12' }}>
          <Name className="text-xl" color={c} />
          <JobTitle className="text-sm mt-1" color={c} />
          <div className="mt-4 space-y-2 text-xs text-slate-600">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" style={{ color: c }} /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" style={{ color: c }} /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" style={{ color: c }} /> {cvData.location}</p>}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2" style={{ color: c }}>Compétences</h3>
            <div className="flex flex-wrap gap-1.5">
              {cvData.skills.map((s, i) => <span key={i} className="px-2.5 py-1 text-xs rounded-full font-medium" style={{ backgroundColor: c + '18', color: c }}>{s}</span>)}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2" style={{ color: c }}>Langues</h3>
            <div className="space-y-1.5">
              {cvData.languages.map(l => <div key={l.id} className="flex justify-between text-xs"><span className="text-slate-700">{l.name}</span><span className="text-slate-400">{l.level}</span></div>)}
            </div>
          </div>
        </div>
        <div className="w-[65%] p-5">
          {cvData.summary && <div className="mb-4 p-3 rounded-xl" style={{ backgroundColor: c + '08' }}><p className="text-sm leading-relaxed text-slate-700">{cvData.summary}</p></div>}
          <Experience color={c} />
          <Education color={c} />
        </div>
      </div>
    );
  };

  const renderPastelLavender = () => {
    const c = '#7c3aed';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="p-6 rounded-b-3xl" style={{ background: `linear-gradient(135deg, ${c}15, ${c}08)` }}>
          <Name className="text-3xl" color={c} />
          <JobTitle className="text-base mt-1" color={c} />
          <Contact className="mt-3" color="text-slate-600" iconColor={c} />
        </div>
        <div className="p-6">
          <Summary />
          <div className="grid grid-cols-2 gap-5">
            <Experience color={c} />
            <Education color={c} />
          </div>
          <Skills color={c} variant="pill" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderPastelMint = () => {
    const c = '#0d9488';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[62%] p-5">
          <Name className="text-2xl" color={c} />
          <JobTitle className="text-sm mt-1" color={c} />
          <Contact className="mt-3" color="text-slate-600" iconColor={c} />
          <div className="w-full h-px my-4" style={{ backgroundColor: c + '30' }} />
          <Summary />
          <Experience color={c} />
          <Education color={c} />
        </div>
        <div className="w-[38%] p-5" style={{ backgroundColor: c + '0a' }}>
          <Skills color={c} variant="outlined" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderPastelPeach = () => {
    const c = '#ea580c';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="px-7 py-8 rounded-b-[2rem]" style={{ background: `linear-gradient(160deg, ${c}18, ${c}05)` }}>
          <div className="flex items-center gap-4">
            {cvData.photo ? <Photo size="md" rounded border /> : <div className="w-24 h-24 rounded-full border-2 flex items-center justify-center" style={{ borderColor: c }}><Star className="w-8 h-8" style={{ color: c + '40' }} /></div>}
            <div>
              <Name className="text-3xl" color={c} />
              <JobTitle className="text-base mt-1" color={c} />
              <Contact className="mt-2" color="text-slate-600" iconColor={c} />
            </div>
          </div>
        </div>
        <div className="p-6">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
          <Skills color={c} />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderPastelSky = () => {
    const c = '#0284c7';
    return (
      <div className="p-6" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="text-center mb-4">
          <Name className="text-3xl" color={c} />
          <JobTitle className="text-base mt-1" color={c} />
          <Contact centered className="mt-3" color="text-slate-600" iconColor={c} />
        </div>
        <div className="w-16 h-1 mx-auto my-4 rounded-full" style={{ backgroundColor: c }} />
        <Summary />
        <Experience color={c} />
        <Education color={c} />
        <Skills color={c} variant="pill" />
        <Languages color={c} />
      </div>
    );
  };

  const renderPastelButter = () => {
    const c = '#ca8a04';
    return (
      <div className="p-6" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-1 h-16 rounded-full" style={{ backgroundColor: c }} />
          <div>
            <Name className="text-2xl" color={c} />
            <JobTitle className="text-sm mt-1" color={c} />
            <Contact className="mt-2" color="text-slate-600" iconColor={c} />
          </div>
        </div>
        <Divider color={c + '30'} />
        <Summary />
        <div className="grid grid-cols-2 gap-5">
          <Experience color={c} />
          <Education color={c} />
        </div>
        <Skills color={c} />
        <Languages color={c} />
      </div>
    );
  };

  // ============ SOLID RENDERERS ============

  const renderSolidNavy = () => {
    const c = '#1e3a8a';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[35%] p-5 text-white" style={{ backgroundColor: c }}>
          <Name className="text-xl text-white" />
          <JobTitle className="text-xs text-white/70 mt-1" />
          <div className="mt-4 space-y-1.5 text-xs text-white/80">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Compétences</h3>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.map((s, i) => <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">{s}</span>)}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Langues</h3>
            {cvData.languages.map(l => <div key={l.id} className="flex justify-between text-xs text-white/80 mb-1"><span>{l.name}</span><span>{l.level}</span></div>)}
          </div>
        </div>
        <div className="w-[65%] p-5">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
        </div>
      </div>
    );
  };

  const renderSolidCharcoal = () => {
    const c = '#334155';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="px-7 py-6 text-white" style={{ backgroundColor: c }}>
          <Name className="text-3xl text-white" />
          <JobTitle className="text-sm text-white/70 mt-1" />
          <Contact className="mt-3" color="text-white/80" iconColor="white" />
        </div>
        <div className="p-6">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
          <Skills color={c} variant="block" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderSolidForest = () => {
    const c = '#166534';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[38%] p-5 text-white" style={{ backgroundColor: c }}>
          <Name className="text-xl text-white" />
          <div className="mt-3 space-y-1.5 text-xs text-white/80">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Profil</h3>
            <p className="text-xs text-white/80 leading-relaxed">{cvData.summary || 'Votre résumé...'}</p>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Langues</h3>
            {cvData.languages.map(l => <div key={l.id} className="flex justify-between text-xs text-white/80 mb-1"><span>{l.name}</span><span>{l.level}</span></div>)}
          </div>
        </div>
        <div className="w-[62%] p-5">
          <Experience color={c} />
          <Education color={c} />
          <Skills color={c} variant="outlined" />
        </div>
      </div>
    );
  };

  const renderSolidBurgundy = () => {
    const c = '#9f1239';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[40%] p-5 text-white" style={{ backgroundColor: c }}>
          <div className="mb-4">
            {cvData.photo && <img src={cvData.photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white/30" />}
            <Name className="text-xl text-white text-center" />
            <JobTitle className="text-xs text-white/70 mt-1 text-center" />
          </div>
          <div className="space-y-1.5 text-xs text-white/80">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Compétences</h3>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.map((s, i) => <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">{s}</span>)}
            </div>
          </div>
        </div>
        <div className="w-[60%] p-5">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderSolidSlate = () => {
    const c = '#475569';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="px-7 py-8 text-white relative" style={{ backgroundColor: c }}>
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10" style={{ backgroundColor: 'white', clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
          <Name className="text-3xl text-white" />
          <JobTitle className="text-sm text-white/70 mt-1" />
          <Contact className="mt-3" color="text-white/80" iconColor="white" />
        </div>
        <div className="p-6">
          <Summary />
          <div className="grid grid-cols-2 gap-5">
            <Experience color={c} />
            <Education color={c} />
          </div>
          <Skills color={c} variant="outlined" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderSolidEspresso = () => {
    const c = '#451a03';
    return (
      <div className="p-6" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="border-l-4 pl-4 mb-4" style={{ borderColor: c }}>
          <Name className="text-2xl" color={c} />
          <JobTitle className="text-sm mt-1" color={c} />
          <Contact className="mt-2" color="text-slate-600" iconColor={c} />
        </div>
        <Summary />
        <Experience color={c} />
        <Education color={c} />
        <Skills color={c} variant="pill" />
        <Languages color={c} />
      </div>
    );
  };

  // ============ GRADIENT RENDERERS ============

  const renderGradSunset = () => {
    const c1 = '#f97316', c2 = '#db2777';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[35%] p-5 text-white" style={{ background: `linear-gradient(180deg, ${c1}, ${c2})` }}>
          <Name className="text-xl text-white" />
          <JobTitle className="text-xs text-white/80 mt-1" />
          <div className="mt-4 space-y-1.5 text-xs text-white/90">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Compétences</h3>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.map((s, i) => <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/25 text-white">{s}</span>)}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Langues</h3>
            {cvData.languages.map(l => <div key={l.id} className="flex justify-between text-xs text-white/90 mb-1"><span>{l.name}</span><span>{l.level}</span></div>)}
          </div>
        </div>
        <div className="w-[65%] p-5">
          <Summary />
          <Experience color={c1} />
          <Education color={c1} />
        </div>
      </div>
    );
  };

  const renderGradOcean = () => {
    const c1 = '#0ea5e9', c2 = '#1e40af';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[62%] p-5">
          <Name className="text-2xl" color={c1} />
          <JobTitle className="text-sm mt-1" color={c1} />
          <Contact className="mt-3" color="text-slate-600" iconColor={c1} />
          <div className="w-full h-px my-4" style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }} />
          <Summary />
          <Experience color={c1} />
          <Education color={c1} />
        </div>
        <div className="w-[38%] p-5 text-white" style={{ background: `linear-gradient(180deg, ${c1}, ${c2})` }}>
          <Skills color="white" variant="block" />
          <Languages color="white" dark />
        </div>
      </div>
    );
  };

  const renderGradAurora = () => {
    const c1 = '#059669', c2 = '#0891b2';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="px-7 py-8 text-white" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
          <Name className="text-3xl text-white" />
          <JobTitle className="text-sm text-white/80 mt-1" />
          <Contact className="mt-3" color="text-white/90" iconColor="white" />
        </div>
        <div className="p-6">
          <Summary />
          <div className="grid grid-cols-2 gap-5">
            <Experience color={c1} />
            <Education color={c1} />
          </div>
          <Skills color={c1} variant="pill" />
          <Languages color={c1} />
        </div>
      </div>
    );
  };

  const renderGradTwilight = () => {
    const c1 = '#6366f1', c2 = '#9333ea';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[38%] p-5 text-white" style={{ background: `linear-gradient(180deg, ${c1}, ${c2})` }}>
          {cvData.photo && <img src={cvData.photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white/30" />}
          <Name className="text-xl text-white text-center" />
          <JobTitle className="text-xs text-white/80 mt-1 text-center" />
          <div className="mt-4 space-y-1.5 text-xs text-white/90">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Compétences</h3>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.map((s, i) => <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/25 text-white">{s}</span>)}
            </div>
          </div>
        </div>
        <div className="w-[62%] p-5">
          <Summary />
          <Experience color={c1} />
          <Education color={c1} />
          <Languages color={c1} />
        </div>
      </div>
    );
  };

  const renderGradEmber = () => {
    const c1 = '#dc2626', c2 = '#ea580c';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[60%] p-5">
          <Name className="text-2xl" color={c2} />
          <JobTitle className="text-sm mt-1" color={c2} />
          <Contact className="mt-3" color="text-slate-600" iconColor={c2} />
          <div className="w-full h-1 my-4 rounded-full" style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }} />
          <Summary />
          <Experience color={c2} />
          <Education color={c2} />
        </div>
        <div className="w-[40%] p-5 text-white" style={{ background: `linear-gradient(180deg, ${c1}, ${c2})` }}>
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-3 text-white/90">Compétences</h3>
          <div className="space-y-2 mb-5">
            {cvData.skills.map((s, i) => (
              <div key={i}>
                <span className="text-xs text-white/90">{s}</span>
                <div className="h-1 bg-white/20 rounded-full mt-1 overflow-hidden">
                  <div className="h-full rounded-full bg-white" style={{ width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Langues</h3>
          {cvData.languages.map(l => <div key={l.id} className="flex justify-between text-xs text-white/90 mb-1"><span>{l.name}</span><span>{l.level}</span></div>)}
        </div>
      </div>
    );
  };

  // ============ PROFESSIONAL RENDERERS ============

  const renderProfCorporate = () => {
    const c = '#1e40af';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[30%] p-5" style={{ backgroundColor: c + '08' }}>
          <Name className="text-lg" color={c} />
          <JobTitle className="text-xs mt-1" color={c} />
          <div className="mt-4 space-y-1.5 text-xs text-slate-600">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" style={{ color: c }} /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" style={{ color: c }} /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" style={{ color: c }} /> {cvData.location}</p>}
          </div>
          <Skills color={c} variant="outlined" />
          <Languages color={c} />
        </div>
        <div className="w-[70%] p-5">
          <Summary />
          <Experience color={c} variant="card" />
          <Education color={c} variant="card" />
        </div>
      </div>
    );
  };

  const renderProfExecutive = () => {
    const c = '#0f172a';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="px-8 py-6 text-white" style={{ background: `linear-gradient(135deg, ${c}, ${cvStyle.primaryColor})` }}>
          <Name className="text-4xl font-light text-white" />
          <JobTitle className="text-white/70 mt-1" />
          <Contact className="mt-4" color="text-white/60" iconColor="white" />
        </div>
        <div className="px-8 py-6">
          {cvData.summary && (
            <div className="mb-5">
              <h3 className="font-semibold text-xs uppercase tracking-widest mb-2" style={{ color: c }}>Profil</h3>
              <p className="text-sm leading-relaxed text-slate-700">{cvData.summary}</p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <Experience color={c} />
              <Education color={c} />
            </div>
            <div>
              <Skills color={c} variant="outlined" />
              <Languages color={c} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfConsultant = () => {
    const c = '#1e293b';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="flex items-center gap-4 px-7 py-5 border-l-4" style={{ borderColor: c }}>
          <div className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: c }}>
            {cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="flex-1">
            <Name className="text-2xl" color={c} />
            <JobTitle className="text-sm mt-0.5" color={c} />
            <Contact className="mt-1" color="text-slate-600" iconColor={c} />
          </div>
        </div>
        <div className="px-7 py-5">
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <Summary />
              <Experience color={c} />
              <Education color={c} />
            </div>
            <div>
              <Skills color={c} variant="outlined" />
              <Languages color={c} tags />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfAttorney = () => {
    const c = '#1c1917';
    return (
      <div className="p-7" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="text-center mb-4 pb-4 border-b-2" style={{ borderColor: c }}>
          <Name className="text-3xl tracking-wide" color={c} />
          <JobTitle className="text-sm mt-1 uppercase tracking-widest" color={c} />
          <Contact centered className="mt-3" color="text-slate-600" iconColor={c} />
        </div>
        <Summary />
        <Experience color={c} />
        <Education color={c} />
        <div className="grid grid-cols-2 gap-6">
          <Skills color={c} variant="outlined" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderProfBanker = () => {
    const c = '#1e3a5f';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[35%] p-5 text-white" style={{ backgroundColor: c }}>
          <Name className="text-xl text-white" />
          <JobTitle className="text-xs text-white/70 mt-1" />
          <div className="mt-4 space-y-1.5 text-xs text-white/80">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Compétences</h3>
            <div className="space-y-2">
              {cvData.skills.map((s, i) => (
                <div key={i}>
                  <span className="text-xs text-white/80">{s}</span>
                  <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <div className="h-full rounded-full bg-white/60" style={{ width: '80%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Langues</h3>
            {cvData.languages.map(l => <div key={l.id} className="flex justify-between text-xs text-white/80 mb-1"><span>{l.name}</span><span>{l.level}</span></div>)}
          </div>
        </div>
        <div className="w-[65%] p-5">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
        </div>
      </div>
    );
  };

  // ============ CREATIVE RENDERERS ============

  const renderCreatPopArt = () => {
    const c = '#e11d48';
    return (
      <div className="p-6" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="flex items-end gap-3 mb-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-3xl" style={{ backgroundColor: c }}>
            {cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}
          </div>
          <div>
            <Name className="text-3xl font-black" color={c} />
            <JobTitle className="text-sm font-bold uppercase tracking-wider" color={c} />
          </div>
        </div>
        <Contact className="mb-4" color="text-slate-600" iconColor={c} />
        <div className="flex gap-1 mb-4">
          {cvData.skills.slice(0, 5).map((s, i) => (
            <div key={i} className="px-3 py-1.5 text-xs font-bold rounded-lg text-white" style={{ backgroundColor: c, transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}>{s}</div>
          ))}
        </div>
        <Divider color={c} />
        <Experience color={c} />
        <Education color={c} />
        <Languages color={c} tags />
      </div>
    );
  };

  const renderCreatSage = () => {
    const c = '#4d7c0f';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="px-7 py-6 rounded-b-[2.5rem]" style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}>
          <Name className="text-3xl text-white" />
          <JobTitle className="text-white/80 mt-1" />
          <Contact className="mt-3" color="text-white/70" iconColor="white" />
        </div>
        <div className="p-6">
          <Summary />
          <div className="grid grid-cols-2 gap-5">
            <Experience color={c} />
            <Education color={c} />
          </div>
          <Skills color={c} variant="pill" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderCreatCosmic = () => {
    const c = '#7c3aed';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[35%] p-5 text-white" style={{ background: `linear-gradient(180deg, ${c}, #312e81)` }}>
          {cvData.photo ? <img src={cvData.photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white/30" /> : <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-white/10 flex items-center justify-center"><Star className="w-8 h-8 text-white/40" /></div>}
          <Name className="text-xl text-white text-center" />
          <JobTitle className="text-xs text-white/70 mt-1 text-center" />
          <div className="mt-4 space-y-1.5 text-xs text-white/90">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Compétences</h3>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.map((s, i) => <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">{s}</span>)}
            </div>
          </div>
        </div>
        <div className="w-[65%] p-5">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderCreatTerracotta = () => {
    const c = '#c2410c';
    return (
      <div className="p-6" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="flex gap-4 mb-5">
          <div className="w-2 h-auto rounded-full" style={{ backgroundColor: c }} />
          <div className="flex-1">
            <Name className="text-3xl" color={c} />
            <JobTitle className="text-sm mt-1" color={c} />
            <Contact className="mt-3" color="text-slate-600" iconColor={c} />
          </div>
        </div>
        <div className="border-l-4 pl-4" style={{ borderColor: c }}>
          <Summary />
          <Experience color={c} />
          <Education color={c} />
          <Skills color={c} />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  // ============ MINIMAL RENDERERS ============

  const renderMinMono = () => {
    return (
      <div className="p-7" style={{ fontFamily: cvStyle.fontFamily }}>
        <Name className="text-2xl font-light tracking-tight" />
        <JobTitle className="text-sm font-light" />
        <Contact className="mt-3" />
        <div className="w-full h-px my-5 bg-slate-200" />
        <Summary />
        <Experience />
        <Education />
        <Skills variant="outlined" />
        <Languages />
      </div>
    );
  };

  const renderMinPaper = () => {
    return (
      <div className="p-7" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="mb-4">
          <Name className="text-2xl" />
          <JobTitle className="text-sm text-slate-500 mt-1" />
        </div>
        <Contact className="mb-4" />
        <Summary />
        <Experience />
        <Education />
        <Skills />
        <Languages />
      </div>
    );
  };

  const renderMinNordic = () => {
    const c = '#0891b2';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[58%] p-6">
          <Name className="text-2xl font-light" />
          <JobTitle className="text-sm text-slate-500 mt-1" />
          <Contact className="mt-3" />
          <div className="w-full h-px my-5 bg-slate-100" />
          <Summary />
          <Experience color={c} />
          <Education color={c} />
        </div>
        <div className="w-[42%] p-6 bg-slate-50">
          <Skills color={c} variant="pill" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderMinZen = () => {
    const c = '#78716c';
    return (
      <div className="p-7 text-center" style={{ fontFamily: cvStyle.fontFamily }}>
        <Name className="text-2xl font-light" />
        <div className="w-12 h-px bg-slate-300 mx-auto my-3" />
        <JobTitle className="text-sm text-slate-500" />
        <Contact centered className="mt-3" />
        <div className="text-left mt-5">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
          <Skills color={c} variant="outlined" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  // ============ CLASSIC RENDERERS ============

  const renderClsExecBlack = () => {
    const c = '#18181b';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[33%] p-5 text-white" style={{ backgroundColor: c }}>
          <Name className="text-xl text-white" />
          <JobTitle className="text-xs text-white/60 mt-1" />
          <div className="mt-4 space-y-1.5 text-xs text-white/70">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/60">Compétences</h3>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.map((s, i) => <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/15 text-white">{s}</span>)}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/60">Langues</h3>
            {cvData.languages.map(l => <div key={l.id} className="flex justify-between text-xs text-white/70 mb-1"><span>{l.name}</span><span>{l.level}</span></div>)}
          </div>
        </div>
        <div className="w-[67%] p-5">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
        </div>
      </div>
    );
  };

  const renderClsSlate = () => {
    const c = '#475569';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[67%] p-5">
          <Name className="text-2xl" color={c} />
          <JobTitle className="text-sm mt-1" color={c} />
          <Contact className="mt-3" color="text-slate-600" iconColor={c} />
          <div className="w-full h-px my-4" style={{ backgroundColor: c }} />
          <Summary />
          <Experience color={c} />
          <Education color={c} />
        </div>
        <div className="w-[33%] p-5" style={{ backgroundColor: c + '08' }}>
          <Skills color={c} variant="outlined" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderClsNavy = () => {
    const c = '#1e3a8a';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[32%] p-5 text-white" style={{ backgroundColor: c }}>
          <Name className="text-lg text-white" />
          <div className="mt-3 space-y-1.5 text-xs text-white/80">
            {cvData.email && <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/80">Compétences</h3>
            <div className="flex flex-wrap gap-1">
              {cvData.skills.map((s, i) => <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">{s}</span>)}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/80">Langues</h3>
            {cvData.languages.map(l => <div key={l.id} className="flex justify-between text-xs text-white/80 mb-1"><span>{l.name}</span><span>{l.level}</span></div>)}
          </div>
        </div>
        <div className="w-[68%] p-5">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
        </div>
      </div>
    );
  };

  const renderClsCharcoalSteel = () => {
    const c = '#374151';
    return (
      <div className="flex relative" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="w-[68%] p-5">
          <Name className="text-2xl" color={c} />
          <JobTitle className="text-sm mt-1" color={c} />
          <Contact className="mt-3" color="text-slate-600" iconColor={c} />
          <div className="w-full h-0.5 my-4" style={{ backgroundColor: c }} />
          <Summary />
          <Experience color={c} />
          <Education color={c} />
        </div>
        <div className="w-[32%] p-5 text-white" style={{ backgroundColor: c }}>
          <Skills color="white" variant="block" />
          <Languages color="white" dark />
        </div>
      </div>
    );
  };

  const renderClsObsidian = () => {
    const c = '#0f172a';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="px-7 py-6 text-white" style={{ backgroundColor: c }}>
          <Name className="text-3xl text-white" />
          <JobTitle className="text-sm text-white/60 mt-1" />
          <Contact className="mt-3" color="text-white/70" iconColor="white" />
        </div>
        <div className="p-6">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
          <Skills color={c} variant="block" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderClsSteelBlue = () => {
    const c = '#334155';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="px-7 py-7 text-white relative" style={{ backgroundColor: c }}>
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10" style={{ backgroundColor: 'white', clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
          <Name className="text-3xl text-white" />
          <JobTitle className="text-sm text-white/70 mt-1" />
          <Contact className="mt-3" color="text-white/80" iconColor="white" />
        </div>
        <div className="p-6">
          <Summary />
          <div className="grid grid-cols-2 gap-5">
            <Experience color={c} />
            <Education color={c} />
          </div>
          <Skills color={c} variant="outlined" />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  const renderClsGraphite = () => {
    const c = '#1f2937';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="flex items-center gap-4 px-7 py-5 border-b-4" style={{ borderColor: c }}>
          {cvData.photo ? <Photo size="sm" rounded border /> : <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: c }}>{cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}</div>}
          <div>
            <Name className="text-2xl" color={c} />
            <JobTitle className="text-sm mt-0.5" color={c} />
            <Contact className="mt-1" color="text-slate-600" iconColor={c} />
          </div>
        </div>
        <div className="p-6">
          <Summary />
          <Experience color={c} />
          <Education color={c} />
          <div className="grid grid-cols-2 gap-5">
            <Skills color={c} />
            <Languages color={c} />
          </div>
        </div>
      </div>
    );
  };

  const renderClsAdmiral = () => {
    const c = '#1e3a5f';
    return (
      <div style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="px-7 py-6 text-white" style={{ background: `linear-gradient(135deg, ${c}, #0f172a)` }}>
          <Name className="text-3xl font-light text-white" />
          <JobTitle className="text-white/70 mt-1" />
          <Contact className="mt-3" color="text-white/60" iconColor="white" />
        </div>
        <div className="px-7 py-5">
          <Summary />
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <Experience color={c} />
              <Education color={c} />
            </div>
            <div>
              <Skills color={c} variant="outlined" />
              <Languages color={c} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderClsIvoryBlack = () => {
    const c = '#1c1917';
    return (
      <div className="p-7" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="text-center pb-4 mb-4 border-b-2" style={{ borderColor: c }}>
          <Name className="text-3xl" color={c} />
          <JobTitle className="text-sm mt-1 uppercase tracking-widest" color={c} />
          <Contact centered className="mt-3" color="text-slate-600" iconColor={c} />
        </div>
        <Summary />
        <Experience color={c} />
        <Education color={c} />
        <Skills color={c} variant="pill" />
        <Languages color={c} />
      </div>
    );
  };

  const renderClsSmoke = () => {
    const c = '#52525b';
    return (
      <div className="p-7" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="flex items-center gap-4 mb-4">
          {cvData.photo ? <Photo size="md" rounded border /> : null}
          <div>
            <Name className="text-2xl" color={c} />
            <JobTitle className="text-sm mt-1" color={c} />
            <Contact className="mt-2" color="text-slate-600" iconColor={c} />
          </div>
        </div>
        <div className="w-full h-px my-4" style={{ backgroundColor: c }} />
        <Summary />
        <Experience color={c} />
        <Education color={c} />
        <Skills color={c} />
        <Languages color={c} />
      </div>
    );
  };

  const renderClsMidnight = () => {
    const c = '#1e293b';
    return (
      <div className="p-6" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="mb-5 pb-3 border-b-2" style={{ borderColor: c }}>
          <Name className="text-2xl" color={c} />
          <JobTitle className="text-sm mt-1" color={c} />
          <Contact className="mt-2" color="text-slate-600" iconColor={c} />
        </div>
        <Summary />
        <Experience color={c} variant="card" />
        <Education color={c} variant="card" />
        <Skills color={c} variant="pill" />
        <Languages color={c} />
      </div>
    );
  };

  const renderClsStone = () => {
    const c = '#44403c';
    return (
      <div className="p-6" style={{ fontFamily: cvStyle.fontFamily }}>
        <div className="flex items-center gap-4 mb-5">
          {cvData.photo ? <Photo size="md" className="rounded-lg" border /> : <div className="w-24 h-24 rounded-lg bg-slate-100 flex items-center justify-center"><span className="text-xs text-slate-400">Photo</span></div>}
          <div>
            <Name className="text-2xl" color={c} />
            <JobTitle className="text-sm mt-1" color={c} />
            <Contact className="mt-2" color="text-slate-600" iconColor={c} />
          </div>
        </div>
        <Summary />
        <div className="grid grid-cols-2 gap-4">
          <Experience color={c} />
          <Education color={c} />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Skills color={c} />
          <Languages color={c} />
        </div>
      </div>
    );
  };

  // ============ TEMPLATE REGISTRY ============

  const renderers: Record<string, () => React.ReactNode> = {
    pastelRose: renderPastelRose,
    pastelLavender: renderPastelLavender,
    pastelMint: renderPastelMint,
    pastelPeach: renderPastelPeach,
    pastelSky: renderPastelSky,
    pastelButter: renderPastelButter,
    solidNavy: renderSolidNavy,
    solidCharcoal: renderSolidCharcoal,
    solidForest: renderSolidForest,
    solidBurgundy: renderSolidBurgundy,
    solidSlate: renderSolidSlate,
    solidEspresso: renderSolidEspresso,
    gradSunset: renderGradSunset,
    gradOcean: renderGradOcean,
    gradAurora: renderGradAurora,
    gradTwilight: renderGradTwilight,
    gradEmber: renderGradEmber,
    profCorporate: renderProfCorporate,
    profExecutive: renderProfExecutive,
    profConsultant: renderProfConsultant,
    profAttorney: renderProfAttorney,
    profBanker: renderProfBanker,
    creatPopArt: renderCreatPopArt,
    creatSage: renderCreatSage,
    creatCosmic: renderCreatCosmic,
    creatTerracotta: renderCreatTerracotta,
    minMono: renderMinMono,
    minPaper: renderMinPaper,
    minNordic: renderMinNordic,
    minZen: renderMinZen,
    clsExecBlack: renderClsExecBlack,
    clsSlate: renderClsSlate,
    clsNavy: renderClsNavy,
    clsCharcoalSteel: renderClsCharcoalSteel,
    clsObsidian: renderClsObsidian,
    clsSteelBlue: renderClsSteelBlue,
    clsGraphite: renderClsGraphite,
    clsAdmiral: renderClsAdmiral,
    clsIvoryBlack: renderClsIvoryBlack,
    clsSmoke: renderClsSmoke,
    clsMidnight: renderClsMidnight,
    clsStone: renderClsStone,
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
            <div style={{ fontFamily: cvStyle.fontFamily }}>{renderFn()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
