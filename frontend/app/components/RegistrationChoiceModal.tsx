'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaStore, FaUser, FaTimes } from 'react-icons/fa';

interface RegistrationChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationChoiceModal({ isOpen, onClose }: RegistrationChoiceModalProps) {
  const router = useRouter();

  const handleChoice = (type: 'vendor' | 'customer') => {
    localStorage.setItem('userType', type);
    router.push(`/${type}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Choose Your Role
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice('vendor')}
                className="flex items-center gap-4 p-4 bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 rounded-xl text-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <FaStore className="text-2xl" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Register as Vendor</h3>
                  <p className="text-sm text-white/80">List your services and reach more customers</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice('customer')}
                className="flex items-center gap-4 p-4 bg-gradient-to-r cursor-pointer from-purple-500 to-pink-600 rounded-xl text-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <FaUser className="text-2xl" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Register as Customer</h3>
                  <p className="text-sm text-white/80">Book events and find vendors</p>
                </div>
              </motion.button>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-2 text-white/80 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 