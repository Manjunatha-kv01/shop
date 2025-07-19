
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-lg">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-muted-foreground mb-8">
          Your order has been placed successfully. A confirmation email has been
          sent to you with the order details.
        </p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
