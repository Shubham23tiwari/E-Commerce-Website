import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';
import { ShopProvider } from './context/ShopContext.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import { Login, Register } from './pages/Auth.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Storefront() {
  return <><ScrollToTop /><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/products" element={<Products />} /><Route path="/products/:productId" element={<ProductDetails />} /><Route path="/cart" element={<Cart />} /><Route path="/wishlist" element={<Wishlist />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/checkout" element={<Checkout />} /><Route path="/order-success" element={<OrderSuccess />} /><Route path="*" element={<main className="page-container page-content"><div className="empty-state"><span className="eyebrow">NOT QUITE THERE</span><h1>This page wandered off.</h1><p>Let's get you back to the good stuff.</p><a className="button button--dark" href="/">Go home</a></div></main>} /></Routes><Footer /><Toast /></>;
}

export default function App() {
  return <ShopProvider><Storefront /></ShopProvider>;
}
