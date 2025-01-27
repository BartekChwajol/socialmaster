import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from 'react-router-dom';
import { PLANS, TOKEN_PACKAGES } from '../lib/plans';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handlePlanSelection = (planId: string) => {
    if (!user) {
      toast.error('Musisz być zalogowany, aby wybrać plan');
      navigate('/register');
      return;
    }
    navigate(`/checkout/${planId}`);
  };

  const handleTokenPackageSelection = (packageId: string) => {
    if (!user) {
      toast.error('Musisz być zalogowany, aby kupić tokeny');
      navigate('/register');
      return;
    }
    navigate(`/checkout/tokens/${packageId}`);
  };

  const getYearlyPrice = (monthlyPrice: number) => {
    const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount
    return yearlyPrice.toFixed(2);
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
            Wybierz plan idealny dla Ciebie
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Wszystkie plany zawierają 14-dniowy okres próbny
          </p>

          <div className="flex justify-center items-center space-x-4 mb-12">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-accent text-dark'
                  : 'bg-white/10 text-white'
              }`}
            >
              Miesięcznie
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                billingPeriod === 'yearly'
                  ? 'bg-accent text-dark'
                  : 'bg-white/10 text-white'
              }`}
            >
              Rocznie
              <span className="ml-2 text-xs px-2 py-1 bg-green-500 text-white rounded-full">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-effect rounded-xl p-8 relative ${
                plan.popular ? 'ring-2 ring-accent' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-dark px-4 py-1 rounded-full text-sm font-semibold">
                    Najpopularniejszy
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-accent mb-2">
                  ${billingPeriod === 'monthly' ? plan.price : getYearlyPrice(plan.price)}
                  <span className="text-sm text-gray-300">
                    /{billingPeriod === 'monthly' ? 'msc' : 'rok'}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">
                  {plan.tokens} tokenów miesięcznie
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="text-sm text-gray-300 mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Generowanie obrazów</span>
                    <span className="text-white font-semibold">
                      {plan.initialImages} + {plan.dailyImages}/dzień
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Generowanie opisów</span>
                    <span className="text-white font-semibold">
                      {plan.initialDescriptions} + {plan.dailyDescriptions}/dzień
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-300 mb-2">
                      <span className="text-accent mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlanSelection(plan.id)}
                className={`w-full py-3 rounded-full font-semibold text-center transition-colors duration-300 ${
                  plan.popular
                    ? 'bg-accent text-dark hover:bg-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {user ? 'Wybierz plan' : 'Rozpocznij za darmo'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Token Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Pakiety tokenów
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOKEN_PACKAGES.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-effect rounded-xl p-8 relative ${
                  pkg.popular ? 'ring-2 ring-accent' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-dark px-4 py-1 rounded-full text-sm font-semibold">
                      Najpopularniejszy
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-accent mb-2">
                    ${pkg.price}
                  </div>
                  <p className="text-gray-300 mb-6">
                    {pkg.description}
                  </p>
                  <div className="text-lg text-white mb-8">
                    <div className="flex justify-between mb-2">
                      <span>Obrazy</span>
                      <span className="font-semibold">
                        {Math.floor(pkg.tokens / 8)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Opisy</span>
                      <span className="font-semibold">
                        {pkg.tokens}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTokenPackageSelection(pkg.id)}
                  className={`w-full py-3 rounded-full font-semibold text-center transition-colors duration-300 ${
                    pkg.popular
                      ? 'bg-accent text-dark hover:bg-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Kup tokeny
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-effect rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Potrzebujesz indywidualnej oferty?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Skontaktuj się z nami, przygotujemy ofertę dopasowaną do Twoich potrzeb
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