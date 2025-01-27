import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const integrations = [
  {
    name: "Facebook",
    icon: "📱",
    description: "Automatyczne publikowanie i analiza postów na Facebooku",
    features: [
      "Planowanie postów",
      "Analiza zasięgów",
      "Moderacja komentarzy",
      "Statystyki zaangażowania"
    ]
  },
  {
    name: "Instagram",
    icon: "📸",
    description: "Zarządzanie kontem Instagram i analiza Stories",
    features: [
      "Planowanie Stories",
      "Analiza hashtagów",
      "Statystyki followersów",
      "Optymalizacja bio"
    ]
  },
  {
    name: "LinkedIn",
    icon: "💼",
    description: "Profesjonalna komunikacja na LinkedIn",
    features: [
      "Posty biznesowe",
      "Analiza sieci",
      "Lead generation",
      "Personal branding"
    ]
  }
];

export default function Integrations() {
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
            Integracje
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Połącz swoje konta social media i zarządzaj nimi z jednego miejsca
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="text-4xl mb-4">{integration.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{integration.name}</h3>
              <p className="text-gray-300 mb-4">{integration.description}</p>
              <ul className="space-y-2">
                {integration.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <span className="text-accent mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}