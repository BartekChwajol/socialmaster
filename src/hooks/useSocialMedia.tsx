import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import {
  initializeFacebookSDK,
  loginWithFacebook,
  getFacebookPages,
  getInstagramAccounts,
  getInstagramInsights,
  getInstagramMedia
} from '../lib/socialMedia';
import toast from 'react-hot-toast';

interface ConnectedAccount {
  id: string;
  platform: string;
  name: string;
  accessToken: string;
}

interface InstagramStats {
  followers: number;
  posts: number;
  engagement: number;
}

interface InstagramStatsMap {
  [key: string]: InstagramStats;
}

export const useSocialMedia = () => {
  const { user } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [instagramStats, setInstagramStats] = useState<InstagramStatsMap>({});

  useEffect(() => {
    const initSDK = async () => {
      try {
        await initializeFacebookSDK();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing Facebook SDK:', error);
        toast.error('Nie udało się zainicjalizować SDK Facebooka');
      }
    };
    initSDK();
  }, []);

  useEffect(() => {
    if (user) {
      fetchConnectedAccounts();
    }
  }, [user]);

  const fetchConnectedAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('social_media_accounts')
        .select('*')
        .eq('profile_id', user?.id);

      if (error) throw error;
      setConnectedAccounts(data || []);

      // Pobierz statystyki dla kont Instagram
      for (const account of data || []) {
        if (account.platform === 'instagram') {
          await fetchInstagramStats(account.id, account.access_token, account.account_name);
        }
      }
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
      toast.error('Nie udało się pobrać połączonych kont');
    }
  };

  const fetchInstagramStats = async (igAccountId: string, accessToken: string, username: string) => {
    try {
      const [insights, media] = await Promise.all([
        getInstagramInsights(igAccountId, accessToken),
        getInstagramMedia(igAccountId, accessToken)
      ]);

      const followers = insights.find((i: any) => i.name === 'follower_count')?.values[0]?.value || 0;
      const posts = media?.length || 0;
      const totalEngagement = media?.reduce((acc: number, post: any) => {
        return acc + (post.like_count || 0) + (post.comments_count || 0);
      }, 0) || 0;

      const engagement = posts > 0 ? ((totalEngagement / posts / followers) * 100).toFixed(2) : 0;

      setInstagramStats(prev => ({
        ...prev,
        [username]: {
          followers,
          posts,
          engagement: Number(engagement)
        }
      }));
    } catch (error) {
      console.error('Error fetching Instagram stats:', error);
    }
  };

  const connectFacebook = async () => {
    if (!isInitialized) {
      toast.error('SDK Facebooka nie zostało zainicjalizowane');
      return;
    }

    setIsLoading(true);
    try {
      const accessToken = await loginWithFacebook();
      const pages = await getFacebookPages(accessToken);
      
      for (const page of pages) {
        await supabase.from('social_media_accounts').upsert({
          profile_id: user?.id,
          platform: 'facebook',
          account_name: page.name,
          access_token: page.access_token,
          is_connected: true
        });

        const igAccounts = await getInstagramAccounts(page.id, page.access_token);
        for (const igAccount of igAccounts) {
          await supabase.from('social_media_accounts').upsert({
            profile_id: user?.id,
            platform: 'instagram',
            account_name: igAccount.username,
            access_token: page.access_token,
            is_connected: true
          });

          await fetchInstagramStats(igAccount.id, page.access_token, igAccount.username);
        }
      }

      await fetchConnectedAccounts();
      toast.success('Pomyślnie połączono konta');
    } catch (error: any) {
      console.error('Error connecting accounts:', error);
      toast.error(error.message || 'Nie udało się połączyć kont');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectAccount = async (platform: string, accountName: string) => {
    try {
      const { error } = await supabase
        .from('social_media_accounts')
        .delete()
        .match({ profile_id: user?.id, platform, account_name: accountName });

      if (error) throw error;
      
      if (platform === 'instagram') {
        setInstagramStats(prev => {
          const newStats = { ...prev };
          delete newStats[accountName];
          return newStats;
        });
      }

      await fetchConnectedAccounts();
      toast.success('Pomyślnie odłączono konto');
    } catch (error) {
      console.error('Error disconnecting account:', error);
      toast.error('Nie udało się odłączyć konta');
    }
  };

  return {
    connectedAccounts,
    isLoading,
    connectFacebook,
    disconnectAccount,
    isInitialized,
    instagramStats
  };
};