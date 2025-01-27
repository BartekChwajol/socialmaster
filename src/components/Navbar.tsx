import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useState } from 'react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <div className="mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/" className="text-xl font-bold gradient-text">
                SocialMasterAI
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {['/', '/about', '/pricing', '/roadmap', '/contact'].map((path) => (
                    <motion.div
                      key={path}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={path}
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-300"
                      >
                        {path === '/' ? t('common.home') :
                         path === '/about' ? t('common.about') :
                         path === '/pricing' ? t('common.pricing') :
                         path === '/roadmap' ? t('nav.roadmap') : t('common.contact')}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSelector />
              {user ? (
                <div className="flex items-center space-x-4">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-300">
                      {t('common.dashboard')}
                    </Link>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => signOut()}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {t('common.logout')}
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="bg-white/10 px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                  >
                    {t('common.register')}
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-0 right-0 glass-effect rounded-xl p-4 mx-4"
          >
            <div className="space-y-4">
              {['/', '/about', '/pricing', '/roadmap', '/contact'].map((path) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-300"
                >
                  {path === '/' ? t('common.home') :
                   path === '/about' ? t('common.about') :
                   path === '/pricing' ? t('common.pricing') :
                   path === '/roadmap' ? t('nav.roadmap') : t('common.contact')}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-white/10">
                <LanguageSelector />
              </div>

              <div className="pt-4 border-t border-white/10">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-300"
                    >
                      {t('common.dashboard')}
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-300"
                    >
                      {t('common.logout')}
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center bg-accent text-dark px-4 py-2 rounded-full font-semibold hover:bg-white transition-colors duration-300"
                  >
                    {t('common.register')}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}