'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function CartModal({ isOpen, onClose, productName }: CartModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Затемнений фон */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          
          {/* Модальне вікно */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-[90%] max-w-md"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShoppingCart className="text-green-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Товар додано в корзину!
              </h3>
              <p className="text-gray-600 mb-6">
                {productName} успішно додано до вашої корзини
              </p>
              
              <div className="space-y-3">
                <Link
                  href="/cart"
                  className="block w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors duration-200"
                  onClick={onClose}
                >
                  Перейти до корзини
                </Link>
                <button
                  onClick={onClose}
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Продовжити покупки
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 