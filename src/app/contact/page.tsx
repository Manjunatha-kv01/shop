
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  deliveryLocation: z.string().min(5, 'Please enter a valid delivery location.'),
  pincode: z.string().min(5, 'Please enter a valid pincode.'),
  numberOfItems: z.coerce.number().min(1, 'Number of items must be at least 1.'),
  itemsCode: z.string().min(1, 'Item codes are required.'),
  itemsCost: z.coerce.number().min(0, 'Item cost cannot be negative.'),
  paymentReceipt: z.any().refine((file) => file?.length == 1, 'Payment receipt is required.'),
});

// Placeholder server action
async function handleSubmit(data: FormData) {
    console.log('Form submitted. Data:');
    for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
    }
    // In a real application, you would process this data,
    // handle the file upload, and send it to your backend service (e.g., Google Forms).
    return { success: true, message: 'Form submitted successfully!' };
}


export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      deliveryLocation: '',
      pincode: '',
      numberOfItems: 1,
      itemsCode: '',
      itemsCost: 0,
      paymentReceipt: undefined,
    },
  });

  const fileRef = form.register('paymentReceipt');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'paymentReceipt') {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });

    const result = await handleSubmit(formData);
    
    if (result.success) {
      toast({
        title: 'Form Submitted!',
        description: 'Thank you for your submission. We will get back to you shortly.',
      });
      form.reset();
    } else {
       toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'Please try again later.',
      });
    }
  };

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Mail className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-3xl font-bold mt-4">Contact Us</CardTitle>
            <CardDescription>
              Please fill out the form below and we will get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="phoneNumber" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                 <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="deliveryLocation" render={({ field }) => (<FormItem><FormLabel>Delivery Location</FormLabel><FormControl><Textarea placeholder="123 Main St, Anytown..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                 <div className="grid sm:grid-cols-2 gap-6">
                    <FormField control={form.control} name="pincode" render={({ field }) => (<FormItem><FormLabel>Pincode</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="numberOfItems" render={({ field }) => (<FormItem><FormLabel>Number of Items</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    <FormField control={form.control} name="itemsCode" render={({ field }) => (<FormItem><FormLabel>Item Codes</FormLabel><FormControl><Input placeholder="PROD_1, PROD_2" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="itemsCost" render={({ field }) => (<FormItem><FormLabel>Total Cost ($)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                 <FormField control={form.control} name="paymentReceipt" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Receipt</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*,.pdf" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" className="w-full" size="lg">Submit Form</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
