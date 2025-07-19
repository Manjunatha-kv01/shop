
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
});

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, totalPrice, clearCart } = useCart();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zipCode: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Order placed:', values);
    clearCart();
    router.push('/order/confirmation');
  };

  const shippingCharge = 10.00;
  const gstRate = 0.18; // 18%
  const gstAmount = totalPrice * gstRate;
  const finalTotal = totalPrice + shippingCharge + gstAmount;


  if (cartItems.length === 0) {
    return (
        <div className="container px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-2xl font-semibold">Your cart is empty.</h1>
            <p className="text-muted-foreground mt-2">Add items to your cart before proceeding to checkout.</p>
        </div>
    )
  }


  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                       <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
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
          </Card>
           <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Scan to Pay</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <Image
                    src="https://placehold.co/300x300.png"
                    alt="QR Code for payment"
                    width={300}
                    height={300}
                    data-ai-hint="QR code"
                    className="rounded-lg"
                  />
                   <p className="text-sm text-muted-foreground text-center">Scan the QR code with your payment app to complete the purchase.</p>
                </CardContent>
              </Card>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <div className="flex gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => ( <FormItem className="flex-1"><FormLabel>First Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => ( <FormItem className="flex-1"><FormLabel>Last Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </div>
                  <FormField control={form.control} name="address" render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                   <div className="flex gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => ( <FormItem className="flex-1"><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="zipCode" render={({ field }) => ( <FormItem className="w-1/3"><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">Place Order</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
