'use client';

import { motion } from 'framer-motion';
import { FaHome, FaInfoCircle, FaBox, FaCogs, FaPhone, FaQuestionCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const linkVariants = {
    hover: { scale: 1.1, color: '#60A5FA', transition: { duration: 0.3 } },
  };

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
      display: 'flex',
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
      transitionEnd: { display: 'none' },
    },
  };

  return (
    <>
      {/* Іконка бургер-меню для мобільних пристроїв */}
      {isMounted && (
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      )}

      {/* Навігація для десктопу */}
      <nav className="hidden md:flex space-x-6 items-center">
        <motion.a href="/" className="text-gray-700 flex items-center" variants={linkVariants} whileHover="hover">
          <FaHome className="mr-1" /> Головна
        </motion.a>
        <motion.a href="/products" className="text-gray-700 flex items-center" variants={linkVariants} whileHover="hover">
          <FaBox className="mr-1" /> Продукція
        </motion.a>
        <motion.a href="/about" className="text-gray-700 flex items-center" variants={linkVariants} whileHover="hover">
          <FaInfoCircle className="mr-1" /> Виробництво
        </motion.a>
        <motion.a href="/applications" className="text-gray-700 flex items-center" variants={linkVariants} whileHover="hover">
          <FaCogs className="mr-1" /> Застосування
        </motion.a>
        <motion.a href="/contact" className="text-gray-700 flex items-center" variants={linkVariants} whileHover="hover">
          <FaPhone className="mr-1" /> Контакти
        </motion.a>
        <motion.a href="/faq" className="text-gray-700 flex items-center" variants={linkVariants} whileHover="hover">
          <FaQuestionCircle className="mr-1" /> FAQ
        </motion.a>
      </nav>

      {/* Мобільне меню */}
      {isMounted && (
        <motion.nav
          className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex-col items-center py-4"
          initial={false}
          animate={isMenuOpen ? 'open' : 'closed'}
          variants={menuVariants}
        >
          <motion.a
            href="/"
            className="text-gray-700 flex items-center py-2 px-4 w-full text-center"
            variants={linkVariants}
            whileHover="hover"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaHome className="mr-2" /> Головна
          </motion.a>
          <motion.a
            href="/products"
            className="text-gray-700 flex items-center py-2 px-4 w-full text-center"
            variants={linkVariants}
            whileHover="hover"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaBox className="mr-2" /> Продукція
          </motion.a>
          <motion.a
            href="/about"
            className="text-gray-700 flex items-center py-2 px-4 w-full text-center"
            variants={linkVariants}
            whileHover="hover"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaInfoCircle className="mr-2" /> Виробництво
          </motion.a>
          <motion.a
            href="/applications"
            className="text-gray-700 flex items-center py-2 px-4 w-full text-center"
            variants={linkVariants}
            whileHover="hover"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaCogs className="mr-2" /> Застосування
          </motion.a>
          <motion.a
            href="/contact"
            className="text-gray-700 flex items-center py-2 px-4 w-full text-center"
            variants={linkVariants}
            whileHover="hover"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaPhone className="mr-2" /> Контакти
          </motion.a>
          <motion.a
            href="/faq"
            className="text-gray-700 flex items-center py-2 px-4 w-full text-center"
            variants={linkVariants}
            whileHover="hover"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaQuestionCircle className="mr-2" /> FAQ
          </motion.a>
        </motion.nav>
      )}
    </>
  );
}