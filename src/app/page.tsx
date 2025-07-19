
'use client';

import { products, categories } from '@/lib/data';
import type { Product, Category } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function HomePage() {
  const getProductsByCategory = (categoryId: string): Product[] => {
    return products.filter(
      (product) => product.category.toLowerCase() === categoryId.toLowerCase()
    );
  };

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
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <div id="products-section" className="container px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <main className="space-y-12">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.name);
            if (categoryProducts.length === 0) return null;

            return (
              <section key={category.id}>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">{category.name}</h2>
                <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {categoryProducts.map((product) => (
                      <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <ProductCard product={product} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-0 -translate-x-1/2" />
                  <CarouselNext className="absolute right-0 translate-x-1/2" />
                </Carousel>
              </section>
            );
          })}

          <div className="text-center mt-16 pt-8 border-t">
            <p className="text-lg text-muted-foreground">
              After you have purchased your items, please fill out our form.
            </p>
            <Button asChild className="mt-4">
              <Link href="/contact">Go to Form</Link>
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}
