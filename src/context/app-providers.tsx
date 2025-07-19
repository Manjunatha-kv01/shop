'use client';

import { CartProvider } from './cart-provider';
import { WishlistProvider } from './wishlist-provider';
import { BrowsingHistoryProvider } from './browsing-history-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowsingHistoryProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </BrowsingHistoryProvider>
  );
}
