export interface CVData {
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  photo: string | null;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export type TemplateCategory = 'pastel' | 'solid' | 'gradient' | 'professional' | 'creative' | 'minimal' | 'classic';

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  hasPhoto: boolean;
  category: TemplateCategory;
  layout: 'single column' | 'two column' | 'banner header';
}

export interface CVStyle {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  dividerColor: string;
  fontFamily: string;
  backgroundImage: string | null;
  sectionDividers: boolean;
}

export type AppStep = 'landing' | 'upload' | 'editor' | 'preview';

export interface AIRecommendation {
  id: string;
  type: 'action-verb' | 'quantify' | 'keyword' | 'summary' | 'general';
  field: string;
  original: string;
  suggestion: string;
  applied: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
}

export interface Conversation {
  id: string;
  title: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export interface SavedCV {
  id: string;
  userId: string;
  name: string;
  cvData: CVData;
  templateId: string;
  style: CVStyle;
  createdAt: number;
  updatedAt: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  createdAt: number;
}
