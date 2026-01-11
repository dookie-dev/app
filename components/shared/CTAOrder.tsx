"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTAOrderProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  href?: string;
}

export default function CTAOrder({
  title = "Ready to taste the magic?",
  subtitle = "Order now and get fresh soft cookies delivered to your doorstep.",
  buttonText = "Order Now",
  href = "/menu",
}: CTAOrderProps) {
  return (
    <section className="py-20 relative overflow-hidden bg-brand-cream">
      <div className="absolute inset-0 bg-brand-secondary/10 -z-10" />

      {/* Decorative large circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-brand-text mb-6">
          {title}
        </h2>
        <p className="text-brand-muted text-lg mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <Link
          href={href}
          className="inline-flex items-center gap-2 bg-brand-primary text-white px-10 py-4 rounded-full font-bold text-lg shadow-soft hover:bg-brand-primary/90 hover:scale-105 transition-all duration-300"
        >
          {buttonText}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
