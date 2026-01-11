"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Cookie } from "@/types";
import { motion } from "framer-motion";

interface ProductActionsProps {
  product: Cookie;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex items-center border-2 border-brand-text/10 rounded-full px-4 h-14 w-fit bg-white">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="w-10 h-full flex items-center justify-center text-brand-muted hover:text-brand-primary transition-colors"
        >
          <Minus size={20} />
        </button>
        <span className="w-12 text-center font-bold text-lg select-none">
          {qty}
        </span>
        <button
          onClick={() => setQty(qty + 1)}
          className="w-10 h-full flex items-center justify-center text-brand-muted hover:text-brand-primary transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
        <Button
          className="w-full h-14 bg-brand-primary text-white font-bold text-lg shadow-soft hover:bg-brand-primary/90 btn-squishy gap-2"
          radius="full"
          onPress={handleAddToCart}
          startContent={<ShoppingCart size={22} />}
        >
          Add to Cart
        </Button>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        className="p-4 rounded-full border-2 border-brand-text/10 text-brand-muted hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all bg-white"
      >
        <Heart size={22} />
      </motion.button>
    </div>
  );
}
