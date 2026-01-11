import Link from "next/link";
import { ArrowRight, Star, ChefHat, Truck, Heart } from "lucide-react";
import { getFeaturedProducts, getReviews, getGallery } from "@/lib/fetch";
import CookieGrid from "@/components/cookie/CookieGrid";
import ReviewCard from "@/components/shared/ReviewCard";
import CTAOrder from "@/components/shared/CTAOrder";
import LazyImage from "@/components/ui/LazyImage";
import { HERO_IMAGES, ABOUT_IMAGES, REVIEW_IMAGES } from "@/lib/image-data";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dookiee.s | Handcrafted Soft Cookies & Brownies",
  description:
    "Experience the magic of homemade soft cookies. Baked fresh daily with premium ingredients. Nation-wide delivery in Thailand.",
  openGraph: {
    title: "Dookiee.s | Handcrafted Happiness",
    description:
      "Experience the magic of homemade soft cookies. Baked fresh daily with premium ingredients.",
    images: ["/images/og-home.jpg"],
  },
};

export default async function Home() {
  // Simulate data fetching
  const featuredCookies = await getFeaturedProducts();
  const reviews = await getReviews();
  const gallery = await getGallery();

  return (
    <main className="min-h-screen bg-brand-cream overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center md:text-left space-y-6 animate-in slide-in-from-left duration-700">
            <span className="inline-block px-4 py-2 bg-brand-secondary/30 text-brand-text rounded-full font-bold text-sm tracking-wide mb-2">
              ✨ Handcrafted Happiness
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-brand-text leading-tight">
              Soft, Chewy, & <br />{" "}
              <span className="text-brand-primary">Full of Love.</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-muted max-w-lg mx-auto md:mx-0 leading-relaxed">
              Experience the magic of our homemade soft cookies. Baked fresh
              daily with premium ingredients and a whole lot of heart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link
                href="/menu"
                className="px-8 py-4 bg-brand-primary text-white rounded-full font-bold text-lg shadow-soft hover:bg-brand-primary/90 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Order Now <ArrowRight size={20} />
              </Link>
              <Link
                href="/story"
                className="px-8 py-4 bg-white text-brand-text border-2 border-brand-primary/10 rounded-full font-bold text-lg hover:bg-white/80 hover:border-brand-primary/30 transition-all flex items-center justify-center"
              >
                Our Story
              </Link>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 pt-6 text-sm font-medium text-brand-muted">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden"
                  >
                    <img
                      src={REVIEW_IMAGES[i % REVIEW_IMAGES.length]}
                      alt="Customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col text-left">
                <div className="flex text-brand-secondary">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span>500+ Happy Customers</span>
              </div>
            </div>
          </div>

          <div className="relative animate-in slide-in-from-right duration-700 delay-200">
            {/* Decorative Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-secondary/20 rounded-full blur-3xl -z-10 animate-pulse-slow" />

            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <LazyImage
                src={HERO_IMAGES[0]}
                alt="Giant Soft Cookie"
                width={600}
                height={600}
                className="object-contain drop-shadow-2xl rotate-3"
                wrapperAspectRatio="aspect-square"
                priority={true}
              />

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-6 bg-white p-4 rounded-2xl shadow-soft animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-secondary/20 rounded-full flex items-center justify-center text-brand-text">
                    <ChefHat size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted font-bold uppercase">
                      Freshly Baked
                    </p>
                    <p className="font-serif font-bold text-brand-text">
                      Every Morning
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ChefHat,
                title: "Premium Ingredients",
                desc: "We use only pure butter, high-quality chocolate, and organic flour.",
              },
              {
                icon: Truck,
                title: "Nationwide Delivery",
                desc: "Freshly packed and shipped to your door, anywhere in Thailand.",
              },
              {
                icon: Heart,
                title: "Baked with Love",
                desc: "Every cookie is homemade in small batches for the best taste.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-custom-lg hover:bg-brand-cream transition-colors duration-300 group"
              >
                <div className="w-20 h-20 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <feature.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-brand-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-wider uppercase text-sm">
              Our Favorites
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-text mt-3 mb-6">
              Best Selling Treats
            </h2>
            <p className="text-brand-muted max-w-2xl mx-auto">
              These are the crowd favorites! Try the cookies that everyone is
              raving about. Warning: Highly addictive! 😋
            </p>
          </div>

          <CookieGrid cookies={featuredCookies} />

          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-block px-10 py-3 border-2 border-brand-text text-brand-text rounded-full font-bold hover:bg-brand-text hover:text-white transition-all duration-300"
            >
              View All Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-brand-primary/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-brand-text mb-4">
              What Our Customers Say
            </h2>
            <div className="flex justify-center items-center gap-2">
              <div className="flex text-brand-secondary">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="font-bold text-brand-text">
                4.9/5 Average Rating
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review, i) => (
              <div key={review.id} className={i === 1 ? "md:-mt-8" : ""}>
                <ReviewCard review={review} featured={i === 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram/Social Feed (Mock) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-brand-text">
                Follow Our Journey
              </h2>
              <p className="text-brand-muted">@dookiee.s</p>
            </div>
            <a
              href="https://www.instagram.com/dookiee.s"
              className="text-brand-primary font-bold hover:underline hidden md:block"
            >
              View on Instagram
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                src: "/dookie-img/ig/post_1.webp",
                url: "https://www.instagram.com/p/DLwdYGTBowM/",
              },
              {
                src: "/dookie-img/ig/post_2.webp",
                url: "https://www.instagram.com/p/DL-SzbYS3EG/?img_index=1",
              },
              {
                src: "/dookie-img/ig/post_3.webp",
                url: "https://www.instagram.com/p/DN0n78v5KBp/?img_index=1",
              },
              {
                src: "/dookie-img/ig/post_4.webp",
                url: "https://www.instagram.com/p/DMvJh1_SDIo/?img_index=1",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square relative group overflow-hidden rounded-custom-md block"
              >
                <LazyImage
                  src={item.src}
                  alt={`Instagram Post ${i + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Heart className="text-white" fill="white" size={32} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTAOrder />
    </main>
  );
}
