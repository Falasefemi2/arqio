import { ServicesContent } from "@/components/service-content";
import { ServicesSkeleton } from "@/components/service-skeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Manage Services | Arqio Admin",
  description: "Add, edit, or remove services displayed on the landing page",
};

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesSkeleton />}>
      <ServicesContent />
    </Suspense>
  );
}
