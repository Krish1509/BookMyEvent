'use client';

import { motion } from 'framer-motion';

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Subtle Stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Gradient Orbs */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${400 + i * 300}px`,
            height: `${400 + i * 300}px`,
            top: `${30 + i * 40}%`,
            left: `${20 + i * 30}%`,
            background: `radial-gradient(circle, rgba(59, 130, 246, ${0.02 - i * 0.01}) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 30, 0],
          }}
          transition={{
            duration: 40 + i * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Subtle Glow Effects */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: '600px',
          height: '600px',
          top: '20%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
} 