import products from '@/data/products.json';

export type Product = (typeof products)[number];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/х/g, 'x') // кирилична "х" -> латинська "x"
    .replace(/\s+/g, '');
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return products;

  return products.filter((product) => {
    const haystack = normalize(`${product.dimensions} ${product.label} ${product.weight}`);
    return haystack.includes(normalizedQuery);
  });
}
