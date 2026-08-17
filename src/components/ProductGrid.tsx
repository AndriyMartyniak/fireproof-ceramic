import ProductCard from './ProductCard';
import allProducts from '../data/products.json';

interface ProductGridProps {
  title?: string;
  limit?: number;
  products?: typeof allProducts;
}

export default function ProductGrid({ title, limit, products }: ProductGridProps) {
  const sourceProducts = products ?? allProducts;
  const displayedProducts = limit ? sourceProducts.slice(0, limit) : sourceProducts;

  return (
    <section className="py-12">
      {title && <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10">{title}</h2>}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">Товарів за вашим запитом не знайдено.</p>
      )}
    </section>
  );
}