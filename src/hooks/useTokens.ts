import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { TOKEN_COSTS } from '../lib/plans';
import toast from 'react-hot-toast';

export const useTokens = () => {
  const { user } = useAuth();
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTokenBalance();
    }
  }, [user]);

  const fetchTokenBalance = async () => {
    try {
      const { data, error } = await supabase
        .from('user_tokens')
        .select('token_balance')
        .eq('profile_id', user?.id)
        .single();

      if (error) throw error;
      setTokenBalance(data?.token_balance || 0);
    } catch (error) {
      console.error('Error fetching token balance:', error);
      toast.error('Nie udało się pobrać stanu tokenów');
    } finally {
      setLoading(false);
    }
  };

  const deductTokens = async (type: 'image' | 'description'): Promise<boolean> => {
    const tokensNeeded = type === 'image' ? TOKEN_COSTS.image : TOKEN_COSTS.description;

    if (tokenBalance < tokensNeeded) {
      toast.error('Niewystarczająca liczba tokenów');
      return false;
    }

    try {
      const { error } = await supabase.rpc('deduct_tokens', {
        user_id: user?.id,
        tokens_to_deduct: tokensNeeded
      });

      if (error) throw error;

      setTokenBalance(prev => prev - tokensNeeded);
      return true;
    } catch (error) {
      console.error('Error deducting tokens:', error);
      toast.error('Nie udało się odliczyć tokenów');
      return false;
    }
  };

  return {
    tokenBalance,
    loading,
    deductTokens,
    refreshBalance: fetchTokenBalance
  };
};