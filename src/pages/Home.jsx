import { ArrowDownRight, ArrowRight, ArrowUpRight, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import { products } from '../data/products.js';

const categories = [
  { name: 'Home & Living', note: 'Make room for good things', image: products[1].image, query: 'Home & Living' },
  { name: 'Accessories', note: 'The little things that matter', image: products[0].image, query: 'Accessories' },
  { name: 'Tech', note: 'Smart picks, simply done', image: products[2].image, query: 'Tech' },
];

export default function Home() {
  return (
    <>
      <main>
        <section className="hero page-container">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> THE EVERYDAY EDIT</span>
            <h1>Good things,<br />for <em>every</em> day.</h1>
            <p>Thoughtful finds for the way you live. Meet your new everyday favorites, picked with a little extra care.</p>
            <div className="hero-actions"><Link to="/products" className="button button--dark">Shop the collection <ArrowRight size={17} /></Link><span className="hero-note"><Truck size={17} /> Free shipping over $75</span></div>
            <div className="hero-count"><span className="hero-count-line" /> A considered collection of 8 good things</div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90" alt="A curated selection of everyday essentials" />
            <div className="hero-sticker"><span>made for</span><strong>your<br />everyday</strong><ArrowDownRight size={21} /></div>
            <div className="hero-image-caption"><span>THE WEEKEND EDIT</span><span>01 / 04</span></div>
          </div>
        </section>
        <section className="trust-strip"><div className="page-container trust-items"><span>✳ Thoughtfully selected</span><span>✳ Small details, big difference</span><span>✳ Happy delivery, always</span></div></section>
        <section className="section page-container">
          <div className="section-heading"><div><span className="eyebrow">A FEW GOOD THINGS</span><h2>Popular right now<span className="brand-period">.</span></h2></div><Link to="/products" className="text-link">Shop all products <ArrowUpRight size={17} /></Link></div>
          <ProductGrid products={products.slice(0, 4)} />
        </section>
        <section className="category-section">
          <div className="page-container">
            <div className="section-heading"><div><span className="eyebrow">FIND YOUR THING</span><h2>A little bit of everything<span className="brand-period">.</span></h2></div><p className="section-intro">Thoughtful pieces to make your everyday feel a little more you.</p></div>
            <div className="category-grid">{categories.map((category, index) => <Link to={`/products?category=${encodeURIComponent(category.query)}`} className={`category-card category-card--${index + 1}`} key={category.name}><img src={category.image} alt="" loading="lazy" /><span className="category-overlay" /><span className="category-copy"><span>{category.note}</span><strong>{category.name}</strong></span><span className="category-arrow"><ArrowUpRight size={19} /></span></Link>)}</div>
          </div>
        </section>
        <section className="section page-container">
          <div className="section-heading"><div><span className="eyebrow">THE CROWD-PLEASERS</span><h2>Good things, loved<span className="brand-period">.</span></h2></div><Link to="/products" className="text-link">Explore all <ArrowUpRight size={17} /></Link></div>
          <ProductGrid products={[...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4)} />
        </section>
        <section className="promo-banner page-container"><div className="promo-content"><span className="eyebrow">A LITTLE THANK YOU</span><h2>Good finds.<br /><em>Better</em> delivery.</h2><p>Enjoy complimentary shipping on orders over $75. Because the good stuff should come to you.</p><Link to="/products" className="button button--light">Find your favorites <ArrowRight size={17} /></Link></div><div className="promo-image"><img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1100&q=85" alt="A beautifully wrapped ShopEase package" loading="lazy" /><span>GOOD THINGS INSIDE</span></div></section>
      </main>
    </>
  );
}
