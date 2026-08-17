'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { CartDrawerProvider } from '@/components/CartDrawerContext';
import CartDrawer from '@/components/CartDrawer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartDrawerProvider>
        {children}
        <CartDrawer />
      </CartDrawerProvider>
    </Provider>
  );
} 