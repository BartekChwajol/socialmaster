import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const footerLinks = {
  company: [
    { name: "O nas", href: '/about' },
    { name: "Roadmapa", href: '/roadmap' },
    { name: "Kontakt", href: '/contact' },
    { name: "Kariera", href: '/careers' }
  ],
  product: [
    { name: "Funkcje", href: '/features' },
    { name: "Cennik", href: '/pricing' },
    { name: "Integracje", href: '/integrations' },
    { name: "API", href: '/api' },
    { name: "Status", href: '/status' }
  ],
  resources: [
    { name: "Dokumentacja", href: '/docs' },
    { name: "Poradniki", href: '/guides' },
    { name: "Webinary", href: '/webinars' },
    { name: "Szkolenia", href: '/training' },
    { name: "FAQ", href: '/faq' }
  ],
  legal: [
    { name: "Polityka prywatności", href: '/privacy' },
    { name: "Regulamin", href: '/terms' },
    { name: "RODO", href: '/gdpr' },
    { name: "Cookies", href: '/cookies' },
    { name: "Usuwanie danych", href: '/delete-data' }
  ]
};

const socialLinks = [
  { name: "Facebook", icon: "📱", href: "#" },
  { name: "Twitter", icon: "🐦", href: "#" },
  { name: "LinkedIn", icon: "💼", href: "#" },
  { name: "Instagram", icon: "📸", href: "#" }
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900/50 backdrop-blur-xl mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white">{t('footer.company')}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{t('footer.product')}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{t('footer.resources')}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{t('footer.legal')}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-300 hover:text-accent transition-colors"
                >
                  <span className="text-2xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300">
                &copy; {new Date().getFullYear()} SocialMasterAI. {t('footer.copyright')}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Stworzone z ❤️ w Polsce
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Siedziba: ul. Złota 44, 00-120 Warszawa | NIP: 123-456-78-90 | KRS: 0000123456
          </p>
        </div>
      </div>
    </footer>
  );
}