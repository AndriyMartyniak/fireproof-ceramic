import Link from 'next/link';
import { FaPhone } from 'react-icons/fa';
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="bg-gray-900 text-gray-200 text-sm hidden sm:block">
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center">
          <span>Виробник шамотних плит в Україні · Доставка Новою Поштою по всій країні</span>
          <a href="tel:+380994407123" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <FaPhone size={11} />
            +380 99 440 71 23
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 cursor-pointer">
            Термо Кераміка
          </h1>
        </Link>
        <NavMenu />
      </div>
    </header>
  );
}
