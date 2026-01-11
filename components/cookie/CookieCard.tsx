"use client";

import Link from "next/link";
import { Cookie } from "@/types";
import LazyImage from "@/components/ui/LazyImage";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CookieCardProps {
  cookie: Cookie;
  className?: string;
}

export default function CookieCard({ cookie, className }: CookieCardProps) {
  return (
    <div className={cn("group relative flex flex-col h-full", className)}>
      <Link
        href={`/product/${cookie.slug}`}
        className="block relative mb-4 overflow-hidden rounded-custom-lg shadow-soft transition-transform duration-300 group-hover:-translate-y-2"
      >
        {cookie.is_best_seller && (
          <div className="absolute top-3 left-3 z-10 bg-brand-secondary text-brand-text text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Best Seller
          </div>
        )}
        <LazyImage
          src={cookie.images[0]?.image_url || "/images/placeholder-cookie.webp"}
          alt={cookie.name}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/90 text-brand-text px-4 py-2 rounded-full text-sm font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
            View Details <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs text-brand-muted uppercase tracking-wider font-semibold">
            {cookie.category}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-brand-secondary text-brand-secondary" />
            <span className="text-xs font-bold text-brand-text">
              {cookie.rating}
            </span>
          </div>
        </div>

        <Link href={`/product/${cookie.slug}`} className="block">
          <h3 className="font-serif text-xl text-brand-text mb-1 group-hover:text-brand-primary transition-colors">
            {cookie.name}
          </h3>
        </Link>

        <p className="text-sm text-brand-muted line-clamp-2 mb-4 flex-grow">
          {cookie.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-brand-text">
            ฿{cookie.price}
          </span>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white shadow-soft hover:bg-brand-primary/90 transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
