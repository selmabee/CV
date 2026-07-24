import type { CVData, AIRecommendation } from '../types';

export interface AIConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

const DEFAULT_CONFIG: AIConfig = {
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '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',
  model: import.meta.env.VITE_AI_MODEL || 'google/gemini-2.5-flash-lite',
};

const FALLBACK_MODELS = [
  'google/gemini-2.5-flash-lite',
  'google/gemini-flash-1.5',
  'google/gemini-2.0-flash-001',
  'meta-llama/llama-3.3-70b-instruct',
  'openai/gpt-4o-mini',
  'mistralai/mistral-large',
];

let currentConfig: AIConfig = { ...DEFAULT_CONFIG };

export function setAIConfig(config: Partial<AIConfig>) {
  currentConfig = { ...currentConfig, ...config };
}

export function getAIConfig(): AIConfig {
  return currentConfig;
}

const SYSTEM_PROMPT = `Tu es un assistant IA expert en recrutement et création de CV, intégré dans une application de création de CV.
Tu aides les utilisateurs à:
- Rédiger et améliorer leur CV
- Optimiser leur CV pour les ATS (Applicant Tracking Systems)
- Suggérer des verbes d'action plus forts
- Quantifier leurs réalisations
- Améliorer leur résumé professionnel
- Préparer des entretiens d'embauche
- Rédiger des lettres de motivation
- Conseiller sur leur carrière

Réponds toujours en français, de manière professionnelle mais accessible. Sois concis et actionnable.`;

function buildMessages(prompt: string, context?: string) {
  const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
  if (context) {
    messages.push({ role: 'system', content: `Contexte du CV de l'utilisateur:\n${context}` });
  }
  messages.push({ role: 'user', content: prompt });
  return messages;
}

function headers(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${currentConfig.apiKey}`,
    'HTTP-Referer': window.location.origin,
    'X-Title': 'AE2I CV Builder',
  };
}

export async function generateText(prompt: string, context?: string): Promise<string> {
  if (!currentConfig.apiKey) return callFallback(prompt);

  try {
    const res = await fetch(`${currentConfig.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        model: currentConfig.model,
        messages: buildMessages(prompt, context),
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });
    if (!res.ok) throw new Error(`OpenRouter API error: ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'Désolé, je n\'ai pas pu générer de réponse.';
  } catch {
    return callFallback(prompt);
  }
}

export async function streamText(
  prompt: string,
  context: string | undefined,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<string> {
  if (!currentConfig.apiKey) {
    const result = await callFallback(prompt);
    const words = result.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (signal?.aborted) break;
      onChunk(words[i] + (i < words.length - 1 ? ' ' : ''));
      await new Promise((r) => setTimeout(r, 20));
    }
    return result;
  }

  const res = await fetch(`${currentConfig.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      model: currentConfig.model,
      messages: buildMessages(prompt, context),
      temperature: 0.7,
      max_tokens: 2048,
      stream: true,
    }),
    signal,
  });

  if (!res.ok) throw new Error(`OpenRouter API error: ${res.status}`);

  const reader = res.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let full = '';
  let buffer = '';

  while (true) {
    if (signal?.aborted) break;
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data: ')) continue;
      const data = trimmed.slice(6);
      if (data === '[DONE]') return full;
      try {
        const json = JSON.parse(data);
        const text = json.choices?.[0]?.delta?.content;
        if (text) {
          full += text;
          onChunk(text);
        }
      } catch { /* skip */ }
    }
  }
  return full;
}

async function callFallback(prompt: string): Promise<string> {
  const lower = prompt.toLowerCase();
  if (lower.includes('verbe') || lower.includes('action')) {
    return 'Voici quelques verbes d\'action puissants pour votre CV:\n\n• Dirigé (au lieu de "géré")\n• Optimisé (au lieu de "amélioré")\n• Initié (au lieu de "commencé")\n• Transformé (au lieu de "changé")\n• Accéléré (au lieu de "accéléré")\n• Supervisé (au lieu de "encadré")\n\nUtilisez ces verbes au début de vos puces pour un impact maximal.';
  }
  if (lower.includes('quantif')) {
    return 'Pour quantifier vos réalisations:\n\n1. Ajoutez des chiffres concrets: "Augmenté les ventes de 35%"\n2. Précisez les délais: "En 6 mois"\n3. Mentionnez l\'équipe: "Dirigé une équipe de 12 personnes"\n4. Incluez le budget: "Géré un budget de 500K€"\n5. Mesurez l\'impact: "Réduit le temps de traitement de 40%"';
  }
  if (lower.includes('résumé') || lower.includes('resume') || lower.includes('summary')) {
    return 'Un bon résumé professionnel doit:\n\n1. Faire 3-4 lignes maximum\n2. Commencer par votre titre professionnel\n3. Mentionner vos années d\'expérience\n4. Mettre en avant 2-3 compétences clés\n5. Inclure une réalisation majeure\n\nExemple: "Développeur Full Stack avec 8 ans d\'expérience, spécialisé en React et Node.js. J\'ai dirigé le développement de 15+ applications web utilisées par plus de 100K utilisateurs. Passionné par l\'architecture logicielle et les bonnes pratiques."';
  }
  return 'Je suis votre assistant IA pour la création de CV. Je peux vous aider à:\n\n• Améliorer vos descriptions d\'expérience\n• Suggérer des verbes d\'action plus puissants\n• Quantifier vos réalisations\n• Optimiser votre résumé professionnel\n• Optimiser votre CV pour les ATS\n• Préparer vos entretiens\n\nPosez-moi une question spécifique sur votre CV !';
}

export async function extractCVWithAI(rawText: string): Promise<Partial<CVData>> {
  if (!rawText || rawText.trim().length < 20) {
    console.warn('extractCVWithAI: raw text too short');
    return {};
  }

  const extractionSystem = `Tu es un extracteur de CV automatique. Tu reçois le texte brut d'un CV et tu dois renvoyer UNIQUEMENT un objet JSON valide contenant les informations structurées. Ne renvoie aucun texte, aucune explication, aucun markdown. Seulement le JSON.`;

  const userPrompt = `Extrais les informations du CV ci-dessous et réponds avec un objet JSON valide (sans backticks, sans markdown) respectant exactement cette structure:
{
  "fullName": "Prénom Nom",
  "jobTitle": "Titre du poste",
  "email": "email@example.com",
  "phone": "numéro",
  "location": "Ville, Pays",
  "summary": "Résumé professionnel",
  "skills": ["compétence1"],
  "languages": [{"name": "Français", "level": "Courant"}],
  "experience": [{"company": "Entreprise", "position": "Poste", "startDate": "2020", "endDate": "2022", "description": "description"}],
  "education": [{"school": "École", "degree": "Diplôme", "field": "Domaine", "startDate": "2018", "endDate": "2020"}]
}

Règles:
- Si une information est absente, utilise "" ou [].
- Dates: année seule ("2020") ou "Présent".
- Niveau de langue: "Langue maternelle", "Courant", "Avancé", "Intermédiaire", "Débutant".
- Max 5 expériences, 5 formations.

Texte du CV:
${rawText.slice(0, 8000)}`;

  const maxAttempts = 2;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const text = await callAIForExtraction(extractionSystem, userPrompt);
      const cleaned = text
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const result: Partial<CVData> = {
          fullName: parsed.fullName || '',
          jobTitle: parsed.jobTitle || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          location: parsed.location || '',
          summary: parsed.summary || '',
          skills: Array.isArray(parsed.skills) ? parsed.skills : [],
          languages: Array.isArray(parsed.languages)
            ? parsed.languages.map((l: any, i: number) => ({
                id: `lang-${Date.now()}-${i}`,
                name: l.name || '',
                level: l.level || 'Intermédiaire',
              }))
            : [],
          experience: Array.isArray(parsed.experience)
            ? parsed.experience.map((e: any, i: number) => ({
                id: `exp-${Date.now()}-${i}`,
                company: e.company || '',
                position: e.position || '',
                startDate: e.startDate || '',
                endDate: e.endDate || '',
                description: e.description || '',
              }))
            : [],
          education: Array.isArray(parsed.education)
            ? parsed.education.map((e: any, i: number) => ({
                id: `edu-${Date.now()}-${i}`,
                school: e.school || '',
                degree: e.degree || '',
                field: e.field || '',
                startDate: e.startDate || '',
                endDate: e.endDate || '',
              }))
            : [],
        };
        console.log('extractCVWithAI: success', result);
        return result;
      }
      console.warn(`extractCVWithAI: no JSON in response (attempt ${attempt + 1})`, text.slice(0, 200));
    } catch (err) {
      console.error(`extractCVWithAI: attempt ${attempt + 1} failed`, err);
    }
  }
  return {};
}

async function callAIForExtraction(system: string, user: string): Promise<string> {
  if (!currentConfig.apiKey) throw new Error('No API key');

  let lastError: Error | null = null;
  for (const model of FALLBACK_MODELS) {
    try {
      const res = await fetch(`${currentConfig.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
          ],
          temperature: 0.2,
          max_tokens: 4096,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        lastError = new Error(`OpenRouter API error ${res.status}: ${errText.slice(0, 200)}`);
        console.warn(`Model ${model} failed (${res.status}), trying next...`);
        continue;
      }
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || '';
      if (content) return content;
      lastError = new Error(`Empty response from ${model}`);
    } catch (err: any) {
      lastError = err;
      console.warn(`Model ${model} error:`, err.message);
    }
  }
  throw lastError || new Error('All models failed');
}

export async function generateRecommendations(cvData: CVData): Promise<AIRecommendation[]> {
  const context = formatCVContext(cvData);
  const prompt = `Analyse ce CV et génère des recommandations d'amélioration. Pour chaque recommandation, indique:
- Le type: "action-verb", "quantify", "keyword", "summary", ou "general"
- Le champ concerné (ex: "experience[0].description", "summary")
- Le texte original
- La suggestion d'amélioration

Réponds en JSON array. Limite à 5 recommandations maximum.

CV:
${context}`;

  try {
    const text = await generateText(prompt);
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.map((r: any, i: number) => ({
        id: `rec-${Date.now()}-${i}`,
        type: r.type || 'general',
        field: r.field || '',
        original: r.original || '',
        suggestion: r.suggestion || '',
        applied: false,
      }));
    }
  } catch { /* fallback below */ }

  return generateFallbackRecommendations(cvData);
}

function formatCVContext(cv: CVData): string {
  let ctx = `Nom: ${cv.fullName}\nPoste: ${cv.jobTitle}\nEmail: ${cv.email}\nTéléphone: ${cv.phone}\nLocalisation: ${cv.location}\n\n`;
  ctx += `Résumé: ${cv.summary}\n\n`;
  ctx += `Expériences:\n`;
  cv.experience.forEach((e, i) => {
    ctx += `${i + 1}. ${e.position} chez ${e.company} (${e.startDate} - ${e.endDate})\n   ${e.description}\n`;
  });
  ctx += `\nFormation:\n`;
  cv.education.forEach((e) => {
    ctx += `- ${e.degree} en ${e.field}, ${e.school} (${e.startDate} - ${e.endDate})\n`;
  });
  ctx += `\nCompétences: ${cv.skills.join(', ')}\n`;
  ctx += `Langues: ${cv.languages.map((l) => `${l.name} (${l.level})`).join(', ')}`;
  return ctx;
}

function generateFallbackRecommendations(cvData: CVData): AIRecommendation[] {
  const recs: AIRecommendation[] = [];

  if (cvData.summary && cvData.summary.length < 50) {
    recs.push({
      id: `rec-${Date.now()}-0`,
      type: 'summary',
      field: 'summary',
      original: cvData.summary,
      suggestion: 'Votre résumé est court. Ajoutez vos années d\'expérience, vos compétences clés et une réalisation majeure (3-4 lignes).',
      applied: false,
    });
  }

  cvData.experience.forEach((exp, i) => {
    if (exp.description && !/\d/.test(exp.description)) {
      recs.push({
        id: `rec-${Date.now()}-${i + 1}`,
        type: 'quantify',
        field: `experience[${i}].description`,
        original: exp.description,
        suggestion: 'Ajoutez des chiffres concrets: pourcentage d\'amélioration, nombre de personnes encadrées, budget géré, etc.',
        applied: false,
      });
    }
  });

  if (cvData.experience.length > 0 && recs.length < 3) {
    const firstExp = cvData.experience[0];
    if (firstExp.description && !/(dirigé|optimisé|initié|transformé|créé|développé|implémenté)/i.test(firstExp.description)) {
      recs.push({
        id: `rec-${Date.now()}-verb`,
        type: 'action-verb',
        field: 'experience[0].description',
        original: firstExp.description,
        suggestion: 'Utilisez des verbes d\'action plus forts: "Dirigé", "Optimisé", "Initié" au lieu de verbes passifs.',
        applied: false,
      });
    }
  }

  if (cvData.skills.length < 5) {
    recs.push({
      id: `rec-${Date.now()}-skills`,
      type: 'keyword',
      field: 'skills',
      original: cvData.skills.join(', '),
      suggestion: 'Ajoutez plus de compétences techniques et de mots-clés ATS pertinents pour votre domaine.',
      applied: false,
    });
  }

  return recs;
}

export function getChatSuggestions(): string[] {
  return [
    'Comment améliorer mon résumé professionnel ?',
    'Quels verbes d\'action utiliser dans mon CV ?',
    'Comment optimiser mon CV pour les ATS ?',
    'Comment quantifier mes réalisations ?',
    'Aide-moi à rédiger une lettre de motivation',
    'Comment me préparer à un entretien d\'embauche ?',
  ];
}
