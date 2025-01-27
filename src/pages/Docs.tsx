import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const documentationSections = [
  {
    title: "Pierwsze kroki",
    icon: "🚀",
    items: [
      { name: "Instalacja", link: "#installation" },
      { name: "Konfiguracja", link: "#configuration" },
      { name: "Szybki start", link: "#quick-start" }
    ]
  },
  {
    title: "Podstawowe funkcje",
    icon: "📱",
    items: [
      { name: "Generowanie treści", link: "#content-generation" },
      { name: "Planowanie postów", link: "#post-scheduling" },
      { name: "Analityka", link: "#analytics" }
    ]
  },
  {
    title: "Zaawansowane",
    icon: "⚙️",
    items: [
      { name: "API", link: "#api" },
      { name: "Integracje", link: "#integrations" },
      { name: "Własne szablony", link: "#custom-templates" }
    ]
  }
];

export default function Docs() {
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
            Dokumentacja
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Wszystko, czego potrzebujesz, aby w pełni wykorzystać możliwości SocialMasterAI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {documentationSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.link}
                      className="text-gray-300 hover:text-accent transition-colors duration-300 flex items-center"
                    >
                      <span className="mr-2">→</span>
                      {item.name}
                    </a>
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