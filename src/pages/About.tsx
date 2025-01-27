import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ImageSlider from '../components/ImageSlider';

const officeImages = [
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    title: "Nowoczesne biuro w centrum miasta"
  },
  {
    url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    title: "Przestrzeń do kreatywnej pracy"
  },
  {
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    title: "Miejsce spotkań zespołu"
  }
];

const teamMembers = [
  {
    name: "Marta Wiśniewska",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "10+ lat doświadczenia w marketingu cyfrowym",
    achievements: ["Forbes 30 under 30", "Digital Marketing Award 2023", "TEDx Speaker"]
  },
  {
    name: "Tomasz Kowalczyk",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Ekspert AI i uczenia maszynowego",
    achievements: ["PhD in Machine Learning", "Google AI Research", "20+ publikacji naukowych"]
  },
  {
    name: "Karolina Nowak",
    role: "Head of Marketing",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Specjalistka social media i content marketingu",
    achievements: ["Social Media Excellence Award", "Content Creator of the Year", "Marketing Innovation Prize"]
  }
];

const stats = [
  { label: 'Aktywnych użytkowników', value: '10,000+' },
  { label: 'Wygenerowanych postów', value: '1M+' },
  { label: 'Zaoszczędzonych godzin', value: '500,000+' },
  { label: 'Zadowolonych klientów', value: '98%' },
];

const technologies = [
  {
    name: "Sztuczna Inteligencja",
    description: "Wykorzystujemy najnowsze modele AI do generowania treści",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Machine Learning",
    description: "Algorytmy uczące się na podstawie preferencji użytkowników",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Big Data Analytics",
    description: "Zaawansowana analiza danych i trendów",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  }
];

export default function About() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [techRef, techInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-gradient-to-br from-primary to-secondary min-h-screen">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative isolate overflow-hidden py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6"
              >
                O nas
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg leading-8 text-gray-300"
              >
                SocialMasterAI to innowacyjne narzędzie wykorzystujące sztuczną inteligencję
                do generowania treści w mediach społecznościowych. Nasza misja to pomoc
                przedsiębiorcom i marketerom w tworzeniu angażujących treści przy
                minimalnym nakładzie czasu.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ImageSlider images={officeImages} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Technologies Section */}
      <motion.div
        ref={techRef}
        initial={{ opacity: 0 }}
        animate={techInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Nasze Technologie
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Wykorzystujemy najnowocześniejsze rozwiązania technologiczne
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={techInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect rounded-xl overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{tech.name}</h3>
                  <p className="text-gray-300">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        ref={teamRef}
        initial={{ opacity: 0 }}
        animate={teamInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Nasz zespół</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Poznaj ekspertów, którzy stoją za sukcesem SocialMasterAI
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {teamMembers.map((person, index) => (
              <motion.li
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                className="glass-effect rounded-2xl p-8"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  className="mx-auto h-56 w-56 rounded-full"
                  src={person.image}
                  alt=""
                />
                <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-white text-center">
                  {person.name}
                </h3>
                <p className="text-sm leading-6 text-gray-400 text-center">{person.role}</p>
                <p className="mt-4 text-base leading-7 text-gray-300 text-center">{person.bio}</p>
                <ul className="mt-4 space-y-2">
                  {person.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-accent flex items-center justify-center">
                      <span className="mr-2">★</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mx-auto flex max-w-xs flex-col gap-y-4 glass-effect rounded-xl p-6"
              >
                <dt className="text-base leading-7 text-gray-300">{stat.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-accent sm:text-5xl">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}