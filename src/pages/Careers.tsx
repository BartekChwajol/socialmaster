import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const positions = [
  {
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Warszawa / Remote",
    type: "Pełny etat",
    description: "Rozwój algorytmów AI do generowania treści w mediach społecznościowych",
    requirements: [
      "5+ lat doświadczenia w ML/AI",
      "Znajomość PyTorch lub TensorFlow",
      "Doświadczenie z NLP",
      "Wykształcenie wyższe w CS/AI"
    ]
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Warszawa",
    type: "Pełny etat",
    description: "Zarządzanie rozwojem produktu i definiowanie roadmapy",
    requirements: [
      "3+ lat doświadczenia w PM",
      "Doświadczenie w prowadzeniu produktów SaaS",
      "Znajomość metodyk zwinnych",
      "Umiejętności analityczne"
    ]
  },
  {
    title: "Social Media Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Pełny etat",
    description: "Tworzenie i optymalizacja strategii social media",
    requirements: [
      "2+ lat doświadczenia w social media",
      "Portfolio udanych kampanii",
      "Znajomość narzędzi analitycznych",
      "Kreatywność i innowacyjność"
    ]
  }
];

const benefits = [
  {
    icon: "💻",
    title: "Elastyczna praca zdalna",
    description: "Pracuj z dowolnego miejsca i w elastycznych godzinach"
  },
  {
    icon: "🎓",
    title: "Rozwój",
    description: "Budget szkoleniowy i dostęp do platform edukacyjnych"
  },
  {
    icon: "🏥",
    title: "Opieka medyczna",
    description: "Prywatna opieka medyczna i karta Multisport"
  },
  {
    icon: "🎉",
    title: "Wydarzenia integracyjne",
    description: "Regularne spotkania zespołu i wyjazdy integracyjne"
  }
];

const values = [
  {
    title: "Innowacyjność",
    description: "Ciągłe poszukiwanie nowych rozwiązań i możliwości"
  },
  {
    title: "Współpraca",
    description: "Wspólne osiąganie celów i wzajemne wsparcie"
  },
  {
    title: "Rozwój",
    description: "Ciągłe doskonalenie się i zdobywanie nowych umiejętności"
  }
];

export default function Careers() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            Kariera w SocialMasterAI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dołącz do zespołu tworzącego przyszłość social media marketingu
          </p>
        </motion.div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6 text-center"
            >
              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Otwarte pozycje
          </h2>
          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{position.title}</h3>
                    <p className="text-gray-300">{position.department} · {position.location}</p>
                  </div>
                  <span className="mt-2 md:mt-0 px-3 py-1 bg-accent text-dark rounded-full text-sm font-medium">
                    {position.type}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{position.description}</p>
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">Wymagania:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    {position.requirements.map((req, i) => (
                      <li key={i} className="text-gray-300">{req}</li>
                    ))}
                  </ul>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2 bg-accent text-dark rounded-full font-semibold hover:bg-white transition-colors duration-300"
                >
                  Aplikuj teraz
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Benefity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-effect rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Nie znalazłeś odpowiedniej pozycji?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Wyślij nam swoje CV, a odezwiemy się gdy pojawi się odpowiednia rola
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
          >
            Wyślij CV
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}