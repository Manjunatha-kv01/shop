'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProductImageCarouselProps {
  images: string[];
}

export function ProductImageCarousel({ images }: ProductImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-4">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="relative aspect-square flex items-center justify-center p-0">
                  <Image
                    src={src}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint="product image"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      <div className="grid grid-cols-5 gap-2">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'relative aspect-square w-full rounded-md overflow-hidden ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              index + 1 === current ? 'ring-2 ring-primary' : ''
            )}
          >
            <Image
              src={src}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
