'use client';

import { useEffect } from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useBrowsingHistory } from '@/hooks/use-browsing-history';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { ProductImageCarousel } from './product-image-carousel';
import { ProductRecommendations } from './product-recommendations';
import { cn } from '@/lib/utils';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addHistory } = useBrowsingHistory();

  useEffect(() => {
    addHistory(product.id);
  }, [product.id, addHistory]);

  const inWishlist = isInWishlist(product.id);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <ProductImageCarousel images={product.images} />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-primary">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < Math.floor(product.rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300'
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              ({product.reviews.length} reviews)
            </p>
          </div>
          <p className="text-3xl md:text-4xl font-bold mt-4">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-foreground/80">{product.description}</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto flex-1 bg-primary hover:bg-primary/90"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => toggleWishlist(product)}
              className="w-full sm:w-auto"
            >
              <Heart
                className={cn(
                  'h-5 w-5',
                  inWishlist && 'fill-destructive text-destructive'
                )}
              />
              <span className='sm:hidden ml-2'>
                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </span>
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-12" />
      <div>
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review.id} className="bg-card p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < review.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <p className="ml-4 font-semibold">{review.author}</p>
                  <p className="ml-auto text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-foreground/80">{review.text}</p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No reviews yet.</p>
          )}
        </div>
      </div>
      <Separator className="my-12" />
      <ProductRecommendations currentProductId={product.id} />
    </div>
  );
}
