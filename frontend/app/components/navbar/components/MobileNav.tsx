'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaUserCircle, FaSignOutAlt, FaExchangeAlt, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import RegistrationChoiceModal from '../../RegistrationChoiceModal';

export default function MobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, userName, profilePic, email, login, logout } = useAuth();
  const router = useRouter();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  // Close mobile menu if user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setIsMobileMenuOpen(false);
    }
  }, [isLoggedIn]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleScrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setIsMobileMenuOpen(false);
  }, [logout]);

  const handleChangeAccount = useCallback(() => {
    logout();
    setIsMobileMenuOpen(false);
    login();
  }, [logout, login]);


  const handleRegister = () => {
    setIsRegistrationModalOpen(true);
  };
  return (
    <>
      <div className="md:hidden">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <HiX className="h-6 w-6 text-white" />
          ) : (
            <HiMenuAlt4 className="h-6 w-6 text-white" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-full max-w-sm bg-black/80 backdrop-blur-xl z-50 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h2 className="text-xl font-semibold text-white">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <HiX className="h-6 w-6 text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 space-y-4">
                  <div className="space-y-2">
                    <button
                      onClick={() => handleScrollToSection('hero')}
                      className="w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      Home
                    </button>
                    <button
                      onClick={() => handleScrollToSection('features')}
                      className="w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      About
                    </button>
                    <button
                      onClick={() => handleScrollToSection('footer')}
                      className="w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                      Contact
                    </button>
                  </div>

                  {isLoggedIn ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRegister}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Register
                      </motion.button>
                      <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg">
                        {profilePic ? (
                          <img
                            src={profilePic}
                            alt="Profile"
                            className="w-12 h-12 rounded-full ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-800"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement?.querySelector('.default-icon')?.classList.remove('hidden');
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-800">
                            <FaUserCircle className="text-3xl text-purple-400" />
                          </div>
                        )}
                        <div className="default-icon hidden w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-800 absolute top-0 left-0">
                          <FaUserCircle className="text-3xl text-purple-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate">{userName || 'User'}</p>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <FaEnvelope className="text-purple-500 flex-shrink-0" />
                            <span className="truncate max-w-[180px]" title={email || 'No email available'}>
                              {email ? (
                                <>
                                  <span className="text-gray-300">{email.split('@')[0]}</span>
                                  <span className="text-purple-400">@</span>
                                  <span className="text-gray-300">{email.split('@')[1]}</span>
                                </>
                              ) : (
                                'No email available'
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={handleChangeAccount}
                          className="w-full px-4 py-3 text-left text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-3 rounded-lg"
                        >
                          <FaExchangeAlt className="text-purple-500" />
                          Change Account
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-left text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-3 rounded-lg"
                        >
                          <FaSignOutAlt className="text-red-500" />
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={login}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <FaGoogle className="text-lg" />
                      <span>Login</span>
                      <FaSignInAlt className="text-lg" />
                    </motion.button>
                  )}
                </div>
              </div>
              <RegistrationChoiceModal 
                            isOpen={isRegistrationModalOpen}
                            onClose={() => setIsRegistrationModalOpen(false)}
                          />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 