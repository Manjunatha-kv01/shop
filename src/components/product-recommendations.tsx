'use client';

import { useEffect, useState } from 'react';
import { useBrowsingHistory } from '@/hooks/use-browsing-history';
import { getRecommendedProducts } from '@/app/actions';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import { Skeleton } from './ui/skeleton';

interface ProductRecommendationsProps {
  currentProductId: string;
}

export function ProductRecommendations({
  currentProductId,
}: ProductRecommendationsProps) {
  const { history } = useBrowsingHistory();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (history.length > 0) {
        setIsLoading(true);
        const recommendedProducts = await getRecommendedProducts({
          browsingHistory: history,
          currentProductId: currentProductId,
        });
        setRecommendations(recommendedProducts);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [history, currentProductId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No recommendations available right now.</p>
      )}
    </div>
  );
}
