import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaClock } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Термо Кераміка</h2>
          <p className="text-sm leading-relaxed">
            Виробник шамотних плит та вогнетривких матеріалів в Україні. Шамотка, шамотна плита та шамотна
            цегла для печей, камінів, барбекю та промислових установок.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://www.facebook.com/termokeramika"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-blue-500 rounded-full transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/termokeramika"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-blue-500 rounded-full transition-colors"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Навігація</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white transition-colors">Каталог шамотних плит</Link></li>
            <li><Link href="/applications" className="hover:text-white transition-colors">Застосування</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">Виробництво</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ / Маркування</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Контакти</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Популярні запити</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white transition-colors">Шамотна плита купити</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Шамотка для каміну</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Цегла для каміну</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Шамотна плита для барбекю</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">Шамотна плита vs шамотна цегла</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Контакти</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:+380994407123" className="flex items-center gap-2 hover:text-white transition-colors">
                <FaPhone className="shrink-0" /> +380 99 440 71 23
              </a>
            </li>
            <li>
              <a href="mailto:thermoceramic.work@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors break-all">
                <FaEnvelope className="shrink-0" /> thermoceramic.work@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="shrink-0" /> Україна · Доставка Новою Поштою
            </li>
            <li className="flex items-center gap-2">
              <FaClock className="shrink-0" /> Пн–Пт: 9:00–18:00
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Термо Кераміка. Усі права захищено.
        </div>
      </div>
    </footer>
  );
}
