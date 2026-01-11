import { Cookie } from "@/types";
import CookieCard from "./CookieCard";
import CookieSkeleton from "./CookieSkeleton";

interface CookieGridProps {
  cookies: Cookie[];
  isLoading?: boolean;
}

export default function CookieGrid({
  cookies,
  isLoading = false,
}: CookieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <CookieSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cookies.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-serif text-brand-muted mb-4">
          No cookies found 🍪
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters or check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {cookies.map((cookie) => (
        <CookieCard key={cookie.id} cookie={cookie} />
      ))}
    </div>
  );
}
