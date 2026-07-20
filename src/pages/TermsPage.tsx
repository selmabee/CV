import { motion } from 'framer-motion';

const sections = [
  { title: 'Acceptation des conditions', text: 'En utilisant AE2I CV Builder, vous acceptez les présentes conditions. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser le service.' },
  { title: 'Description du service', text: 'AE2I CV Builder est un outil gratuit de création de CV assisté par intelligence artificielle. Le service permet d\'uploader un CV existant, de l\'analyser, de le personnaliser et de l\'exporter.' },
  { title: 'Avertissement "TEL QUEL"', text: 'Le service est fourni "tel quel" sans garantie d\'aucune sorte. Nous ne garantissons pas que le service sera ininterrompu ou sans erreur.' },
  { title: 'Limitation de responsabilité', text: 'AE2I CV Builder ne saurait être tenu responsable des dommages directs, indirects ou consécutifs résultant de l\'utilisation du service.' },
  { title: 'Responsabilités de l\'utilisateur', text: 'Vous êtes responsable de l\'exactitude des informations contenues dans votre CV. Vous vous engagez à ne pas utiliser le service à des fins illégales.' },
  { title: 'Contenu généré par l\'IA', text: 'Les suggestions et contenus générés par l\'IA sont fournis à titre indicatif. Vous êtes responsable de la vérification et de la validation de tous les contenus avant utilisation.' },
  { title: 'Aucun conseil professionnel', text: 'Le service ne constitue pas un conseil professionnel en recrutement ou en carrière. Pour des conseils personnalisés, consultez un professionnel.' },
  { title: 'Disponibilité du service', text: 'Nous nous efforçons de maintenir le service disponible mais ne garantissons pas un accès ininterrompu. Des maintenances peuvent être effectuées sans préavis.' },
  { title: 'Services tiers', text: 'Le service utilise des APIs tierces (notamment OpenRouter pour l\'IA). Nous ne sommes pas responsables des interruptions de ces services.' },
  { title: 'Modifications des conditions', text: 'Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prennent effet dès leur publication.' },
  { title: 'Droit applicable', text: 'Les présentes conditions sont régies par le droit applicable au lieu d\'édition du service.' },
];

export default function TermsPage() {
  return (
    <div className="py-16 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Conditions d'utilisation</h1>
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
