import { motion } from 'framer-motion';
import { useSocialMedia } from '../hooks/useSocialMedia';

export default function SocialMediaConnector() {
  const { 
    connectedAccounts, 
    isLoading, 
    connectFacebook, 
    disconnectAccount, 
    isInitialized,
    instagramStats 
  } = useSocialMedia();

  return (
    <div className="space-y-8">
      {/* Połączone konta */}
      <div className="glass-effect rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Połączone konta</h3>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectFacebook}
              disabled={isLoading || !isInitialized}
              className="px-4 py-2 bg-[#1877F2] text-white rounded-full disabled:opacity-50 hover:bg-[#0c5bce] transition-colors duration-300 flex items-center"
            >
              <span className="mr-2">📱</span>
              {isLoading ? 'Łączenie...' : !isInitialized ? 'Inicjalizacja...' : 'Połącz z Facebook'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectFacebook}
              disabled={isLoading || !isInitialized}
              className="px-4 py-2 rounded-full disabled:opacity-50 transition-colors duration-300 flex items-center"
              style={{
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                color: 'white'
              }}
            >
              <span className="mr-2">📸</span>
              {isLoading ? 'Łączenie...' : !isInitialized ? 'Inicjalizacja...' : 'Połącz z Instagram'}
            </motion.button>
          </div>
        </div>

        <div className="space-y-4">
          {connectedAccounts.map((account) => (
            <div
              key={`${account.platform}-${account.account_name}`}
              className="glass-effect rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {account.platform === 'facebook' ? '📱' : '📸'}
                  </span>
                  <div>
                    <p className="text-white font-medium text-lg">{account.account_name}</p>
                    <p className="text-gray-400 text-sm capitalize">{account.platform}</p>
                    <p className="text-gray-400 text-sm">
                      Połączono {new Date(account.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {account.platform === 'instagram' && instagramStats[account.account_name] && (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 glass-effect rounded-lg">
                        <p className="text-accent font-bold">{instagramStats[account.account_name].followers}</p>
                        <p className="text-gray-400 text-sm">Obserwujący</p>
                      </div>
                      <div className="text-center p-3 glass-effect rounded-lg">
                        <p className="text-accent font-bold">{instagramStats[account.account_name].posts}</p>
                        <p className="text-gray-400 text-sm">Posty</p>
                      </div>
                      <div className="text-center p-3 glass-effect rounded-lg">
                        <p className="text-accent font-bold">{instagramStats[account.account_name].engagement}%</p>
                        <p className="text-gray-400 text-sm">Zaangażowanie</p>
                      </div>
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => disconnectAccount(account.platform, account.account_name)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm hover:bg-red-500/30 transition-colors duration-300"
                  >
                    Odłącz konto
                  </motion.button>
                </div>
              </div>
            </div>
          ))}

          {connectedAccounts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">
                Brak połączonych kont social media
              </p>
              <p className="text-gray-400 mt-2">
                Połącz swoje konta, aby rozpocząć publikowanie treści
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Instrukcje */}
      <div className="glass-effect rounded-xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">Jak połączyć konta?</h3>
        <div className="space-y-4">
          <div className="glass-effect p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-2">Facebook</h4>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Kliknij przycisk "Połącz z Facebook"</li>
              <li>Zaloguj się do swojego konta Facebook</li>
              <li>Wybierz strony, które chcesz połączyć</li>
              <li>Zatwierdź wymagane uprawnienia</li>
            </ol>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-2">Instagram</h4>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Upewnij się, że masz konto biznesowe na Instagramie</li>
              <li>Połącz swoje konto Instagram ze stroną na Facebooku</li>
              <li>Kliknij przycisk "Połącz z Instagram"</li>
              <li>Zatwierdź wymagane uprawnienia</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}