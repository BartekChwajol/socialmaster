import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PLANS } from '../lib/plans';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plan = PLANS.find(p => p.id === planId);

  useEffect(() => {
    if (!user) {
      toast.error('Musisz być zalogowany, aby dokonać zakupu');
      navigate('/register');
      return;
    }
    if (!plan) {
      toast.error('Nieprawidłowy plan');
      navigate('/pricing');
      return;
    }
  }, [user, plan, navigate]);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Musisz być zalogowany, aby dokonać zakupu');
      navigate('/register');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Stripe checkout
      toast.success('Przekierowanie do płatności...');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Wystąpił błąd podczas płatności');
    } finally {
      setLoading(false);
    }
  };

  if (!plan || !user) return null;

  const yearlyPrice = (plan.price * 12 * 0.8).toFixed(2); // 20% discount

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary py-24">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-xl p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Podsumowanie zamówienia</h1>

          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                <p className="text-gray-300">Plan {billingPeriod === 'monthly' ? 'miesięczny' : 'roczny'}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-accent">
                  ${billingPeriod === 'monthly' ? plan.price : yearlyPrice}
                </p>
                <p className="text-sm text-gray-300">
                  {plan.tokens} tokenów / miesiąc
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between mb-4">
                <div className="space-y-2">
                  <p className="text-gray-300">Okres rozliczeniowy</p>
                  <div className="flex space-x-4">
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
                      Rocznie (-20%)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Co otrzymujesz:</h3>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <span className="text-accent mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-accent text-dark py-3 rounded-full font-semibold hover:bg-white transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Przetwarzanie...' : 'Przejdź do płatności'}
          </motion.button>

          <p className="text-sm text-gray-300 text-center mt-4">
            Klikając "Przejdź do płatności" akceptujesz nasz{' '}
            <a href="/terms" className="text-accent hover:underline">
              regulamin
            </a>
            {' '}oraz{' '}
            <a href="/privacy" className="text-accent hover:underline">
              politykę prywatności
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}