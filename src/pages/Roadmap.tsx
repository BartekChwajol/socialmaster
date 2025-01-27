import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const roadmapItems = [
  {
    quarter: "Q4 2023",
    title: "Fundamenty i Podstawowe Funkcje",
    description: "Budowa solidnych podstaw platformy i implementacja kluczowych funkcjonalności.",
    items: [
      "Integracja z popularnymi platformami social media",
      "Ulepszony algorytm generowania treści",
      "Nowe szablony postów",
      "System zarządzania harmonogramem"
    ],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    status: "completed",
    stats: {
      completion: "100%",
      features: "15+",
      users: "5000+"
    }
  },
  {
    quarter: "Q1 2024",
    title: "Rozszerzenie Funkcjonalności",
    description: "Wprowadzenie zaawansowanych narzędzi analitycznych i automatyzacji.",
    items: [
      "Analityka i raporty wydajności",
      "Automatyczne planowanie postów",
      "Personalizowane rekomendacje treści",
      "Integracja z narzędziami do edycji grafiki"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2015&q=80",
    status: "in-progress",
    stats: {
      completion: "60%",
      features: "8+",
      users: "2000+"
    }
  },
  {
    quarter: "Q2 2024",
    title: "Zaawansowane Funkcje AI",
    description: "Implementacja najnowszych technologii sztucznej inteligencji.",
    items: [
      "Zaawansowana analiza sentymentu",
      "Automatyczna optymalizacja czasu publikacji",
      "System rekomendacji hashtagów",
      "Personalizowane style wizualne"
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    status: "planned",
    stats: {
      completion: "0%",
      features: "12+",
      users: "Planned"
    }
  },
  {
    quarter: "Q3 2024",
    title: "Globalna Ekspansja",
    description: "Rozszerzenie zasięgu platformy na rynki międzynarodowe.",
    items: [
      "Wsparcie dla wielu języków",
      "Lokalne rekomendacje treści",
      "Integracja z regionalnymi platformami",
      "Międzynarodowe szablony treści"
    ],
    image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    status: "planned",
    stats: {
      completion: "0%",
      features: "10+",
      users: "Planned"
    }
  }
];

const technologies = [
  {
    name: "Sztuczna Inteligencja",
    icon: "🤖",
    description: "Zaawansowane algorytmy AI do generowania treści"
  },
  {
    name: "Machine Learning",
    icon: "🧠",
    description: "Uczenie maszynowe do personalizacji"
  },
  {
    name: "Big Data",
    icon: "📊",
    description: "Analiza dużych zbiorów danych"
  },
  {
    name: "Cloud Computing",
    icon: "☁️",
    description: "Skalowalna infrastruktura chmurowa"
  }
];

export default function Roadmap() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="bg-gradient-to-br from-primary to-secondary min-h-screen py-24">
      {/* Hero Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Roadmapa Rozwoju</h1>
          <p className="text-xl text-gray-300">
            Poznaj nasze plany rozwoju i nadchodzące funkcjonalności
          </p>
        </motion.div>

        {/* Technologies Section */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Technologie, które wykorzystujemy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl text-center"
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-gray-300">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent opacity-20" />
          
          <div className="space-y-24">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.quarter}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className={`relative flex ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } items-center`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-accent z-10">
                  <div className="absolute inset-0 rounded-full bg-accent animate-ping" />
                </div>

                <div className={`w-5/12 ${
                  index % 2 === 0 ? 'pr-12' : 'pl-12'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-effect rounded-2xl overflow-hidden"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white">{item.quarter}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          item.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {item.status === 'completed' ? 'Ukończone' :
                           item.status === 'in-progress' ? 'W trakcie' :
                           'Planowane'}
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-semibold text-accent mb-2">{item.title}</h4>
                      <p className="text-gray-300 mb-6">{item.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 glass-effect rounded-lg">
                          <div className="text-xl font-bold text-accent">{item.stats.completion}</div>
                          <div className="text-sm text-gray-400">Ukończono</div>
                        </div>
                        <div className="text-center p-3 glass-effect rounded-lg">
                          <div className="text-xl font-bold text-accent">{item.stats.features}</div>
                          <div className="text-sm text-gray-400">Funkcje</div>
                        </div>
                        <div className="text-center p-3 glass-effect rounded-lg">
                          <div className="text-xl font-bold text-accent">{item.stats.users}</div>
                          <div className="text-sm text-gray-400">Użytkownicy</div>
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {item.items.map((listItem, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + itemIndex * 0.1 }}
                            className="flex items-center text-gray-300"
                          >
                            <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {listItem}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="glass-effect rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Chcesz być częścią naszej przyszłości?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Dołącz do nas już dziś i bądź pierwszym, który wypróbuje nowe funkcje!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-dark px-8 py-4 rounded-full font-semibold hover:bg-white transition-colors duration-300"
            >
              Rozpocznij za darmo
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}