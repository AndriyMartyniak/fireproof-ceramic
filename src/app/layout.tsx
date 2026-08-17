import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Providers } from './providers';
import Footer from '../components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'Шамотна плита (шамотка) купити | Вогнетривка плита для каміну | Термокераміка',
  description: 'Шамотка (шамотна плита) від виробника: вогнетривкі плити для каміну, печі та барбекю — сучасна альтернатива шамотній цеглі. Швидка доставка по всій Україні, доступні ціни, консультація та замовлення в 1 клік. Termokeramika - надійний виробник вогнетривких матеріалів.',
  keywords: 'шамотка, шамотка купити, шамотна плита, шамотна плита купити, вогнетривка плита, плити для каміну, шамотні плити для печей, вогнетривкі плити для барбекю, термокераміка, шамотна цегла, цегла для каміну, цегла для каміну купити, промислові печі, футерування, вогнетривкі матеріали, шамотні плити купити, вогнетривка плита купити, плити для каміну купити, шамотна плита для каміну, вогнетривка плита для печей, шамотні плити для барбекю',
  openGraph: {
    title: 'Шамотна плита (шамотка) купити | Вогнетривка плита для каміну | Termokeramika',
    description: 'Вогнетривкі шамотні плити (шамотка) для печей, камінів, барбекю — альтернатива шамотній цеглі. Шамотна плита для каміну, вогнетривка плита для печей. Доставка по Україні. Виробник Termokeramika.',
    url: 'https://termokeramika.com.ua',
    siteName: 'Termokeramika',
    type: 'website',
    locale: 'uk_UA',
    images: [
      {
        url: 'https://termokeramika.com.ua/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Шамотна плита для каміну Termokeramika',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Шамотна плита купити | Вогнетривка плита для каміну | Termokeramika',
    description: 'Вогнетривкі шамотні плити для печей, камінів, барбекю. Шамотна плита для каміну, вогнетривка плита для печей. Доставка по Україні. Виробник Termokeramika.',
    images: ['https://termokeramika.com.ua/images/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
    <html lang="uk">
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID}');
          `}
        </Script>
      </head>
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