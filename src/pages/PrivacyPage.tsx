import { motion } from 'framer-motion';

const sections = [
  { title: 'Aucune responsabilité sur la confidentialité', text: 'AE2I CV Builder ne prend pas en charge la responsabilité de la confidentialité des documents que vous traitez via le service. Vous utilisez le service à vos propres risques. Vous êtes libre d\'utiliser ou non l\'outil selon votre appréciation des risques liés à vos données.' },
  { title: 'Traitement local des données', text: 'Les données de votre CV sont traitées localement dans votre navigateur. Aucune donnée n\'est envoyée à des services tiers. AE2I CV Builder ne stocke pas vos données sur ses serveurs.' },
  { title: 'Votre responsabilité', text: 'Il vous appartient de juger si le contenu que vous soumettez est sensible ou confidentiel. Si vos documents contiennent des informations que vous ne souhaitez pas transmettre à un tiers, ne les utilisez pas avec ce service.' },
  { title: 'Stockage navigateur', text: 'Vos données sont sauvegardées dans votre navigateur via le stockage local. Elles ne sont pas stockées sur nos serveurs. Effacer les données de votre navigateur supprime également vos données de CV.' },
  { title: 'Aucun service tiers', text: 'Le service ne fait appel à aucun service tiers pour le traitement de vos données. Tout se fait localement dans votre navigateur.' },
  { title: 'Modifications', text: 'Nous nous réservons le droit de modifier cette politique. Les modifications prennent effet dès leur publication.' },
  { title: 'Contact', text: 'Pour toute question, contactez-nous via la page Contact.' },
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
