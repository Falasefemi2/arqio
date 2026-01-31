"use client";

import { useAuth } from "../../utils/api/store/useAuth";
import { useEffect, useState } from "react";
import NotFound from "../not-found";
import { HeaderDashboard } from "@/components/header-dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for hydration by checking if localStorage has auth data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0); // Or increase to 100ms if needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const isAdmin = user?.roles?.includes("Administrator");

  if (!isAuthenticated || !isAdmin) {
    return <NotFound />;
  }

  return (
    <>
      <HeaderDashboard />
      <div className="pt-16"> {/* Added padding to account for fixed header */}
        {children}
      </div>
    </>
  );
}
