import { useState } from 'react';
import { ArrowLeft, Check, Heart, Minus, Plus, Star } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { products } from '../data/products.js';
import { useShop } from '../context/ShopContext.jsx';
import ProductGrid from '../components/ProductGrid.jsx';

export default function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const navigate = useNavigate();
  if (!product) return <main className="page-container page-content"><div className="empty-state"><h2>We couldn't find that good thing.</h2><Link to="/products" className="button button--dark">Back to the shop</Link></div></main>;
  const saved = wishlist.some((item) => item.id === product.id);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  const buyNow = () => { addToCart(product, quantity); navigate('/checkout'); };

  return (
    <main className="page-container page-content">
      <Link to="/products" className="back-link"><ArrowLeft size={16} /> Back to the shop</Link>
      <div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.name} /></div><div className="detail-copy"><span className="eyebrow">{product.category.toUpperCase()}</span><h1>{product.name}</h1><div className="detail-rating"><Star size={17} fill="currentColor" /><strong>{product.rating}</strong><span>({product.reviews} thoughtful reviews)</span></div><div className="detail-price">${product.price.toFixed(2)}{product.originalPrice && <del>${product.originalPrice.toFixed(2)}</del>}</div><p className="detail-description">{product.description}</p><div className="detail-perks"><span><Check size={15} /> Thoughtfully selected</span><span><Check size={15} /> Free shipping over $75</span></div><div className="detail-buy-row"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div><button className="button button--dark detail-add" onClick={() => addToCart(product, quantity)}>Add to cart — ${(product.price * quantity).toFixed(2)}</button><button className={`detail-heart${saved ? ' is-saved' : ''}`} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => toggleWishlist(product)}><Heart size={20} fill={saved ? 'currentColor' : 'none'} /></button></div><button className="button button--outline buy-now" onClick={buyNow}>Buy it now</button><p className="secure-note">A good choice, backed by secure checkout.</p></div></div>
      {related.length > 0 && <section className="section detail-related"><div className="section-heading"><div><span className="eyebrow">MORE TO LOVE</span><h2>Keep looking around<span className="brand-period">.</span></h2></div></div><ProductGrid products={related} /></section>}
    </main>
  );
}
