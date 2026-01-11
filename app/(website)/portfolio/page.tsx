"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { Search, Heart } from "lucide-react";

import { COOKIE_IMAGES } from "@/lib/image-data";

// Mock Data
const PRODUCTS = [
  {
    id: 1,
    name: "Classic Chocolate Chip",
    category: "Soft Cookie",
    price: "฿59",
    image: COOKIE_IMAGES.chocolateChip[0],
  },
  {
    id: 2,
    name: "Double Chocolate Fudge",
    category: "Soft Cookie",
    price: "฿69",
    image: COOKIE_IMAGES.doubleChoco[0],
  },
  {
    id: 3,
    name: "Matcha White Chocolate",
    category: "Soft Cookie",
    price: "฿79",
    image: COOKIE_IMAGES.matcha[0],
  },
  {
    id: 4,
    name: "Red Velvet Cream Cheese",
    category: "Soft Cookie",
    price: "฿79",
    image: COOKIE_IMAGES.redVelvet[0],
  },
  {
    id: 5,
    name: "Lotus Biscoff",
    category: "Soft Cookie",
    price: "฿65",
    image: COOKIE_IMAGES.biscoff[0],
  },
  {
    id: 6,
    name: "Oatmeal Cranberry",
    category: "Soft Cookie",
    price: "฿59",
    image: COOKIE_IMAGES.oatmeal[0],
  },
];

const CATEGORIES = [
  "All",
  "Cakes",
  "Cupcakes",
  "Desserts",
  "Weddings",
  "Pastries",
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filteredProducts =
    filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Our Menu"
        subtitle="Fresh from the oven"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Menu" }]}
      />

      {/* Filter Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-serif text-lg transition-all duration-300 ${
                filter === cat
                  ? "bg-bellaria-teal text-white shadow-lg"
                  : "bg-white text-bellaria-dark hover:text-bellaria-teal border border-transparent hover:border-bellaria-teal/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-bellaria-dark/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white p-6 text-center transform translate-y-4 group-hover:translate-y-0">
                    <span className="text-bellaria-teal font-serif italic text-lg mb-2">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-2xl mb-4">{product.name}</h3>
                    <span className="text-3xl font-bold text-bellaria-pink mb-6">
                      {product.price}
                    </span>

                    <div className="flex gap-4">
                      <button
                        className="w-10 h-10 rounded-full bg-white text-bellaria-dark flex items-center justify-center hover:bg-bellaria-pink hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Search size={18} />
                      </button>
                      <button
                        className="w-10 h-10 rounded-full bg-white text-bellaria-dark flex items-center justify-center hover:bg-bellaria-pink hover:text-white transition-colors"
                        title="Add to Wishlist"
                      >
                        <Heart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="font-serif text-xl">
              No products found in this category.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bellaria-pink text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-brand-primary"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Have a Special Occasion?
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
            We create custom cakes for weddings, birthdays, and corporate
            events. Let us make your celebration sweet and memorable.
          </p>
          <button className="px-10 py-4 bg-white text-bellaria-pink rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-bellaria-teal hover:text-white transition-all transform hover:-translate-y-1">
            Contact for Custom Order
          </button>
        </div>
      </section>
    </div>
  );
}
