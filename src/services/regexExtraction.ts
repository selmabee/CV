import type { CVData } from '../types';

const uid = (prefix: string, i: number) => `${prefix}-${Date.now()}-${i}`;

function extractEmail(text: string): string {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
  return match ? match[0].trim() : '';
}

function extractPhone(text: string): string {
  const patterns = [
    /(?:\+|00)33\s?[1-9](?:[\s.-]?\d{2}){4}/,
    /(?:\+|00)\d{1,3}\s?[1-9](?:[\s.-]?\d{2}){4}/,
    /0[1-9](?:[\s.-]?\d{2}){4}/,
    /0[5-7][\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}/,
  ];
  for (const p of patterns) {
    const match = text.match(p);
    if (match) return match[0].trim();
  }
  return '';
}

function extractNameAndTitle(text: string): { fullName: string; jobTitle: string } {
  const lines = text.split(/[\n\r]+/).map(l => l.trim()).filter(l => l.length > 2);
  const skipWords = ['curriculum', 'vitae', 'resume', 'cv', 'contact', 'email', 'tel', 'address', 'adresse', 'experience', 'formation', 'education', 'competences', 'skills', 'profil', 'profile', 'langues', 'languages'];

  let fullName = '';
  let jobTitle = '';

  for (let i = 0; i < Math.min(20, lines.length); i++) {
    const line = lines[i];
    const lower = line.toLowerCase();
    if (skipWords.some(w => lower.includes(w))) continue;
    if (line.includes('@') || line.match(/\d{5,}/)) continue;
    if (line.length < 3 || line.length > 60) continue;

    if (!fullName) {
      const words = line.split(/\s+/);
      if (words.length >= 2 && words.length <= 4 && words.every(w => /^[A-ZÀ-Ÿ][a-zà-ÿ\-']+$/.test(w) || /^[A-ZÀ-Ÿ]{2,}$/.test(w))) {
        fullName = line;
        continue;
      }
    }
    if (!jobTitle && fullName) {
      if (/developpeur|developer|ingenieur|engineer|chef|manager|directeur|consultant|analyst|designer|architect|data|software|frontend|backend|full.?stack|devops|product|project|marketing|commercial|comptable|juriste|technicien|assistant|stagiaire/i.test(line)) {
        jobTitle = line;
        break;
      }
    }
  }
  return { fullName, jobTitle };
}

function extractLocation(text: string): string {
  const cities = ['paris', 'lyon', 'marseille', 'bordeaux', 'lille', 'toulouse', 'nantes', 'nice', 'strasbourg', 'rennes', 'alger', 'oran', 'constantine', 'annaba', 'setif', 'blida'];
  const lower = text.toLowerCase();
  const cityMatch = text.match(/([A-Z][a-zà-ÿ]+)\s*[,]\s*(?:France|FR|Algérie|DZ|\d{5})/i);
  if (cityMatch) return cityMatch[1];
  for (const city of cities) {
    if (lower.includes(city)) return city.charAt(0).toUpperCase() + city.slice(1);
  }
  return '';
}

function extractSkills(text: string): string[] {
  const keywords = [
    'javascript', 'typescript', 'react', 'angular', 'vue', 'nodejs', 'node.js', 'python', 'java', 'php', 'ruby', 'go', 'rust', 'c++', 'c#', '.net',
    'sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'firebase', 'supabase', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'git', 'github',
    'html', 'css', 'sass', 'tailwind', 'bootstrap', 'figma', 'agile', 'scrum', 'jira', 'machine learning', 'tensorflow', 'pandas', 'numpy',
    'spring', 'django', 'flask', 'express', 'fastapi', 'next.js', 'nuxt', 'graphql', 'rest', 'api', 'linux', 'bash', 'excel', 'powerpoint', 'word', 'sap', 'salesforce',
  ];
  const found: string[] = [];
  const lower = text.toLowerCase();
  const skillsMatch = text.match(/competences?\s*[:\-]?\s*([^\n]{10,300})/i);
  if (skillsMatch) {
    const list = skillsMatch[1].split(/[,•|;]/).map(s => s.trim()).filter(s => s.length > 2 && s.length < 40);
    found.push(...list);
  }
  for (const skill of keywords) {
    if (lower.includes(skill) && !found.some(f => f.toLowerCase() === skill)) {
      found.push(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  }
  return [...new Set(found)].slice(0, 15);
}

function extractLanguages(text: string): Array<{ id: string; name: string; level: string }> {
  const langMap: Record<string, string[]> = {
    'Français': ['francais', 'french', 'français'],
    'Anglais': ['anglais', 'english'],
    'Espagnol': ['espagnol', 'spanish'],
    'Allemand': ['allemand', 'german'],
    'Arabe': ['arabe', 'arabic'],
    'Italien': ['italien', 'italian'],
    'Portugais': ['portugais', 'portuguese'],
    'Russe': ['russe', 'russian'],
  };
  const found: Array<{ id: string; name: string; level: string }> = [];
  const lower = text.toLowerCase();
  let i = 0;
  for (const [name, patterns] of Object.entries(langMap)) {
    for (const p of patterns) {
      const idx = lower.indexOf(p);
      if (idx !== -1) {
        const ctx = lower.slice(Math.max(0, idx - 40), idx + p.length + 40);
        let level = 'Intermédiaire';
        if (/bilingue|langue maternelle|native/.test(ctx)) level = 'Langue maternelle';
        else if (/courant|fluent|c1|c2/.test(ctx)) level = 'Courant';
        else if (/avance|advanced|b2/.test(ctx)) level = 'Avancé';
        else if (/debutant|beginner|a1|a2/.test(ctx)) level = 'Débutant';
        found.push({ id: uid('lang', i++), name, level });
        break;
      }
    }
  }
  return found;
}

function extractSummary(text: string): string {
  const m = text.match(/(?:profil|resume|summary|a propos|about|objectif)\s*[:\-]?\s*\n?([A-Z][^\n]{30,500})/i);
  return m ? m[1].trim() : '';
}

function extractExperience(text: string): Array<{ id: string; company: string; position: string; startDate: string; endDate: string; description: string }> {
  const result: Array<{ id: string; company: string; position: string; startDate: string; endDate: string; description: string }> = [];
  const section = text.match(/(?:experience[s]?\s*professionnelle[s]?|experience[s]?)\s*[:\-]?\s*([\s\S]*?)(?:formation|education|competences|skills|langues|languages|$)/i);
  if (!section) return result;
  const entries = section[1].split(/\n(?=[A-Z])/).filter(s => s.trim().length > 10);
  entries.slice(0, 5).forEach((entry, i) => {
    const lines = entry.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 1) return;
    const dm = entry.match(/(\d{4}|janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre|present|actuel)[\s\-\/]*(\d{4}|present|actuel)?/i);
    result.push({
      id: uid('exp', i),
      company: lines[1] || '',
      position: lines[0] || '',
      startDate: dm ? dm[1] : '',
      endDate: dm ? (dm[2] || '') : '',
      description: lines.slice(2).join(' '),
    });
  });
  return result;
}

function extractEducation(text: string): Array<{ id: string; school: string; degree: string; field: string; startDate: string; endDate: string }> {
  const result: Array<{ id: string; school: string; degree: string; field: string; startDate: string; endDate: string }> = [];
  const section = text.match(/(?:formation[s]?|education|diplome[s]?)\s*[:\-]?\s*([\s\S]*?)(?:competences|skills|langues|languages|experience|$)/i);
  if (!section) return result;
  const entries = section[1].split(/\n(?=[A-Z])/).filter(s => s.trim().length > 10);
  entries.slice(0, 5).forEach((entry, i) => {
    const lines = entry.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 1) return;
    const dm = entry.match(/(\d{4})[\s\-\/]*(\d{4}|present|actuel)?/i);
    result.push({
      id: uid('edu', i),
      school: lines[1] || '',
      degree: lines[0] || '',
      field: '',
      startDate: dm ? dm[1] : '',
      endDate: dm ? (dm[2] || '') : '',
    });
  });
  return result;
}

export function extractCVWithRegex(rawText: string): Partial<CVData> {
  if (!rawText || rawText.trim().length < 20) return {};
  const { fullName, jobTitle } = extractNameAndTitle(rawText);
  return {
    fullName,
    jobTitle,
    email: extractEmail(rawText),
    phone: extractPhone(rawText),
    location: extractLocation(rawText),
    summary: extractSummary(rawText),
    photo: null,
    skills: extractSkills(rawText),
    languages: extractLanguages(rawText),
    experience: extractExperience(rawText),
    education: extractEducation(rawText),
  };
}
