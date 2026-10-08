import { Check } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';

export default function Toast() {
  const { toast } = useShop();
  return <div className={`toast${toast ? ' toast--visible' : ''}`} role="status"><span className="toast-check"><Check size={15} /></span>{toast}</div>;
}
