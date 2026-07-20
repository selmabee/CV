import { motion } from 'framer-motion';

const sections = [
  { title: 'Notre engagement de confidentialité', text: 'Chez AE2I CV Builder, la confidentialité est au cœur de notre mission. Vos données vous appartiennent et nous les traitons avec le plus grand respect.' },
  { title: 'Aucun stockage de données', text: 'Par défaut, toutes les données de votre CV sont traitées localement dans votre navigateur. Elles ne sont jamais stockées sur nos serveurs sans votre consentement explicite.' },
  { title: 'Traitement par l\'IA', text: 'Lorsque vous utilisez les fonctionnalités IA, certaines données sont envoyées à OpenRouter pour traitement. Ces données ne sont pas stockées par le fournisseur et sont utilisées uniquement pour générer la réponse.' },
  { title: 'Comptes utilisateurs', text: 'Si vous créez un compte, votre email et vos CV sauvegardés sont stockés de manière sécurisée via Firebase. Vous pouvez supprimer votre compte et toutes vos données à tout moment.' },
  { title: 'Cookies et suivi', text: 'Nous utilisons uniquement les cookies nécessaires au fonctionnement du service. Nous ne vendons pas vos données à des tiers.' },
  { title: 'Services tiers', text: 'Nous utilisons Firebase (authentification et base de données) et OpenRouter (IA). Ces services ont leurs propres politiques de confidentialité.' },
  { title: 'Sécurité des données', text: 'Toutes les communications sont chiffrées via HTTPS. Les données stockées sur Firebase sont protégées par les règles de sécurité Firestore et Storage.' },
  { title: 'Confidentialité des enfants', text: 'Le service n\'est pas destiné aux personnes de moins de 13 ans. Nous ne collectons pas sciemment de données d\'enfants.' },
  { title: 'Modifications', text: 'Nous nous réservons le droit de modifier cette politique de confidentialité. Les modifications prennent effet dès leur publication.' },
  { title: 'Contact', text: 'Pour toute question concernant la confidentialité, contactez-nous via la page Contact.' },
];

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Politique de confidentialité</h1>
          <p className="text-sm text-slate-500 mb-12">Dernière mise à jour : 13 juillet 2026</p>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">{section.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
