'use client';

import { useState, useEffect } from 'react';
import { authService } from '../services/auth';

const parseJwt = (token: string) => {
  try {
    if (!token || !token.includes('.')) {
      return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const userData = parseJwt(token);
          if (userData) {
            setIsLoggedIn(true);
            setUserName(userData.name || localStorage.getItem('userName') || 'User');
            setProfilePic(userData.picture || localStorage.getItem('profilePic') || null);
            setEmail(userData.email || localStorage.getItem('email') || null);
          } else {
            const name = localStorage.getItem('userName');
            const pic = localStorage.getItem('profilePic');
            const userEmail = localStorage.getItem('email');
            
            if (name || pic || userEmail) {
              setIsLoggedIn(true);
              setUserName(name || 'User');
              setProfilePic(pic && pic !== 'null' && pic !== 'undefined' ? pic : null);
              setEmail(userEmail);
            } else {
              setIsLoggedIn(false);
              setUserName(null);
              setProfilePic(null);
              setEmail(null);
            }
          }
        } catch (error) {
          console.error('Error processing user data:', error);
          const name = localStorage.getItem('userName');
          const pic = localStorage.getItem('profilePic');
          const userEmail = localStorage.getItem('email');
          
          if (name || pic || userEmail) {
            setIsLoggedIn(true);
            setUserName(name || 'User');
            setProfilePic(pic && pic !== 'null' && pic !== 'undefined' ? pic : null);
            setEmail(userEmail);
          } else {
            setIsLoggedIn(false);
            setUserName(null);
            setProfilePic(null);
            setEmail(null);
          }
        }
      } else {
        setIsLoggedIn(false);
        setUserName(null);
        setProfilePic(null);
        setEmail(null);
      }
      setIsLoading(false);
    };

    checkLoginStatus();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('token')) {
      setIsLoading(true);
      const token = urlParams.get('token');
      const name = urlParams.get('name');
      const picture = urlParams.get('picture');
      const userEmail = urlParams.get('email');

      if (token) {
        localStorage.setItem('token', token);
        if (name) localStorage.setItem('userName', name);
        if (picture) localStorage.setItem('profilePic', picture);
        if (userEmail) localStorage.setItem('email', userEmail);
        
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      checkLoginStatus();
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'userName' || e.key === 'profilePic' || e.key === 'email') {
        checkLoginStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isClient]);

  const login = () => {
    if (isClient) {
      authService.loginWithGoogle();
    }
  };

  const logout = () => {
    if (isClient) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('profilePic');
      localStorage.removeItem('email');
      setIsLoggedIn(false);
      setUserName(null);
      setProfilePic(null);
      setEmail(null);
    }
  };

  return {
    isLoggedIn,
    userName,
    profilePic,
    email,
    isLoading,
    login,
    logout,
    isClient,
  };
}; 