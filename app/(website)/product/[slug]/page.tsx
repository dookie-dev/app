import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getFeaturedProducts } from "@/lib/fetch";
import { Star, Truck, ShieldCheck } from "lucide-react";
import CookieGrid from "@/components/cookie/CookieGrid";
import { Metadata } from "next";
import SEOHead from "@/components/shared/SEOHead";

import ProductActions from "@/components/products/ProductActions";
import ProductGallery from "@/components/products/ProductGallery";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const cookie = await getProductBySlug(params.slug);
  if (!cookie) return { title: "Product Not Found" };

  return {
    title: `${cookie.name} | Dookiee.s`,
    description: cookie.description,
    keywords: cookie.tags,
    openGraph: {
      images: [
        cookie.images[0]?.image_url || "/images/placeholder-cookie.webp",
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const cookie = await getProductBySlug(params.slug);
  const relatedCookies = (await getFeaturedProducts()).slice(0, 4);

  if (!cookie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-cream pt-32 pb-20">
      <SEOHead
        schemaType="Product"
        data={{
          name: cookie.name,
          image: cookie.images[0]?.image_url,
          description: cookie.description,
          id: cookie.id,
          slug: cookie.slug,
          price: cookie.price,
          rating: cookie.rating,
        }}
      />
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs text-brand-muted mb-8 font-medium">
          <ul className="flex gap-2 items-center">
            <li>
              <Link href="/" className="hover:text-brand-primary">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Link href="/menu" className="hover:text-brand-primary">
                Menu
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li className="text-brand-text truncate max-w-[200px]">
              {cookie.name}
            </li>
          </ul>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Image Gallery */}
          <ProductGallery
            images={cookie.images}
            productName={cookie.name}
            isBestSeller={cookie.is_best_seller}
          />

          {/* Product Info */}
          <div className="flex flex-col justify-center animate-in slide-in-from-right duration-500">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-text mb-4 leading-tight">
              {cookie.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-brand-primary">
                ฿{cookie.price.toFixed(2)}
              </span>
              <div className="flex items-center gap-1 text-brand-secondary">
                <Star fill="currentColor" size={20} />
                <span className="text-brand-text font-bold text-lg">
                  {cookie.rating}
                </span>
                <span className="text-brand-muted text-sm font-normal">
                  (128 reviews)
                </span>
              </div>
            </div>

            <div className="text-brand-muted text-lg leading-relaxed mb-8 border-b border-gray-200 pb-8">
              {cookie.description}
              <br />
              <br />
              Soft, chewy, and baked to perfection. Made with premium French
              butter and real chocolate chunks. A true delight in every bite!
              {cookie.tags && cookie.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {cookie.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-brand-cream-dark text-brand-text text-sm rounded-full border border-brand-primary/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <ProductActions product={cookie} />

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 text-sm text-brand-muted">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-brand-primary" />
                <span>Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-brand-primary" />
                <span>Freshness Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-brand-primary/10 pt-16">
          <h2 className="font-serif text-3xl font-bold text-brand-text mb-8 text-center">
            You Might Also Like
          </h2>
          <CookieGrid cookies={relatedCookies} />
        </div>
      </div>
    </main>
  );
}
