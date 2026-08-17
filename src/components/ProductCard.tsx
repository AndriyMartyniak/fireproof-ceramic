'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '@/store/cartSlice';
import { RootState } from '@/store/store';
import { FaShoppingCart, FaMinus, FaPlus, FaTrash, FaBolt } from 'react-icons/fa';
import QuickOrderModal from './QuickOrderModal';
import ClientOnly from './ClientOnly';
import Image from 'next/image';
import Link from 'next/link';
import { useCartDrawer } from './CartDrawerContext';

interface Product {
  id: number;
  dimensions: string;
  label: string;
  weight: string;
  priceInEuro: string; // Базова ціна в євро
  description?: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

function CartActions({ product, onQuickOrder }: { product: Product; onQuickOrder: () => void }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find(item => item.id === product.id);
  const { openDrawer } = useCartDrawer();

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    openDrawer();
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    }
  };

  if (cartItem) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
              className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMinus className="text-gray-600 text-sm" />
            </motion.button>
            <span className="font-semibold">{cartItem.quantity}</span>
            <motion.button
              onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
              className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus className="text-gray-600 text-sm" />
            </motion.button>
          </div>
          <motion.button
            onClick={handleRemoveFromCart}
            className="p-1.5 text-red-500 hover:text-red-600 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTrash size={16} />
          </motion.button>
        </div>
        <motion.a
          href={`/products/${product.id}`}
          className="inline-block w-full text-center bg-gray-900 hover:bg-gray-800 text-white py-1.5 px-4 rounded-md cursor-pointer text-sm"
          variants={buttonVariants}
          whileHover="hover"
        >
          Детальніше
        </motion.a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <motion.button
        onClick={onQuickOrder}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-md cursor-pointer flex items-center justify-center space-x-2 text-sm font-semibold shadow-sm"
        variants={buttonVariants}
        whileHover="hover"
      >
        <FaBolt size={14} />
        <span>Замовити в 1 клік</span>
      </motion.button>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-600">Кількість:</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <motion.button
          onClick={handleAddToCart}
          className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-1.5 px-3 rounded-md cursor-pointer flex items-center justify-center space-x-2 text-sm"
          variants={buttonVariants}
          whileHover="hover"
        >
          <FaShoppingCart size={14} />
          <span>В корзину</span>
        </motion.button>
        <motion.a
          href={`/products/${product.id}`}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-1.5 px-3 rounded-md cursor-pointer text-center text-sm"
          variants={buttonVariants}
          whileHover="hover"
        >
          Детальніше
        </motion.a>
      </div>
    </div>
  );
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const exchangeRate = 40;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
  };

  // Конвертація ціни з EUR у UAH
  const priceInEuro = parseFloat(product.priceInEuro.replace(' €', '')); // Видаляємо символ € і конвертуємо в число
  const priceInUAH = exchangeRate ? Math.round(priceInEuro * exchangeRate) : null;

  return (
    <>
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Link href={`/products/${product.id}`}>
          <div className="relative h-48 w-full">
            <Image
              src={product.image || '/images/fireproof-plate.webp'}
              alt={`Шамотна плита ${product.dimensions} ${product.label} купити`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        </Link>
        <div className="p-6">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Шамотна плита {product.dimensions}</h3>
          </Link>
          <p className="text-gray-600 text-sm mb-2">Маркування: {product.label}</p>
          <p className="text-gray-600 text-sm mb-2">Вага: {product.weight}</p>
        
          <p className="text-lg font-bold text-blue-600 mb-2">
            Ціна: {priceInUAH ? `${priceInUAH} ₴` : 'Н/Д'}
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Ідеально підходить для футерування печей, камінів і промислових установок.
          </p>

          <ClientOnly>
            <CartActions product={product} onQuickOrder={() => setIsQuickOrderOpen(true)} />
          </ClientOnly>
        </div>
      </motion.div>

      <QuickOrderModal
        isOpen={isQuickOrderOpen}
        onClose={() => setIsQuickOrderOpen(false)}
        productLabel={`Шамотна плита ${product.dimensions} (${product.label})`}
      />
    </>
  );
}