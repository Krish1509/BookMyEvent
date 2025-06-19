'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DesktopNav from './Desktop';
import Logo from '../../components/navbar/components/Logo';
import ProfileDropdown from '../../components/navbar/components/ProfileDropdown';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'backdrop-blur-md bg-black/30 shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Middle - Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <DesktopNav />
          </div>

          {/* Right - Profile / Auth */}
          <div className="flex-shrink-0">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}



