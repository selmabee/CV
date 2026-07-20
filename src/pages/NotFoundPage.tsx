import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="py-20 bg-slate-50 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-7xl sm:text-9xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          404
        </h1>
        <p className="mt-4 text-xl text-slate-600">Cette page n'existe pas</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
        >
          <Home className="w-5 h-5" />
          Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  );
}
