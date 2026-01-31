import { getApiClient } from "../client";
import { ApiResponse, DashboardData } from "./types";

class DashboardAPI {
  private client = getApiClient();

  async getDashboardData(): Promise<DashboardData> {
    const response =
      await this.client.get<ApiResponse<DashboardData>>("/api/Dashboard");
    return response.data.data;
  }
}

export const dashboardAPI = new DashboardAPI();
