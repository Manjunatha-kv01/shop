
'use client';

import { useState, useEffect } from 'react';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  return (
    <>
      <section className="bg-secondary text-center py-20 md:py-28">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Curated Collections, Unmatched Quality.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our exclusive selection of electronics, apparel, and more. Designed for the discerning shopper, delivered to your door.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                 <Link href="#products-section">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
              </Button>
               <Button asChild size="lg" variant="outline">
                 <Link href="/about">
                    Learn More
                 </Link>
              </Button>
          </div>
        </div>
      </section>

      <div id="products-section" className="container px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
                <div className="text-center py-10 col-span-full">
                    <p className="text-muted-foreground">No products found.</p>
                </div>
            )}
             <div className="text-center mt-16">
                <p className="text-lg text-muted-foreground">
                    After you have purchased your items, please fill out our form.
                </p>
                <Button asChild className="mt-4">
                    <Link href="/contact">
                        Go to Form
                    </Link>
                </Button>
            </div>
          </main>
      </div>
    </>
  );
}
