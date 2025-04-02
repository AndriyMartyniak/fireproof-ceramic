'use client';

import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  email?: string; // Необов’язкове поле
  message?: string; // Необов’язкове поле
}

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false); // Стан для відстеження успішного надсилання
  const [isSubmitting, setIsSubmitting] = useState(false); // Стан для відображення "Відправлення..."
  const [error, setError] = useState<string | null>(null); // Стан для відображення помилок

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const formEndpoint = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`;


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          message: data.message,
          _subject: 'Нове повідомлення з Termokeramika', // Тема листа
          _replyto: data.email || 'no-reply@termokeramika.com.ua', // Email для відповіді
        }),
      });

      if (!response.ok) {
        throw new Error('Помилка при відправленні форми. Спробуйте ще раз.');
      }

      setIsSubmitted(true); // Показуємо повідомлення про успіх
      reset(); // Очищаємо форму
    } catch (err: any) {
      setError(err.message || 'Щось пішло не так. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Функція для повернення до форми
  const handleSendAnother = () => {
    setIsSubmitted(false);
    setError(null);
    reset();
  };

  // Якщо форма успішно надіслана, показуємо повідомлення
  if (isSubmitted) {
    return (
      <motion.div
        className="bg-white p-8 rounded-lg shadow-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Дякуємо за ваше повідомлення!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Скоро з вами зв’яжеться менеджер.
        </p>
        <motion.button
          onClick={handleSendAnother}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md mr-4"
          variants={buttonVariants}
          whileHover="hover"
        >
          Надіслати ще одне повідомлення
        </motion.button>
        <a href="/products">
          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md"
            variants={buttonVariants}
            whileHover="hover"
          >
            До пошуку продуктів!
          </motion.button>
        </a>
      </motion.div>
    );
  }

  // Відображаємо форму, якщо вона ще не надіслана
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-8 rounded-lg shadow-md"
    >
      {/* Повідомлення про помилку */}
      {error && (
        <motion.p
          className="text-red-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      {/* Поле "Ім’я" */}
      <div>
        <label className="block text-lg text-gray-700">Ім’я</label>
        <input
          type="text"
          className={`w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? 'border-red-500' : ''
          }`}
          {...register('name', {
            required: "Ім’я є обов’язковим",
            minLength: {
              value: 2,
              message: "Ім’я має містити щонайменше 2 символи",
            },
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Поле "Номер телефону" */}
      <div>
        <label className="block text-lg text-gray-700">Номер телефону</label>
        <input
          type="text"
          className={`w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.phone ? 'border-red-500' : ''
          }`}
          {...register('phone', {
            required: "Номер телефону є обов’язковим",
            pattern: {
              value: /^\+?[0-9]{10,15}$/,
              message: 'Введіть коректний номер телефону (наприклад, +380123456789)',
            },
          })}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Поле "Email" */}
      <div>
        <label className="block text-lg text-gray-700">Email (не обов’язково)</label>
        <input
          type="email"
          className={`w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : ''
          }`}
          {...register('email', {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Введіть коректний email (наприклад, example@domain.com)',
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Поле "Повідомлення" */}
      <div>
        <label className="block text-lg text-gray-700">Повідомлення (не обов’язково)</label>
        <textarea
          className={`w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.message ? 'border-red-500' : ''
          }`}
          rows={4}
          {...register('message', {
            required: false,
          })}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Кнопка відправлення */}
      <motion.button
        type="submit"
        className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        variants={buttonVariants}
        whileHover={isSubmitting ? {} : 'hover'}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Відправлення...' : 'Надіслати'}
      </motion.button>
    </form>
  );
}