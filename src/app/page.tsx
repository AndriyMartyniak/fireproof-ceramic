'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import ProductSearchBar from '../components/ProductSearchBar';
import { FaFire, FaLeaf, FaCogs, FaPhone, FaTruck, FaAward } from 'react-icons/fa';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

const POPULAR_SEARCHES = ['250x250x40', '300x200x30', '350x200x30', '400x200x30'];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const goToSearch = (value: string) => {
    const q = value.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'Термокераміка',
    alternateName: 'Termokeramika',
    url: 'https://termokeramika.com.ua',
    logo: 'https://termokeramika.com.ua/images/logo.png',
    image: 'https://termokeramika.com.ua/images/hero.jpg',
    description: 'Виробництво та продаж шамотних плит (шамотки) для каміну, вогнетривких плит для печей та барбекю. Альтернатива шамотній цеглі.',
    priceRange: '₴₴',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UA',
      addressLocality: 'Україна'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+380994407123',
      email: 'thermoceramic.work@gmail.com',
      contactType: 'customer service',
      areaServed: 'UA',
      availableLanguage: ['Ukrainian', 'Russian']
    },
    sameAs: [
      'https://www.facebook.com/termokeramika',
      'https://www.instagram.com/termokeramika'
    ]
  };

  const faqBridgeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Чим шамотна плита відрізняється від шамотної цегли?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Шамотна плита (шамотка) виготовляється з тієї ж вогнетривкої шамотної глини, що й класична шамотна цегла для каміну, але має форму тонкої плити. Це дозволяє легше облицьовувати топку каміну чи печі, економити місце та швидше монтувати футерування, зберігаючи ту саму вогнетривкість до 1460°C.',
        },
      },
      {
        '@type': 'Question',
        name: 'Де купити шамотну плиту для каміну в Україні?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Термокераміка – виробник шамотних плит в Україні. Купити шамотну плиту (шамотку) для каміну, печі, барбекю чи мангалу можна напряму на сайті з доставкою Новою Поштою по всій Україні.',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqBridgeJsonLd} />
      <div className="bg-gray-50 min-h-screen">
        {/* Героїчний блок */}
        <HeroSection
          title="Термо Кераміка – Надійність у кожній плиті"
          subtitle="Високоякісні шамотні плити для промислових і побутових потреб. Створюємо вогнетривкі рішення для вашого бізнесу та дому."
          ctaText="Переглянути продукцію"
          ctaLink="/products"
          image="/images/hero.jpg"
        />

        {/* Швидкий пошук */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 max-w-2xl mx-auto">
            <p className="text-sm font-medium text-gray-700 mb-3 text-center">
              Знайдіть потрібну шамотну плиту за розміром чи маркуванням
            </p>
            <ProductSearchBar value={query} onChange={setQuery} onSubmit={() => goToSearch(query)} />
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => goToSearch(term)}
                  className="text-xs sm:text-sm bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Панель довіри */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <FaFire className="text-blue-500 text-2xl" />
              <span className="text-sm font-medium text-gray-700">До 1460°C</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FaAward className="text-blue-500 text-2xl" />
              <span className="text-sm font-medium text-gray-700">15+ років досвіду</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FaTruck className="text-blue-500 text-2xl" />
              <span className="text-sm font-medium text-gray-700">Доставка по Україні</span>
            </div>
            <a href="tel:+380994407123" className="flex flex-col items-center gap-1 hover:text-blue-600">
              <FaPhone className="text-blue-500 text-2xl" />
              <span className="text-sm font-medium text-gray-700">+380 99 440 71 23</span>
            </a>
          </div>
        </div>

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
                Комп'ютеризовані виробничі лінії забезпечують точність і стабільність характеристик кожної плити.
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
          <ProductGrid title="Розміри шамотних плит"  />
        </motion.section>

        {/* Категорії застосування */}
        <motion.section
          className="py-16 container mx-auto px-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-4">
            Шамотка для будь-яких задач
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Обирайте шамотну плиту під ваш проєкт — від домашнього каміну до промислової печі
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Для каміну', href: '/products' },
              { label: 'Для печі', href: '/products' },
              { label: 'Для барбекю та мангалу', href: '/products' },
              { label: 'Для промислових печей', href: '/applications' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="bg-white border border-gray-200 rounded-lg p-5 text-center font-medium text-gray-800 hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Шамотна плита vs шамотна цегла */}
        <motion.section
          className="py-16 container mx-auto px-4 bg-white"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-6">
              Шамотна плита, шамотка чи шамотна цегла — що обрати?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              &laquo;Шамотка&raquo; — це розмовна назва шамотних виробів із вогнетривкої шамотної глини. Найчастіше
              під цим словом мають на увазі саме шамотну плиту — тонкий вогнетривкий лист, яким футерують топку
              каміну чи печі. На відміну від класичної шамотної цегли для каміну, плита легша, займає менше місця
              та простіше монтується, зберігаючи ідентичну вогнетривкість до 1460°C.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Якщо ви шукали <strong>&laquo;шамотна цегла купити&raquo;</strong> або{' '}
              <strong>&laquo;цегла для каміну купити&raquo;</strong> — наші шамотні плити є практичною заміною:
              той самий матеріал, зручніша форма, нижча вартість монтажу.
            </p>
          </div>
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
    </>
  );
}