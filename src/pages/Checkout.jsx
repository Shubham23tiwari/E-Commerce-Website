import { ArrowLeft, ArrowRight, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getOrderTotals, OrderTotals } from './Cart.jsx';
import { useShop } from '../context/ShopContext.jsx';

export default function Checkout() {
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();
  if (!cart.length) return <main className="page-container page-content"><div className="empty-state"><span className="eyebrow">NOTHING TO CHECK OUT</span><h1>Your bag is empty.</h1><p>Pick out a few thoughtful things first.</p><Link to="/products" className="button button--dark">Explore the shop</Link></div></main>;

  const placeOrder = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const orderId = `SE-${Date.now().toString().slice(-8)}`;
    const order = { id: orderId, items: cart, total: getOrderTotals(cart).total, customer: new FormData(form).get('name'), payment: new FormData(form).get('payment') };
    localStorage.setItem('shopease-last-order', JSON.stringify(order));
    clearCart();
    navigate('/order-success', { state: { order } });
  };

  return <main className="page-container page-content"><Link to="/cart" className="back-link"><ArrowLeft size={16} /> Back to your bag</Link><div className="page-title-row checkout-title"><div><span className="eyebrow">ALMOST YOURS</span><h1>Let's get it to you<span className="brand-period">.</span></h1><p>Just a few details, then these good things are on their way.</p></div></div><div className="checkout-layout"><form className="checkout-form" onSubmit={placeOrder}><section className="form-section"><div className="form-section-heading"><span>01</span><div><h2>Your details</h2><p>Where should we send your order?</p></div></div><div className="form-grid"><label className="form-field form-field--full">Full name<input name="name" required autoComplete="name" placeholder="Your full name" /></label><label className="form-field">Email address<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label><label className="form-field">Phone number<input name="phone" type="tel" required pattern="[+0-9() .-]{7,20}" title="Enter a valid phone number" autoComplete="tel" placeholder="+1 (555) 000-0000" /></label><label className="form-field form-field--full">Street address<input name="address" required autoComplete="street-address" placeholder="House number and street" /></label><label className="form-field">City<input name="city" required autoComplete="address-level2" placeholder="City" /></label><label className="form-field">State / region<input name="state" required autoComplete="address-level1" placeholder="State" /></label><label className="form-field">ZIP / PIN code<input name="postal" required pattern="[A-Za-z0-9 -]{4,10}" title="Enter a valid ZIP or PIN code" autoComplete="postal-code" placeholder="ZIP or PIN code" /></label></div></section><section className="form-section payment-section"><div className="form-section-heading"><span>02</span><div><h2>Payment method</h2><p>All mock payment options are processed securely for this demo.</p></div></div><div className="payment-options"><label className="payment-option"><input type="radio" name="payment" value="Cash on Delivery" defaultChecked /><Wallet size={19} /><span>Cash on Delivery</span></label><label className="payment-option"><input type="radio" name="payment" value="UPI" /><Smartphone size={19} /><span>UPI</span></label><label className="payment-option"><input type="radio" name="payment" value="Card" /><CreditCard size={19} /><span>Card</span></label></div></section><button className="button button--dark checkout-place" type="submit">Place your order <ArrowRight size={17} /></button><p className="secure-note">This demo does not collect or process payment details.</p></form><aside className="summary-card checkout-summary"><h2>Your good things</h2><div className="checkout-order-items">{cart.map((item) => <div className="checkout-order-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>Qty {item.quantity}</span></div><span>${(item.price * item.quantity).toFixed(2)}</span></div>)}</div><OrderTotals cart={cart} checkout /></aside></div></main>;
}
