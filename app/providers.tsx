"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { LineAuthProvider } from "@/context/LineAuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={router.push}>
        <TooltipProvider>
          <LineAuthProvider>
            <CartProvider>
              {children}
              <Toaster />
              <Sonner />
            </CartProvider>
          </LineAuthProvider>
        </TooltipProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
