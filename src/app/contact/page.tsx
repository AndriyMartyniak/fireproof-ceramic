'use client'

import { motion } from 'framer-motion';
import ContactForm from '../../components/ContactForm';
import { FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export default function Contact() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Зв’яжіться з нами
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ContactForm />
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <a href="tel:+380994407123" className="flex items-center gap-3 text-lg text-gray-800 hover:text-blue-600 transition-colors">
                <FaPhone className="text-blue-500" /> +380 99 440 71 23
              </a>
              <a href="mailto:thermoceramic.work@gmail.com" className="flex items-center gap-3 text-lg text-gray-800 hover:text-blue-600 transition-colors break-all">
                <FaEnvelope className="text-blue-500" /> thermoceramic.work@gmail.com
              </a>
              <p className="flex items-center gap-3 text-lg text-gray-700">
                <FaClock className="text-blue-500" /> Пн–Пт: 9:00–18:00
              </p>
            </div>
            <p className="text-gray-600">
              Звертайтесь, і ми з радістю допоможемо підібрати шамотну плиту для вашого каміну, печі чи виробництва.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}