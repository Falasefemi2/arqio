import { getApiClient } from "../../client";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from "./types";

class AccountsAPI {
  private client = getApiClient();

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>(
      "/api/Account/login",
      data,
    );
    return response.data;
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.client.post<RegisterResponse>(
      "/api/Account/register",
      data,
    );
    return response.data;
  }

  async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const response = await this.client.post<VerifyEmailResponse>(
      "/api/Account/verify-email",
      data,
    );
    return response.data;
  }

  async forgotPassword(
    data: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> {
    const response = await this.client.post<ForgotPasswordResponse>(
      "/api/Account/forgot-password",
      data,
    );
    return response.data;
  }

  async resetPassword(
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    const response = await this.client.post<ResetPasswordResponse>(
      "/api/Account/reset-password",
      data,
    );
    return response.data;
  }
}

export const accountsAPI = new AccountsAPI();
