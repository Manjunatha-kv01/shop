
'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

  const shippingCharge = 10.00;
  const gstRate = 0.18;
  const gstAmount = totalPrice * gstRate;
  const finalTotal = totalPrice + shippingCharge + gstAmount;

  if (itemCount === 0) {
    return (
      <div className="container px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="flex flex-col items-center">
          <ShoppingCart className="h-24 w-24 text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] hidden md:table-cell">Product</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden md:table-cell">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden">
                           <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                        </div>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-4 md:hidden">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                            </div>
                         </div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="h-9 w-20 mx-auto"
                        />
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="border-t pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <p>Subtotal</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <p>GST (18%)</p>
                  <p>${gstAmount.toFixed(2)}</p>
                </div>
                 <div className="flex justify-between text-muted-foreground">
                  <p>Shipping Charge</p>
                  <p>${shippingCharge.toFixed(2)}</p>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>${finalTotal.toFixed(2)}</p>
                </div>
               </div>
            </CardContent>
            <CardFooter>
               <Button asChild className="w-full" size="lg">
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
