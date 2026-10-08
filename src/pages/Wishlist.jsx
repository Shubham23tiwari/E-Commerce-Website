import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useShop } from '../context/ShopContext.jsx';

export default function Wishlist() {
  const { wishlist } = useShop();
  return <main className="page-container page-content"><div className="page-title-row"><div><span className="eyebrow">SAVED FOR LATER</span><h1>Your little wish list<span className="brand-period">.</span></h1><p>All the good things you have your eye on.</p></div></div>{wishlist.length ? <div className="product-grid">{wishlist.map((product) => <ProductCard key={product.id} product={product} moveToCartOnAdd />)}</div> : <div className="empty-state"><span className="empty-state-icon"><Heart size={27} /></span><span className="eyebrow">A LITTLE SPACE FOR SOMETHING GOOD</span><h2>Your wishlist is waiting.</h2><p>Tap the heart on anything you love and it will be right here.</p><Link to="/products" className="button button--dark">Explore the shop <ArrowRight size={17} /></Link></div>}</main>;
}
