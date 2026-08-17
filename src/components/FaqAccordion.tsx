'use client';

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

export const faqs = [
  {
    q: 'Що таке "шамотка"?',
    a: '«Шамотка» – розмовна назва шамотних вогнетривких виробів, найчастіше шамотної плити. Це матеріал з вогнетривкої шамотної глини, який витримує температури до 1460°C.',
  },
  {
    q: 'Чим шамотна плита відрізняється від шамотної цегли?',
    a: 'Той самий матеріал – шамотна глина, але інша форма. Плита тонша й легша за цеглу, тому простіше монтується при футеруванні каміну чи печі та коштує дешевше за рахунок економії матеріалу.',
  },
  {
    q: 'Де купити шамотну плиту для каміну?',
    a: 'Шамотну плиту (шамотку) для каміну можна замовити напряму у виробника Термокераміка з доставкою Новою Поштою по всій Україні – оберіть розмір у каталозі та оформіть замовлення в 1 клік.',
  },
  {
    q: 'Скільки коштує шамотна плита?',
    a: 'Ціна залежить від розміру та маркування (ST30, ST40 тощо) – від 4 € до 16 € за штуку в еквіваленті. Точну ціну в гривнях дивіться в каталозі товарів.',
  },
  {
    q: 'Що означає "ST" або "SP"?',
    a: 'ST – високощільна вогнетривка глина, SP – щільна вогнетривка глина.',
  },
  {
    q: 'Що означає число в маркуванні (наприклад, 40)?',
    a: 'Це вміст Al₂O₃ у відсотках.',
  },
  {
    q: 'Що означає "K" у маркуванні?',
    a: 'K позначає кислотостійкість плити.',
  },
  {
    q: 'Як розрахувати кількість шамотної плити на камін?',
    a: 'Виміряйте площу топки каміну чи печі та розділіть на площу однієї плити з урахуванням розмірів. Якщо не впевнені – зателефонуйте нам, ми безкоштовно допоможемо з розрахунком.',
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

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