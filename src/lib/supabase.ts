import { createClient } from '@supabase/supabase-js';
import { API_BASE_URL } from './config';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Make sure to click "Connect to Supabase" button in the top right corner.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'supabase.auth.token'
  },
  global: {
    fetch: (...args) => {
      // Ensure URL is valid
      if (typeof args[0] === 'string') {
        try {
          args[0] = new URL(args[0], API_BASE_URL).toString();
        } catch (error) {
          console.error('Invalid URL:', error);
          args[0] = `${API_BASE_URL}${args[0].startsWith('/') ? args[0] : `/${args[0]}`}`;
        }
      }
      return fetch(...args);
    }
  }
});