import Link from 'next/link';
import { Package2, Twitter, Facebook, Instagram } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">ShopSphere</span>
            </Link>
            <p className="text-sm">
              Your one-stop shop for everything you need. Quality products, great prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-primary">All Products</Link></li>
              <li><Link href="/" className="text-sm hover:text-primary">Electronics</Link></li>
              <li><Link href="/" className="text-sm hover:text-primary">Apparel</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 hover:text-primary" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-primary" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ShopSphere. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
