import { Suspense } from "react";
import { BookingsContent } from "../../components/booking-content";

export const metadata = {
  title: "Manage Bookings | Arqio Admin",
  description: "View and respond to client booking inquiries",
};

export default function BookingsPage() {
  return (
    <Suspense fallback={null}>
      <BookingsContent />
    </Suspense>
  );
}
