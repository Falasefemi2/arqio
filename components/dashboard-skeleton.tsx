import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function StatCardSkeleton() {
  return (
    <Card className="bg-white border-slate-200">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton className="h-5 w-20 mb-3" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartCardSkeleton() {
  return (
    <Card className="bg-white border-slate-200">
      <CardHeader className="pb-4">
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart bars skeleton */}
          <div className="flex items-end justify-between h-64 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ServiceInterestSkeleton() {
  return (
    <Card className="bg-white border-slate-200">
      <CardHeader className="pb-4">
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24 flex-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="w-full h-full bg-slate-50">
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        {/* Header */}
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-3" />
          <Skeleton className="h-5 w-72" />
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        {/* Charts and Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Booking Trends */}
          <div className="lg:col-span-2">
            <ChartCardSkeleton />
          </div>

          {/* Service Interest */}
          <ServiceInterestSkeleton />
        </div>
      </div>
    </div>
  );
}
