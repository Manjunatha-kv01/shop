
'use client';

import { useWishlist } from '@/hooks/use-wishlist';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <span className="text-lg text-muted-foreground">
          {wishlistItems.length} items
        </span>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-lg flex flex-col items-center">
            <Heart className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add items you love to your wishlist to keep track of them.
          </p>
          <Button asChild>
            <Link href="/">Discover Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
