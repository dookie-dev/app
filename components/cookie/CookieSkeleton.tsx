import { Skeleton } from "@/components/ui/skeleton";

export default function CookieSkeleton() {
  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Image Skeleton */}
      <Skeleton className="w-full aspect-square rounded-custom-lg" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" /> {/* Category */}
          <Skeleton className="h-4 w-10" /> {/* Rating */}
        </div>
        <Skeleton className="h-6 w-3/4" /> {/* Title */}
        <Skeleton className="h-4 w-full" /> {/* Desc */}
        <Skeleton className="h-4 w-5/6" /> {/* Desc */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-16" /> {/* Price */}
          <Skeleton className="h-10 w-10 rounded-full" /> {/* Button */}
        </div>
      </div>
    </div>
  );
}
