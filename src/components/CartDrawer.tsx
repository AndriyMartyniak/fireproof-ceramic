'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMinus, FaPlus, FaTrash, FaShoppingBag } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useCartDrawer } from './CartDrawerContext';
import ClientOnly from './ClientOnly';

const EXCHANGE_RATE = 46;

function DrawerContent() {
  const { closeDrawer } = useCartDrawer();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((total, item) => {
    const priceInUAH = Math.round(parseFloat(item.priceInEuro) * EXCHANGE_RATE);
    return total + priceInUAH * item.quantity;
  }, 0);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <FaShoppingBag className="text-gray-300 text-5xl mb-4" />
        <p className="text-lg text-gray-600 mb-6">Кошик порожній</p>
        <Link
          href="/products"
          onClick={closeDrawer}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-6 rounded-lg font-medium transition-colors"
        >
          Перейти до каталогу
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {cartItems.map((item) => {
          const priceInUAH = Math.round(parseFloat(item.priceInEuro) * EXCHANGE_RATE);
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="flex gap-3 bg-gray-50 rounded-lg p-3"
            >
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src={item.image || '/images/fireproof-plate.webp'}
                  alt={`Шамотна плита ${item.dimensions}`}
                  fill
                  sizes="64px"
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-gray-900 truncate">
                  Шамотна плита {item.dimensions}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{item.label}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-1.5 text-gray-500 hover:text-gray-800"
                      aria-label="Зменшити кількість"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-1.5 text-gray-500 hover:text-gray-800"
                      aria-label="Збільшити кількість"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                  <span className="font-semibold text-sm text-gray-900">
                    {(priceInUAH * item.quantity).toLocaleString('uk-UA')} ₴
                  </span>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-gray-400 hover:text-red-500 self-start"
                aria-label="Видалити товар"
              >
                <FaTrash size={14} />
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 px-4 py-4 space-y-3 bg-white">
        <div className="flex justify-between items-center text-lg">
          <span className="text-gray-600">Разом:</span>
          <span className="font-bold text-gray-900">{totalAmount.toLocaleString('uk-UA')} ₴</span>
        </div>
        <Link
          href="/checkout"
          onClick={closeDrawer}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Оформити замовлення
        </Link>
        <button
          onClick={closeDrawer}
          className="w-full text-center text-gray-500 hover:text-gray-700 text-sm py-1"
        >
          Продовжити покупки
        </button>
      </div>
    </>
  );
}

export default function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Кошик</h2>
              <button
                onClick={closeDrawer}
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full"
                aria-label="Закрити кошик"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <ClientOnly>
              <DrawerContent />
            </ClientOnly>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
