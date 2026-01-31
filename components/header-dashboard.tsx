"use client";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderDashboard() {
  const userEmail = "admin@arqio.tech";
  const userName = "Admin";
  const pathname = usePathname();

  const showDashboardButton =
    pathname === "/bookings" || pathname === "/services";

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-52 z-40 border-b border-slate-200 bg-white">
      <div
        className="flex items-center px-6 py-4"
        style={{
          justifyContent: showDashboardButton ? "space-between" : "flex-end",
        }}
      >
        {/* Left Section: Dashboard Button (Conditional) */}
        {showDashboardButton && (
          <Link href="/dashboard">
            <Button variant="outline" className="bg-transparent hidden md:flex">
              <div className="w-4 h-4 mr-2">📊</div>
              View Analytics Dashboard
            </Button>
          </Link>
        )}

        {/* Right Section: User Info */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-600">Logged in as</span>
            <span className="text-sm font-medium text-slate-900">
              {userEmail}
            </span>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-orange-500 text-white text-xs font-semibold">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
