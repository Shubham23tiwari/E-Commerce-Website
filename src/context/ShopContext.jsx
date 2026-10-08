import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ShopContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error);
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('shopease-cart', []));
  const [wishlist, setWishlist] = useState(() => readStorage('shopease-wishlist', []));
  const [toast, setToast] = useState('');

  useEffect(() => {
    localStorage.setItem('shopease-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopease-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const notify = useCallback((message) => {
    setToast(message);
    window.clearTimeout(notify.timeout);
    notify.timeout = window.setTimeout(() => setToast(''), 2600);
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((items) => {
      const current = items.find((item) => item.id === product.id);
      return current
        ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...items, { ...product, quantity }];
    });
    notify('Added to your cart');
  }, [notify]);

  const setQuantity = useCallback((id, quantity) => {
    setCart((items) => items
      .map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((items) => items.filter((item) => item.id !== id));
    notify('Removed from your cart');
  }, [notify]);

  const toggleWishlist = useCallback((product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    setWishlist((items) => exists
      ? items.filter((item) => item.id !== product.id)
      : [...items, product]);
    notify(exists ? 'Removed from your wishlist' : 'Saved to your wishlist');
  }, [wishlist, notify]);

  const moveToCart = useCallback((product) => {
    setCart((items) => {
      const current = items.find((item) => item.id === product.id);
      return current
        ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { ...product, quantity: 1 }];
    });
    setWishlist((items) => items.filter((item) => item.id !== product.id));
    notify('Moved to your cart');
  }, [notify]);

  const value = useMemo(() => ({
    cart, wishlist, toast, addToCart, setQuantity, removeFromCart, toggleWishlist, moveToCart,
    clearCart: () => setCart([]),
  }), [cart, wishlist, toast, addToCart, setQuantity, removeFromCart, toggleWishlist, moveToCart]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider');
  return context;
}
