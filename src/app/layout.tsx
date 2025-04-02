import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata = {
  title: 'Термо Кераміка',
  description: 'Шамотна плита різних розмірів для печей, камінів та промислових потреб.',
  keywords: 'термокераміка, шамотна плита, вогнетривка плита, termokeramika, про нас, каміни, печі, плитка для печей, вогнетривка цегла, цегла, цегла для камінів, цегла для печей, шамотка, шамотная плита, шамотн, ' +
  // Українською
  'вогнетриви, шамотні вироби, плита для каміна, плита для печі, вогнетривкі матеріали, шамотна цегла, термостійка плита, термостійка цегла, виробництво шамотних плит, ' +
  // Російською
  'шамотная плита, огнеупорная плита, термокерамика, камины, печи, плитка для печей, огнеупорный кирпич, кирпич, кирпич для каминов, кирпич для печей, шамот, огнеупоры, шамотные изделия, плита для камина, плита для печи, огнеупорные материалы, шамотный кирпич, термостойкая плита, термостойкий кирпич, производство шамотных плит',    robots: 'index, follow',
alternates: {
  canonical: 'https://termokeramika.com.ua',
},
  other: {
    'google-site-verification': 'kmMGB-5BNlfpfdTOR2e7s3phFoC2bgPtGhyi7Xp72_c',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-grow mb-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}