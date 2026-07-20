import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CVData, CVTemplate, CVStyle, AppStep, AIRecommendation } from '../types';
import { templates, defaultCVStyle } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';

const emptyCVData: CVData = {
  jobTitle: '',
  fullName: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  photo: null,
  experience: [],
  education: [],
  skills: [],
  languages: [],
};

interface CVContextType {
  step: AppStep;
  setStep: (step: AppStep) => void;
  cvData: CVData;
  setCVData: (data: CVData) => void;
  selectedTemplate: CVTemplate;
  setSelectedTemplate: (template: CVTemplate) => void;
  cvStyle: CVStyle;
  setCVStyle: (style: CVStyle) => void;
  resetApp: () => void;
  isExtracting: boolean;
  setIsExtracting: (v: boolean) => void;
  recommendations: AIRecommendation[];
  setRecommendations: (r: AIRecommendation[]) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<AppStep>('landing');
  const [cvData, setCVDataState] = useLocalStorage<CVData>('cvbuilder_cvdata', emptyCVData);
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>(templates[0]);
  const [cvStyle, setCVStyleState] = useLocalStorage<CVStyle>('cvbuilder_cvstyle', defaultCVStyle);
  const [isExtracting, setIsExtracting] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  const setCVData = useCallback((data: CVData) => {
    setCVDataState(data);
  }, [setCVDataState]);

  const setCVStyle = useCallback((style: CVStyle) => {
    setCVStyleState(style);
  }, [setCVStyleState]);

  const resetApp = useCallback(() => {
    setStep('landing');
    setCVDataState(emptyCVData);
    setSelectedTemplate(templates[0]);
    setCVStyleState(defaultCVStyle);
    setRecommendations([]);
  }, [setCVDataState, setCVStyleState]);

  return (
    <CVContext.Provider
      value={{
        step,
        setStep,
        cvData,
        setCVData,
        selectedTemplate,
        setSelectedTemplate,
        cvStyle,
        setCVStyle,
        resetApp,
        isExtracting,
        setIsExtracting,
        recommendations,
        setRecommendations,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (!context) throw new Error('useCV must be used within CVProvider');
  return context;
}
