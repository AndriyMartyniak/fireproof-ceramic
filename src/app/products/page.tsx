'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import ProductGrid from '../../components/ProductGrid';
import ProductSearchBar from '../../components/ProductSearchBar';
import JsonLd from '@/components/JsonLd';
import { searchProducts } from '@/lib/searchProducts';

export default function Products() {
  const [query, setQuery] = useState('');

  // Підхоплюємо ?q= з посилання (наприклад, з пошуку на головній)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setQuery(q);
  }, []);

  const filteredProducts = useMemo(() => searchProducts(query), [query]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: 'https://termokeramika.com.ua' },
      { '@type': 'ListItem', position: 2, name: 'Шамотні плити', item: 'https://termokeramika.com.ua/products' },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Шамотна плита купити – каталог розмірів
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Шамотка (шамотна плита) від виробника – широкий асортимент розмірів для каміну, печі, барбекю та
          промислових установок. Вогнетривка альтернатива шамотній цеглі з доставкою по всій Україні.
        </motion.p>

        <div className="max-w-xl mx-auto mb-10">
          <ProductSearchBar value={query} onChange={setQuery} />
          {query && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              Знайдено: {filteredProducts.length} з 50
            </p>
          )}
        </div>

        {/* Сітка продуктів */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ProductGrid products={filteredProducts} />
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