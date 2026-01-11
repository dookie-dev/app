"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // e.g., "/menu"
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      <Link
        href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
        aria-disabled={currentPage <= 1}
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-colors",
          currentPage <= 1
            ? "text-gray-300 pointer-events-none"
            : "text-brand-text hover:bg-brand-primary hover:text-white hover:border-brand-primary",
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {/* Simple pagination logic: show all for now if small, or limited range */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-full border transition-all",
            currentPage === page
              ? "bg-brand-primary text-white border-brand-primary font-bold shadow-md"
              : "border-transparent text-brand-muted hover:bg-gray-50",
          )}
        >
          {page}
        </Link>
      ))}

      <Link
        href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
        aria-disabled={currentPage >= totalPages}
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-colors",
          currentPage >= totalPages
            ? "text-gray-300 pointer-events-none"
            : "text-brand-text hover:bg-brand-primary hover:text-white hover:border-brand-primary",
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
