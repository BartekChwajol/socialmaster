import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const webinars = [
  {
    title: "Skuteczna strategia social media",
    date: "2024-02-01",
    time: "18:00",
    speaker: "Anna Kowalska",
    description: "Poznaj sprawdzone strategie budowania marki w social mediach",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Analityka i optymalizacja",
    date: "2024-02-15",
    time: "19:00",
    speaker: "Jan Nowak",
    description: "Jak analizować dane i optymalizować działania w social mediach",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2015&q=80"
  },
  {
    title: "Content marketing w praktyce",
    date: "2024-03-01",
    time: "17:00",
    speaker: "Maria Wiśniewska",
    description: "Praktyczne wskazówki tworzenia angażujących treści",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80"
  }
];

export default function Webinars() {
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
            Webinary
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dołącz do naszych interaktywnych sesji online i rozwijaj swoje umiejętności
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {webinars.map((webinar, index) => (
            <motion.div
              key={webinar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={webinar.image}
                  alt={webinar.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{webinar.title}</h3>
                <p className="text-gray-300 mb-4">{webinar.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <span className="mr-2">👤</span>
                    {webinar.speaker}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="mr-2">📅</span>
                    {webinar.date}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="mr-2">⏰</span>
                    {webinar.time}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-accent text-dark py-2 rounded-full font-semibold hover:bg-white transition-colors duration-300"
                >
                  Zapisz się
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}