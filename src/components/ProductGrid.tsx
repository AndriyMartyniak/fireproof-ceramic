import ProductCard from './ProductCard';
import products from '../data/products.json';

interface ProductGridProps {
  title?: string;
  limit?: number;
  filter?: string | null;
}

export default function ProductGrid({ title, limit, filter }: ProductGridProps) {
  let displayedProducts = limit ? products.slice(0, limit) : products;

  if (filter) {
    displayedProducts = displayedProducts.filter((product) => product.label.startsWith(filter));
  }

  return (
    <section className="py-12">
      {title && <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {displayedProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}