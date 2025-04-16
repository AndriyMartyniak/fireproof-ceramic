'use client';

import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState, useEffect } from 'react';

const buttonVariants = {
  hover: { scale: 1.1, color: '#60A5FA', transition: { duration: 0.3 } },
};

export default function CartButton() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <motion.a
        href="/cart"
        className="text-gray-700 flex items-center relative"
        variants={buttonVariants}
        whileHover="hover"
      >
        <FaShoppingCart className="text-xl" />
      </motion.a>
    );
  }

  return (
    <motion.a
      href="/cart"
      className="text-gray-700 flex items-center relative"
      variants={buttonVariants}
      whileHover="hover"
    >
      <FaShoppingCart className="text-xl" />
      {cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartItemsCount}
        </span>
      )}
    </motion.a>
  );
} 