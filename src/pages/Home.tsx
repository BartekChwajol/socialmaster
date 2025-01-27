import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    title: "Zwiększ zasięgi w mediach społecznościowych"
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2015&q=80",
    title: "Automatyzuj tworzenie treści"
  },
  {
    url: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80",
    title: "Analizuj wyniki i optymalizuj strategię"
  }
];

const features = [
  {
    title: "AI Content Creator",
    description: "Generuj unikalne treści dopasowane do Twojej marki w kilka sekund",
    icon: "🤖",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Smart Analytics",
    description: "Monitoruj i analizuj skuteczność swoich postów w czasie rzeczywistym",
    icon: "📊",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Auto Scheduler",
    description: "Planuj i automatyzuj publikacje w najlepszym czasie dla Twojej społeczności",
    icon: "🗓",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  }
];

const stats = [
  { value: "98%", label: "Zadowolonych klientów" },
  { value: "2M+", label: "Wygenerowanych postów" },
  { value: "50%", label: "Wzrost zaangażowania" },
  { value: "24/7", label: "Wsparcie techniczne" }
];

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-gradient-to-br from-primary to-secondary">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/50 backdrop-blur-sm z-10" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute inset-0 animate-[spin_20s_linear_infinite] opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(86,255,252,0.3),transparent)]" />
          </div>
          <div className="absolute inset-0 animate-[spin_15s_linear_infinite] opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_0%_300px,rgba(47,147,149,0.3),transparent)]" />
          </div>
          <div className="absolute inset-0 animate-[ping_3s_ease-in-out_infinite] opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_50%,rgba(86,255,252,0.2),transparent)]" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
              <motion.h1
                ref={heroRef}
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl"
              >
                Transformuj swoją obecność w mediach społecznościowych z AI
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 text-lg leading-8 text-gray-300"
              >
                Automatycznie generuj angażujące treści i piękne grafiki dla swoich mediów społecznościowych.
                Pozwól AI zająć się tworzeniem treści, podczas gdy Ty skupisz się na rozwoju swojego biznesu.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 flex items-center gap-x-6"
              >
                <Link
                  to="/register"
                  className="glass-effect px-6 py-3 rounded-full text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  Rozpocznij za darmo
                </Link>
                <Link 
                  to="/about" 
                  className="text-sm font-semibold leading-6 text-white hover:text-accent transition-colors duration-300"
                >
                  Dowiedz się więcej <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </div>
            <motion.div
              ref={featuresRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none xl:ml-32"
            >
              <ImageSlider images={heroImages} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Wszystko, czego potrzebujesz do zarządzania social mediami
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Wykorzystaj moc sztucznej inteligencji do automatyzacji i optymalizacji
              swojej obecności w mediach społecznościowych.
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{feature.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        ref={statsRef}
        className="py-24 sm:py-32"
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect p-8 rounded-xl text-center"
              >
                <motion.dt
                  className="text-3xl font-bold text-accent mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.dt>
                <dd className="text-sm text-gray-300">{stat.label}</dd>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Gotowy na transformację swojej obecności w social mediach?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Dołącz do tysięcy zadowolonych klientów i zacznij tworzyć lepsze treści już dziś.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="inline-block bg-accent text-dark px-8 py-4 rounded-full font-semibold hover:bg-white transition-colors duration-300"
              >
                Rozpocznij 14-dniowy okres próbny
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}