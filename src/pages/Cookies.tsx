import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Cookies() {
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
          <h1 className="text-4xl font-bold text-white mb-8">Polityka Cookies</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Czym są pliki cookies?</h2>
              <p>
                Pliki cookies (ciasteczka) są małymi plikami tekstowymi, które są zapisywane
                na Twoim urządzeniu podczas odwiedzania naszej strony.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Rodzaje cookies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Niezbędne cookies</h3>
                  <p>Konieczne do prawidłowego działania strony</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Analityczne cookies</h3>
                  <p>Pomagają nam zrozumieć, jak użytkownicy korzystają ze strony</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Funkcjonalne cookies</h3>
                  <p>Zapamiętują Twoje preferencje i ustawienia</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Marketingowe cookies</h3>
                  <p>Służą do personalizacji reklam</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Cel wykorzystania</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Zapewnienie prawidłowego działania strony</li>
                <li>Personalizacja treści</li>
                <li>Analiza ruchu na stronie</li>
                <li>Poprawa funkcjonalności</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Zarządzanie cookies</h2>
              <p className="mb-4">
                Możesz zarządzać ustawieniami plików cookies w swojej przeglądarce.
                Masz możliwość:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Akceptacji wszystkich cookies</li>
                <li>Odrzucenia nieistotnych cookies</li>
                <li>Usunięcia zapisanych cookies</li>
                <li>Blokady cookies w przyszłości</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Okres przechowywania</h2>
              <p>
                Okres przechowywania plików cookies zależy od ich rodzaju.
                Niektóre są usuwane po zamknięciu przeglądarki, inne mogą być
                przechowywane dłużej.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Zmiany polityki</h2>
              <p>
                Zastrzegamy sobie prawo do zmiany niniejszej polityki cookies.
                Aktualna wersja będzie zawsze dostępna na naszej stronie.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}