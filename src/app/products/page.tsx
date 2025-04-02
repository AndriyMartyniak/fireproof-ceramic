'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from '../../components/ProductGrid';
import products from '../../data/products.json';
import ProductCard from '../../components/ProductCard';
import Head from 'next/head';

interface Product {
  id: number;
  dimensions: string;
  label: string;
  weight: string;
  priceInEuro: string;
}

export default function Products() {
  const [filter, setFilter] = useState<string | null>(null);
  const [customSize, setCustomSize] = useState<string>(''); // Стан для введеного розміру
  const [sizeError, setSizeError] = useState<string | null>(null); // Стан для помилки введення розміру
  const [foundProduct, setFoundProduct] = useState<Product | null>(null); // Стан для знайденого продукту

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Функція для валідації та пошуку продукту за розміром
  const handleSizeSearch = () => {
    // Замінюємо кириличну "х" на латинську "x"
    const normalizedSize = customSize.replace(/х/gi, 'x').trim();
  
    // Регулярний вираз для перевірки формату "число x число x число"
    const sizeRegex = /^\d+x\d+x\d+$/;
    if (!sizeRegex.test(normalizedSize)) {
      setSizeError('Введіть розмір у форматі "довжина x ширина x товщина", наприклад, 300x150x30');
      setFoundProduct(null);
      return;
    }
  
    // Якщо формат коректний, шукаємо продукт
    const product = products.find((p: Product) => p.dimensions === normalizedSize);
    if (product) {
      setFoundProduct(product);
      setSizeError(null);
    } else {
      setFoundProduct(null);
      setSizeError('Товар із таким розміром не знайдено.');
    }
  };

  // Очищення пошуку
  const handleClearSearch = () => {
    setCustomSize('');
    setSizeError(null);
    setFoundProduct(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <Head>
        <title>Шамотні плити - Termokeramika | Вогнетривкі плити для печей та камінів</title>
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

        {/* Фільтри та пошук за розміром */}
        <motion.div
          className="mb-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Фільтри */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => {
                setFilter(null);
                handleClearSearch(); // Очищаємо пошук при виборі фільтра
              }}
              className={`px-4 py-2 rounded-lg ${
                filter === null ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-600 hover:text-white transition`}
            >
              Усі
            </button>
            <button
              onClick={() => {
                setFilter('ST');
                handleClearSearch(); // Очищаємо пошук при виборі фільтра
              }}
              className={`px-4 py-2 rounded-lg ${
                filter === 'ST' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-600 hover:text-white transition`}
            >
              ST
            </button>
            <button
              onClick={() => {
                setFilter('SP');
                handleClearSearch(); // Очищаємо пошук при виборі фільтра
              }}
              className={`px-4 py-2 rounded-lg ${
                filter === 'SP' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-600 hover:text-white transition`}
            >
              SP
            </button>
          </div>

          {/* Пошук за розміром */}
          <div className="flex justify-center space-x-4 flex-wrap gap-3">
            <input
              type="text"
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value)}
              placeholder="Введіть розмір (наприклад, 300x150x30)"
              className="border border-gray-300 rounded-lg p-3 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSizeSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
            >
              Знайти
            </button>
            {customSize && (
              <button
                onClick={handleClearSearch}
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg shadow-md"
              >
                Очистити
              </button>
            )}
          </div>
          {sizeError && (
            <p className="text-red-500 text-center mt-2">{sizeError}</p>
          )}
        </motion.div>

        {/* Відображення знайденого продукту або сітки продуктів */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {foundProduct ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard product={foundProduct} index={0} />
            </div>
          ) : (
            <ProductGrid filter={filter} />
          )}
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
            Ми можемо виготовити шамотні плити на замовлення за вашими специфікаціями. Зв’яжіться з нами, і ми допоможемо підібрати ідеальне рішення!
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