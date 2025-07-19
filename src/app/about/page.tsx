
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';

const coFounders = [
  {
    name: 'Alex Doe',
    photo: 'https://placehold.co/400x400.png',
    phone: '+1 (123) 456-7890',
    email: 'alex.doe@shopsphere.com',
    instagram: 'alexdoe',
    facebook: 'alex.doe',
  },
  {
    name: 'Jane Smith',
    photo: 'https://placehold.co/400x400.png',
    phone: '+1 (098) 765-4321',
    email: 'jane.smith@shopsphere.com',
    instagram: 'janesmith',
    facebook: 'jane.smith',
  },
];

export default function AboutUsPage() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight">About ShopSphere</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Founded on the principle of bringing quality products to our customers, ShopSphere is led by a team of passionate innovators. Meet the minds behind the mission.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {coFounders.map((founder) => (
          <Card key={founder.name} className="text-center">
            <CardHeader className="p-0">
              <div className="relative aspect-square w-full">
                <Image
                  src={founder.photo}
                  alt={`Photo of ${founder.name}`}
                  fill
                  className="object-cover rounded-t-lg"
                  data-ai-hint="portrait person"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl">{founder.name}</CardTitle>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{founder.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                   <Link href={`mailto:${founder.email}`} className="hover:text-primary">
                    {founder.email}
                   </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 pb-6">
               <Link href={`https://instagram.com/${founder.instagram}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href={`https://facebook.com/${founder.facebook}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
