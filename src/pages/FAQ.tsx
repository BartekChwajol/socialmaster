import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const faqCategories = [
  {
    name: "Ogólne",
    questions: [
      {
        question: "Czym jest SocialMasterAI?",
        answer: "SocialMasterAI to platforma wykorzystująca sztuczną inteligencję do automatyzacji i optymalizacji obecności w mediach społecznościowych."
      },
      {
        question: "Jak rozpocząć korzystanie z platformy?",
        answer: "Wystarczy zarejestrować się na naszej stronie, wybrać odpowiedni plan i skonfigurować integracje z mediami społecznościowymi."
      },
      {
        question: "Jakie platformy społecznościowe są wspierane?",
        answer: "Obecnie wspieramy Facebook, Instagram, Twitter, LinkedIn oraz TikTok."
      }
    ]
  },
  {
    name: "Techniczne",
    questions: [
      {
        question: "Czy mogę zintegrować SocialMasterAI z moimi istniejącymi narzędziami?",
        answer: "Tak, oferujemy API i różne możliwości integracji z popularnymi narzędziami marketingowymi."
      },
      {
        question: "Jak działa system AI do generowania treści?",
        answer: "Nasz system AI analizuje Twój profil, branżę i preferencje, aby generować spersonalizowane treści dopasowane do Twojej marki."
      },
      {
        question: "Czy moje dane są bezpieczne?",
        answer: "Tak, stosujemy najwyższe standardy bezpieczeństwa i szyfrowania danych. Wszystkie informacje są przechowywane zgodnie z RODO."
      }
    ]
  }
];

export default function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeCategory, setActiveCategory] = useState("Ogólne");
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

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
            Często zadawane pytania
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Znajdź odpowiedzi na najczęściej zadawane pytania
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories */}
          <div className="md:w-1/4">
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Kategorie</h3>
              <div className="space-y-2">
                {faqCategories.map((category) => (
                  <motion.button
                    key={category.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
                      activeCategory === category.name
                        ? 'bg-accent text-dark'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="md:w-3/4">
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                {activeCategory}
              </h2>
              <div className="space-y-4">
                {faqCategories
                  .find(cat => cat.name === activeCategory)
                  ?.questions.map((item, index) => (
                    <motion.div
                      key={item.question}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-white/10 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(item.question)}
                        className="w-full text-left p-4 flex justify-between items-center hover:bg-white/10 transition-colors duration-300"
                      >
                        <span className="text-white font-medium">{item.question}</span>
                        <span className="text-accent">
                          {openQuestions.includes(item.question) ? '−' : '+'}
                        </span>
                      </button>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: openQuestions.includes(item.question) ? 'auto' : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="p-4 text-gray-300 border-t border-white/10">
                          {item.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}