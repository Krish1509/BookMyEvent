'use client';

import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import ProfileDropdown from './ProfileDropdown';
import { useRouter } from 'next/navigation';

export default function DesktopNav() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

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
  }, []);

  const handleRegister = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
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
            <ProfileDropdown />
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
  );
} 