'use client'

import FAQAccordion from '@/components/FaqAccordion';
import { motion } from 'framer-motion';

export default function FAQ() {
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
          Маркування шамотних плит
        </motion.h1>

        {/* Вступний блок */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-8 mb-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Як розшифрувати маркування?</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Маркування шамотних плит складається з трьох частин: типу глини, вмісту Al₂O₃ і додаткових характеристик. Це допомагає швидко визначити, для яких умов підходить плита. Наприклад, маркування "ST40K" означає високощільну плиту з 40% Al₂O₃ і кислотостійкістю.
          </p>
        </motion.div>

        {/* Акордеон */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FAQAccordion />
        </motion.div>

        {/* Додаткова інформація */}
        <motion.div
          className="bg-blue-50 rounded-lg p-8 mt-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Приклади маркування</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li><strong>ST40:</strong> Високощільна плита з 40% Al₂O₃, ідеальна для металургійних печей.</li>
            <li><strong>SP35:</strong> Щільна плита з 35% Al₂O₃, підходить для керамічної промисловості.</li>
            <li><strong>ST40K:</strong> Кислотостійка плита для хімічної промисловості.</li>
          </ul>
          <p className="text-lg text-gray-700 mt-4">
            Вибір маркування залежить від умов експлуатації. Наприклад, для агресивних хімічних середовищ обирайте плити з позначкою "K", а для високих температур – плити з вищим вмістом Al₂O₃.
          </p>
        </motion.div>
      </div>
    </div>
  );
}