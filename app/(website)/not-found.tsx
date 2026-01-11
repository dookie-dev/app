"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname,
    );
  }, [pathname]);

  return (
    <div className="w-full">
      <section className="min-h-[70vh] bg-gradient-to-b from-bellaria-cream to-white flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="text-7xl md:text-9xl font-bold text-bellaria-pink opacity-20">
              404
            </div>
            <h1 className="bellaria-h1 text-bellaria-dark">Page Not Found</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sorry! The page you're looking for doesn't exist. It might have
              been moved or deleted.
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">Let's get you back on track:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Back to Home <ChevronRight size={18} />
                </Link>
                <Link
                  href="/portfolio"
                  className="btn-outline inline-flex items-center justify-center gap-2"
                >
                  View Portfolio <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
