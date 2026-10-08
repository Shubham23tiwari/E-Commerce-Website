import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, setQuantity, removeFromCart }) {
  return (
    <article className="cart-item">
      <Link to={`/products/${item.id}`} className="cart-item-image"><img src={item.image} alt={item.name} /></Link>
      <div className="cart-item-details"><span className="product-category">{item.category}</span><Link to={`/products/${item.id}`} className="cart-item-name">{item.name}</Link><span className="cart-item-price">${item.price.toFixed(2)}</span></div>
      <div className="quantity-control" aria-label={`Quantity for ${item.name}`}><button aria-label="Decrease quantity" onClick={() => item.quantity > 1 ? setQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}><Minus size={14} /></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button></div>
      <strong className="cart-line-total">${(item.price * item.quantity).toFixed(2)}</strong>
      <button className="remove-item button-icon" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button>
    </article>
  );
}
