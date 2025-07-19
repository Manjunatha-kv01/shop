import type { Product, Category } from './types';

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'apparel', name: 'Apparel' },
];

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Wireless Noise-Cancelling Headphones',
    description:
      'Immerse yourself in sound with these premium wireless headphones. Featuring industry-leading noise cancellation, 30-hour battery life, and crystal-clear audio quality for music and calls.',
    price: 349.99,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'Electronics',
    rating: 4.8,
    reviews: [
      { id: 'rev_1', author: 'Alex Johnson', rating: 5, text: 'Best headphones I have ever owned. The noise cancellation is magical!', date: '2023-10-15' },
      { id: 'rev_2', author: 'Maria Garcia', rating: 4, text: 'Great sound quality and very comfortable, but a bit pricey.', date: '2023-10-12' },
    ],
  },
  {
    id: 'prod_2',
    name: 'Smartwatch with GPS',
    description:
      'Stay connected and track your fitness goals with this sleek smartwatch. It offers GPS tracking, heart rate monitoring, smartphone notifications, and a vibrant, customizable display.',
    price: 249.50,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'Electronics',
    rating: 4.6,
    reviews: [
      { id: 'rev_3', author: 'David Smith', rating: 5, text: 'Excellent for running and daily wear. The battery life is impressive.', date: '2023-09-28' },
    ],
  },
  {
    id: 'prod_3',
    name: 'Men\'s Classic Cotton T-Shirt',
    description:
      'A wardrobe essential, this classic t-shirt is made from 100% premium, soft-touch cotton. Its timeless design offers both comfort and style for everyday wear.',
    price: 29.99,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'Apparel',
    rating: 4.5,
    reviews: [
      { id: 'rev_4', author: 'John Doe', rating: 5, text: 'Super soft and fits perfectly. I bought one in every color!', date: '2023-11-01' },
      { id: 'rev_5', author: 'Jane Roe', rating: 4, text: 'Good quality, but it shrunk a little after the first wash.', date: '2023-10-25' },
    ],
  },
  {
    id: 'prod_4',
    name: 'Women\'s High-Waisted Jeans',
    description:
      'Flattering and comfortable, these high-waisted jeans are crafted from stretch-denim for a perfect fit. A versatile piece that can be dressed up or down.',
    price: 89.00,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'Apparel',
    rating: 4.7,
    reviews: [
        { id: 'rev_6', author: 'Emily White', rating: 5, text: 'These are my new favorite jeans. They are so comfortable and look great!', date: '2023-10-20' },
    ],
  },
  {
    id: 'prod_5',
    name: '4K Ultra HD Smart TV',
    description:
      'Experience breathtaking clarity and vibrant colors with this 55-inch 4K Smart TV. Access all your favorite streaming apps directly from the intuitive home screen.',
    price: 499.99,
    images: ['https://placehold.co/600x600'],
    category: 'Electronics',
    rating: 4.9,
    reviews: [
        { id: 'rev_7', author: 'Michael Brown', rating: 5, text: 'Amazing picture quality for the price. The smart features are very responsive.', date: '2023-09-10' },
    ],
  },
  {
    id: 'prod_6',
    name: 'Portable Bluetooth Speaker',
    description:
      'Take your music anywhere with this compact and powerful Bluetooth speaker. It\'s waterproof, dustproof, and boasts a 12-hour battery life for non-stop entertainment.',
    price: 59.95,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'Electronics',
    rating: 4.5,
    reviews: [],
  },
  {
    id: 'prod_7',
    name: 'Men\'s Leather Dress Shoes',
    description:
      'Complete your formal look with these elegant dress shoes, crafted from genuine leather. They feature a cushioned insole for all-day comfort and a durable outsole for longevity.',
    price: 120.00,
    images: ['https://placehold.co/600x600'],
    category: 'Apparel',
    rating: 4.6,
    reviews: [
        { id: 'rev_8', author: 'Chris Green', rating: 5, text: 'Sharp-looking and very comfortable. Perfect for work and special occasions.', date: '2023-08-15' },
    ],
  },
  {
    id: 'prod_8',
    name: 'Women\'s Running Sneakers',
    description:
      'Engineered for performance, these running sneakers provide exceptional cushioning and support. The lightweight, breathable mesh upper keeps your feet cool and comfortable on the go.',
    price: 110.00,
    images: ['https://placehold.co/600x600', 'https://placehold.co/600x600', 'https://placehold.co/600x600'],
    category: 'Apparel',
    rating: 4.8,
    reviews: [
      { id: 'rev_9', author: 'Sarah Miller', rating: 5, text: 'So light and comfortable! It feels like running on clouds.', date: '2023-10-05' },
      { id: 'rev_10', author: 'Jessica Davis', rating: 4, text: 'Great support for my daily runs. They run a half-size small, though.', date: '2023-09-30' },
    ],
  },
];
