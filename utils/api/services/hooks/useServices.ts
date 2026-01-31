import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { servicesAPI } from "../api/servicesAPI";
import { CreateServicePayload, UpdateServicePayload } from "../api/types";

export const serviceKeys = {
  all: ["services"] as const,
  lists: () => [...serviceKeys.all, "list"] as const,
  list: () => [...serviceKeys.lists()] as const,
  details: () => [...serviceKeys.all, "detail"] as const,
  detail: (id: number) => [...serviceKeys.details(), id] as const,
};

// QUERIES (Read operations)
export const useGetAllServices = () => {
  return useQuery({
    queryKey: serviceKeys.list(),
    queryFn: () => servicesAPI.getAllServices(),
  });
};

export const useGetServiceById = (id: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => servicesAPI.getServiceById(id),
    enabled, // Only fetch when enabled is true
  });
};

// MUTATIONS (Write operations)
export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServicePayload) => servicesAPI.createService(data),
    mutationKey: ["createService"],
    onSuccess: () => {
      // Invalidate all service lists to refetch
      queryClient.invalidateQueries({
        queryKey: serviceKeys.list(),
      });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateServicePayload) => servicesAPI.updateService(data),
    mutationKey: ["updateService"],
    onSuccess: (responseData) => {
      // Now responseData.id exists
      queryClient.invalidateQueries({
        queryKey: serviceKeys.detail(responseData.id),
      });
      queryClient.invalidateQueries({
        queryKey: serviceKeys.lists(),
      });
    },
  });
};
export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => servicesAPI.deleteService(id),
    mutationKey: ["deleteService"],
    onSuccess: () => {
      // Invalidate all lists after deletion
      queryClient.invalidateQueries({
        queryKey: serviceKeys.list(),
      });
    },
  });
};
