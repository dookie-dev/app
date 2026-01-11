"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PageHeader({
  title,
  subtitle,
  backgroundImage = "/images/hero-bg.png", // Default fallback
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section className="relative h-[250px] md:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Decorative Scalloped Bottom */}
      <div className="absolute bottom-[-1px] left-0 w-full h-12 text-white z-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="w-full h-full fill-white"
        >
          <path d="M0,40 Q30,20 60,40 T120,40 T180,40 T240,40 T300,40 T360,40 T420,40 T480,40 T540,40 T600,40 T660,40 T720,40 T780,40 T840,40 T900,40 T960,40 T1020,40 T1080,40 T1140,40 T1200,40 V0 H0 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="font-serif text-4xl md:text-6xl mb-4">{title}</h1>
        {subtitle && (
          <p className="font-serif text-lg md:text-xl italic opacity-90 mb-6">
            {subtitle}
          </p>
        )}

        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center gap-2 text-sm md:text-base font-medium uppercase tracking-wide opacity-80">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-bellaria-pink transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-bellaria-pink">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
