import type { Metadata } from 'next';
import products from '@/data/products.json';

const SITE_URL = 'https://termokeramika.com.ua';

interface Product {
  id: number;
  dimensions: string;
  label: string;
  weight: string;
  priceInEuro: string;
  image?: string;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id)) as Product | undefined;

  if (!product) {
    return {
      title: 'Товар не знайдено | Термокераміка',
      robots: { index: false, follow: true },
    };
  }

  const title = `Шамотна плита ${product.dimensions} (${product.label}) купити | Ціна від виробника | Термокераміка`;
  const description = `Шамотна плита ${product.dimensions} мм, маркування ${product.label}, вага ${product.weight}. Вогнетривка шамотка — сучасна альтернатива шамотній цеглі для футерування каміну, печі, барбекю та мангалу. Доставка Новою Поштою по всій Україні.`;
  const url = `${SITE_URL}/products/${product.id}`;
  const image = `${SITE_URL}${product.image || '/images/fireproof-plate.webp'}`;

  return {
    title,
    description,
    keywords: `шамотна плита ${product.dimensions}, шамотка ${product.dimensions}, шамотна плита ${product.label}, шамотна плита купити, шамотна плита ціна, шамотна цегла, цегла для каміну купити, вогнетривка плита ${product.dimensions}, вогнетривка цегла`,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Термокераміка',
      type: 'website',
      locale: 'uk_UA',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id)) as Product | undefined;

  if (!product) {
    return children;
  }

  const priceInUAH = Math.round(parseFloat(product.priceInEuro.replace(' €', '')) * 46);
  const url = `${SITE_URL}/products/${product.id}`;
  const image = `${SITE_URL}${product.image || '/images/fireproof-plate.webp'}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Шамотна плита ${product.dimensions} (${product.label})`,
    description: `Шамотна плита ${product.dimensions} мм, маркування ${product.label}, вага ${product.weight}. Вогнетривкий матеріал для футерування печей, камінів, барбекю.`,
    sku: `${product.label}-${product.dimensions}`,
    image,
    brand: { '@type': 'Brand', name: 'Термокераміка' },
    manufacturer: { '@type': 'Organization', name: 'Термокераміка' },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'UAH',
      price: priceInUAH,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Термокераміка' },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Шамотні плити', item: `${SITE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: `${product.dimensions} (${product.label})`, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
