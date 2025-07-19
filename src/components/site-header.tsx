
'use client';

import Link from 'next/link';
import { Package2, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';

export function SiteHeader() {
  const { itemCount: cartItemCount } = useCart();
  const { itemCount: wishlistItemCount } = useWishlist();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">ShopSphere</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" aria-label="Wishlist">
                  <div className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlistItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                        {wishlistItemCount}
                      </span>
                    )}
                  </div>
                </Button>
              </Link>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open cart"
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
