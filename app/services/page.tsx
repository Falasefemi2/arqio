import { ServicesContent } from "@/components/service-content";
import { Suspense } from "react";

export const metadata = {
  title: "Manage Services | Arqio Admin",
  description: "Add, edit, or remove services displayed on the landing page",
};

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-gray-500">Loading services...</div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}
