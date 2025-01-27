import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true, // Zawsze true - wymagane
    analytics: true,
    marketing: true,
    personalization: true
  });

  useEffect(() => {
    // Sprawdź czy użytkownik już dokonał wyboru
    const cookieChoice = localStorage.getItem('cookieChoice');
    const lastChoice = localStorage.getItem('cookieChoiceTimestamp');
    const now = new Date().getTime();

    // Jeśli nie ma wyboru lub minęło 12h od ostatniego wyboru
    if (!cookieChoice || !lastChoice || now - parseInt(lastChoice) > 12 * 60 * 60 * 1000) {
      setIsVisible(true);
    }

    // Wczytaj zapisane ustawienia
    const savedSettings = localStorage.getItem('cookieSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleAcceptAll = () => {
    setSettings({
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    });
    saveCookieChoice('all');
  };

  const handleRejectAll = () => {
    setSettings({
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    });
    saveCookieChoice('necessary');
  };

  const handleSaveSettings = () => {
    saveCookieChoice('custom');
  };

  const saveCookieChoice = (choice: string) => {
    localStorage.setItem('cookieChoice', choice);
    localStorage.setItem('cookieChoiceTimestamp', new Date().getTime().toString());
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
    setIsVisible(false);
    setShowSettings(false);
  };

  return (
    <>
      {/* Przycisk ustawień cookie */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-300"
        title="Ustawienia plików cookie"
      >
        <span className="text-2xl" role="img" aria-label="cookie">🍪</span>
      </motion.button>

      {/* Baner cookie */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-7xl mx-auto">
              <div className="glass-effect rounded-xl p-6 shadow-lg">
                {!showSettings ? (
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-white mb-2">🍪 Szanujemy Twoją prywatność</h3>
                        <p className="text-gray-300">
                          Używamy plików cookie, aby poprawić Twoje doświadczenia na naszej stronie.
                          Niektóre są niezbędne do działania strony, inne pomagają nam zrozumieć,
                          jak z niej korzystasz.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAcceptAll}
                        className="bg-accent text-dark px-6 py-2 rounded-full font-semibold hover:bg-white transition-colors duration-300"
                      >
                        Akceptuj wszystkie
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRejectAll}
                        className="bg-white/10 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
                      >
                        Odrzuć opcjonalne
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowSettings(true)}
                        className="bg-white/10 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
                      >
                        Dostosuj
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white">Ustawienia plików cookie</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Niezbędne</h4>
                          <p className="text-sm text-gray-300">
                            Wymagane do działania strony. Nie można ich wyłączyć.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.necessary}
                          disabled
                          className="rounded border-gray-600 bg-white/10 text-accent cursor-not-allowed"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Analityczne</h4>
                          <p className="text-sm text-gray-300">
                            Pomagają nam zrozumieć, jak korzystasz ze strony.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.analytics}
                          onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                          className="rounded border-gray-600 bg-white/10 text-accent"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Marketingowe</h4>
                          <p className="text-sm text-gray-300">
                            Używane do wyświetlania spersonalizowanych reklam.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.marketing}
                          onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })}
                          className="rounded border-gray-600 bg-white/10 text-accent"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Personalizacja</h4>
                          <p className="text-sm text-gray-300">
                            Dostosowują treść do Twoich preferencji.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.personalization}
                          onChange={(e) => setSettings({ ...settings, personalization: e.target.checked })}
                          className="rounded border-gray-600 bg-white/10 text-accent"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSaveSettings}
                        className="bg-accent text-dark px-6 py-2 rounded-full font-semibold hover:bg-white transition-colors duration-300"
                      >
                        Zapisz ustawienia
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowSettings(false)}
                        className="bg-white/10 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
                      >
                        Wróć
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}