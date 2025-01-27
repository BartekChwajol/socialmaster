import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function GDPR() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-effect rounded-xl p-8"
        >
          <h1 className="text-4xl font-bold text-white mb-8">RODO</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Administrator Danych</h2>
              <p>
                Administratorem Twoich danych osobowych jest SocialMasterAI sp. z o.o.
                z siedzibą w Warszawie, ul. Złota 44, 00-120 Warszawa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Podstawa Prawna</h2>
              <p className="mb-4">Przetwarzamy Twoje dane na podstawie:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Art. 6 ust. 1 lit. a) RODO (zgoda)</li>
                <li>Art. 6 ust. 1 lit. b) RODO (umowa)</li>
                <li>Art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Cele Przetwarzania</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Świadczenie usług</li>
                <li>Marketing bezpośredni</li>
                <li>Analiza i statystyka</li>
                <li>Obsługa klienta</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Okres Przechowywania</h2>
              <p>
                Dane przechowujemy przez okres niezbędny do realizacji celów przetwarzania,
                nie dłużej niż jest to wymagane przepisami prawa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Prawa Osoby</h2>
              <p className="mb-4">Przysługuje Ci prawo do:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dostępu do danych</li>
                <li>Sprostowania danych</li>
                <li>Usunięcia danych</li>
                <li>Ograniczenia przetwarzania</li>
                <li>Przenoszenia danych</li>
                <li>Sprzeciwu</li>
                <li>Cofnięcia zgody</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Kontakt</h2>
              <p>
                W sprawach związanych z ochroną danych osobowych możesz się skontaktować
                z naszym Inspektorem Ochrony Danych: iod@socialmasterai.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}