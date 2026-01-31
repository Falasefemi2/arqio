import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookingRequest,
  GetBookingParams,
  UpdateBookingRequest,
} from "../type";
import { bookingAPI } from "../bookingsApi";

export const bookingKeys = {
  all: ["bookings"] as const,
  lists: () => [...bookingKeys.all, "list"] as const,
  list: (filters: GetBookingParams) =>
    [...bookingKeys.lists(), { ...filters }] as const,
  details: () => [...bookingKeys.all, "detail"] as const,
  detail: (id: number) => [...bookingKeys.details(), id] as const,
};

// QUERIES (Read operations)
export const useGetAllBookings = (params?: GetBookingParams) => {
  return useQuery({
    queryKey: bookingKeys.list(params || {}),
    queryFn: () => bookingAPI.GetAllBooking(params),
  });
};

export const useGetBookingById = (id: number) => {
  return useQuery({
    queryKey: bookingKeys.detail(id),
    queryFn: () => bookingAPI.getBookingById(id),
  });
};

// MUTATIONS (Write operations)
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookingRequest) => bookingAPI.createBooking(data),
    mutationKey: ["createBooking"],
    onSuccess: () => {
      // Invalidate all booking lists to refetch
      queryClient.invalidateQueries({
        queryKey: bookingKeys.lists(),
      });
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBookingRequest) => bookingAPI.updateBooking(data),
    mutationKey: ["updateBooking"],
    onSuccess: (data) => {
      // Invalidate both the specific booking and all lists
      queryClient.invalidateQueries({
        queryKey: bookingKeys.detail(data.data.id),
      });
      queryClient.invalidateQueries({
        queryKey: bookingKeys.lists(),
      });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => bookingAPI.deleteBooking(id),
    mutationKey: ["deleteBooking"],
    onSuccess: () => {
      // Invalidate all lists after deletion
      queryClient.invalidateQueries({
        queryKey: bookingKeys.lists(),
      });
    },
  });
};
