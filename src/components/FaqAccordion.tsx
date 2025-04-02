'use client';

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: 'Що означає "ST" або "SP"?', a: 'ST – високощільна вогнетривка глина, SP – щільна вогнетривка глина.' },
    { q: 'Що означає число в маркуванні (наприклад, 40)?', a: 'Це вміст Al₂O₃ у відсотках.' },
    { q: 'Що означає "K" у маркуванні?', a: 'K позначає кислотостійкість плити.' },
  ];

  const contentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <button
            className="w-full text-left p-6 font-medium text-gray-800 hover:bg-gray-50 transition flex justify-between items-center"
            onClick={() => setOpen(open === index ? null : index)}
          >
            <span className="text-lg">{faq.q}</span>
            {open === index ? <FaMinus className="text-gray-500" /> : <FaPlus className="text-gray-500" />}
          </button>
          <AnimatePresence>
            {open === index && (
              <motion.div
                className="p-6 bg-gray-50 text-gray-700"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {faq.a}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}