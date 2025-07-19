
'use client';

import { useState, useEffect } from 'react';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let tempProducts = products;

    if (searchTerm) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(tempProducts);
  };

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                 <Link href="#">
                    Learn More
                 </Link>
              </Button>
          </div>
        </div>
      </section>

      <div id="products-section" className="container px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <main>
             <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
                <p className="mt-2 text-muted-foreground">Discover our hand-picked selection of top-rated products.</p>
             </div>
             <form onSubmit={handleSearch} className="mb-12 max-w-2xl mx-auto">
                 <div className="relative">
                    <Input
                      placeholder="Search for products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-12 h-12 text-base"
                    />
                    <Button type="submit" size="icon" className="absolute top-0 right-0 h-full w-12 rounded-l-none bg-primary text-primary-foreground hover:bg-primary/90">
                      <Search className="h-5 w-5" />
                    </Button>
                 </div>
              </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
                <div className="text-center py-10 col-span-full">
                    <p className="text-muted-foreground">No products found matching your criteria.</p>
                </div>
            )}
          </main>
      </div>
    </>
  );
}
