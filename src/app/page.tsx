'use client'
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import { FaFire, FaLeaf, FaCogs } from 'react-icons/fa';
import Head from 'next/head';

export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Termokeramika | Шамотні плити та вогнетривкі матеріали</title>
        <meta
          name="description"
          content="Termokeramika – провідний виробник шамотних плит та вогнетривких матеріалів в Україні. Надійні рішення для печей, камінів та промислових установок."
        />
        <meta
          name="keywords"
          content="шамотна плита, вогнетривка плита, термокераміка, termokeramika, вогнетривкі матеріали"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      {/* Героїчний блок */}
      <HeroSection
        title="Термо Кераміка – Надійність у кожній плиті"
        subtitle="Високоякісні шамотні плити для промислових і побутових потреб. Створюємо вогнетривкі рішення для вашого бізнесу та дому."
        ctaText="Переглянути продукцію"
        ctaLink="/products"
        image="/images/hero.jpg"
      />

      {/* Переваги */}
      <motion.section
        className="py-16 container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12">Наші переваги</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaFire className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Висока вогнетривкість</h3>
            <p className="text-gray-600">
              Наші шамотні плити витримують температури до 1460°C, що робить їх ідеальними для екстремальних умов у металургії та інших галузях.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaLeaf className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Екологічність</h3>
            <p className="text-gray-600">
              Використовуємо лише натуральні матеріали – кальциновану шамотну глину, вогнетривкі глини та каоліни, без шкідливих домішок.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaCogs className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Сучасне виробництво</h3>
            <p className="text-gray-600">
              Комп’ютеризовані виробничі лінії забезпечують точність і стабільність характеристик кожної плити.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Популярні продукти */}
      <motion.section
        className="py-16 container mx-auto px-4 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ProductGrid title="Популярні розміри шамотних плит" limit={4} />
      </motion.section>

      {/* Чому ми? */}
      <motion.section
        className="py-16 container mx-auto px-4 bg-blue-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12">Чому обирають Термо Кераміка?</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Ми – команда професіоналів, яка працює на ринку вогнетривких матеріалів понад 15 років. Наша місія – забезпечити клієнтів надійними рішеннями для промислових і побутових потреб. Ми пропонуємо широкий асортимент шамотних плит, які відповідають найвищим стандартам якості.
          </p>
          <motion.a
            href="/about"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Дізнатись більше про нас
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}