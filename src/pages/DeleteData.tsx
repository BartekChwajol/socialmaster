import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function DeleteData() {
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
          <h1 className="text-4xl font-bold text-white mb-8">Usuwanie Danych</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Jak usunąć swoje dane?</h2>
              <p className="mb-4">
                Zgodnie z RODO i innymi przepisami o ochronie danych, zapewniamy naszym użytkownikom
                możliwość całkowitego usunięcia ich danych z naszego systemu. Możesz to zrobić na kilka sposobów:
              </p>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <strong className="text-white">Z poziomu konta:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Zaloguj się do swojego konta</li>
                    <li>Przejdź do Ustawień</li>
                    <li>Wybierz opcję "Usuń konto i dane"</li>
                    <li>Potwierdź operację</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Poprzez kontakt z nami:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Wyślij email na adres: privacy@socialmasterai.com</li>
                    <li>W temacie wpisz: "Żądanie usunięcia danych - [Twój email]"</li>
                    <li>W treści podaj swój email i potwierdź chęć usunięcia danych</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-white">Listownie:</strong>
                  <p className="mt-2">
                    Wyślij pisemne żądanie usunięcia danych na adres:<br />
                    SocialMasterAI Sp. z o.o.<br />
                    ul. Złota 44<br />
                    00-120 Warszawa<br />
                    Polska
                  </p>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Co się stanie po usunięciu danych?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wszystkie Twoje dane osobowe zostaną trwale usunięte</li>
                <li>Twoje konto zostanie dezaktywowane</li>
                <li>Wszystkie połączenia z mediami społecznościowymi zostaną rozłączone</li>
                <li>Wygenerowane treści zostaną usunięte</li>
                <li>Historia analityki zostanie wykasowana</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Czas realizacji</h2>
              <p>
                Zgodnie z RODO, zrealizujemy Twoje żądanie usunięcia danych bez zbędnej zwłoki,
                nie później niż w ciągu 30 dni od otrzymania żądania. W szczególnych przypadkach,
                gdy żądanie jest skomplikowane, możemy potrzebować dodatkowych 60 dni.
                Zawsze poinformujemy Cię o takim wydłużeniu terminu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Wyjątki</h2>
              <p className="mb-4">
                W niektórych przypadkach możemy być zobowiązani do zachowania części Twoich danych
                ze względu na:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wymogi prawne (np. dokumenty księgowe)</li>
                <li>Uzasadniony interes administratora (np. obrona przed roszczeniami)</li>
                <li>Wykonanie umowy</li>
              </ul>
              <p className="mt-4">
                W takich przypadkach poinformujemy Cię, które dane i dlaczego muszą zostać zachowane
                oraz jak długo będą przechowywane.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Kontakt w sprawie danych</h2>
              <p>
                W przypadku jakichkolwiek pytań dotyczących usuwania danych, możesz skontaktować się
                z naszym Inspektorem Ochrony Danych:<br /><br />
                Email: iod@socialmasterai.com<br />
                Tel: +48 22 123 45 67<br />
                Adres: ul. Złota 44, 00-120 Warszawa
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}