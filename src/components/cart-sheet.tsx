'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';

interface CartSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function CartSheet({ isOpen, onOpenChange }: CartSheetProps) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
    itemCount,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          {cartItems.length > 0 ? (
            <ScrollArea className="h-full px-6">
              <div className="flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className="h-8 w-16"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Button asChild onClick={() => onOpenChange(false)}>
                <Link href="/">Start Shopping</Link>
              </Button>
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <SheetFooter className="px-6 py-4 bg-secondary/50">
            <div className="flex w-full flex-col gap-4">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full bg-accent hover:bg-accent/90">
                <Link href="/checkout" onClick={() => onOpenChange(false)}>
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
