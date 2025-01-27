import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Privacy() {
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
          <h1 className="text-4xl font-bold text-white mb-8">Polityka Prywatności</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Informacje ogólne</h2>
              <p>
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych
                przekazanych przez Użytkowników w związku z korzystaniem z platformy SocialMasterAI.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Administrator Danych</h2>
              <p>
                Administratorem danych osobowych jest:<br /><br />
                SocialMasterAI Sp. z o.o.<br />
                ul. Złota 44<br />
                00-120 Warszawa<br />
                NIP: [UZUPEŁNIĆ]<br />
                REGON: [UZUPEŁNIĆ]<br />
                KRS: [UZUPEŁNIĆ]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Zakres zbieranych danych</h2>
              <p className="mb-4">Przetwarzamy następujące dane osobowe:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dane konta (email, nazwa użytkownika)</li>
                <li>Dane profilowe (imię, nazwisko, firma)</li>
                <li>Dane do fakturowania</li>
                <li>Dane techniczne (IP, cookies)</li>
                <li>Dane z połączonych kont social media</li>
                <li>Historia aktywności na platformie</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Cel przetwarzania danych</h2>
              <p className="mb-4">Dane są przetwarzane w celu:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Świadczenia usług na platformie</li>
                <li>Realizacji płatności</li>
                <li>Komunikacji z użytkownikiem</li>
                <li>Analityki i poprawy jakości usług</li>
                <li>Marketingu bezpośredniego</li>
                <li>Wypełnienia obowiązków prawnych</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Podstawa prawna</h2>
              <p className="mb-4">Przetwarzamy dane na podstawie:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Art. 6 ust. 1 lit. b RODO (wykonanie umowy)</li>
                <li>Art. 6 ust. 1 lit. c RODO (obowiązek prawny)</li>
                <li>Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)</li>
                <li>Art. 6 ust. 1 lit. a RODO (zgoda)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Okres przechowywania</h2>
              <p>
                Dane przechowujemy przez okres niezbędny do realizacji celów przetwarzania,
                nie dłużej niż jest to wymagane przepisami prawa. W przypadku danych
                przetwarzanych na podstawie zgody - do momentu jej wycofania.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Prawa użytkownika</h2>
              <p className="mb-4">Użytkownik ma prawo do:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dostępu do swoich danych</li>
                <li>Sprostowania danych</li>
                <li>Usunięcia danych</li>
                <li>Ograniczenia przetwarzania</li>
                <li>Przenoszenia danych</li>
                <li>Sprzeciwu wobec przetwarzania</li>
                <li>Wycofania zgody</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Odbiorcy danych</h2>
              <p className="mb-4">Dane mogą być przekazywane:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dostawcom usług IT</li>
                <li>Dostawcom usług płatności</li>
                <li>Podmiotom świadczącym usługi księgowe</li>
                <li>Organom państwowym na podstawie przepisów prawa</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Bezpieczeństwo</h2>
              <p>
                Stosujemy odpowiednie środki techniczne i organizacyjne zapewniające
                bezpieczeństwo przetwarzanych danych osobowych. Regularnie testujemy,
                mierzymy i oceniamy skuteczność tych środków.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Kontakt</h2>
              <p>
                W sprawach związanych z ochroną danych osobowych można kontaktować się z
                Inspektorem Ochrony Danych:<br /><br />
                Email: iod@socialmasterai.com<br />
                Tel: +48 22 123 45 67<br />
                Adres: ul. Złota 44, 00-120 Warszawa
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Zmiany polityki</h2>
              <p>
                Zastrzegamy sobie prawo do zmiany niniejszej Polityki Prywatności.
                O wszelkich zmianach będziemy informować poprzez stronę internetową
                lub drogą mailową.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}