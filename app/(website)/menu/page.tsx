import { getMenus } from "@/lib/fetch";
import CookieGrid from "@/components/cookie/CookieGrid";
import Pagination from "@/components/shared/Pagination";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Menu | Dookiee.s",
  description:
    "Browse our selection of soft cookies, brownies, and gift sets. Freshly baked and delivered to your door.",
};

interface MenuPageProps {
  searchParams: {
    page?: string;
    category?: string;
    q?: string;
  };
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const itemsPerPage = 12;

  // Fetch all enabled menus (from Supabase or Mock)
  const allCookies = await getMenus();

  // Filter Logic
  let filtered = allCookies;
  if (category && category !== "all") {
    if (category === "best-seller") {
      filtered = allCookies.filter((c) => c.is_best_seller);
    } else {
      // Map frontend category to DB category
      const categoryMap: Record<string, string> = {
        "soft-cookie": "classic",
        brownie: "brownie",
        set: "set",
      };
      const target = categoryMap[category] || category;
      filtered = allCookies.filter(
        (c) =>
          c.category === target ||
          (target === "classic" &&
            ["classic", "premium", "filled", "special"].includes(c.category)),
      );
    }
  }

  // Pagination Logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const cookies = filtered.slice(start, end);

  const categories = [
    { id: "all", label: "All Cookies" },
    { id: "soft-cookie", label: "Soft Cookies" },
    { id: "brownie", label: "Brownies" },
    { id: "set", label: "Gift Sets" },
    { id: "best-seller", label: "Best Sellers" },
  ];

  return (
    <main className="min-h-screen bg-brand-cream pt-32 pb-20 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-2 block">
            Fresh from the Oven
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-text mb-4">
            Our Menu
          </h1>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Explore our handcrafted collection of soft cookies, brownies, and
            sweet treats. Perfect for sharing or indulging yourself!
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-custom-md shadow-soft mb-12 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-24 z-30">
          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-2 no-scrollbar">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/menu${cat.id === "all" ? "" : `?category=${cat.id}`}`}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  category === cat.id || (!category && cat.id === "all")
                    ? "bg-brand-primary text-white shadow-md"
                    : "bg-gray-100 text-brand-text hover:bg-brand-secondary/50"
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search cookies..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-secondary text-sm"
              />
            </div>
            <button className="md:hidden p-2 bg-gray-100 rounded-full text-brand-text">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <CookieGrid cookies={cookies} isLoading={false} />

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/menu"
        />
      </div>
    </main>
  );
}
