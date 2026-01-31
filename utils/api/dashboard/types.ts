export interface BookingTrend {
  month: string;
  pendingCount: number;
  repliedCount: number;
}

export interface RecentBooking {
  id: number;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  deletedDate: string | null;
  deletedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
  email: string;
  companyName: string;
  message: string;
  status: string;
}

export interface RecentActivity {
  id: number;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  deletedDate: string | null;
  deletedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
  companyName: string;
  description: string;
  type: string;
}

export interface DashboardData {
  totalBookings: number;
  replied: number;
  pendingReply: number;
  activeServices: number;
  bookingTrends: BookingTrend[];
  recentBookings: RecentBooking[];
  recentActivities: RecentActivity[];
}

export interface ApiResponse<T> {
  data: T;
  successMessage: string;
  totalCount: number;
  isSuccessful: boolean;
  error: null | string;
}
