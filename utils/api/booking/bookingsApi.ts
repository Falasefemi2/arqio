import { getApiClient } from "../client";
import {
  Booking,
  BookingRequest,
  BookingResponse,
  GetAllBookingResponse,
  GetBookingParams,
  UpdateBookingRequest,
} from "./type";

class BookingAPI {
  private client = getApiClient();

  async createBooking(data: BookingRequest): Promise<BookingResponse> {
    const response = await this.client.post<BookingResponse>(
      "/api/Booking",
      data,
    );
    return response.data;
  }

  async GetAllBooking(
    params?: GetBookingParams,
  ): Promise<GetAllBookingResponse> {
    const response = await this.client.get<GetAllBookingResponse>(
      "/api/Booking",
      { params },
    );
    return response.data;
  }

  async getBookingById(id: number): Promise<Booking> {
    const response = await this.client.get<Booking>(`/api/Booking/${id}`);
    return response.data;
  }

  async updateBooking(data: UpdateBookingRequest): Promise<BookingResponse> {
    const response = await this.client.put<BookingResponse>(
      `/api/Booking/${data.id}`,
      data,
    );
    return response.data;
  }

  async deleteBooking(id: number): Promise<void> {
    await this.client.delete(`/api/Booking/${id}`);
  }
}

export const bookingAPI = new BookingAPI();
