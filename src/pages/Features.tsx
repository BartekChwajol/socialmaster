import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    title: "AI Content Generator",
    description: "Automatycznie generuj angażujące treści dopasowane do Twojej marki",
    icon: "🤖",
    details: [
      "Personalizacja treści",
      "Optymalizacja pod SEO",
      "Wielojęzyczne wsparcie",
      "Analiza sentymentu"
    ]
  },
  {
    title: "Smart Scheduler",
    description: "Inteligentne planowanie postów w najlepszym czasie",
    icon: "📅",
    details: [
      "Automatyczne harmonogramowanie",
      "Analiza najlepszego czasu",
      "Zarządzanie wieloma platformami",
      "Kalendarz publikacji"
    ]
  },
  {
    title: "Analytics Dashboard",
    description: "Zaawansowana analityka i raporty wydajności",
    icon: "📊",
    details: [
      "Raporty w czasie rzeczywistym",
      "Śledzenie zaangażowania",
      "Analiza konkurencji",
      "Personalizowane dashboardy"
    ]
  }
];

export default function Features() {
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            Funkcje SocialMasterAI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Odkryj zaawansowane narzędzia, które pomogą Ci w zarządzaniu mediami społecznościowymi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="text-accent mr-2">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-effect rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Gotowy wypróbować wszystkie funkcje?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rozpocznij 14-dniowy okres próbny i odkryj pełen potencjał SocialMasterAI
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-dark px-8 py-4 rounded-full font-semibold hover:bg-white transition-colors duration-300"
          >
            Rozpocznij za darmo
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}