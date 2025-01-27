import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

const officeLocations = [
  {
    city: "Warszawa",
    address: "ul. Złota 44, 00-120 Warszawa",
    phone: "+48 22 123 45 67",
    email: "warszawa@socialmasterai.com",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  },
  {
    city: "Kraków",
    address: "ul. Floriańska 15, 31-021 Kraków",
    phone: "+48 12 345 67 89",
    email: "krakow@socialmasterai.com",
    image: "https://images.unsplash.com/photo-1577760258779-e787a1733016?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  }
];

const socialLinks = [
  { name: "Facebook", icon: "📱", link: "#" },
  { name: "Twitter", icon: "🐦", link: "#" },
  { name: "LinkedIn", icon: "💼", link: "#" },
  { name: "Instagram", icon: "📸", link: "#" }
];

const faqItems = [
  {
    question: "Jak szybko otrzymam odpowiedź na moje zapytanie?",
    answer: "Staramy się odpowiadać na wszystkie zapytania w ciągu 24 godzin roboczych."
  },
  {
    question: "Czy oferujecie wsparcie techniczne 24/7?",
    answer: "Tak, nasz zespół wsparcia technicznego jest dostępny całodobowo przez 7 dni w tygodniu."
  },
  {
    question: "Jakie są metody kontaktu z supportem?",
    answer: "Możesz się z nami skontaktować poprzez formularz kontaktowy, email, telefon lub chat na żywo."
  }
];

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Wiadomość została wysłana! Odpowiemy najszybciej jak to możliwe.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-br from-primary to-secondary min-h-screen">
      {/* Hero Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6"
            >
              Skontaktuj się z nami
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg leading-8 text-gray-300"
            >
              Jesteśmy tutaj, aby pomóc Ci osiągnąć sukces w mediach społecznościowych.
              Skontaktuj się z nami w dowolny sposób.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Office Locations */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {officeLocations.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect rounded-xl overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={office.image}
                    alt={office.city}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{office.city}</h3>
                  <div className="space-y-2 text-gray-300">
                    <p>{office.address}</p>
                    <p>{office.phone}</p>
                    <p>{office.email}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="py-12"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl glass-effect rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Imię i nazwisko
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full rounded-md border-0 bg-white/10 py-2 px-3.5 text-white shadow-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full rounded-md border-0 bg-white/10 py-2 px-3.5 text-white shadow-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                    Temat
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="block w-full rounded-md border-0 bg-white/10 py-2 px-3.5 text-white shadow-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Wiadomość
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="block w-full rounded-md border-0 bg-white/10 py-2 px-3.5 text-white shadow-sm focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full rounded-md bg-accent px-3.5 py-2.5 text-center text-sm font-semibold text-dark shadow-sm hover:bg-white transition-all duration-300"
              >
                Wyślij wiadomość
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Social Media Links */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Znajdź nas w social mediach</h3>
          </div>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.link}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-4 rounded-full text-2xl hover:bg-white/20 transition-colors duration-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Często zadawane pytania
            </h3>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-effect rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                    className="w-full p-4 text-left text-white hover:bg-white/10 transition-colors duration-300 flex justify-between items-center"
                  >
                    <span>{faq.question}</span>
                    <span>{selectedFaq === index ? '−' : '+'}</span>
                  </button>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: selectedFaq === index ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="p-4 text-gray-300">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}