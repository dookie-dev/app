"use client";

import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Cookie } from "@/types";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Cookie;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const mainImage =
    product.images.find((img) => img.is_main)?.image_url ||
    product.images[0]?.image_url;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className="h-full"
    >
      <Card
        isPressable
        onPress={() => router.push(`/product/${product.slug}`)}
        className="w-full h-full border-none bg-white hover:bg-white border hover:border-brand-secondary/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-visible group"
        radius="lg"
      >
        <CardBody className="p-0 overflow-hidden relative aspect-square rounded-t-lg">
          {/* Main Image with Zoom Effect */}
          <div className="absolute inset-0 z-0">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 ease-spring group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P9rPQAJDwNca8Ti0QAAAABJRU5ErkJggg=="
            />
          </div>

          {/* Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          {/* Floating Emoji */}
          <span className="absolute top-4 left-4 text-2xl z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-spring delay-75">
            🍪
          </span>

          {/* Best Seller Badge */}
          {product.is_best_seller && (
            <div className="absolute top-2 right-2 bg-brand-secondary text-brand-text text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 animate-in fade-in zoom-in duration-300">
              Best Seller
            </div>
          )}
        </CardBody>

        <CardFooter className="flex flex-col items-start p-5 gap-3 bg-white z-20 relative">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-xs font-bold text-brand-secondary uppercase tracking-widest">
                  {product.category}
                </p>
                <span className="font-serif font-bold text-brand-primary text-xl">
                  ฿{product.price}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-text line-clamp-1 group-hover:text-brand-primary transition-colors">
                {product.name}
              </h3>
            </div>
          </div>

          <Button
            className="w-full bg-brand-primary/10 text-brand-primary font-bold shadow-none group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-lg transition-all duration-300 btn-squishy"
            startContent={
              <ShoppingCart size={18} className="group-hover:animate-bounce" />
            }
            radius="full"
            size="md"
            onPress={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
