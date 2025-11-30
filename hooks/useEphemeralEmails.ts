import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Base URL for the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface EphemeralEmail {
  id: string;
  user_id: string;
  email_address: string;
  alias_name?: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
  provider?: string;
}

export const useEphemeralEmails = () => {
  const { user, token } = useAuth();
  const [emails, setEmails] = useState<EphemeralEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async () => {
    if (!user || !token) {
      setEmails([]);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/emails/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch emails');
      }
      const data = await res.json();
      setEmails(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [user, token]);

  const createEmail = async (aliasName?: string) => {
    if (!user || !token) {
      setError('You must be signed in to create emails');
      return null;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/emails/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id, aliasName }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create email');
      }
      const data = await res.json();
      await fetchEmails();
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  const deactivateEmail = async (emailId: string) => {
    if (!user || !token) {
      setError('You must be signed in to deactivate emails');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/emails/${emailId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user?.id }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to deactivate email');
      }
      await fetchEmails();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { emails, loading, error, createEmail, deactivateEmail, refetch: fetchEmails };
};
