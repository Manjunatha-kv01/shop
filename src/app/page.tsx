'use client';

import { useState } from 'react';
import { products, categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number]>([500]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = () => {
    let tempProducts = products;

    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (priceRange) {
      tempProducts = tempProducts.filter(
        (product) => product.price <= priceRange[0]
      );
    }

    if (searchTerm) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(tempProducts);
  };

  const handleCategoryChange = (categoryId: string) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(newSelectedCategories);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange();
  };

  useState(() => {
    handleFilterChange();
  });

  return (
    <>
      <section className="bg-primary/5 text-center py-20">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
            Welcome to ShopSphere
          </h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover a world of quality products. Your one-stop shop for
            electronics, apparel, and more.
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="p-6 rounded-lg shadow-md bg-card">
              <h3 className="text-xl font-semibold mb-6">Filters</h3>
              <form onSubmit={handleSearch} className="mb-6">
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
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => handleCategoryChange(category.name)}
                        />
                        <Label htmlFor={category.id}>{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Price</h4>
                  <Slider
                    defaultValue={[500]}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setPriceRange(value as [number])}
                  />
                  <div className="text-sm text-muted-foreground mt-2">
                    Up to ${priceRange[0]}
                  </div>
                </div>

                <Button onClick={handleFilterChange} className="w-full bg-accent hover:bg-accent/90">Apply Filters</Button>
              </div>
            </div>
          </aside>

          <main className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </>
  );
}
