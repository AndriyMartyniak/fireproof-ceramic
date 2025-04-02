'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';
import { JSX, useState } from 'react';


// Компонент для акордеону
const Accordion = ({ title, content }: { title: string; content: JSX.Element }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
      >
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 pt-0 text-gray-600"
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

export default function Applications() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Приклад зображень для слайдера (заміни на свої)
  const sliderImages = [
    '/images/metallurgy.jpg',
    '/images/ceramics.jpg',
    '/images/chemical.jpg',
    '/images/fireplace.jpg',
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
     <Head>
        <title>Застосування шамотних плит - Termokeramika | Вогнетривкі матеріали</title>
        <meta
          name="description"
          content="Дізнайтесь, як шамотні плити від Termokeramika використовуються в металургії, керамічній та хімічній промисловості, а також у побутових камінах."
        />
        <meta
          name="keywords"
          content="шамотна плита, вогнетривка плита, термокераміка, termokeramika, застосування, металургія, керамічна промисловість"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Застосування шамотних плит
        </motion.h1>

        {/* Вступний блок */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-8 mb-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Широкий спектр використання</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Шамотні плити від "Термо Кераміка" – це універсальний вогнетривкий матеріал, який використовується в різних галузях промисловості. Вони забезпечують надійний захист від високих температур і агресивних середовищ, що робить їх незамінними для багатьох застосувань.
          </p>
        </motion.div>

        {/* Відео */}
        {/* <motion.div
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Як використовуються шамотні плити
          </h2>
          <div className="relative w-full max-w-4xl mx-auto aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-md"
              src="https://www.youtube.com/watch?v=UcyPUDLSyUs"
              title="Застосування шамотних плит"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div> */}

        {/* Галузі застосування (акордеон) */}
        <motion.div
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Галузі застосування
          </h2>
          <Accordion
            title="Металургійна промисловість"
            content={
              <>
                <p className="text-gray-600">
                  Шамотні плити використовуються для футерування печей гарячого дуття, доменних печей, ковшів, пустотілих виробів, керамічних рекуператорів і нагрівальних печей. Вони витримують екстремальні температури до 1460°C, забезпечуючи довговічність і безпеку.
                </p>
                <p className="text-gray-600 mt-2">
                  Наприклад, у доменних печах плити захищають стінки від термічних і хімічних впливів, що подовжує термін служби обладнання.
                </p>
              </>
            }
          />
          <Accordion
            title="Керамічна промисловість"
            content={
              <>
                <p className="text-gray-600">
                  У керамічній промисловості шамотні плити застосовуються для створення печей і рекуператорів, які потребують стійкості до високих температур. Їхня пористість і міцність забезпечують ефективну теплоізоляцію.
                </p>
                <p className="text-gray-600 mt-2">
                  Наприклад, плити використовуються для футерування печей для випалу керамічних виробів, що гарантує рівномірний розподіл тепла.
                </p>
              </>
            }
          />
          <Accordion
            title="Хімічна промисловість"
            content={
              <>
                <p className="text-gray-600">
                  У хімічній промисловості шамотні плити використовуються в печах і реакторах, де потрібна стійкість до агресивних хімічних речовин. Маркування "K" (кислотостійкість) робить їх ідеальними для таких умов.
                </p>
                <p className="text-gray-600 mt-2">
                  Наприклад, плити застосовуються в печах для виробництва хімічних реагентів, де вони захищають обладнання від корозії.
                </p>
              </>
            }
          />
          <Accordion
            title="Інші галузі"
            content={
              <>
                <p className="text-gray-600">
                  Шамотні плити також використовуються в енергетиці, скляній промисловості та навіть у побутових печах і камінах. Їхня універсальність дозволяє адаптувати матеріал до різних умов експлуатації.
                </p>
                <p className="text-gray-600 mt-2">
                  Наприклад, у побутових камінах плити забезпечують довговічність і безпеку, зберігаючи тепло протягом тривалого часу.
                </p>
              </>
            }
          />
        </motion.div>

        {/* Заклик до дії */}
        <motion.div
          className="bg-blue-50 rounded-lg p-8 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Потрібна консультація щодо застосування?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Наші менеджери допоможуть підібрати шамотні плити для вашого проєкту!
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Зв’язатись із нами
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}