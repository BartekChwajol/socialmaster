import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    name: "API",
    status: "operational",
    uptime: "99.99%",
    lastIncident: "Brak incydentów"
  },
  {
    name: "Web App",
    status: "operational",
    uptime: "99.95%",
    lastIncident: "2 dni temu"
  },
  {
    name: "Database",
    status: "operational",
    uptime: "99.99%",
    lastIncident: "Brak incydentów"
  },
  {
    name: "AI Engine",
    status: "operational",
    uptime: "99.90%",
    lastIncident: "5 dni temu"
  }
];

export default function Status() {
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
            Status Systemu
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monitoruj status naszych usług w czasie rzeczywistym
          </p>
        </motion.div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{service.name}</h3>
                  <p className="text-gray-300">Uptime: {service.uptime}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    service.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {service.status === 'operational' ? 'Operacyjny' : 'Problemy'}
                  </span>
                  <p className="text-sm text-gray-300 mt-2">
                    Ostatni incydent: {service.lastIncident}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}