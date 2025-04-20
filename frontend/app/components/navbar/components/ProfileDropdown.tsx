'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaSignOutAlt, FaExchangeAlt } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function ProfileDropdown() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isLoggedIn, userName, profilePic, email, login, logout } = useAuth();
  const router = useRouter();

  // Close dropdown when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      setIsProfileOpen(false);
    }
  }, [isLoggedIn]);

  const handleLogout = useCallback(async () => {
    setIsProfileOpen(false);
    await logout();
    window.dispatchEvent(new Event('auth-state-changed'));
    router.push('/');
  }, [logout, router]);

  const handleChangeAccount = useCallback(async () => {
    setIsProfileOpen(false);
    await logout();
    login();
  }, [logout, login]);

  // New effect to listen for auth state changes
  useEffect(() => {
    const handleAuthStateChange = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    };

    window.addEventListener('auth-state-changed', handleAuthStateChange);
    return () => window.removeEventListener('auth-state-changed', handleAuthStateChange);
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center space-x-2 focus:outline-none cursor-pointer hover:opacity-90 transition-opacity"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-purple-400 transition-colors">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-purple-100 flex items-center justify-center">
              <FaUserCircle className="w-6 h-6 text-purple-500" />
            </div>
          )}
        </div>
        <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[150px]">
          {userName || 'User'}
        </span>
      </button>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-black/30 backdrop-blur-xl rounded-lg shadow-lg py-2 z-50 border border-white/10"
          >
            <div className="px-4 py-2 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                      <FaUserCircle className="w-6 h-6 text-purple-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {userName || 'User'}
                  </p>
                  <p className="text-xs text-gray-300 truncate" title={email || ''}>
                    {email ? (
                      <>
                        <span>{email.split('@')[0]}</span>
                        <br />
                        <span className="text-purple-400">@</span>
                        <span>{email.split('@')[1]}</span>
                      </>
                    ) : (
                      'No email'
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="py-1">
              <button
                onClick={handleChangeAccount}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <FaExchangeAlt className="text-purple-500" />
                Change Account
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <FaSignOutAlt className="text-red-500" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 