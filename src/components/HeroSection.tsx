'use client'

import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

export default function HeroSection({ title, subtitle, ctaText, ctaLink, image }: HeroSectionProps) {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <section className="relative h-[600px] bg-cover bg-center rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent"></div>
      <div className="relative container mx-auto h-full flex flex-col justify-center items-start text-white px-6 md:px-12">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-lg"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        <motion.a
          href={ctaLink}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md text-lg"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          {ctaText}
        </motion.a>
      </div>
      <img src={image} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
    </section>
  );
}