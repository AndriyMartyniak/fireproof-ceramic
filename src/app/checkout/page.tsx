'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { motion } from 'framer-motion';
import ClientOnly from '@/components/ClientOnly';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cartSlice';
import Script from 'next/script';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

export default function CheckoutPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      notes: '',
    },
  });

  const formEndpoint = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const totalAmount = cartItems.reduce((total, item) => {
        const price = parseFloat(item.priceInEuro) * 40;
        return total + price * item.quantity;
      }, 0);

      const orderDetails = cartItems.map(item => ({
        label: item.label,
        dimensions: item.dimensions,
        quantity: item.quantity,
        pricePerUnit: parseFloat(item.priceInEuro) * 40,
        totalPrice: parseFloat(item.priceInEuro) * 40 * item.quantity
      }));

      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
          city: data.city,
          notes: data.notes,
          orderDetails: orderDetails,
          totalAmount: totalAmount.toFixed(2) + ' ₴',
          _subject: 'Нове замовлення з Termokeramika',
        }),
      });

      if (!response.ok) {
        throw new Error('Помилка при відправленні замовлення. Спробуйте ще раз.');
      }

      setIsSubmitted(true);
      dispatch(clearCart());
      reset();
    } catch (err: any) {
      setError(err.message || 'Щось пішло не так. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Script id="google-ads-conversion">
          {`
            gtag('event', 'conversion', {
              'send_to': '${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL}',
              'value': 1.0,
              'currency': 'UAH'
            });
          `}
        </Script>
        <motion.div
          className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Дякуємо за ваше замовлення!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Наш менеджер зв'яжеться з вами найближчим часом для підтвердження замовлення.
          </p>
          <div className="space-x-4">
            <a href="/products">
              <motion.button
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Повернутися до товарів
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Оформлення замовлення</h1>
      
      {error && (
        <motion.div
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-red-600 text-center">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Форма даних покупця */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Дані покупця</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Ім'я *
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName', {
                    required: "Ім'я є обов'язковим",
                    minLength: {
                      value: 2,
                      message: "Ім'я має містити щонайменше 2 символи",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Прізвище *
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName', {
                    required: "Прізвище є обов'язковим",
                    minLength: {
                      value: 2,
                      message: "Прізвище має містити щонайменше 2 символи",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Телефон *
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone', {
                  required: "Номер телефону є обов'язковим",
                  pattern: {
                    value: /^\+?[0-9]{10,15}$/,
                    message: 'Введіть коректний номер телефону',
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Місто *
              </label>
              <input
                type="text"
                id="city"
                {...register('city', {
                  required: "Місто є обов'язковим",
                  minLength: {
                    value: 2,
                    message: "Назва міста має містити щонайменше 2 символи",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Адреса доставки та поштове відділення *
              </label>
              <input
                type="text"
                id="address"
                {...register('address', {
                  required: "Адреса є обов'язковою",
                  minLength: {
                    value: 5,
                    message: "Адреса має містити щонайменше 5 символів",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Примітки до замовлення
              </label>
              <textarea
                id="notes"
                {...register('notes')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>

        {/* Підсумок замовлення */}
        <ClientOnly>
          <OrderSummary onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} />
        </ClientOnly>
      </div>
    </div>
  );
}

function OrderSummary({ onSubmit, isSubmitting }: { onSubmit: () => void; isSubmitting: boolean }) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => {
    const price = parseFloat(item.priceInEuro) * 40;
    return total + price * item.quantity;
  }, 0);

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-6">Ваше замовлення</h2>
        <div className="space-y-4">
          {cartItems.map((item) => {
            const priceInUAH = parseFloat(item.priceInEuro) * 40;
            return (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="flex-1">
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="text-sm text-gray-600">
                    Розміри: {item.dimensions}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x {priceInUAH.toFixed(2)} ₴
                  </p>
                </div>
                <div className="font-medium">
                  {(priceInUAH * item.quantity).toFixed(2)} ₴
                </div>
              </div>
            );
          })}

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Загальна сума:</span>
              <span className="font-bold text-xl">{totalAmount.toFixed(2)} ₴</span>
            </div>
          </div>

          <motion.button
            onClick={onSubmit}
            className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed hover:bg-blue-600' : 'hover:bg-blue-700'
            }`}
            whileHover={isSubmitting ? {} : { scale: 1.02 }}
            whileTap={isSubmitting ? {} : { scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Відправлення...' : 'Оформити замовлення'}
          </motion.button>
        </div>
      </div>
    </div>
  );
} 