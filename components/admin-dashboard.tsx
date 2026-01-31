"use client";

import { Calendar, CheckCircle2, Clock, Building2 } from "lucide-react";
import { Sidebar } from "./sidebar";
import { StateCard } from "./stat-card";
import { ChartCard } from "./chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { HeaderDashboard } from "./header-dashboard";

const chartData = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 0 },
  { month: "Mar", value: 0 },
  { month: "Apr", value: 0 },
  { month: "May", value: 1 },
  { month: "Jun", value: 2 },
];

export function AdminDashboard() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      {/* Sidebar */}
      {/*<Sidebar /> */}
      <HeaderDashboard />

      {/* Main Content */}
      <main className="flex-1 w-full pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Analytics Dashboard
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Welcome to Arqio Technology Admin Panel
            </p>
          </div>

          {/* Stat Cards Grid - Mobile First Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            <StateCard
              icon={<Calendar className="h-5 w-5 text-slate-700" />}
              label="Total Bookings"
              value="3"
              badge="+12%"
              badgeColor="success"
            />
            <StateCard
              icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
              label="Replied"
              value="1"
              badge="33%"
              badgeColor="success"
            />
            <StateCard
              icon={<Clock className="h-5 w-5 text-orange-600" />}
              label="Pending Replies"
              value="2"
              badge="Action needed"
              badgeColor="warning"
            />
            <StateCard
              icon={<Building2 className="h-5 w-5 text-purple-600" />}
              label="Active Services"
              value="6"
              badge="Live"
              badgeColor="success"
            />
          </div>

          {/* Charts and Content Grid - Mobile First Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Booking Trends - Takes up 2 columns on desktop, full width on mobile */}
            <div className="lg:col-span-2">
              <ChartCard
                title="Booking Trends (Last 6 Months)"
                data={chartData}
              />
            </div>

            {/* Service Interest - Takes up 1 column on desktop, full width on mobile */}
            <Card className="bg-white border-slate-200 lg:col-span-1">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Service Interest
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-slate-400 text-center">
                    No service data available
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
