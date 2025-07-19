
'use client';

import { useState, useEffect } from 'react';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

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
      <section className="bg-primary/5 text-center py-16 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
            Welcome to ShopSphere
          </h1>
          <p className="mt-4 text-md md:text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover a world of quality products. Your one-stop shop for
            electronics, apparel, and more.
          </p>
        </div>
      </section>

      <div className="container px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <main>
             <form onSubmit={handleSearch} className="mb-8 max-w-md mx-auto">
                 <div className="relative">
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                    <Button type="submit" size="icon" variant="ghost" className="absolute top-0 right-0 h-full">
                      <Search className="h-4 w-4" />
                    </Button>
                 </div>
              </form>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
