import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, emptyMessage = 'Try changing your search or filters.' }) {
  if (!products.length) return <div className="empty-state"><span className="empty-state-icon">⌕</span><h2>No products found</h2><p>{emptyMessage}</p></div>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
