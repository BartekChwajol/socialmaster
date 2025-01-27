import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const trainingCourses = [
  {
    title: "Social Media Fundamentals",
    description: "Podstawy prowadzenia mediów społecznościowych",
    duration: "4 tygodnie",
    level: "Początkujący",
    topics: [
      "Podstawy strategii social media",
      "Tworzenie contentu",
      "Budowanie społeczności",
      "Analiza podstawowych metryk"
    ],
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80"
  },
  {
    title: "Advanced Content Creation",
    description: "Zaawansowane techniki tworzenia treści",
    duration: "6 tygodni",
    level: "Zaawansowany",
    topics: [
      "Storytelling w social media",
      "Projektowanie grafik",
      "Produkcja wideo",
      "Optymalizacja contentu"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2015&q=80"
  },
  {
    title: "Social Media Analytics",
    description: "Analiza i optymalizacja działań",
    duration: "5 tygodni",
    level: "Średniozaawansowany",
    topics: [
      "Kluczowe wskaźniki (KPI)",
      "Narzędzia analityczne",
      "Raportowanie wyników",
      "Optymalizacja kampanii"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  }
];

export default function Training() {
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
            Szkolenia
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Rozwijaj swoje umiejętności z zakresu social media marketingu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainingCourses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-gray-300 mb-4">{course.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-400">
                    <span className="mr-2">⏱</span>
                    {course.duration}
                  </span>
                  <span className="text-sm text-gray-400">
                    <span className="mr-2">📚</span>
                    {course.level}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  {course.topics.map((topic, i) => (
                    <div key={i} className="flex items-center text-gray-300">
                      <span className="text-accent mr-2">✓</span>
                      {topic}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-accent text-dark py-2 rounded-full font-semibold hover:bg-white transition-colors duration-300"
                >
                  Zapisz się
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 glass-effect rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Potrzebujesz szkolenia szytego na miarę?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Skontaktuj się z nami, przygotujemy spersonalizowany program szkoleniowy
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
          >
            Skontaktuj się
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}