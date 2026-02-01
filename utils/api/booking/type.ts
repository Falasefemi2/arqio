export interface Reply {
  message: string;
  scheduledDate: string;
  scheduledTime: string;
}

export interface Booking {
  id: number;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  deletedDate?: string;
  deletedBy?: string;
  isActive: boolean;
  isDeleted: boolean;
  email: string;
  companyName: string;
  message: string;
  status: string;
  reply?: Reply; // Add this - optional because not all bookings have replies
}

export interface GetBookingResponse {
  bookings: Booking[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface BookingRequest {
  email: string;
  companyName: string;
  message: string;
}

export interface BookingResponse {
  isSuccessful: boolean;
  successMessage?: string;
  error?: {
    responseDescription: string;
    data: string;
  };
  data: Booking;
}

export interface UpdateBookingRequest {
  id: number;
  email: string;
  companyName: string;
  message: string;
}

export interface GetBookingID {
  id: number;
}

export interface GetBookingParams {
  Status?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface GetAllBookingResponse {
  data: Booking[];
  successMessage?: string;
  totalCount: number;
  pageNumber?: number;
  pageSize?: number;
  isSuccessful: boolean;
  error?: null | { responseDescription: string; data: string };
}
