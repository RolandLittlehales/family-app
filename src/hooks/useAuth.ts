'use client';

import { useSession } from 'next-auth/react';
import { SessionUser } from '../types/auth';

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user as SessionUser | undefined,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    isUnauthenticated: status === 'unauthenticated',
  };
}

export function useRequireAuth() {
  const auth = useAuth();
  
  if (auth.isUnauthenticated) {
    throw new Error('Authentication required');
  }
  
  return auth as {
    user: SessionUser;
    isLoading: boolean;
    isAuthenticated: true;
    isUnauthenticated: false;
  };
}