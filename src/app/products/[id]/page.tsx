'use client';

import { motion } from 'framer-motion';
import { use } from 'react';
import { useState, useEffect } from 'react';
import products from '../../../data/products.json';
import specs from '../../../data/specs.json';
import SpecsTable from '@/components/SpecsTable';

interface Product {
  id: number;
  dimensions: string;
  label: string;
  weight: string;
  priceInEuro: string; // Базова ціна в євро
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === parseInt(resolvedParams.id)) as Product | undefined;
  const productSpecs = product ? specs.filter((spec) => spec.label === product.label) : [];

  const exchangeRate = 46

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  // Обробка випадку, якщо продукт не знайдено
  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-semibold text-gray-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Продукт не знайдено
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Вибачте, але продукт із ID {resolvedParams.id} не існує. Перегляньте наш каталог, щоб знайти потрібний розмір.
          </motion.p>
          <motion.a
            href="/products"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            Повернутись до каталогу
          </motion.a>
        </div>
      </div>
    );
  }

  // Конвертація ціни з EUR у UAH
  const priceInEuro = parseFloat(product.priceInEuro.replace(' €', '')); // Видаляємо символ € і конвертуємо в число
  const priceInUAH = exchangeRate ? Math.round(priceInEuro * exchangeRate) : null;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <motion.h1
          className="text-4xl md:text-5xl font-semibold text-gray-900 text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Шамотна плита {product.dimensions}
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Високоякісна вогнетривка плита для вашого проєкту
        </motion.p>

        {/* Основна інформація */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative">
            <img
              src="/images/fireproof-plate.webp"
              alt={`Шамотна плита ${product.dimensions}`}
              className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            />
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {product.label}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Основні характеристики</h2>
              <p className="text-lg text-gray-700">Маркування: {product.label}</p>
              <p className="text-lg text-gray-700">Вага: {product.weight}</p>
              <p className="text-lg text-gray-700">Розміри: {product.dimensions} мм</p>
                <>
                  <p className="text-2xl font-bold text-blue-600 mt-4">
                    Ціна: {priceInUAH ? `${priceInUAH} ₴` : 'Н/Д'}
                  </p>
                </>
            </div>
            <motion.a
              href="/contact"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
              variants={buttonVariants}
              whileHover="hover"
            >
              Замовити зараз
            </motion.a>
          </div>
        </motion.div>

        {/* Опис продукту */}
        <motion.div
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">Опис продукту</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Шамотна плита {product.dimensions} – це надійне рішення для футерування печей, камінів, а також промислових установок. Виготовлена з високоякісної шамотної глини, вона витримує екстремальні температури та забезпечує довговічність у найскладніших умовах. Цей продукт ідеально підходить для металургійної, керамічної та хімічної промисловості, а також для побутового використання.
          </p>
        </motion.div>

        {/* Переваги */}
        <motion.div
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">Переваги</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Висока вогнетривкість</h3>
              <p className="text-gray-600">Витримує температури до {productSpecs[0]?.temp || '1420'}°C без деформації.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Довговічність</h3>
              <p className="text-gray-600">Стійка до зносу та хімічних впливів, забезпечує тривалий термін служби.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Універсальність</h3>
              <p className="text-gray-600">Підходить для різних типів печей та промислових установок.</p>
            </div>
          </div>
        </motion.div>

        {/* Застосування */}
        <motion.div
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">Сфери застосування</h2>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>Футерування промислових печей у металургійній промисловості.</li>
            <li>Використання в побутових камінах та печах для створення надійного теплового захисту.</li>
            <li>Застосування в керамічній промисловості для випалу виробів.</li>
            <li>Використання в хімічній промисловості для роботи з агресивними середовищами.</li>
          </ul>
        </motion.div>

        {/* Технічні характеристики */}
        <motion.div
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">Технічні характеристики</h2>
          {productSpecs.length > 0 ? (
            <SpecsTable specs={productSpecs} />
          ) : (
            <p className="text-gray-600">Технічні характеристики для цього маркування недоступні.</p>
          )}
        </motion.div>

        {/* Секція "Потрібна консультація?" */}
        <motion.div
          className="bg-blue-50 rounded-lg p-8 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Потрібна консультація?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Наші фахівці допоможуть підібрати шамотну плиту, яка ідеально підійде для ваших потреб. Зв’яжіться з нами для отримання детальної інформації!
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
            variants={buttonVariants}
            whileHover="hover"
          >
            Зв’язатись із нами
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}