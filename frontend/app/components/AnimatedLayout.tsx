'use client';

import { motion } from 'framer-motion';
import Navbar from './navbar/Navbar';
// import Footer from './Footer';
import BackgroundAnimation from './BackgroundAnimation';

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundAnimation />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col relative z-10"
      >
        <Navbar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-grow"
        >
          {children}
        </motion.main>
        {/* <Footer /> */}
      </motion.div>
    </>
  );
} 