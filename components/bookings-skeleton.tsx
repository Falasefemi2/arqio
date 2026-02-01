import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function BookingsSkeleton() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 overflow-auto pt-20">
        <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Search and Filters Skeleton */}
          <Card className="p-4">
            <div className="space-y-4">
              {/* Search Bar Skeleton */}
              <Skeleton className="h-10 w-full" />

              {/* Filter Buttons Skeleton */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          </Card>

          {/* Booking Cards Skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Left Content Skeleton */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-5 w-64" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  {/* Right Content Skeleton */}
                  <div className="flex flex-col sm:flex-col sm:items-end gap-3">
                    <Skeleton className="h-5 w-32" />
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-10 w-full sm:w-28" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
