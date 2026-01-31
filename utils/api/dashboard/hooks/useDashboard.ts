import { useQuery } from "@tanstack/react-query";
import { dashboardAPI } from "../dashboardAPI";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardAPI.getDashboardData(),
  });
};
