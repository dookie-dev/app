"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  // cartRef removed as Drawer handles itself
  const searchRef = useRef<HTMLDivElement>(null);

  const { cartCount, toggleCart, isMounted } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Cart logic moved to Drawer
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Our Story", href: "/story" },
    { label: "Reviews", href: "/reviews" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isSticky
            ? "bg-white/95 backdrop-blur-md shadow-soft py-3"
            : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2">
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <Image
                src="/images/dookie-logo.png"
                alt="Dookiee.s"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-brand-text font-medium text-lg hover:text-brand-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-brand-muted hover:text-brand-primary transition-colors"
            >
              <Search size={22} />
            </button>

            <div className="relative">
              <button
                onClick={toggleCart}
                className="relative text-brand-muted hover:text-brand-primary transition-colors"
              >
                <ShoppingCart size={22} />
                {isMounted && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-accent text-brand-text text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            <Link
              href="/menu"
              className="bg-brand-primary text-white px-6 py-2 rounded-full font-bold shadow-soft hover:bg-brand-primary/90 transition-all hover:scale-105"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-brand-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className={cn("h-[80px]", isSticky ? "block" : "hidden")} />

      <CartDrawer />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[40] pt-24 px-6 lg:hidden animate-in slide-in-from-right duration-300">
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-serif text-brand-text hover:text-brand-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Link
              href="/menu"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-bold text-brand-primary"
            >
              Order Now
            </Link>
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-custom-lg p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <Search className="text-brand-muted p-1" size={32} />
              <input
                type="text"
                placeholder="Search your favorite cookie..."
                className="flex-1 text-xl outline-none placeholder:text-gray-300 text-brand-text"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="bg-gray-100 rounded-full p-2 hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-brand-muted uppercase tracking-wider font-bold mb-2">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {["Chocolate Chip", "Matcha", "Red Velvet", "Gift Box"].map(
                  (tag) => (
                    <button
                      key={tag}
                      className="px-4 py-2 bg-brand-cream text-brand-text rounded-full text-sm hover:bg-brand-secondary transition-colors"
                    >
                      {tag}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
