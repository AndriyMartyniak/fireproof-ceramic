'use client';

import { motion } from 'framer-motion';
import ProductGrid from '../../components/ProductGrid';
import Head from 'next/head';

export default function Products() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <Head>
        <title>Шамотні плити - Термокераміка | Вогнетривкі плити для печей та камінів</title>
        <meta
          name="description"
          content="Широкий асортимент шамотних плит від Termokeramika. Вогнетривкі плити для печей, камінів та промислових установок. Знайдіть ідеальний розмір або замовте індивідуально!"
        />
        <meta
          name="keywords"
          content="шамотна плита, вогнетривка плита, термокераміка, плита для печі, плита для каміна, termokeramika, вогнетривкі матеріали"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Розміри шамотних плит
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Широкий асортимент розмірів для будь-яких потреб – від побутових камінів до промислових печей.
        </motion.p>

        {/* Сітка продуктів */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ProductGrid />
        </motion.div>

        {/* Заклик до дії */}
        <motion.div
          className="bg-blue-50 rounded-lg p-8 mt-12 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Не знайшли потрібний розмір?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Ми можемо виготовити шамотні плити на замовлення за вашими специфікаціями. Зв'яжіться з нами, і ми допоможемо підібрати ідеальне рішення!
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Зв'язатись із нами
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}