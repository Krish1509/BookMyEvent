'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '../services/auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkAuth = () => {
      // First check if we have token and name in URL
      const token = searchParams?.get('token');
      const name = searchParams?.get('name');

      if (token) {
        // Store the auth data
        localStorage.setItem('auth_token', token);
        if (name) localStorage.setItem('user_name', name);
        setIsAuthenticated(true);
        
        // Clean URL and redirect
        const redirectUrl = localStorage.getItem('redirect_after_login') || '/vendor';
        localStorage.removeItem('redirect_after_login');
        router.replace(redirectUrl);
        return;
      }

      // If no URL params, check local storage
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
      setIsLoading(false);
    };

    checkAuth();
  }, [searchParams, router]);

  const login = async () => {
    authService.loginWithGoogle();
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    router.push('/login');
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    userName: authService.getUserName()
  };
} 