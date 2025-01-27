import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const guides = [
  {
    title: "Optymalizacja treści",
    description: "Jak tworzyć angażujące posty",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80",
    duration: "15 min",
    level: "Podstawowy"
  },
  {
    title: "Analiza konkurencji",
    description: "Monitorowanie i analiza konkurencji",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2015&q=80",
    duration: "20 min",
    level: "Średni"
  },
  {
    title: "Strategia hashtagów",
    description: "Efektywne wykorzystanie hashtagów",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80",
    duration: "10 min",
    level: "Podstawowy"
  }
];

export default function Guides() {
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
            Poradniki
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Praktyczne wskazówki i porady jak osiągnąć sukces w social mediach
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{guide.title}</h3>
                <p className="text-gray-300 mb-4">{guide.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    <span className="mr-2">⏱</span>
                    {guide.duration}
                  </span>
                  <span className="text-sm text-gray-400">
                    <span className="mr-2">📚</span>
                    {guide.level}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}