'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-black/30 backdrop-blur-xl border-t border-white/10 py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="inline-block">
                <motion.h3 
                  whileHover={{ scale: 1.05 }}
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-6"
                >
                  BookMyEvent
                </motion.h3>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your one-stop platform for seamless event planning and management.
                Connect with trusted vendors and create unforgettable experiences.
              </p>
              <div className="flex space-x-6">
                {[
                  { icon: <FaFacebook />, href: "#", label: "Facebook" },
                  { icon: <FaTwitter />, href: "#", label: "Twitter" },
                  { icon: <FaInstagram />, href: "#", label: "Instagram" },
                  { icon: <FaLinkedin />, href: "#", label: "LinkedIn" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-white transition-colors text-xl"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold text-white mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <FaEnvelope className="text-purple-500 mr-3" />
                  <a href="mailto:info@bookmyevent.com">info@bookmyevent.com</a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <FaPhone className="text-purple-500 mr-3" />
                  <a href="tel:+11234567890">+1 (123) 456-7890</a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <FaMapMarkerAlt className="text-purple-500 mr-3" />
                  <span>123 Event Street, City, Country</span>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BookMyEvent. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 