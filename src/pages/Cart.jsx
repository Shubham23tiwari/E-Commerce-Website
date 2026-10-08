import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem.jsx';
import { useShop } from '../context/ShopContext.jsx';

export function getOrderTotals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal >= 100 ? subtotal * 0.1 : 0;
  const delivery = subtotal === 0 || subtotal >= 75 ? 0 : 7.99;
  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

export function OrderTotals({ cart, checkout = false }) {
  const { subtotal, discount, delivery, total } = getOrderTotals(cart);
  return <div className="order-totals"><div><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>{discount > 0 && <div className="discount-line"><span>Good things discount (10%)</span><span>−${discount.toFixed(2)}</span></div>}<div><span>Delivery</span><span>{delivery === 0 ? 'Complimentary' : `$${delivery.toFixed(2)}`}</span></div><div className="total-line"><strong>Total</strong><strong>${total.toFixed(2)}</strong></div>{!checkout && subtotal > 0 && subtotal < 75 && <p className="shipping-hint">You're ${(75 - subtotal).toFixed(2)} away from complimentary delivery.</p>}</div>;
}

export default function Cart() {
  const { cart, setQuantity, removeFromCart } = useShop();
  if (!cart.length) return <main className="page-container page-content"><div className="empty-state"><span className="empty-state-icon"><ShoppingBag size={29} /></span><span className="eyebrow">NOTHING IN HERE (YET)</span><h1>Your bag is taking a breather.</h1><p>Find something thoughtful to bring into your everyday.</p><Link to="/products" className="button button--dark">Explore the shop <ArrowRight size={17} /></Link></div></main>;
  return <main className="page-container page-content"><div className="page-title-row cart-title"><div><span className="eyebrow">YOUR PICKS</span><h1>Your shopping bag<span className="brand-period">.</span></h1><p>{cart.reduce((sum, item) => sum + item.quantity, 0)} good thing(s), getting ready to go.</p></div><Link to="/products" className="text-link">Keep browsing <ArrowRight size={16} /></Link></div><div className="cart-layout"><section className="cart-items"><div className="cart-items-head"><span>Your items</span><span>Quantity</span><span>Total</span></div>{cart.map((item) => <CartItem key={item.id} item={item} setQuantity={setQuantity} removeFromCart={removeFromCart} />)}</section><aside className="summary-card"><h2>Order summary</h2><OrderTotals cart={cart} /><Link to="/checkout" className="button button--dark checkout-button">Continue to checkout <ArrowRight size={17} /></Link><p className="secure-note">Taxes calculated at checkout.</p></aside></div></main>;
}
