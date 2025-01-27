import React from 'react';
import { motion } from 'framer-motion';
import { TOKEN_COSTS } from '../lib/plans';

interface TokenDisplayProps {
  tokenBalance: number;
}

export default function TokenDisplay({ tokenBalance }: TokenDisplayProps) {
  const remainingImages = Math.floor(tokenBalance / TOKEN_COSTS.image);
  const remainingDescriptions = Math.floor(tokenBalance / TOKEN_COSTS.description);
  const isLowBalance = tokenBalance < 9;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-xl p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Dostępne tokeny</h3>
          <p className={`text-3xl font-bold ${isLowBalance ? 'text-red-400' : 'text-accent'}`}>
            {tokenBalance}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-300">
            <div className="mb-1">
              <span className={`font-medium ${isLowBalance ? 'text-red-400' : 'text-white'}`}>
                {remainingImages}
              </span> obrazów
            </div>
            <div>
              <span className={`font-medium ${isLowBalance ? 'text-red-400' : 'text-white'}`}>
                {remainingDescriptions}
              </span> opisów
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}