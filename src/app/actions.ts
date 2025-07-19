'use server';

import {
  recommendProducts,
  type RecommendProductsInput,
} from '@/ai/flows/product-recommendations';
import { products } from '@/lib/data';

export async function getRecommendedProducts(input: RecommendProductsInput) {
  try {
    const { recommendedProductIds } = await recommendProducts(input);
    // Filter out the current product and already viewed products from recommendations
    const filteredIds = recommendedProductIds.filter(id => id !== input.currentProductId && !input.browsingHistory.includes(id));
    
    const recommendedProducts = products.filter((p) =>
      filteredIds.includes(p.id)
    );
    return recommendedProducts;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
}
