import { ArrowUpRight, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-container">
        <div className="footer-brand">
          <Link to="/" className="brand"><span className="brand-mark">s</span> shopease<span className="brand-period">.</span></Link>
          <p>Good things for your everyday.<br />Thoughtfully picked, happily delivered.</p>
          <div className="social-links"><a href="https://instagram.com" aria-label="Instagram"><Instagram size={18} /></a><a href="https://twitter.com" aria-label="Twitter"><Twitter size={18} /></a></div>
        </div>
        <div className="footer-column"><h3>Explore</h3><Link to="/products">All products</Link><Link to="/products?category=Home%20%26%20Living">Home & Living</Link><Link to="/products?category=Accessories">Accessories</Link></div>
        <div className="footer-column"><h3>Help</h3><Link to="/login">Your account</Link><Link to="/cart">Shipping & returns</Link><Link to="/wishlist">Your wishlist</Link></div>
        <div className="newsletter"><h3>A note from us</h3><p>Good finds, new arrivals, and a little inspiration — every now and then.</p><Link to="/products" className="text-link">Find your next favorite <ArrowUpRight size={16} /></Link></div>
      </div>
      <div className="footer-bottom page-container"><span>© 2025 ShopEase. Made for the everyday.</span><span>Thoughtful finds. Feel-good shopping.</span></div>
    </footer>
  );
}
