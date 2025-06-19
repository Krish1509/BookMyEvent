'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DesktopNav() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="hidden md:flex items-center justify-end flex-1"
    >
      <button
        onClick={handleHomeClick}
        className="text-gray-300 hover:text-white px-5 py-2 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-white/10"
      >
        Home
      </button>
    </motion.div>
  );
}
