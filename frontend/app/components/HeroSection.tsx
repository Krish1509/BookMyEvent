'use client';

import { motion } from 'framer-motion';
import { FaGoogle, FaArrowRight, FaUserPlus, FaInfoCircle } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { useAuth } from '../hooks/useAuth';

export default function HeroSection() {
  const { login, isLoggedIn } = useAuth();

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      const featuresPosition = featuresSection.getBoundingClientRect().top;
      // Only scroll if features section is below current position
      if (featuresPosition > 0) {
        const navbarHeight = 64; // Height of the navbar
        const offsetPosition = featuresPosition + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleRegister = () => {
    const userType = localStorage.getItem('userType');
    
    if (userType === 'vendor') {
      window.location.href = '/vendor/register';
    } else if (userType === 'user') {
      window.location.href = '/user/register';
    } else {
      const choice = window.confirm('Are you registering as a vendor? Click OK for vendor, Cancel for user.');
      if (choice) {
        localStorage.setItem('userType', 'vendor');
        window.location.href = '/vendor/register';
      } else {
        localStorage.setItem('userType', 'user');
        window.location.href = '/user/register';
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2
            }}
            className="mb-8"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4"
            >
              <TypeAnimation
                sequence={[
                  'Welcome to BookMyEvent',
                  1000,
                  'Welcome to BookMyEvent',
                  1000,
                ]}
                wrapper="span"
                speed={30}
                cursor={true}
                style={{ 
                  display: 'inline-block',
                  background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                repeat={Infinity}
                className="relative"
              />
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Book
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-white mx-2"
              >
                or
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
              >
                Host Events
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-white mx-2"
              >
                with
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500"
              >
                Ease
              </motion.span>
            </motion.h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto relative"
          >
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
                y: [0, -5, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.5, 1],
              }}
              className="absolute -left-6 -top-4 text-5xl text-blue-400"
            >
              "
            </motion.span>
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -10, 0],
                y: [0, 5, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.5, 1],
                delay: 2,
              }}
              className="absolute -right-6 -bottom-4 text-5xl text-blue-400"
            >
              "
            </motion.span>
            <motion.span
              animate={{
                opacity: [0.8, 1, 0.8],
                y: [0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10"
            >
              Seamlessly connect customers and vendors for unforgettable events. Experience the future of event management with our intuitive platform.
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.0,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {isLoggedIn ? (
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRegister}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaUserPlus className="text-lg" />
                </motion.span>
                Register Now
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaArrowRight className="text-lg" />
                </motion.span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={login}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaGoogle className="text-lg" />
                </motion.span>
                Get Started
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaArrowRight className="text-lg" />
                </motion.span>
              </motion.button>
            )}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLearnMore}
              className="px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <FaInfoCircle className="text-lg" />
              </motion.span>
              Learn More
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <FaArrowRight className="text-lg" />
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 