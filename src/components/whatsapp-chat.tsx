import Link from 'next/link';
import { Button } from './ui/button';

const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.15 14.5c-.19-.1-.95-.47-1.1-.52s-.26-.08-.37.08-.42.52-.51.62-.18.12-.33.04c-.66-.33-1.37-.73-2.24-1.55-.68-.63-1.11-1.25-1.24-1.46s-.01-.31.07-.4c.08-.08.18-.21.27-.31.09-.1.12-.17.18-.29s.03-.23-.01-.31c-.05-.08-.37-.88-.51-1.21s-.28-.28-.38-.28h-.3c-.1 0-.26.04-.39.16s-.51.5-.63 1.25-.12 1.45.04 2.18c.11.53.63 1.4,1.44 2.22.82.82 1.83 1.4,2.89 1.8,1.13.43 1.8.34 2.4.21.57-.12.95-.49 1.08-.94s.13-.84.09-.94c-.04-.1-.14-.16-.33-.26z" />
    </svg>
  );

export function WhatsappChat() {
    const businessNumber = '1234567890'; // Replace with your business number
    const message = 'Hi! Please provide your details:\n\nName:\nPhone Number:\nEmail ID:';
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
        >
        <WhatsAppIcon />
        <span className="sr-only">Chat on WhatsApp</span>
        </Button>
    </Link>
  );
}
