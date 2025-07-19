'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-square w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="product image"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <CardTitle className="text-lg mt-1 leading-tight">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </CardTitle>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("h-4 w-4", i < Math.floor(product.rating) ? "fill-current" : "fill-muted stroke-muted-foreground")} />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleWishlist(product)}
            aria-label="Add to wishlist"
          >
            <Heart className={cn("h-5 w-5", inWishlist && "fill-destructive text-destructive")} />
          </Button>
          <Button onClick={() => addToCart(product)} aria-label="Add to cart" className='bg-primary hover:bg-primary/90'>
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
