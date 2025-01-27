import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const apiFeatures = [
  {
    title: "REST API",
    description: "Pełne API REST do integracji z Twoimi systemami",
    endpoints: [
      "POST /api/posts - Tworzenie postów",
      "GET /api/analytics - Pobieranie statystyk",
      "PUT /api/schedule - Zarządzanie harmonogramem",
      "DELETE /api/posts/:id - Usuwanie postów"
    ]
  },
  {
    title: "Webhooks",
    description: "Otrzymuj powiadomienia o ważnych wydarzeniach",
    endpoints: [
      "Post published",
      "Comment received",
      "Analytics updated",
      "Schedule changed"
    ]
  },
  {
    title: "SDK",
    description: "Gotowe biblioteki dla popularnych języków",
    endpoints: [
      "JavaScript/TypeScript",
      "Python",
      "PHP",
      "Java"
    ]
  }
];

export default function API() {
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
            API Documentation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Integruj SocialMasterAI z własnymi systemami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apiFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 mb-6">{feature.description}</p>
              <div className="space-y-2">
                {feature.endpoints.map((endpoint, i) => (
                  <div key={i} className="glass-effect p-2 rounded text-sm text-gray-300">
                    <code>{endpoint}</code>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}