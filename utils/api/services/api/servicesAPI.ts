import { getApiClient } from "../../client";
import {
  CreateServicePayload,
  GetAllServiceResponse,
  Service,
  ServiceResponse,
  UpdateServicePayload,
} from "./types";

class ServicesAPI {
  private client = getApiClient();

  async createService(data: CreateServicePayload): Promise<Service> {
    const response = await this.client.post<ServiceResponse>(
      "/api/Services",
      data,
    );
    return response.data.data;
  }

  async getAllServices(): Promise<Service[]> {
    const response = await this.client.get<any>("/api/Services");
    return response.data.data || [];
  }

  async getServiceById(id: number): Promise<Service> {
    const response = await this.client.get<any>(`/api/Services/${id}`);
    return response.data.data;
  }

  async updateService(data: UpdateServicePayload): Promise<Service> {
    const response = await this.client.put<ServiceResponse>(
      `/api/Services`,
      data,
    );
    return response.data.data;
  }

  async deleteService(id: number): Promise<void> {
    await this.client.delete(`/api/Services/${id}`);
  }
}

export const servicesAPI = new ServicesAPI();
