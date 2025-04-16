'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ClientOnly from '@/components/ClientOnly';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = parseFloat(item.priceInEuro) * 40; // Конвертуємо євро в гривні
    return total + price * item.quantity;
  }, 0);

  const CartItem = ({ id, label, dimensions, priceInEuro, quantity }: {
    id: number;
    label: string;
    dimensions: string;
    priceInEuro: string;
    quantity: number;
  }) => {
    const priceInUAH = parseFloat(priceInEuro) * 40; // Конвертуємо євро в гривні

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md"
      >
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="font-medium">{label}</h3>
            <p className="text-sm text-gray-600">Розміри: {dimensions}</p>
            <p className="text-sm text-gray-600">Ціна: {priceInUAH.toFixed(2)} ₴</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(id, quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(id, quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="font-medium">{(priceInUAH * quantity).toFixed(2)} ₴</p>
          </div>
          <button
            onClick={() => handleRemoveFromCart(id)}
            className="text-red-500 hover:text-red-700"
          >
            Видалити
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Кошик</h1>
      <ClientOnly>
        <AnimatePresence>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center text-xl font-semibold">
                  <span>Загальна сума:</span>
                  <span>{totalAmount.toFixed(2)} ₴</span>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Оформити замовлення
                </Link>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-xl text-gray-600 mb-4">Ваш кошик порожній</p>
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                Перейти до товарів
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </ClientOnly>
    </div>
  );
} 