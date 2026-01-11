import { Review } from "@/types";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  className?: string;
  featured?: boolean;
}

export default function ReviewCard({
  review,
  className,
  featured = false,
}: ReviewCardProps) {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-custom-lg shadow-soft h-full flex flex-col relative overflow-hidden",
        featured ? "border-2 border-brand-secondary/50" : "",
        className,
      )}
    >
      {/* Decorative quote */}
      <div className="absolute top-4 right-4 text-brand-secondary opacity-20 font-serif text-6xl leading-none">
        "
      </div>

      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < review.rating
                ? "fill-brand-secondary text-brand-secondary"
                : "fill-gray-100 text-gray-200",
            )}
          />
        ))}
      </div>

      <p className="text-brand-text text-lg italic mb-6 font-serif line-clamp-4 flex-grow relative z-10">
        &ldquo;{review.comment}&rdquo;
      </p>

      <div className="flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center text-brand-primary font-bold text-sm border border-brand-secondary/30">
          {review.customer_name.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-brand-text text-sm">
            {review.customer_name}
          </div>
          <div className="text-xs text-brand-muted">Verified Customer</div>
        </div>
      </div>
    </div>
  );
}
