import { useState } from 'react';
import { Heart, Menu, ShoppingBag, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useShop } from '../context/ShopContext.jsx';
import SearchBar from './SearchBar.jsx';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, wishlist } = useShop();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="site-header">
      <div className="announcement">A little something good: free shipping on orders over $75</div>
      <div className="nav-wrap">
        <Link to="/" className="brand" aria-label="ShopEase home"><span className="brand-mark">s</span> shopease<span className="brand-period">.</span></Link>
        <div className="nav-search"><SearchBar compact /></div>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <NavLink onClick={() => setMenuOpen(false)} to="/">Home</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/products">Shop</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/products?category=Home%20%26%20Living">Home & Living</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/products?category=Accessories">Accessories</NavLink>
        </nav>
        <div className="nav-actions">
          <Link className="icon-link wishlist-nav" to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`}><Heart size={20} /><span className="nav-badge">{wishlist.length}</span></Link>
          <Link className="icon-link cart-nav" to="/cart" aria-label={`Cart, ${cartCount} items`}><ShoppingBag size={20} /><span className="nav-badge">{cartCount}</span></Link>
          <Link className="button button--small button--dark login-link" to="/login">Log in</Link>
          <button className="mobile-menu button-icon" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}
