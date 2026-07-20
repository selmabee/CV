import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Loader2, Check, X, Sparkles, TrendingUp, Target, Zap, FileText, RefreshCw } from 'lucide-react';
import { generateRecommendations } from '../../services/ai';
import type { AIRecommendation } from '../../types';

const typeConfig = {
  'action-verb': { icon: Zap, label: 'Verbe d\'action', color: 'text-amber-600 bg-amber-50' },
  'quantify': { icon: TrendingUp, label: 'Quantification', color: 'text-blue-600 bg-blue-50' },
  'keyword': { icon: Target, label: 'Mots-clés ATS', color: 'text-emerald-600 bg-emerald-50' },
  'summary': { icon: FileText, label: 'Résumé', color: 'text-violet-600 bg-violet-50' },
  'general': { icon: Lightbulb, label: 'Conseil', color: 'text-slate-600 bg-slate-50' },
};

export default function AIRecommendations() {
  const { cvData, recommendations, setRecommendations } = useCV();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const recs = await generateRecommendations(cvData);
      setRecommendations(recs);
    } catch {
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (id: string) => {
    setRecommendations(recommendations.map(r => r.id === id ? { ...r, applied: true } : r));
  };

  const handleDismiss = (id: string) => {
    setRecommendations(recommendations.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Recommandations IA
          </h3>
          <p className="text-sm text-slate-500 mt-1">Améliorez votre CV avec l'IA</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : recommendations.length ? <RefreshCw className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          {recommendations.length ? 'Régénérer' : 'Générer'}
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
          <p className="text-sm text-slate-600">Analyse de votre CV en cours...</p>
        </div>
      )}

      {!loading && recommendations.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
          <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-600">Cliquez sur "Générer" pour obtenir des recommandations personnalisées.</p>
        </div>
      )}

      <AnimatePresence>
        {recommendations.map((rec) => {
          const config = typeConfig[rec.type] || typeConfig.general;
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`border rounded-xl p-4 ${rec.applied ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${config.color}`}>
                  <config.icon className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${config.color}`}>{config.label}</span>
                    {rec.field && <span className="text-xs text-slate-400 font-mono">{rec.field}</span>}
                  </div>
                  {rec.original && (
                    <p className="text-xs text-slate-500 mb-1 line-clamp-2">Original: "{rec.original}"</p>
                  )}
                  <p className="text-sm text-slate-700">{rec.suggestion}</p>
                </div>
                {!rec.applied && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => handleApply(rec.id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg" title="Appliquer">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDismiss(rec.id)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg" title="Ignorer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {rec.applied && (
                  <div className="flex-shrink-0">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
