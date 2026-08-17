import { configureStore, Middleware } from '@reduxjs/toolkit';
import cartReducer, { CartItem } from './cartSlice';

// Middleware для збереження корзини в localStorage
const localStorageMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);
  if (typeof window !== 'undefined' && action.type?.startsWith('cart/')) {
    const cartItems = store.getState().cart.items;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
  return result;
};

// Завантаження початкового стану з localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];

  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) return [];
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return [];
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: {
      items: loadCartFromStorage(),
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 