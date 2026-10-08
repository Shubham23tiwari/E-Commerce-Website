import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext.jsx';

export default function ProductCard({ product, moveToCartOnAdd = false }) {
  const { addToCart, wishlist, toggleWishlist, moveToCart } = useShop();
  const isSaved = wishlist.some((item) => item.id === product.id);
  const handleAdd = () => moveToCartOnAdd && isSaved ? moveToCart(product) : addToCart(product);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/products/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`wishlist-button${isSaved ? ' is-saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}><Heart size={18} fill={isSaved ? 'currentColor' : 'none'} /></button>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
        <div className="product-rating"><Star size={14} fill="currentColor" /> <span>{product.rating}</span><span className="review-count">({product.reviews})</span></div>
        <div className="product-card-bottom"><div className="product-price">${product.price.toFixed(2)}{product.originalPrice && <del>${product.originalPrice.toFixed(2)}</del>}</div><button className={`add-quick${moveToCartOnAdd && isSaved ? ' add-quick--label' : ''}`} onClick={handleAdd} aria-label={`${moveToCartOnAdd && isSaved ? 'Move' : 'Add'} ${product.name} to cart`}>{moveToCartOnAdd && isSaved ? 'Move to cart' : '+'}</button></div>
      </div>
    </article>
  );
}
