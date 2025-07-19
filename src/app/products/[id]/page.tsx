import { products } from '@/lib/data';
import { ProductDetails } from '@/components/product-details';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    return {
      title: 'Product not found',
    };
  }
  return {
    title: `${product.name} | ShopSphere`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12">
      <ProductDetails product={product} />
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}
