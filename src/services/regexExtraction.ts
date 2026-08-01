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

  // Try "Je m'appelle X" or "Je suis X" patterns first
  const namePattern = text.match(/je\s+m['']?appelle\s+([A-ZÀ-Ÿ][a-zà-ÿ\-']+(?:\s+[A-ZÀ-Ÿ][a-zà-ÿ\-']+){1,3})/i);
  if (namePattern) {
    fullName = namePattern[1].trim();
  }
  const titlePattern = text.match(/je\s+suis\s+([a-zÀ-ÿ][\wà-ÿ\s\-']{5,50})/i);
  if (titlePattern) {
    jobTitle = titlePattern[1].trim();
  }

  for (let i = 0; i < Math.min(20, lines.length) && (!fullName || !jobTitle); i++) {
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
  // Also try "compétences:" followed by comma-separated list
  const skillsMatch2 = text.match(/(?:comp[eé]tences?|skills)\s*[:\-]\s*([^\n]+)/i);
  if (skillsMatch2) {
    const list = skillsMatch2[1].split(/[,•|;]/).map(s => s.trim()).filter(s => s.length > 2 && s.length < 40);
    for (const s of list) {
      if (!found.some(f => f.toLowerCase() === s.toLowerCase())) found.push(s);
    }
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
  if (m) return m[1].trim();
  // Try to extract from "Je suis..." sentences as summary
  const jeSuis = text.match(/je\s+suis\s+([a-zÀ-ÿ][\wà-ÿ\s\-',.]{20,300})/i);
  if (jeSuis) return jeSuis[1].trim();
  return '';
}

// Date helpers
const MONTHS = 'janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre|january|february|march|april|may|june|july|august|september|october|november|december|janv|févr|mars|avr|mai|juin|juil|août|sept|oct|nov|déc';
const DATE_PATTERN = `(?:\\d{4}|(?:${MONTHS})\\s+\\d{4})`;
const DATE_RANGE = new RegExp(`(${DATE_PATTERN})\\s*[\\-–àau/]+\\s*(${DATE_PATTERN}|pr[eé]sent|actuel|now|aujourd)`, 'i');
const SINGLE_DATE = new RegExp(`(${DATE_PATTERN}|pr[eé]sent|actuel)`, 'i');

function extractExperience(text: string): Array<{ id: string; company: string; position: string; startDate: string; endDate: string; description: string }> {
  const result: Array<{ id: string; company: string; position: string; startDate: string; endDate: string; description: string }> = [];

  // Strategy 1: Look for explicit experience section
  const sectionRegex = /(?:experience[s]?\s*professionnelle[s]?|experience[s]?|exp[eé]rience)\s*[:\-]?\s*([\s\S]*?)(?:formation|education|dipl[eo]me|comp[eé]tences?|skills|langues?|languages|loisirs|c[eé]ntre d'int[eé]r[eê]t|$)/i;
  const sectionMatch = text.match(sectionRegex);
  if (sectionMatch) {
    const sectionText = sectionMatch[1];
    const entries = splitExperienceEntries(sectionText);
    for (const entry of entries.slice(0, 5)) {
      const parsed = parseExperienceEntry(entry);
      if (parsed.position || parsed.company) {
        result.push({ id: uid('exp', result.length), ...parsed });
      }
    }
  }

  // Strategy 2: If no explicit section, look for patterns in the whole text
  if (result.length === 0) {
    result.push(...extractExperienceFromFreeText(text));
  }

  return result;
}

function splitExperienceEntries(sectionText: string): string[] {
  // Try splitting by bullet points or dashes at line start
  let entries = sectionText.split(/\n\s*[•\-–*▪]\s+/).filter(s => s.trim().length > 10);
  if (entries.length > 1) return entries;

  // Try splitting by double newlines
  entries = sectionText.split(/\n\s*\n/).filter(s => s.trim().length > 10);
  if (entries.length > 1) return entries;

  // Try splitting by lines that start with a date or a job title
  entries = sectionText.split(/\n(?=(?:[A-ZÉÈÊÀ])|(?:\d{4})|(?:•|-|–|\*))/).filter(s => s.trim().length > 10);
  if (entries.length > 1) return entries;

  return [sectionText.trim()];
}

function parseExperienceEntry(entry: string): { company: string; position: string; startDate: string; endDate: string; description: string } {
  const lines = entry.split('\n').map(l => l.trim()).filter(Boolean);
  const dr = entry.match(DATE_RANGE);
  const sd = entry.match(SINGLE_DATE);
  const startDate = dr ? dr[1] : (sd ? sd[1] : '');
  const endDate = dr ? (dr[2] || '') : '';

  // Try to find company and position
  let company = '';
  let position = '';

  // Look for "Poste chez Entreprise" or "Poste - Entreprise" or "Poste, Entreprise"
  const posCompanyMatch = entry.match(/([A-ZÀ-Ÿ][\wà-ÿ\s\-']{3,50})\s*(?:chez|at|@|[-–|,])\s*([A-ZÀ-Ÿ][\wà-ÿ\s\-&']{2,50})/);
  if (posCompanyMatch) {
    position = posCompanyMatch[1].trim();
    company = posCompanyMatch[2].trim();
  }

  // Look for "chez Entreprise"
  if (!company) {
    const chezMatch = entry.match(/(?:chez|at|@|apd|aupr[eè]s de|dans la soci[eé]t[eé])\s+([A-ZÀ-Ÿ][\wà-ÿ\s\-&''']{2,50})/i);
    if (chezMatch) {
      company = chezMatch[1].trim().replace(/[,.;].*$/, '');
    }
  }

  // Look for "Poste: ..." or "Poste chez ..."
  if (!position) {
    const posMatch = entry.match(/(?:poste|fonction|r[oô]le)\s*[:\-]\s*([A-ZÀ-Ÿ]?[\wà-ÿ\s\-']{3,50})/i);
    if (posMatch) {
      position = posMatch[1].trim();
    }
  }

  // Fallback: use lines
  if (!position && lines[0]) {
    // First line without the date part
    const firstLineNoDate = lines[0].replace(DATE_RANGE, '').replace(SINGLE_DATE, '').replace(/[,.;|]/g, '').trim();
    if (firstLineNoDate.length > 2) position = firstLineNoDate;
  }
  if (!company && lines[1]) {
    const secondLineNoDate = lines[1].replace(DATE_RANGE, '').replace(SINGLE_DATE, '').replace(/[,.;|]/g, '').trim();
    if (secondLineNoDate.length > 2) company = secondLineNoDate;
  }
  if (!company && lines[0]) {
    // Maybe first line is "Company - Position"
    const dashSplit = lines[0].split(/\s[–\-|]\s/);
    if (dashSplit.length === 2) {
      if (!position) position = dashSplit[0].replace(DATE_RANGE, '').trim();
      if (!company) company = dashSplit[1].replace(DATE_RANGE, '').trim();
    }
  }

  // Description: everything after the first 1-2 lines, minus dates
  let descLines = lines.slice(2);
  if (descLines.length === 0 && lines.length === 1) {
    // Single line entry - extract description after "travaillé" etc.
    const travMatch = entry.match(/(?:travail|d[eé]veloppe|r[eé]alis|g[eè]r|supervis|dirig|anim|particip)\w*\s+([^\n]{10,300})/i);
    if (travMatch) descLines = [travMatch[1].trim()];
  }
  const description = descLines.join(' ').replace(DATE_RANGE, '').replace(SINGLE_DATE, '').trim();

  return { company, position, startDate, endDate, description };
}

function extractExperienceFromFreeText(text: string): Array<{ id: string; company: string; position: string; startDate: string; endDate: string; description: string }> {
  const result: Array<{ id: string; company: string; position: string; startDate: string; endDate: string; description: string }> = [];

  // Split text into sentences
  const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);

  for (const sentence of sentences) {
    const dr = sentence.match(DATE_RANGE);
    const sd = sentence.match(SINGLE_DATE);
    if (!dr && !sd) continue; // Must have a date to be an experience

    const startDate = dr ? dr[1] : (sd ? sd[1] : '');
    const endDate = dr ? (dr[2] || '') : '';

    // Find company
    let company = '';
    const chezMatch = sentence.match(/(?:chez|at|@|chez la soci[eé]t[eé]|dans la soci[eé]t[eé]|pour)\s+([A-ZÀ-Ÿ][\wà-ÿ\s\-&''']{2,50})/i);
    if (chezMatch) {
      company = chezMatch[1].trim().replace(/[,.;].*$/, '');
    }

    // Find position
    let position = '';
    const posKeywords = /developpeur|developer|ingenieur|engineer|chef|manager|directeur|consultant|analyst|designer|architect|data|software|frontend|backend|full.?stack|devops|product|project|marketing|commercial|comptable|juriste|technicien|assistant|stagiaire|responsable|administrateur|testeur|qa/i;
    const posMatch = sentence.match(posKeywords);
    if (posMatch) {
      // Get a bit of context around the position keyword
      const idx = sentence.toLowerCase().indexOf(posMatch[0]);
      const start = Math.max(0, idx - 30);
      const context = sentence.slice(start, idx + 40);
      position = context.replace(/^(?:et\s+|en\s+|en tant que\s+|comme\s+|poste de\s+|fonction de\s+)/i, '').trim();
      // Clean up
      position = position.replace(/[,.;].*$/, '').trim();
      if (position.length > 50) position = posMatch[0];
    }

    // Description = the sentence itself, cleaned
    let description = sentence.replace(DATE_RANGE, '').replace(SINGLE_DATE, '').trim();
    // Remove the "J'ai travaillé chez X" prefix for description
    description = description.replace(/^(?:j['']?ai\s+)?(?:travail\w*|d[eé]veloppe\w*|r[eé]alis\w*|g[eè]r\w*|supervis\w*|dirig\w*|anim\w*|particip\w*)\s+/i, '').trim();

    if (company || position || description.length > 15) {
      result.push({
        id: uid('exp', result.length),
        company: company || '',
        position: position || '',
        startDate,
        endDate,
        description: description || sentence.trim(),
      });
    }
  }

  return result.slice(0, 5);
}

function extractEducation(text: string): Array<{ id: string; school: string; degree: string; field: string; startDate: string; endDate: string }> {
  const result: Array<{ id: string; school: string; degree: string; field: string; startDate: string; endDate: string }> = [];

  // Strategy 1: Explicit education section
  const sectionRegex = /(?:formation[s]?|education|dipl[oô]me[s]?|cursus|parcours acad[eé]mique|etudes)\s*[:\-]?\s*([\s\S]*?)(?:comp[eé]tences?|skills|langues?|languages|experience|loisirs|c[eé]ntre d'int[eé]r[eê]t|$)/i;
  const sectionMatch = text.match(sectionRegex);
  if (sectionMatch) {
    const sectionText = sectionMatch[1];
    const entries = sectionText.split(/\n\s*[•\-–*▪]\s+|\n\s*\n|\n(?=[A-ZÉÈÊÀ])/).filter(s => s.trim().length > 10);
    for (const entry of entries.slice(0, 5)) {
      const parsed = parseEducationEntry(entry);
      if (parsed.school || parsed.degree) {
        result.push({ id: uid('edu', result.length), ...parsed });
      }
    }
  }

  // Strategy 2: Free-form text patterns
  if (result.length === 0) {
    result.push(...extractEducationFromFreeText(text));
  }

  return result;
}

function parseEducationEntry(entry: string): { school: string; degree: string; field: string; startDate: string; endDate: string } {
  const lines = entry.split('\n').map(l => l.trim()).filter(Boolean);
  const dr = entry.match(DATE_RANGE);
  const sd = entry.match(SINGLE_DATE);
  const startDate = dr ? dr[1] : (sd ? sd[1] : '');
  const endDate = dr ? (dr[2] || '') : '';

  let school = '';
  let degree = '';
  let field = '';

  // "Diplôme de X" or "Diplôme: X"
  const degreeMatch = entry.match(/(?:dipl[oô]me|degree|master|licence|bachelor|mba|doctorat|phd|bts|dut|but|bac|baccalaur[eé]at|ing[eé]nieur|certificat)\s*(?:de|en|d['']|:|-)?\s*([A-ZÀ-Ÿ]?[\wà-ÿ\s\-']{2,50})/i);
  if (degreeMatch) {
    degree = degreeMatch[0].split(/\s(?:de|en|d['']|:|-)/i)[0].trim();
    field = degreeMatch[1] ? degreeMatch[1].trim().replace(/[,.;].*$/, '') : '';
  }

  // School patterns
  const schoolKeywords = /(?:universit[eé]|ecole|[eé]cole|institut|facult[eé]|college|lyc[eé]e|acad[eé]mie|centre|cned|polytech|epitech|esgi|isen|enim|ensam|hec|essec|essec|sciences po|sorbonne|insa|telecom|mines|centrale)/i;
  const schoolMatch = entry.match(schoolKeywords);
  if (schoolMatch) {
    const idx = entry.toLowerCase().indexOf(schoolMatch[0]);
    school = entry.slice(idx, idx + 50).replace(/[,.;\n].*$/, '').trim();
  }

  // "diplômé de X" / "graduated from X"
  const gradMatch = entry.match(/(?:dipl[oô]m[eé]\s*de|graduated\s*from|dipl[oô]m[eé]e?\s*de|formation\s*chez|obtenu\s*[àa]\w*\s*)\s+([A-ZÀ-Ÿ][\wà-ÿ\s\-''']{2,50})/i);
  if (gradMatch && !school) {
    school = gradMatch[1].trim().replace(/[,.;].*$/, '');
  }

  // Fallback: use lines
  if (!degree && lines[0]) {
    degree = lines[0].replace(DATE_RANGE, '').replace(SINGLE_DATE, '').replace(/[,.;|]/g, '').trim();
  }
  if (!school && lines[1]) {
    school = lines[1].replace(DATE_RANGE, '').replace(SINGLE_DATE, '').replace(/[,.;|]/g, '').trim();
  }

  return { school, degree, field, startDate, endDate };
}

function extractEducationFromFreeText(text: string): Array<{ id: string; school: string; degree: string; field: string; startDate: string; endDate: string }> {
  const result: Array<{ id: string; school: string; degree: string; field: string; startDate: string; endDate: string }> = [];

  const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
  const eduKeywords = /(?:dipl[oô]me|dipl[oô]m[eé]e?|graduated|gradu[eé]|formation|degree|master|licence|bachelor|mba|doctorat|phd|bts|dut|but|bac|baccalaur[eé]at|ing[eé]nieur|certificat|universit[eé]|ecole|[eé]cole|institut|facult[eé])/i;

  for (const sentence of sentences) {
    if (!eduKeywords.test(sentence)) continue;

    const parsed = parseEducationEntry(sentence);
    if (parsed.school || parsed.degree) {
      result.push({ id: uid('edu', result.length), ...parsed });
    }
  }

  return result.slice(0, 5);
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
