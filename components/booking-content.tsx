"use client";

import { useState, useMemo } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeaderDashboard } from "./header-dashboard";
import { CreateBookingModal } from "./create-booking-modal";
import {
  useGetAllBookings,
  useGetBookingById,
} from "@/utils/api/booking/hooks/useBookings";

export function BookingsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Pending" | "Replied"
  >("All");
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );

  // Fetch all bookings with status filter
  const { data: response = {}, isLoading } = useGetAllBookings({
    PageNumber: 1,
    PageSize: 10,
    Status: filterStatus === "All" ? undefined : filterStatus,
  });

  // Only fetch booking details when we have a valid ID
  const { data: selectedBookingResponse } = useGetBookingById(
    selectedBookingId || 0,
  );

  const bookings = response?.data || [];
  const selectedBookingData = selectedBookingResponse?.data;

  // Filter bookings locally for search
  const filteredBookings = useMemo(() => {
    if (!bookings || !Array.isArray(bookings)) return [];
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.message.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [searchTerm, bookings]);

  const handleViewDetails = (bookingId: number) => {
    setSelectedBookingId(bookingId);
  };

  // Detail view
  if (selectedBookingId && selectedBookingData) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 overflow-auto">
          <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                onClick={() => setSelectedBookingId(null)}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to List
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Booking Details
                </h1>
              </div>

              <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Client Information
                  </h2>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedBookingData.status === "Pending"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {selectedBookingData.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500">🏢</span>
                      <label className="text-sm font-medium text-gray-600">
                        Company Name
                      </label>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {selectedBookingData.companyName}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500">✉️</span>
                      <label className="text-sm font-medium text-gray-600">
                        Email Address
                      </label>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {selectedBookingData.email}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-500">📅</span>
                      <label className="text-sm font-medium text-gray-600">
                        Submitted On
                      </label>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {new Date(
                        selectedBookingData.createdDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-500">💬</span>
                    <label className="text-sm font-medium text-gray-600">
                      Message
                    </label>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedBookingData.message}
                  </p>
                </div>

                {/* Show reply if it exists */}
                {selectedBookingData.reply && (
                  <div className="border-t mt-6 pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-gray-500">📬</span>
                      <label className="text-sm font-medium text-gray-600">
                        Our Reply
                      </label>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {selectedBookingData.reply.message}
                    </p>
                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Scheduled Date:</strong>{" "}
                        {new Date(
                          selectedBookingData.reply.scheduledDate,
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Scheduled Time:</strong>{" "}
                        {selectedBookingData.reply.scheduledTime}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // List view
  return (
    <div className="flex min-h-screen bg-gray-50">
      <HeaderDashboard />
      <main className="flex-1 overflow-auto pt-20">
        <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Manage Bookings
              </h1>
              <p className="text-gray-600 mt-1">
                View and respond to client inquiries
              </p>
            </div>
            <CreateBookingModal />
          </div>

          {/* Search and Filters */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by company, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {(["All", "Pending", "Replied"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === status
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Bookings List */}
          <div className="space-y-3">
            {isLoading ? (
              <Card className="p-8 text-center">
                <p className="text-gray-500">Loading bookings...</p>
              </Card>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🏢</span>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {booking.companyName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <span>✉️</span>
                        <span className="truncate">{booking.email}</span>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {booking.message}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-col sm:items-end gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📅</span>
                        <span>
                          {new Date(booking.createdDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium text-center ${
                            booking.status === "Pending"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                        <Button
                          onClick={() => handleViewDetails(booking.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                        >
                          <span className="mr-2">👁️</span>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">
                  No bookings found matching your search criteria.
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
