import { AdminDashboard } from "@/components/admin-dashboard";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Analytics Dashboard | Arqio Admin",
  description: "Arqio Technology Admin Panel - Analytics Dashboard",
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AdminDashboard />
    </Suspense>
  );
}
