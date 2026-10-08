import { ArrowRight, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  let order = location.state?.order;
  if (!order) {
    try { order = JSON.parse(localStorage.getItem('shopease-last-order') || 'null'); }
    catch (error) { console.error('Unable to read the last order from local storage.', error); }
  }
  if (!order) return <main className="page-container page-content"><div className="empty-state"><span className="eyebrow">NO RECENT ORDER</span><h1>Nothing to see here just yet.</h1><p>When you place an order, its details will show up here.</p><Link to="/products" className="button button--dark">Continue shopping <ArrowRight size={17} /></Link></div></main>;
  return <main className="page-container page-content"><section className="success-card"><span className="success-check"><Check size={32} /></span><span className="eyebrow">THAT'S A WRAP</span><h1>Your good things are on their way<span className="brand-period">.</span></h1><p>Thank you{order.customer ? `, ${order.customer}` : ''}! We’re so glad you found something to love.</p><div className="order-id"><span>YOUR ORDER NUMBER</span><strong>{order.id}</strong></div><div className="success-items"><div className="success-items-head"><strong>Order summary</strong><span>{order.payment}</span></div>{order.items.map((item) => <div className="success-item" key={item.id}><img src={item.image} alt="" /><span>{item.name} <small>× {item.quantity}</small></span><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>)}  {Number.isFinite(order.total) && <div className="success-total"><span>Total</span><strong>${order.total.toFixed(2)}</strong></div>}</div><Link to="/products" className="button button--dark">Continue shopping <ArrowRight size={17} /></Link></section></main>;
}
