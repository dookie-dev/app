"use client";

import { useState } from "react";
import LazyImage from "@/components/ui/LazyImage";
import { cn } from "@/lib/utils"; // Assuming you have a utils for merging classes, or I'll just use template strings

interface ProductImage {
  id?: string;
  image_url: string;
  alt?: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  isBestSeller?: boolean;
}

export default function ProductGallery({
  images,
  productName,
  isBestSeller,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(
    images[0]?.image_url || "/images/placeholder-cookie.webp",
  );

  return (
    <div className="space-y-4">
      <div className="aspect-square relative rounded-custom-lg overflow-hidden shadow-soft bg-white group">
        <LazyImage
          src={activeImage}
          alt={productName}
          width={800}
          height={800}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          priority={true}
        />
        {isBestSeller && (
          <div className="absolute top-4 left-4 bg-brand-secondary text-brand-text px-4 py-1 rounded-full text-sm font-bold shadow-sm">
            Best Seller
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActiveImage(img.image_url)}
            className={`aspect-square rounded-custom-md overflow-hidden cursor-pointer border-2 transition-all ${
              activeImage === img.image_url
                ? "border-brand-primary ring-2 ring-brand-primary/20"
                : "border-transparent hover:border-brand-primary"
            }`}
          >
            <LazyImage
              src={img.image_url}
              alt={`${productName} thumbnail ${i + 1}`}
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
