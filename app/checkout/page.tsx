"use client";

import { useCart } from "@/context/CartContext";
import { Button, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle,
  Smartphone,
  MessageCircle,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, isMounted } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (isMounted && cart.length === 0) {
      router.push("/cart");
    }
  }, [isMounted, cart, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLineCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all details");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            phone: formData.phone,
          },
          address: formData.address,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: cartTotal,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Checkout failed");
      }

      // Success
      toast.success("Order created! Redirecting to LINE...");
      clearCart();

      // Redirect to LINE URL if provided, or show success page
      if (result.lineUrl) {
        window.location.href = result.lineUrl;
      } else {
        router.push(`/checkout/success?code=${result.orderCode}`);
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted || cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-primary mb-8 font-medium"
        >
          <ArrowLeft size={20} /> Back to Cart
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-soft">
              <h1 className="font-serif text-3xl font-bold text-brand-text mb-6">
                Checkout Details
              </h1>

              <form onSubmit={handleLineCheckout} className="space-y-6">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="John Doe"
                  variant="bordered"
                  value={formData.name}
                  onChange={handleChange}
                  isRequired
                  classNames={{ inputWrapper: "bg-white" }}
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  placeholder="0812345678"
                  type="tel"
                  variant="bordered"
                  value={formData.phone}
                  onChange={handleChange}
                  isRequired
                  classNames={{ inputWrapper: "bg-white" }}
                  description="Used for order confirmation and membership."
                />

                <Textarea
                  label="Shipping Address"
                  name="address"
                  placeholder="123/45 Condo ABC, Sukhumvit Rd..."
                  variant="bordered"
                  value={formData.address}
                  onChange={handleChange}
                  isRequired
                  minRows={3}
                  classNames={{ inputWrapper: "bg-white" }}
                />

                <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
                  <div className="bg-white p-2 rounded-full text-blue-500 shadow-sm">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-700 text-sm">
                      Order via LINE
                    </h4>
                    <p className="text-xs text-blue-600 mt-1">
                      After confirming, you will be redirected to LINE to send
                      your order slip and chat with us.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full bg-[#06C755] text-white font-bold text-lg shadow-soft py-7 rounded-xl"
                  startContent={!loading && <MessageCircle size={24} />}
                >
                  Confirm & Order via LINE
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-soft sticky top-32">
              <h2 className="font-serif text-xl font-bold text-brand-text mb-6 pb-4 border-b border-gray-100">
                Your Order
              </h2>

              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg relative overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.images?.[0]?.image_url ||
                          "/images/placeholder-cookie.webp"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-0 right-0 bg-brand-primary text-white text-[10px] px-1.5 py-0.5 rounded-tl-md font-bold">
                        x{item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-brand-text text-sm line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-brand-muted text-xs">฿{item.price}</p>
                    </div>
                    <div className="text-right font-bold text-brand-text text-sm">
                      ฿{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span>฿{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">
                    Free Promotion
                  </span>
                </div>
                <div className="flex justify-between font-bold text-xl text-brand-text mt-4">
                  <span>Total</span>
                  <span className="text-brand-primary">
                    ฿{cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
