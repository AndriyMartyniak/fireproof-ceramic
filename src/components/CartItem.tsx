'use client';

import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CartItemProps {
  id: number;
  label: string;
  dimensions: string;
  priceInEuro: string;
  quantity: number;
  image: string;
}

export default function CartItem({ id, label, dimensions, priceInEuro, quantity, image }: CartItemProps) {
  const dispatch = useDispatch();
  const exchangeRate = 46;

  const priceInEuroValue = parseFloat(priceInEuro.replace(' €', ''));
  const priceInUAH = Math.round(priceInEuroValue * exchangeRate);
  const totalPrice = priceInUAH * quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md"
    >
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-20">
          <Image
            src={image || '/images/fireproof-plate.webp'}
            alt={`Шамотна плита ${dimensions}`}
            fill
            sizes="80px"
            className="object-cover rounded-md"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Шамотна плита {dimensions}</h3>
          <p className="text-gray-600">Маркування: {label}</p>
          <p className="text-blue-600 font-semibold">Ціна: {priceInUAH} ₴</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="w-16 px-2 py-1 text-center border rounded-md"
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold">{totalPrice} ₴</p>
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700"
          >
            Видалити
          </button>
        </div>
      </div>
    </motion.div>
  );
} 