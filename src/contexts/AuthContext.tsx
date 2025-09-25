import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from './ToastContext';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  login: (email: string, pass: string) => Promise<{ error: any }>;
  register: (fullName: string, email: string, pass: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  signInWithPhone: (phone: string) => Promise<{ error: any }>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const user = session?.user ?? null;

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Login successful!', 'success');
    }
    return { error };
  };

  const register = async (fullName: string, email: string, pass: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          name: fullName,
          upi_id: `${fullName.toLowerCase().replace(/\s/g, '')}@securepay`
        }
      }
    });
    if (error) {
      showToast(error.message, 'error');
    }
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    showToast('You have been logged out.', 'info');
  };
  
  const signInWithPhone = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('OTP sent to your phone!', 'success');
    }
    return { error };
  };
  
  const verifyPhoneOtp = async (phone: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Login successful!', 'success');
    }
    return { error };
  };

  const value = {
    session,
    user,
    login,
    register,
    logout,
    signInWithPhone,
    verifyPhoneOtp,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
