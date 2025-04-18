'use client';

import { motion } from 'framer-motion';

export default function FeaturesSection() {
  const features = [
    {
      icon: "🎯",
      title: "Our Purpose",
      description: "BookMyEvent connects customers with trusted vendors for seamless event planning. Our platform makes organizing events simple and stress-free."
    },
    {
      icon: "🎉",
      title: "Events We Support",
      description: "From weddings and engagements to corporate events and birthdays, we support any occasion. Your perfect event is just a few clicks away."
    },
    {
      icon: "✨",
      title: "Comprehensive Services",
      description: "Find everything you need: photography, DJs, venues, catering, decorations, and event planning. All services in one place."
    }
  ];

  return (
    <section id="features" className="relative py-20 px-4 scroll-mt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gentle Stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Soft Gradient Orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 100}px`,
              height: `${150 + i * 100}px`,
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
              background: `radial-gradient(circle, rgba(59, 130, 246, ${0.05 - i * 0.01}) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Subtle Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: `linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Subtle Glow Effects */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`,
              top: `${30 + i * 40}%`,
              right: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Plan Any Event with BookMyEvent
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto"
        >
          BookMyEvent makes event planning easy by connecting you with trusted vendors. Whether it's a wedding, corporate event, or birthday party, we've got you covered with venues, catering, entertainment, and more.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)"
              }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative overflow-hidden"
            >
              <motion.div 
                className="text-4xl sm:text-5xl mb-6"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>
              
              <motion.h3 
                className="text-xl sm:text-2xl font-semibold mb-4"
                whileHover={{ 
                  scale: 1.02,
                  x: 5,
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 text-sm sm:text-base"
                whileHover={{ 
                  scale: 1.01,
                  x: 2,
                }}
                transition={{ duration: 0.3 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [0, -5, 0],
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
              delay: 2,
            }}
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 20, 0],
              rotate: [0, 3, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
              delay: 4,
            }}
            className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
} 