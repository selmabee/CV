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

  const LogoBadge = () => (
    <div className="absolute top-3 right-3 opacity-70">
      <img src="/assets/logo_ae2i.png" alt="AE2I" className="h-5 w-auto" />
    </div>
  );

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative bg-white">
      <LogoBadge />
      <div style={{ fontFamily: cvStyle.fontFamily }}>{children}</div>
    </div>
  );

  const Name = ({ className }: { className?: string }) => (
    <h1 className={`font-bold text-slate-900 ${className || 'text-2xl'}`}>
      {cvData.fullName || 'Votre Nom'}
    </h1>
  );

  const JobTitle = ({ className }: { className?: string }) => (
    <p className={`text-slate-600 ${className || 'text-base'}`} style={{ color: cvStyle.primaryColor }}>
      {cvData.jobTitle || 'Votre Poste'}
    </p>
  );

  const Contact = ({ centered, className }: { centered?: boolean; className?: string }) => {
    const items = [];
    if (cvData.email) items.push({ icon: <Mail className="w-3.5 h-3.5" />, text: cvData.email });
    if (cvData.phone) items.push({ icon: <Phone className="w-3.5 h-3.5" />, text: cvData.phone });
    if (cvData.location) items.push({ icon: <MapPin className="w-3.5 h-3.5" />, text: cvData.location });
    if (items.length === 0) return null;
    return (
      <div className={`flex flex-wrap items-center gap-3 text-sm text-slate-500 ${centered ? 'justify-center' : ''} ${className || ''}`}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1" style={{ color: cvStyle.primaryColor }}>
            {item.icon}
            <span className="text-slate-500">{item.text}</span>
          </span>
        ))}
      </div>
    );
  };

  const Summary = ({ className }: { className?: string }) => {
    if (!cvData.summary) return null;
    return (
      <div className={`mb-4 ${className || ''}`}>
        <p className="text-sm leading-relaxed text-slate-700">{cvData.summary}</p>
      </div>
    );
  };

  const SectionTitle = ({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) => (
    <div className="flex items-center gap-2 mb-2">
      {icon && <span style={{ color: cvStyle.primaryColor }}>{icon}</span>}
      <h3 className="font-semibold text-sm uppercase tracking-wider" style={{ color: cvStyle.primaryColor }}>{children}</h3>
    </div>
  );

  const Experience = ({ className }: { className?: string }) => {
    if (cvData.experience.length === 0) return null;
    return (
      <div className={`mb-4 ${className || ''}`}>
        <SectionTitle icon={<Briefcase className="w-4 h-4" />}>Expérience</SectionTitle>
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

  const Education = ({ className }: { className?: string }) => {
    if (cvData.education.length === 0) return null;
    return (
      <div className={`mb-4 ${className || ''}`}>
        <SectionTitle icon={<GraduationCap className="w-4 h-4" />}>Formation</SectionTitle>
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

  const Skills = ({ variant, className }: { variant?: 'pill' | 'block' | 'outlined'; className?: string }) => {
    if (cvData.skills.length === 0) return null;
    return (
      <div className={`mb-4 ${className || ''}`}>
        <SectionTitle icon={<Wrench className="w-4 h-4" />}>Compétences</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {cvData.skills.map((skill, i) => (
            <span
              key={i}
              className={`px-3 py-1 text-xs font-medium ${variant === 'block' ? 'rounded text-white' : variant === 'outlined' ? 'rounded border' : 'rounded-full'}`}
              style={
                variant === 'block'
                  ? { backgroundColor: cvStyle.primaryColor }
                  : variant === 'outlined'
                  ? { borderColor: cvStyle.primaryColor, color: cvStyle.primaryColor }
                  : { backgroundColor: cvStyle.primaryColor + '15', color: cvStyle.primaryColor }
              }
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const Languages = ({ className, tags }: { className?: string; tags?: boolean }) => {
    if (cvData.languages.length === 0) return null;
    return (
      <div className={`mb-4 ${className || ''}`}>
        <SectionTitle icon={<Languages className="w-4 h-4" />}>Langues</SectionTitle>
        {tags ? (
          <div className="flex flex-wrap gap-2">
            {cvData.languages.map((lang) => (
              <span key={lang.id} className="px-3 py-1 text-xs rounded-full font-medium bg-slate-100 text-slate-700">
                {lang.name} • {lang.level}
              </span>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {cvData.languages.map((lang) => (
              <div key={lang.id} className="flex items-center justify-between text-sm">
                <span className="text-slate-900">{lang.name}</span>
                <span className="text-xs text-slate-500">{lang.level}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const Divider = () => cvStyle.sectionDividers ? <div className="w-full h-px my-4" style={{ backgroundColor: cvStyle.dividerColor }} /> : <div className="w-full h-2" />;

  const Photo = ({ size = 'md', rounded = false, className }: { size?: 'sm' | 'md' | 'lg'; rounded?: boolean; className?: string }) => {
    const sizeClasses = {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-32 h-32',
    };
    if (!cvData.photo) return null;
    return (
      <img
        src={cvData.photo}
        alt="Photo"
        className={`${sizeClasses[size]} ${rounded ? 'rounded-full' : 'rounded-xl'} object-cover ${className || ''}`}
      />
    );
  };

  // --- TEMPLATES ---

  const renderModern = () => (
    <div className="flex relative">
      <div className="w-[35%] p-5 text-white" style={{ backgroundColor: cvStyle.primaryColor }}>
        {cvData.photo && (
          <div className="mb-4">
            <img src={cvData.photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white/30" />
          </div>
        )}
        <div className="mb-4">
          <JobTitle className="text-xs text-white/70 uppercase tracking-wider font-medium" />
          <Name className="text-xl text-white" />
          {cvData.email && <p className="text-xs text-white/80 mt-1 flex items-center gap-1"><Mail className="w-3 h-3" /> {cvData.email}</p>}
          {cvData.phone && <p className="text-xs text-white/80 mt-1 flex items-center gap-1"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
          {cvData.location && <p className="text-xs text-white/80 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Profil</h3>
          <p className="text-xs text-white/80 leading-relaxed">{cvData.summary || 'Votre résumé professionnel...'}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Compétences</h3>
          <div className="flex flex-wrap gap-1">
            {cvData.skills.map((skill, i) => (
              <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">{skill}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Langues</h3>
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="flex items-center justify-between text-xs text-white/80 mb-1">
              <span>{lang.name}</span>
              <span>{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[65%] p-5">
        <Experience />
        <Education />
      </div>
    </div>
  );

  const renderClassic = () => (
    <div className="p-6">
      <JobTitle className="text-sm font-semibold uppercase tracking-wider" />
      <Name />
      <Contact className="mt-2" />
      <Divider />
      <Summary />
      <Experience />
      <Education />
      <Skills />
      <Languages />
    </div>
  );

  const renderCreative = () => (
    <div className="p-6">
      <div className="flex gap-4 mb-5">
        <div className="w-2 h-auto rounded-full" style={{ backgroundColor: cvStyle.primaryColor }} />
        <div className="flex-1">
          <Name className="text-3xl" />
          <Contact className="mt-2" />
          {cvData.summary && <p className="text-sm text-slate-700 mt-3 leading-relaxed">{cvData.summary}</p>}
        </div>
      </div>
      <Divider />
      <Experience />
      <Education />
      <Skills />
      <Languages />
    </div>
  );

  const renderMinimal = () => (
    <div className="p-6">
      <div className="mb-4">
        <Name className="text-3xl" />
        <Contact className="mt-2" />
      </div>
      <Divider />
      <Summary />
      <Experience />
      <Education />
      <Skills variant="outlined" />
      <Languages />
    </div>
  );

  const renderGradient = () => (
    <div className="relative">
      <div className="p-6" style={{ background: `linear-gradient(135deg, ${cvStyle.primaryColor}, ${cvStyle.primaryColor}dd)` }}>
        <div className="text-white">
          <Name className="text-3xl text-white" />
          <Contact className="mt-2 text-white/90" />
        </div>
      </div>
      <div className="p-6">
        <Summary />
        <Experience />
        <Education />
        <Skills />
        <Languages />
      </div>
    </div>
  );

  const renderCard = () => (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <Name />
        <Contact className="mt-2" />
        {cvData.summary && <p className="text-sm text-slate-700 mt-3 leading-relaxed">{cvData.summary}</p>}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <Experience />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <Education />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <Skills />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <Languages />
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="p-6">
      <div className="mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
      </div>
      {cvData.summary && <div className="mb-4"><p className="text-sm text-slate-700 leading-relaxed">{cvData.summary}</p></div>}
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: cvStyle.primaryColor }}>Expérience</h3>
        <div className="relative pl-5 border-l-2" style={{ borderColor: cvStyle.primaryColor }}>
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="mb-4 relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full" style={{ backgroundColor: cvStyle.primaryColor }} />
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
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: cvStyle.primaryColor }}>Formation</h3>
        <div className="relative pl-5 border-l-2" style={{ borderColor: cvStyle.primaryColor }}>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="mb-4 relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full" style={{ backgroundColor: cvStyle.primaryColor }} />
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-sm text-slate-900">{edu.degree} {edu.field && `- ${edu.field}`}</span>
                <span className="text-xs text-slate-400">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</span>
              </div>
              <p className="text-sm font-medium text-slate-600">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
      <Skills />
      <Languages />
    </div>
  );

  const renderSplit = () => (
    <div className="flex relative">
      <div className="w-[40%] p-5 text-white" style={{ backgroundColor: cvStyle.primaryColor }}>
        <div className="mb-4">
          <Name className="text-xl text-white" />
          <div className="mt-2 space-y-1 text-xs text-white/80">
            {cvData.email && <p className="flex items-center gap-1"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Compétences</h3>
          <div className="flex flex-wrap gap-1">
            {cvData.skills.map((skill, i) => (
              <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">{skill}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Langues</h3>
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="flex items-center justify-between text-xs text-white/80 mb-1">
              <span>{lang.name}</span>
              <span>{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[60%] p-5">
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Profil</h3>
          <p className="text-xs text-white/80 leading-relaxed">{cvData.summary || 'Votre résumé professionnel...'}</p>
        </div>
        <Experience />
        <Education />
      </div>
    </div>
  );

  const renderCorporate = () => (
    <div className="p-6">
      <div className="mb-4 pb-3 border-b-2 border-slate-900">
        <Name className="text-3xl tracking-tight" />
        <Contact className="mt-2" />
      </div>
      <Summary />
      <Experience />
      <Education />
      <div className="grid grid-cols-2 gap-6">
        <Skills />
        <Languages />
      </div>
    </div>
  );

  const renderBold = () => (
    <div className="p-6">
      <Name className="text-4xl font-black uppercase tracking-tighter" />
      <Contact className="mt-3 font-semibold" />
      <div className="w-full h-1 mt-4 mb-4" style={{ backgroundColor: cvStyle.primaryColor }} />
      <Summary />
      <Experience />
      <Education />
      <Skills variant="block" />
      <Languages tags />
    </div>
  );

  const renderElegant = () => (
    <div className="p-6 text-center">
      <Name className="text-2xl font-light tracking-wide" />
      <div className="w-16 h-px bg-slate-300 mx-auto my-3" />
      <Contact centered />
      {cvData.summary && (
        <div className="my-4 p-4 border-l-2 rounded bg-slate-50 border-slate-200">
          <p className="text-sm italic text-slate-700">{cvData.summary}</p>
        </div>
      )}
      <div className="my-4">
        <h3 className="font-light text-xs uppercase tracking-widest text-center text-slate-900">— Expérience —</h3>
        <div className="space-y-3 mt-3">
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="text-center">
              <p className="font-semibold text-sm text-slate-900">{exp.position}</p>
              <p className="text-xs text-slate-500">{exp.company} • {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}</p>
              {exp.description && <p className="text-xs text-slate-500 mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      </div>
      <div className="my-4">
        <h3 className="font-light text-xs uppercase tracking-widest text-center text-slate-900">— Formation —</h3>
        <div className="space-y-3 mt-3">
          {cvData.education.map((edu) => (
            <div key={edu.id} className="text-center">
              <p className="font-semibold text-sm text-slate-900">{edu.degree} {edu.field && `- ${edu.field}`}</p>
              <p className="text-xs text-slate-500">{edu.school} • {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <h3 className="font-light text-xs uppercase tracking-widest text-center text-slate-900">— Compétences —</h3>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {cvData.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-600">{skill}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-light text-xs uppercase tracking-widest text-center text-slate-900">— Langues —</h3>
          <div className="space-y-1 mt-3">
            {cvData.languages.map((lang) => (
              <div key={lang.id} className="flex items-center justify-center gap-2 text-sm">
                <span className="text-slate-700">{lang.name}</span>
                <span className="text-slate-400">—</span>
                <span className="text-slate-500">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDark = () => (
    <div className="p-6 text-white bg-slate-900">
      <div className="absolute top-3 right-3 opacity-50">
        <img src="/assets/logo_ae2i.png" alt="AE2I" className="h-5 w-auto" />
      </div>
      <Name className="text-2xl text-white" />
      <Contact className="mt-2 text-slate-400" />
      <div className="w-full h-px my-4 bg-slate-700" />
      <Summary className="text-slate-300" />
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: cvStyle.primaryColor }}>Expérience</h3>
        <div className="space-y-3">
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="p-3 rounded-lg bg-slate-800">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-sm text-white">{exp.position}</span>
                <span className="text-xs text-slate-400">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}</span>
              </div>
              <div className="text-sm text-slate-400">{exp.company}</div>
              {exp.description && <div className="text-xs text-slate-500 mt-1">{exp.description}</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: cvStyle.primaryColor }}>Formation</h3>
        <div className="space-y-3">
          {cvData.education.map((edu) => (
            <div key={edu.id} className="p-3 rounded-lg bg-slate-800">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-sm text-white">{edu.degree} {edu.field && `- ${edu.field}`}</span>
                <span className="text-xs text-slate-400">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</span>
              </div>
              <div className="text-sm text-slate-400">{edu.school}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: cvStyle.primaryColor }}>Compétences</h3>
        <div className="flex flex-wrap gap-2">
          {cvData.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 text-xs rounded font-medium text-white" style={{ backgroundColor: cvStyle.primaryColor }}>{skill}</span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ color: cvStyle.primaryColor }}>Langues</h3>
        <div className="grid grid-cols-2 gap-2">
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-slate-800">
              <span className="text-slate-300">{lang.name}</span>
              <span className="text-xs text-slate-500">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderModernSidebar = () => (
    <div className="flex relative">
      <div className="w-[38%] p-5 text-white" style={{ backgroundColor: cvStyle.primaryColor }}>
        <div className="mb-4">
          <Name className="text-xl text-white" />
          <div className="mt-3 space-y-1 text-xs text-white/80">
            {cvData.email && <p className="flex items-center gap-1"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Profil</h3>
          <p className="text-xs text-white/80 leading-relaxed">{cvData.summary || 'Votre résumé professionnel...'}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Compétences</h3>
          <div className="flex flex-wrap gap-1">
            {cvData.skills.map((skill, i) => (
              <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">{skill}</span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-xs uppercase tracking-wider mb-2 text-white/90">Langues</h3>
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="flex items-center justify-between text-xs text-white/80 mb-1">
              <span>{lang.name}</span>
              <span>{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[62%] p-5">
        <Experience />
        <Education />
      </div>
    </div>
  );

  const renderCentered = () => (
    <div className="p-6 text-center">
      <Name className="text-3xl" />
      <Contact centered className="mt-2 justify-center" />
      <Divider />
      <Summary />
      <Experience />
      <Education />
      <Skills />
      <Languages />
    </div>
  );

  const renderTwoColumn = () => (
    <div className="flex relative">
      <div className="w-[60%] p-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
        <Divider />
        <Summary />
        <Experience />
        <Education />
      </div>
      <div className="w-[40%] p-5 bg-slate-50">
        <Skills />
        <Languages />
      </div>
    </div>
  );

  const renderCompact = () => (
    <div className="p-4 text-sm">
      <div className="mb-3">
        <Name className="text-xl" />
        <Contact className="text-xs mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <h3 className="font-semibold text-xs uppercase mb-2" style={{ color: cvStyle.primaryColor }}>Expérience</h3>
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <p className="font-semibold text-slate-900">{exp.position}</p>
              <p className="text-xs text-slate-500">{exp.company} • {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}</p>
              {exp.description && <p className="text-xs text-slate-500 mt-0.5">{exp.description}</p>}
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold text-xs uppercase mb-2" style={{ color: cvStyle.primaryColor }}>Formation</h3>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <p className="font-semibold text-slate-900">{edu.degree} {edu.field && `- ${edu.field}`}</p>
              <p className="text-xs text-slate-500">{edu.school}</p>
            </div>
          ))}
          <h3 className="font-semibold text-xs uppercase mb-2 mt-3" style={{ color: cvStyle.primaryColor }}>Compétences</h3>
          <div className="flex flex-wrap gap-1">
            {cvData.skills.map((skill, i) => (
              <span key={i} className="px-2 py-0.5 text-xs rounded border" style={{ borderColor: cvStyle.primaryColor, color: cvStyle.primaryColor }}>{skill}</span>
            ))}
          </div>
          <h3 className="font-semibold text-xs uppercase mb-2 mt-3" style={{ color: cvStyle.primaryColor }}>Langues</h3>
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="flex justify-between text-xs">
              <span className="text-slate-700">{lang.name}</span>
              <span className="text-slate-500">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSidebar2 = () => (
    <div className="flex relative">
      <div className="w-[32%] p-4 text-white bg-slate-800">
        <div className="mb-4">
          <Name className="text-lg text-white" />
          <div className="mt-2 space-y-1 text-xs text-white/70">
            {cvData.email && <p className="flex items-center gap-1"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase mb-2 text-white/80">Langues</h3>
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="flex items-center justify-between text-xs text-white/70 mb-1">
              <span>{lang.name}</span>
              <span>{lang.level}</span>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase mb-2 text-white/80">Compétences</h3>
          <div className="flex flex-wrap gap-1">
            {cvData.skills.map((skill, i) => (
              <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">{skill}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[68%] p-5">
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase mb-2" style={{ color: cvStyle.primaryColor }}>Profil</h3>
          <p className="text-sm leading-relaxed text-slate-700">{cvData.summary || 'Votre résumé professionnel...'}</p>
        </div>
        <Experience />
        <Education />
      </div>
    </div>
  );

  const renderCreative2 = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-5">
        {cvData.photo ? (
          <div className="w-24 h-24 rounded-full border-4 overflow-hidden" style={{ borderColor: cvStyle.primaryColor }}>
            <Photo size="md" rounded />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full border-4 border-dashed flex items-center justify-center" style={{ borderColor: cvStyle.primaryColor }}>
            <span className="text-xs text-slate-300">Photo</span>
          </div>
        )}
        <div>
          <Name className="text-3xl" />
          <Contact className="mt-2" />
        </div>
      </div>
      <div className="border-l-4 pl-4" style={{ borderColor: cvStyle.primaryColor }}>
        <Summary />
        <Experience />
        <Education />
        <Skills />
        <Languages />
      </div>
    </div>
  );

  const renderModern2 = () => (
    <div className="p-6">
      <div className="flex items-start gap-4 mb-5">
        <div className="flex-1">
          <Name className="text-2xl" />
          <Contact className="mt-2" />
          {cvData.summary && <p className="text-sm mt-3 leading-relaxed text-slate-700">{cvData.summary}</p>}
        </div>
      </div>
      <Divider />
      <Experience />
      <Education />
      <Skills />
      <Languages />
    </div>
  );

  const renderClassic2 = () => (
    <div className="p-6">
      <div className="bg-slate-100 p-4 rounded-lg mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
      </div>
      <Summary />
      <Experience />
      <Education />
      <Skills />
      <Languages />
    </div>
  );

  const renderMinimal2 = () => (
    <div className="p-6 text-center">
      <Name className="text-2xl" />
      <Contact centered className="mt-2 justify-center" />
      <Divider />
      <div className="text-left">
        <Summary />
        <Experience />
        <Education />
        <Skills variant="outlined" />
        <Languages />
      </div>
    </div>
  );

  const renderPhotoFocus = () => (
    <div className="p-6">
      <div className="text-center mb-6">
        {cvData.photo ? (
          <Photo size="lg" className="mx-auto mb-4" />
        ) : (
          <div className="w-32 h-32 mx-auto rounded-xl mb-4 bg-slate-100 flex items-center justify-center">
            <span className="text-xs text-slate-300">Photo</span>
          </div>
        )}
        <Name className="text-3xl" />
        <Contact centered className="mt-2 justify-center" />
      </div>
      <Divider />
      <Summary />
      <Experience />
      <Education />
      <Skills />
      <Languages />
    </div>
  );

  const renderModern3 = () => (
    <div className="p-6">
      <div className="flex items-start gap-4 mb-5">
        <div className="flex-1">
          <Name className="text-2xl" />
          <Contact className="mt-2" />
          {cvData.summary && <p className="text-sm mt-3 leading-relaxed text-slate-700">{cvData.summary}</p>}
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Experience />
          <Education />
        </div>
        <div className="p-4 rounded-lg bg-slate-50">
          <Skills />
          <Languages />
        </div>
      </div>
    </div>
  );

  const renderModern4 = () => (
    <div className="p-6">
      <div className="mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
      </div>
      <Summary />
      <Experience />
      <Education />
      <div className="p-4 rounded-lg mt-4 bg-slate-50">
        <Skills />
        <Languages />
      </div>
    </div>
  );

  const renderModern5 = () => (
    <div className="p-6">
      <div className="mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Summary />
          <Experience />
          <Education />
        </div>
        <div>
          <Skills />
          <Languages />
        </div>
      </div>
    </div>
  );

  const renderTimeline2 = () => (
    <div className="p-6">
      <div className="mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
        {cvData.summary && <p className="text-sm mt-3 leading-relaxed text-slate-700">{cvData.summary}</p>}
      </div>
      <Divider />
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: cvStyle.primaryColor }}>Expérience</h3>
        <div className="relative pl-5 border-l-2" style={{ borderColor: cvStyle.primaryColor }}>
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="mb-4 relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full" style={{ backgroundColor: cvStyle.primaryColor }} />
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
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: cvStyle.primaryColor }}>Formation</h3>
        <div className="relative pl-5 border-l-2" style={{ borderColor: cvStyle.primaryColor }}>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="mb-4 relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full" style={{ backgroundColor: cvStyle.primaryColor }} />
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-sm text-slate-900">{edu.degree} {edu.field && `- ${edu.field}`}</span>
                <span className="text-xs text-slate-400">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</span>
              </div>
              <p className="text-sm font-medium text-slate-600">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
      <Skills />
      <Languages />
    </div>
  );

  const renderTwoColumn2 = () => (
    <div className="flex relative">
      <div className="w-[55%] p-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
        <Divider />
        <Summary />
        <Experience />
        <Education />
      </div>
      <div className="w-[45%] p-5" style={{ backgroundColor: cvStyle.primaryColor + '08' }}>
        <Skills />
        <Languages tags />
      </div>
    </div>
  );

  const renderClassic3 = () => (
    <div className="p-6">
      <div className="mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
      </div>
      <Divider />
      <Summary />
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: cvStyle.primaryColor }}>Expérience</h3>
        <div className="space-y-3">
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="p-3 rounded-lg border border-slate-200">
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
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: cvStyle.primaryColor }}>Formation</h3>
        <div className="space-y-3">
          {cvData.education.map((edu) => (
            <div key={edu.id} className="p-3 rounded-lg border border-slate-200">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-sm text-slate-900">{edu.degree} {edu.field && `- ${edu.field}`}</span>
                <span className="text-xs text-slate-400">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</span>
              </div>
              <p className="text-sm font-medium text-slate-600">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Skills />
        <Languages />
      </div>
    </div>
  );

  const renderModern6 = () => (
    <div className="p-6">
      <div className="mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
      </div>
      <Divider />
      <Summary />
      <div className="grid grid-cols-2 gap-4">
        {cvData.experience.map((exp) => (
          <div key={exp.id} className="mb-3">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-sm text-slate-900">{exp.position}</span>
              <span className="text-xs text-slate-400">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">{exp.company}</p>
            {exp.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{exp.description}</p>}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {cvData.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold text-sm text-slate-900">{edu.degree} {edu.field && `- ${edu.field}`}</span>
              <span className="text-xs text-slate-400">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">{edu.school}</p>
          </div>
        ))}
      </div>
      <Skills />
      <Languages />
    </div>
  );

  const renderModern7 = () => (
    <div className="flex relative">
      <div className="w-[65%] p-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
        <Divider />
        <Summary />
        <Experience />
        <Education />
      </div>
      <div className="w-[35%] p-5 text-white" style={{ backgroundColor: cvStyle.primaryColor }}>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase mb-2 text-white/80">Compétences</h3>
          <div className="flex flex-wrap gap-1">
            {cvData.skills.map((skill, i) => (
              <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">{skill}</span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase mb-2 text-white/80">Langues</h3>
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="flex items-center justify-between text-xs text-white/70 mb-1">
              <span>{lang.name}</span>
              <span>{lang.level}</span>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase mb-2 text-white/80">Profil</h3>
          <p className="text-xs text-white/70 leading-relaxed">{cvData.summary || 'Votre résumé...'}</p>
        </div>
      </div>
    </div>
  );

  const renderClassic4 = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-5">
        {cvData.photo ? (
          <Photo size="md" className="rounded-lg" />
        ) : null}
        <div className="flex-1">
          <Name className="text-2xl" />
          <Contact className="mt-2" />
        </div>
      </div>
      <Divider />
      <Summary />
      <Experience />
      <Education />
      <Skills />
      <Languages />
    </div>
  );

  const renderModern8 = () => (
    <div className="p-6">
      <div className="mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
      </div>
      <Divider />
      <Summary />
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: cvStyle.primaryColor }}>Expérience</h3>
        {cvData.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-sm text-slate-900">{exp.position}</span>
              <span className="text-xs text-slate-400">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Présent'}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">{exp.company}</p>
            {exp.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{exp.description}</p>}
            <div className="w-full h-px bg-slate-200 mt-3" />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: cvStyle.primaryColor }}>Formation</h3>
        {cvData.education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-sm text-slate-900">{edu.degree} {edu.field && `- ${edu.field}`}</span>
              <span className="text-xs text-slate-400">{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">{edu.school}</p>
            <div className="w-full h-px bg-slate-200 mt-3" />
          </div>
        ))}
      </div>
      <Skills />
      <Languages />
    </div>
  );

  const renderModern9 = () => (
    <div className="p-6">
      <div className="flex items-start gap-4 mb-5">
        <div className="flex-1">
          <Name className="text-2xl" />
          <Contact className="mt-2" />
          {cvData.summary && <p className="text-sm mt-3 leading-relaxed text-slate-700">{cvData.summary}</p>}
        </div>
        {cvData.photo && <Photo size="md" className="rounded-lg flex-shrink-0" />}
      </div>
      <Divider />
      <Experience />
      <Education />
      <Skills />
      <Languages />
    </div>
  );

  const renderClassic5 = () => (
    <div className="p-6 text-center">
      {cvData.photo ? (
        <Photo size="md" rounded className="mx-auto mb-3" />
      ) : (
        <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 mb-3 flex items-center justify-center">
          <span className="text-xs text-slate-300">Photo</span>
        </div>
      )}
      <Name className="text-2xl" />
      <Contact centered className="mt-2 justify-center" />
      <Divider />
      <Summary />
      <Experience />
      <Education />
      <Skills />
      <Languages />
    </div>
  );

  const renderClassic6 = () => (
    <div className="flex relative">
      <div className="w-[28%] p-4 text-white" style={{ backgroundColor: cvStyle.primaryColor }}>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase mb-2 text-white/80">Compétences</h3>
          <div className="flex flex-wrap gap-1">
            {cvData.skills.map((skill, i) => (
              <span key={i} className="px-2 py-0.5 text-xs rounded bg-white/20 text-white">{skill}</span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase mb-2 text-white/80">Langues</h3>
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="flex items-center justify-between text-xs text-white/70 mb-1">
              <span>{lang.name}</span>
              <span>{lang.level}</span>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-xs uppercase mb-2 text-white/80">Contact</h3>
          <div className="space-y-1 text-xs text-white/70">
            {cvData.email && <p className="flex items-center gap-1"><Mail className="w-3 h-3" /> {cvData.email}</p>}
            {cvData.phone && <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
            {cvData.location && <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
          </div>
        </div>
      </div>
      <div className="w-[72%] p-5">
        <div className="mb-4 pb-3 border-b border-slate-200">
          <Name className="text-2xl" />
          {cvData.summary && <p className="text-sm mt-2 leading-relaxed text-slate-700">{cvData.summary}</p>}
        </div>
        <Experience />
        <Education />
      </div>
    </div>
  );

  const renderModern10 = () => (
    <div className="p-6">
      <div className="mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
      </div>
      <Divider />
      <Summary />
      <Experience />
      <Education />
      <div className="flex items-start gap-4 mt-4 p-4 rounded-lg bg-slate-50">
        {cvData.photo && <Photo size="md" className="rounded-lg flex-shrink-0" />}
        <div>
          <Skills />
          <Languages />
        </div>
      </div>
    </div>
  );

  const renderModern11 = () => (
    <div className="p-6">
      <div className="mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
      </div>
      <Divider />
      <Summary />
      <Experience />
      <Education />
      <Skills />
      <Languages />
      {cvData.photo && (
        <div className="mt-4 text-center">
          <Photo size="lg" className="mx-auto" />
        </div>
      )}
    </div>
  );

  const renderClassic7 = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-5">
        {cvData.photo ? (
          <Photo size="md" className="rounded-lg" />
        ) : (
          <div className="w-24 h-24 rounded-lg bg-slate-100 flex items-center justify-center">
            <span className="text-xs text-slate-300">Photo</span>
          </div>
        )}
        <div>
          <Name className="text-2xl" />
          <Contact className="mt-2" />
          {cvData.summary && <p className="text-sm mt-2 leading-relaxed text-slate-700">{cvData.summary}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Experience />
        <Education />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Skills />
        <Languages />
      </div>
    </div>
  );

  const renderModern12 = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          {cvData.photo ? (
            <Photo size="md" className="rounded-lg" />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-slate-100 flex items-center justify-center">
              <span className="text-xs text-slate-300">Photo</span>
            </div>
          )}
          <div>
            <Name className="text-2xl" />
            <Contact className="mt-2" />
          </div>
        </div>
      </div>
      <Divider />
      <Summary />
      <Experience />
      <Education />
      <Skills />
      <Languages />
    </div>
  );

  const renderModern13 = () => (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-5">
        {cvData.photo ? (
          <Photo size="md" rounded />
        ) : (
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="text-xs text-slate-300">Photo</span>
          </div>
        )}
        <div className="flex-1">
          <Name className="text-2xl" />
          <Contact className="mt-2" />
          {cvData.summary && <p className="text-sm mt-2 leading-relaxed text-slate-700">{cvData.summary}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Experience />
          <Education />
        </div>
        <div>
          <Skills />
          <Languages />
        </div>
      </div>
    </div>
  );

  const renderModern14 = () => (
    <div className="p-6 text-center">
      {cvData.photo ? (
        <Photo size="md" rounded className="mx-auto mb-4" />
      ) : (
        <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 mb-4 flex items-center justify-center">
          <span className="text-xs text-slate-300">Photo</span>
        </div>
      )}
      <Name className="text-2xl" />
      <Contact centered className="mt-2 justify-center" />
      <Divider />
      <div className="grid grid-cols-2 gap-6 text-left">
        <div>
          <Experience />
          <Education />
        </div>
        <div>
          <Skills />
          <Languages />
        </div>
      </div>
    </div>
  );

  const renderModern15 = () => (
    <div className="p-6">
      <div className="mb-5">
        <Name className="text-2xl" />
        <Contact className="mt-2" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: cvStyle.primaryColor + '08' }}>
          <Experience />
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: cvStyle.primaryColor + '08' }}>
          <Education />
        </div>
      </div>
      <div className="p-4 rounded-lg mt-4 bg-slate-50">
        <Skills />
        <Languages />
      </div>
    </div>
  );

  const renderExecutive = () => (
    <div className="p-0">
      <div className="px-8 py-6 text-white" style={{ background: `linear-gradient(135deg, ${cvStyle.primaryColor}, ${cvStyle.primaryColor}cc)` }}>
        <Name className="text-4xl font-light tracking-tight text-white" />
        <JobTitle className="text-white/80 mt-1" />
        <Contact className="mt-4 text-white/70" />
      </div>
      <div className="px-8 py-6">
        {cvData.summary && (
          <div className="mb-6">
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: cvStyle.primaryColor }}>Profil</h3>
            <p className="text-sm leading-relaxed text-slate-700">{cvData.summary}</p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Experience />
            <Education />
          </div>
          <div>
            <Skills />
            <Languages />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTech = () => (
    <div className="p-0">
      <div className="flex items-center gap-4 px-6 py-5 border-l-4" style={{ borderColor: cvStyle.primaryColor }}>
        <div className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: cvStyle.primaryColor }}>
          {cvData.fullName ? cvData.fullName.charAt(0).toUpperCase() : '?'}
        </div>
        <div className="flex-1">
          <Name className="text-2xl" />
          <JobTitle />
          <Contact className="mt-1 text-xs" />
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <Summary />
            <Experience />
            <Education />
          </div>
          <div className="space-y-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: cvStyle.primaryColor + '0a' }}>
              <Skills variant="outlined" />
            </div>
            <div className="p-3 rounded-lg bg-slate-50">
              <Languages tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGeometric = () => (
    <div className="p-0 relative">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ backgroundColor: cvStyle.primaryColor, clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
      <div className="px-6 py-5 relative">
        <Name className="text-3xl font-black" />
        <div className="flex items-center gap-2 mt-1">
          <div className="h-1 w-8" style={{ backgroundColor: cvStyle.primaryColor }} />
          <JobTitle />
        </div>
        <Contact className="mt-3" />
      </div>
      <div className="px-6 pb-6">
        <div className="border-t-2 pt-4" style={{ borderColor: cvStyle.primaryColor }}>
          <Summary />
          <div className="grid grid-cols-2 gap-6">
            <Experience />
            <div>
              <Education />
              <Skills variant="block" />
              <Languages tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPremium = () => (
    <div className="flex relative">
      <div className="w-[35%] p-5 text-white bg-slate-900">
        <div className="mb-6">
          <h2 className="text-2xl font-light tracking-wide text-white">{cvData.fullName || 'Votre Nom'}</h2>
          <p className="text-sm mt-1" style={{ color: cvStyle.primaryColor }}>{cvData.jobTitle || 'Votre Poste'}</p>
        </div>
        <div className="space-y-3 text-xs text-white/60 mb-6">
          {cvData.email && <p className="flex items-center gap-1"><Mail className="w-3 h-3" /> {cvData.email}</p>}
          {cvData.phone && <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> {cvData.phone}</p>}
          {cvData.location && <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {cvData.location}</p>}
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-xs uppercase tracking-widest mb-3 text-white/40">Compétences</h3>
          <div className="space-y-2">
            {cvData.skills.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs text-white/70 mb-1">
                  <span>{s}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '80%', backgroundColor: cvStyle.primaryColor }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-xs uppercase tracking-widest mb-3 text-white/40">Langues</h3>
          {cvData.languages.map(l => (
            <div key={l.id} className="flex items-center justify-between text-xs text-white/60 mb-1">
              <span>{l.name}</span>
              <span style={{ color: cvStyle.primaryColor }}>{l.level}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[65%] p-6">
        {cvData.summary && (
          <div className="mb-5 p-4 rounded-lg" style={{ backgroundColor: cvStyle.primaryColor + '08' }}>
            <p className="text-sm leading-relaxed text-slate-700">{cvData.summary}</p>
          </div>
        )}
        <Experience />
        <Education />
      </div>
    </div>
  );

  const renderFresh = () => (
    <div className="p-0">
      <div className="px-6 py-6 rounded-b-[2rem]" style={{ background: `linear-gradient(135deg, ${cvStyle.primaryColor}, ${cvStyle.accentColor || cvStyle.primaryColor})` }}>
        <Name className="text-3xl text-white font-bold" />
        <JobTitle className="text-white/90" />
        <Contact className="mt-3 text-white/80" />
      </div>
      <div className="px-6 py-5">
        <Summary />
        <div className="grid grid-cols-2 gap-5">
          <Experience />
          <Education />
        </div>
        <div className="mt-4 p-4 rounded-2xl" style={{ backgroundColor: cvStyle.primaryColor + '0a' }}>
          <Skills />
          <Languages tags />
        </div>
      </div>
    </div>
  );

  const templates: Record<string, () => React.ReactNode> = {
    modern: renderModern,
    classic: renderClassic,
    creative: renderCreative,
    minimal: renderMinimal,
    gradient: renderGradient,
    card: renderCard,
    timeline: renderTimeline,
    split: renderSplit,
    corporate: renderCorporate,
    bold: renderBold,
    elegant: renderElegant,
    dark: renderDark,
    'modern-sidebar': renderModernSidebar,
    centered: renderCentered,
    'two-column': renderTwoColumn,
    compact: renderCompact,
    'sidebar-2': renderSidebar2,
    'creative-2': renderCreative2,
    'modern-2': renderModern2,
    'classic-2': renderClassic2,
    'minimal-2': renderMinimal2,
    'photo-focus': renderPhotoFocus,
    'modern-3': renderModern3,
    'modern-4': renderModern4,
    'modern-5': renderModern5,
    'timeline-2': renderTimeline2,
    'two-column-2': renderTwoColumn2,
    'classic-3': renderClassic3,
    'modern-6': renderModern6,
    'modern-7': renderModern7,
    'classic-4': renderClassic4,
    'modern-8': renderModern8,
    'modern-9': renderModern9,
    'classic-5': renderClassic5,
    'classic-6': renderClassic6,
    'modern-10': renderModern10,
    'modern-11': renderModern11,
    'classic-7': renderClassic7,
    'modern-12': renderModern12,
    'modern-13': renderModern13,
    'modern-14': renderModern14,
    'modern-15': renderModern15,
    executive: renderExecutive,
    tech: renderTech,
    geometric: renderGeometric,
    premium: renderPremium,
    fresh: renderFresh,
  };

  const renderTemplate = templates[selectedTemplate.id] || templates.modern;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-4 bg-slate-100">
        <div className="max-w-[210mm] mx-auto">
          <div
            className="bg-white shadow-lg aspect-[210/297] overflow-hidden"
            style={cvStyle.backgroundImage ? { backgroundImage: `url(${cvStyle.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
          >
            <Wrapper>{renderTemplate()}</Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
