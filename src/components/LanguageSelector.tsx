import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
      >
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className="text-white">{currentLanguage.name}</span>
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right glass-effect rounded-xl p-2 shadow-lg focus:outline-none">
        {languages.map((language) => (
          <Menu.Item key={language.code}>
            {({ active }) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  active ? 'bg-white/10' : ''
                } group flex w-full items-center space-x-3 rounded-lg px-4 py-2 text-white`}
                onClick={() => i18n.changeLanguage(language.code)}
              >
                <span className="text-xl">{language.flag}</span>
                <span>{language.name}</span>
              </motion.button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}