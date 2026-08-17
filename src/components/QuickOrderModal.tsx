'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { FaBolt, FaCheckCircle } from 'react-icons/fa';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productLabel?: string;
}

interface QuickOrderFormData {
  name: string;
  phone: string;
}

export default function QuickOrderModal({ isOpen, onClose, productLabel }: QuickOrderModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuickOrderFormData>({ defaultValues: { name: '', phone: '' } });

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setError(null);
      reset();
    }, 300);
  };

  const onSubmit: SubmitHandler<QuickOrderFormData> = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quick_order',
          name: data.name,
          phone: data.phone,
          productLabel: productLabel || 'Не вказано (замовлення з сайту)',
        }),
      });

      if (!response.ok) {
        throw new Error('Помилка при відправленні. Спробуйте ще раз або зателефонуйте нам.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Щось пішло не так. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:p-8 rounded-2xl shadow-2xl z-50 w-[92%] max-w-md"
          >
            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-green-500 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Заявку прийнято!</h3>
                <p className="text-gray-600 mb-6">
                  Ми зателефонуємо вам протягом робочого дня, щоб підтвердити замовлення.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Закрити
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <FaBolt className="text-orange-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Замовлення в 1 клік</h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm">
                  {productLabel ? (
                    <>
                      Товар: <span className="font-medium text-gray-800">{productLabel}</span>. Залиште ім&rsquo;я
                      та телефон — передзвонимо протягом 15 хвилин.
                    </>
                  ) : (
                    'Залиште ім’я та телефон — наш менеджер передзвонить протягом 15 хвилин.'
                  )}
                </p>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Ваше ім'я"
                      autoFocus
                      className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      {...register('name', { required: "Вкажіть ім'я", minLength: { value: 2, message: "Мінімум 2 символи" } })}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="+380 XX XXX XX XX"
                      className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      {...register('phone', {
                        required: "Вкажіть номер телефону",
                        pattern: { value: /^\+?[0-9]{10,15}$/, message: 'Введіть коректний номер телефону' },
                      })}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors ${
                      isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Надсилаємо...' : 'Замовити зараз'}
                  </motion.button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full text-gray-500 hover:text-gray-700 text-sm py-1"
                  >
                    Скасувати
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
