import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  signUp: (formData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        return;
      }
      setUser(session?.user ?? null);
    });

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      // Handle auth errors
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      } else if (event === 'SIGNED_OUT') {
        // Clear any local auth state
        localStorage.removeItem('supabase.auth.token');
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error getting IP:', error);
      return '0.0.0.0'; // Fallback IP
    }
  };

  const signUp = async (formData: any) => {
    try {
      const clientIP = await getClientIP();
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            ...formData,
            ip_address: clientIP
          },
        },
      });

      if (error) {
        if (error.message.includes('Maximum number of registrations')) {
          throw new Error('Przekroczono limit rejestracji dla tego adresu IP');
        }
        throw error;
      }

      if (data.user && !data.session) {
        toast.success('Sprawdź swoją skrzynkę email, aby potwierdzić rejestrację');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Nieprawidłowy email lub hasło');
        }
        throw error;
      }
    } catch (error: any) {
      console.error('Signin error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear any local auth state
      localStorage.removeItem('supabase.auth.token');
      setUser(null);
    } catch (error: any) {
      console.error('Signout error:', error);
      throw error;
    }
  };

  const contextValue = {
    user,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);