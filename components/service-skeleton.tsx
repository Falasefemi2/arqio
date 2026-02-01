import { Skeleton } from "./ui/skeleton";

export function ServiceCardSkeleton() {
  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white">
      {/* Icon Skeleton */}
      <div className="mb-4">
        <Skeleton className="w-16 h-16 rounded-lg" />
      </div>

      {/* Title Skeleton */}
      <Skeleton className="h-6 w-3/4 mb-2" />

      {/* Description Skeleton */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Skeleton className="flex-1 h-9 rounded" />
        <Skeleton className="flex-1 h-9 rounded" />
      </div>
    </div>
  );
}

export function ServiceGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ServicesSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="w-32 h-10 rounded" />
        </div>

        {/* Service Grid */}
        <ServiceGridSkeleton />
      </main>
    </div>
  );
}
