"use client";

import { useState, useEffect } from "react";
import CookieCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import { Cookie, PaginationData } from "@/types";
import { Pagination } from "@nextui-org/react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGridProps {
  initialData: Cookie[];
  initialPagination: PaginationData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function ProductGrid({
  initialData,
  initialPagination,
}: ProductGridProps) {
  const [products, setProducts] = useState<Cookie[]>(initialData);
  const [pagination, setPagination] =
    useState<PaginationData>(initialPagination);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setProducts(initialData);
    setPagination(initialPagination);
    setIsLoading(false); // Reset loading state when data arrives
  }, [initialData, initialPagination]);

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    router.push(`/products?page=${newPage}`, { scroll: false });
  };

  return (
    <div className="space-y-12">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton-grid"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={`skeleton-${i}`} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="product-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants} layout>
                <CookieCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center pt-8">
        <Pagination
          showControls
          total={pagination.total_pages}
          initialPage={page}
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="light"
          size="lg"
          classNames={{
            cursor: "bg-brand-primary shadow-soft font-bold",
            item: "font-serif text-lg bg-transparent hover:bg-brand-cream",
          }}
          className="gap-2"
        />
      </div>
    </div>
  );
}
