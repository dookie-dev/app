"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button, ScrollShadow, Spinner } from "@nextui-org/react";
import { useCart } from "@/context/CartContext";
import { useLineAuth } from "@/context/LineAuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    isCartOpen,
    toggleCart,
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    isMounted,
  } = useCart();
  const { user, login, isLoading } = useLineAuth();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        isCartOpen
      ) {
        toggleCart();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen, toggleCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            ref={drawerRef}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-brand-primary" />
                <h2 className="text-xl font-serif font-bold text-brand-text">
                  Your Cart
                </h2>
                <span className="bg-brand-secondary text-brand-text text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              </div>
              <Button
                isIconOnly
                variant="light"
                onPress={toggleCart}
                radius="full"
              >
                <X size={24} className="text-brand-muted" />
              </Button>
            </div>

            {/* User Info (if logged in) */}
            {isMounted && user && (
              <div className="px-4 py-2 bg-brand-cream/50 flex items-center gap-2 border-b border-dashed border-gray-200">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 overflow-hidden relative">
                  {user.pictureUrl ? (
                    <Image
                      src={user.pictureUrl}
                      alt={user.displayName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-primary font-bold">
                      {user.displayName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-brand-muted">Ordering as</span>
                  <span className="text-sm font-bold text-brand-text">
                    {user.displayName}
                  </span>
                </div>
              </div>
            )}

            {/* Items */}
            <ScrollShadow className="flex-1 p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                  <ShoppingBag size={64} className="text-brand-muted/30" />
                  <p className="text-brand-muted font-medium">
                    Your cart is empty
                  </p>
                  <Button color="primary" variant="flat" onPress={toggleCart}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 bg-brand-cream/30 rounded-xl border border-transparent hover:border-brand-secondary/30 transition-colors"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-sm">
                        <Image
                          src={
                            item.images?.find((img) => img.is_main)
                              ?.image_url ||
                            item.images?.[0]?.image_url ||
                            "/images/placeholder-cookie.webp"
                          }
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-brand-text line-clamp-1 text-sm">
                            {item.name}
                          </h3>
                          <p className="text-xs text-brand-muted">
                            {item.category}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm border border-gray-100">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-brand-text transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-brand-text transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-brand-primary">
                            ฿{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollShadow>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-white pb-safe">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-brand-muted">Total</span>
                  <span className="text-2xl font-serif font-bold text-brand-primary">
                    ฿{cartTotal}
                  </span>
                </div>

                {isMounted &&
                  (user ? (
                    <Link href="/checkout" onClick={() => toggleCart()}>
                      <Button
                        className="w-full font-bold text-white shadow-soft bg-brand-primary"
                        size="lg"
                        radius="full"
                        endContent={<ArrowRight size={20} />}
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onPress={login}
                      isLoading={isLoading}
                      className="w-full font-bold text-white shadow-soft bg-[#06C755] hover:bg-[#05b64d]"
                      size="lg"
                      radius="full"
                    >
                      {isLoading
                        ? "Checking Login..."
                        : "Login via LINE to Order"}
                    </Button>
                  ))}

                <div className="text-[10px] text-center text-brand-muted mt-2">
                  {isMounted && user
                    ? "Confirm your address and contact in the next step."
                    : "Login required to personalize your order."}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
