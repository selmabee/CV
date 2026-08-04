import { Link } from 'react-router-dom';
import { Mail, FileText, Shield, Map } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/assets/logo_ae2i copy.png"
                alt="AE2I Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <div>
                <div className="font-bold text-slate-100 text-lg leading-tight">AE2I</div>
                <div className="text-blue-400 font-semibold text-xs tracking-widest uppercase">CV Builder</div>
              </div>
            </Link>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              Créez un CV professionnel en quelques minutes. 100% gratuit, sans inscription, vos données restent privées.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Accueil</Link></li>
              <li><Link to="/builder" className="hover:text-blue-400 transition-colors">Créer un CV</Link></li>
              <li><Link to="/templates" className="hover:text-blue-400 transition-colors">Modèles</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Mes CVs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />Contact</Link></li>
              <li><Link to="/site-map" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><Map className="w-3.5 h-3.5" />Plan du site</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" />Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© 2026 AE2I CV Builder. Tous droits réservés.</p>
          <p className="flex items-center gap-2">
            <img src="/assets/logo_ae2i copy.png" alt="AE2I" className="h-5 w-auto object-contain brightness-0 invert opacity-60" />
            <span>Développé par <span className="text-slate-300 font-semibold">AE2I Algérie</span> 2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
