'use client';

import { createContext, useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isMounted]);

  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        return prevItems;
      }
      toast({
        title: 'Added to wishlist',
        description: `${product.name} has been added to your wishlist.`,
      });
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    const product = wishlistItems.find(p => p.id === productId);
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
     if (product) {
      toast({
        title: 'Removed from wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };
  
  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    itemCount: wishlistItems.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
