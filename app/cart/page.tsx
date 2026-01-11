"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-brand-cream pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto py-20 bg-white rounded-3xl shadow-soft">
            <h1 className="font-serif text-3xl font-bold text-brand-text mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-brand-muted mb-8">
              Looks like you haven't indulged in anything yet.
            </p>
            <Link href="/menu">
              <Button
                color="primary"
                size="lg"
                className="font-bold rounded-full px-8"
              >
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="font-serif text-4xl font-bold text-brand-text mb-8 text-center md:text-left">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow-sm flex gap-4 items-center animate-in slide-in-from-bottom-2 duration-300"
              >
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                  <Image
                    src={
                      item.images?.[0]?.image_url ||
                      "/images/placeholder-cookie.webp"
                    }
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between self-stretch py-1">
                  <div>
                    <h3 className="font-bold text-brand-text text-lg">
                      {item.name}
                    </h3>
                    <p className="text-brand-primary font-bold">
                      ฿{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch py-1 gap-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="flex items-center border border-gray-200 rounded-full h-9">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="w-8 h-full flex items-center justify-center text-brand-muted hover:text-brand-primary"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-full flex items-center justify-center text-brand-muted hover:text-brand-primary"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Link
                href="/menu"
                className="text-brand-muted hover:text-brand-primary flex items-center gap-2 font-medium"
              >
                <ArrowLeft size={18} /> Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-600 text-sm underline"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-soft sticky top-32">
              <h2 className="font-serif text-xl font-bold text-brand-text mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span>฿{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="h-px bg-gray-100 my-2" />
                <div className="flex justify-between font-bold text-lg text-brand-text">
                  <span>Total</span>
                  <span className="text-brand-primary">
                    ฿{cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button
                  className="w-full bg-brand-primary text-white font-bold text-lg shadow-soft py-6 rounded-xl"
                  endContent={<ArrowRight size={20} />}
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="mt-4 text-xs text-center text-brand-muted">
                Secure checkout via LINE Pay / Transfer
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
