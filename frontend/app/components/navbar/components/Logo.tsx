'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Logo() {
  return (
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
  );
} 