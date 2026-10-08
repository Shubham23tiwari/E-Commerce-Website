import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import { categories, products } from '../data/products.js';
import SearchBar from '../components/SearchBar.jsx';

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState('featured');
  const search = params.get('search') || '';
  const category = params.get('category') || 'All';
  const filtered = useMemo(() => {
    const result = products.filter((product) => (
      (category === 'All' || product.category === category)
      && `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search.toLowerCase())
    ));
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [category, search, sort]);

  return (
    <main className="page-container page-content">
      <div className="page-title-row"><div><span className="eyebrow">THE SHOP</span><h1>Good things, gathered<span className="brand-period">.</span></h1><p>Thoughtful finds for every corner of your everyday.</p></div><div className="catalog-search"><SearchBar compact initialValue={search} /></div></div>
      <div className="catalog-layout">
        <aside className="filter-panel"><h2>Categories</h2><div className="category-filters">{categories.map((item) => <button key={item} className={category === item ? 'filter-active' : ''} onClick={() => setParams((current) => { const next = new URLSearchParams(current); if (item === 'All') next.delete('category'); else next.set('category', item); return next; })}>{item}<span>{item === 'All' ? products.length : products.filter((product) => product.category === item).length}</span></button>)}</div><div className="filter-note"><span>✳</span><p>Every item is picked with care, made to be loved, and ready for your everyday.</p></div></aside>
        <section className="catalog-results"><div className="results-toolbar"><span>{filtered.length} lovely finds{search ? ` for “${search}”` : ''}</span><label>Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div><ProductGrid products={filtered} emptyMessage="Try another search term or category." /></section>
      </div>
    </main>
  );
}
