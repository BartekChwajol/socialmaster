import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Terms() {
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
          <h1 className="text-4xl font-bold text-white mb-8">Regulamin</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§1. Postanowienia ogólne</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  Niniejszy regulamin określa zasady korzystania z platformy SocialMasterAI,
                  dostępnej pod adresem [ADRES_URL].
                </li>
                <li>
                  Właścicielem platformy jest:<br />
                  SocialMasterAI Sp. z o.o.<br />
                  ul. Złota 44<br />
                  00-120 Warszawa<br />
                  NIP: [UZUPEŁNIĆ]<br />
                  REGON: [UZUPEŁNIĆ]<br />
                  KRS: [UZUPEŁNIĆ]
                </li>
                <li>
                  Kontakt z właścicielem platformy możliwy jest poprzez:<br />
                  - email: contact@socialmasterai.com<br />
                  - telefon: +48 22 123 45 67<br />
                  - adres korespondencyjny: ul. Złota 44, 00-120 Warszawa
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§2. Definicje</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <strong className="text-white">Platforma</strong> - serwis internetowy SocialMasterAI
                </li>
                <li>
                  <strong className="text-white">Użytkownik</strong> - osoba fizyczna lub prawna korzystająca z Platformy
                </li>
                <li>
                  <strong className="text-white">Konto</strong> - zbiór zasobów i uprawnień przypisanych Użytkownikowi
                </li>
                <li>
                  <strong className="text-white">Usługi</strong> - funkcjonalności dostępne na Platformie
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§3. Warunki korzystania</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  Korzystanie z Platformy wymaga:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Ukończenia 18 lat lub posiadania zgody opiekuna prawnego</li>
                    <li>Założenia konta</li>
                    <li>Zaakceptowania regulaminu i polityki prywatności</li>
                    <li>Posiadania aktywnego planu subskrypcji (dla funkcji premium)</li>
                  </ul>
                </li>
                <li>
                  Użytkownik zobowiązuje się do:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Podawania prawdziwych danych</li>
                    <li>Przestrzegania prawa i dobrych obyczajów</li>
                    <li>Nienaruszania praw osób trzecich</li>
                    <li>Zachowania poufności danych dostępowych</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§4. Usługi i płatności</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  Platforma oferuje:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Generowanie treści przy użyciu AI</li>
                    <li>Zarządzanie mediami społecznościowymi</li>
                    <li>Analizę danych i statystyki</li>
                    <li>Automatyzację publikacji</li>
                  </ul>
                </li>
                <li>
                  Opłaty:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Wysokość opłat określa cennik dostępny na stronie</li>
                    <li>Płatności realizowane są z góry za wybrany okres</li>
                    <li>Akceptowane formy płatności: karty płatnicze, przelewy</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§5. Prawa i obowiązki</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  Prawa Użytkownika:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Dostęp do zakupionych funkcji</li>
                    <li>Wsparcie techniczne</li>
                    <li>Ochrona danych osobowych</li>
                    <li>Reklamacje i zwroty</li>
                  </ul>
                </li>
                <li>
                  Obowiązki Użytkownika:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Przestrzeganie regulaminu</li>
                    <li>Terminowe opłacanie usług</li>
                    <li>Odpowiedzialność za treści</li>
                    <li>Zabezpieczenie konta</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§6. Odpowiedzialność</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  Platforma nie ponosi odpowiedzialności za:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Treści generowane przez użytkowników</li>
                    <li>Przerwy w działaniu wynikające z przyczyn technicznych</li>
                    <li>Działania osób trzecich</li>
                    <li>Szkody wynikłe z nieprawidłowego korzystania z usług</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§7. Reklamacje</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  Zgłaszanie reklamacji:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Email: support@socialmasterai.com</li>
                    <li>Formularz na stronie</li>
                    <li>Pisemnie na adres firmy</li>
                  </ul>
                </li>
                <li>
                  Reklamacja powinna zawierać:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Dane użytkownika</li>
                    <li>Opis problemu</li>
                    <li>Oczekiwane rozwiązanie</li>
                  </ul>
                </li>
                <li>
                  Czas rozpatrzenia reklamacji: do 14 dni roboczych
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§8. Ochrona danych</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  Zasady przetwarzania danych określa Polityka Prywatności
                </li>
                <li>
                  Użytkownik ma prawo do:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Dostępu do swoich danych</li>
                    <li>Modyfikacji danych</li>
                    <li>Usunięcia danych</li>
                    <li>Przenoszenia danych</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§9. Postanowienia końcowe</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  Regulamin wchodzi w życie z dniem [DATA]
                </li>
                <li>
                  Platforma zastrzega sobie prawo do zmiany regulaminu
                </li>
                <li>
                  O zmianach regulaminu użytkownicy będą informowani z wyprzedzeniem
                </li>
                <li>
                  W sprawach nieuregulowanych zastosowanie mają przepisy prawa polskiego
                </li>
              </ol>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}