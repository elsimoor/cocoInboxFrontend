import React, { createContext, useContext, useEffect, useState } from 'react';

// Base URL for the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface User {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
  is_pro?: boolean;
  subscriptionStatus?: 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'unpaid' | string;
  subscriptionCurrentPeriodStart?: string;
  subscriptionCurrentPeriodEnd?: string;
  subscriptionCreatedAt?: string;
  proGraceUntil?: string;
}

type AuthActionResult = { error: string | null; user?: User | null };

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<AuthActionResult>;
  signIn: (email: string, password: string) => Promise<AuthActionResult>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null, user: null }),
  signOut: async () => {},
  refreshUser: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!storedToken) {
      setLoading(false);
      return;
    }
    // Validate token and fetch user
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setToken(storedToken);
        } else {
          // token invalid, remove
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Error fetching current user:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signUp = async (email: string, password: string, name?: string): Promise<AuthActionResult> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return { error: errorData.error || 'Registration failed' };
      }
      // Auto login after registration
      return await signIn(email, password);
    } catch (err: any) {
      return { error: err.message || 'Registration failed' };
    }
  };

  const signIn = async (email: string, password: string): Promise<AuthActionResult> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return { error: errorData.error || 'Login failed' };
      }
      const data = await res.json();
      const receivedToken = data.token;
      if (receivedToken) {
        setToken(receivedToken);
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', receivedToken);
        }
        // Fetch current user
        const meRes = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${receivedToken}` },
        });
        if (meRes.ok) {
          const userData = await meRes.json();
          setUser(userData);
          return { error: null, user: userData };
        }
      }
      return { error: 'Login failed' };
    } catch (err: any) {
      return { error: err.message || 'Login failed' };
    }
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  };

  const refreshUser = async () => {
    const storedToken = typeof window !== 'undefined' ? (token || localStorage.getItem('token')) : token
    if (!storedToken) return
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data)
        if (!token) setToken(storedToken)
      }
    } catch (e) {
      // noop
    }
  }

  // Periodically refresh user state (every 2 minutes) and on visibility change
  useEffect(() => {
    let timer: any
    const setup = () => {
      if (timer) clearInterval(timer)
      timer = setInterval(() => {
        refreshUser().catch(() => {})
      }, 2 * 60 * 1000)
    }
    setup()
    const onVis = () => {
      if (document.visibilityState === 'visible') {
        refreshUser().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      if (timer) clearInterval(timer)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ user, token, loading, signUp, signIn, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
