export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
  reviews: Review[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type Category = {
  id: string;
  name: string;
};

export type CartItem = Product & {
  quantity: number;
};
