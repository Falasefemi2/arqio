export interface Service {
  id: number;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  deletedDate: string;
  deletedBy: string;
  isActive: boolean;
  isDeleted: boolean;
  title: string;
  description: string;
}

export interface CreateServicePayload {
  title: string;
  description: string;
}

export interface UpdateServicePayload {
  id: number;
  title: string;
  description: string;
}

export interface GetServiceParams {
  Title?: string;
  PageNumber?: number;
  PageSize?: number;
}

// ← FIX THIS: data should be Service, not boolean
export interface ServiceResponse {
  isSuccessful: boolean;
  error?: {
    responseDescription: string;
    data: string;
  };
  data: Service; // ← Changed from boolean to Service
  successMessage: string;
  totalCount: number;
}

export type GetAllServiceResponse = Service[];

