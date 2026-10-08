import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ compact = false, initialValue = '' }) {
  const navigate = useNavigate();
  const submitSearch = (event) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get('query')?.toString().trim();
    navigate(`/products${query ? `?search=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <form className={`search-bar${compact ? ' search-bar--compact' : ''}`} onSubmit={submitSearch} role="search">
      <Search size={18} aria-hidden="true" />
      <input aria-label="Search products" name="query" defaultValue={initialValue} placeholder="Search for anything..." />
      <button type="submit" aria-label="Submit search">Search</button>
    </form>
  );
}
