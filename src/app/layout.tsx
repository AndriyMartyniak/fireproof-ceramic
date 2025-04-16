import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Providers } from './providers';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'Термокераміка | Шамотні плити та вогнетривкі матеріали',
  description: 'Виробництво та продаж шамотних плит та вогнетривких матеріалів. Висока якість, доступні ціни, швидка доставка по всій Україні.',
  keywords: 'термокераміка, шамотні плити, вогнетривкі матеріали, шамотна цегла, промислові печі, футерування',
  openGraph: {
    title: 'Шамотна плита купити | Termokeramika',
    description: 'Вогнетривкі шамотні плити для печей, камінів, барбекю. Доставка по Україні. Виробник Termokeramika.',
    url: 'https://termokeramika.com.ua',
    siteName: 'Termokeramika',
    type: 'website',
    locale: 'uk_UA',
    images: [
      {
        url: 'https://termokeramika.com.ua/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Шамотна плита Termokeramika',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Шамотна плита купити | Termokeramika',
    description: 'Вогнетривкі шамотні плити для печей, камінів, барбекю. Доставка по Україні. Виробник Termokeramika.',
    images: ['https://termokeramika.com.ua/images/hero.jpg'],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://termokeramika.com.ua',
  },
  other: {
    'google-site-verification': 'kmMGB-5BNlfpfdTOR2e7s3phFoC2bgPtGhyi7Xp72_c',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Providers>
          <Header />
          <main className="flex-grow mb-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}