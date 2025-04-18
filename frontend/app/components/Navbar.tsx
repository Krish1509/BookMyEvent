'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaUserCircle, FaSignOutAlt, FaExchangeAlt, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import RegistrationChoiceModal from './RegistrationChoiceModal';

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { isLoggedIn, userName, profilePic, email, login, logout, isClient } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    setShowLogout(false);
    router.push('/');
  }, [logout, router]);

  const handleChangeAccount = useCallback(() => {
    logout();
    setShowLogout(false);
    login();
  }, [logout, login]);

  const handleRegister = useCallback(() => {
    setIsRegistrationModalOpen(true);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleLogout = useCallback(() => {
    setShowLogout(prev => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      // For home section, always scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64; // Height of the navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/20 backdrop-blur-xl py-1' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              >
                BookMyEvent
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:block"
          >
            <div className="ml-10 flex items-center space-x-4">
              <button
                onClick={() => handleScrollToSection('hero')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                Home
              </button>

              <button
                onClick={() => handleScrollToSection('features')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => handleScrollToSection('footer')}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                Contact
              </button>
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRegister}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Register
                  </motion.button>
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
                        {email ? (
                          <>
                          {userName}
                          </>
                        ) : (
                          'User'
                        )}
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
                          <div className="px-4 py-2 border-b border-white/10">
                            <button
                              onClick={handleChangeAccount}
                              className="w-full text-left text-sm text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer py-2 px-3 rounded-md"
                            >
                              <FaExchangeAlt className="text-purple-400" />
                              Change Account
                            </button>
                          </div>
                          <div className="px-4 py-2">
                            <button
                              onClick={handleLogout}
                              className="w-full text-left text-sm text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer py-2 px-3 rounded-md"
                            >
                              <FaSignOutAlt className="text-red-400" />
                              Sign out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={login}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaGoogle className="text-lg" />
                  <span>Login</span>
                  <FaSignInAlt className="text-lg" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
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
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/50 backdrop-blur-xl rounded-lg mt-2"
            >
              <div className="px-4 py-4 space-y-3">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RegistrationChoiceModal 
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </motion.nav>
  );
} 