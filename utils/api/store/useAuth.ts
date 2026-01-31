import { useCallback } from "react";
import {
  useForgotPassword,
  useLogin,
  useRegister,
  useResetPassword,
  useVerifyEmail,
} from "../accounts/api/hooks/useAccounts";
import { useAuthStore } from "./authStore";
import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "../accounts/api/types";
import { initializeApiClient } from "../client";

export const useAuth = () => {
  const authStore = useAuthStore();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const verifyMutation = useVerifyEmail();
  const forgotMutation = useForgotPassword();
  const resetMutation = useResetPassword();

  const handleLogin = useCallback(
    async (data: LoginRequest) => {
      authStore.setLoading(true);
      authStore.clearError();
      try {
        const response = await loginMutation.mutateAsync(data);
        authStore.setToken(response.token, response.refreshToken);
        authStore.setUser({
          id: response.id,
          email: response.email,
          userName: response.userName,
          imageUrl: response.imageUrl,
          roles: response.roles,
        });
        // Initialize API client ONCE with proper interceptors
        initializeApiClient(); // ← Remove token parameter
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Login failed. Please try again.";
        authStore.setError(errorMessage);
        throw err;
      } finally {
        authStore.setLoading(false);
      }
    },
    [authStore, loginMutation],
  );

  const handleRegister = useCallback(
    async (data: RegisterRequest) => {
      authStore.setLoading(true);
      authStore.clearError();
      try {
        const response = await registerMutation.mutateAsync(data);
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          "Registration failed. Please try again.";
        authStore.setError(errorMessage);
        throw err;
      } finally {
        authStore.setLoading(false);
      }
    },
    [authStore, registerMutation],
  );

  const handleVerifyEmail = useCallback(
    async (data: VerifyEmailRequest) => {
      authStore.setLoading(true);
      authStore.clearError();
      try {
        const response = await verifyMutation.mutateAsync(data);
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          "Email verification failed. Please try again.";
        authStore.setError(errorMessage);
        throw err;
      } finally {
        authStore.setLoading(false);
      }
    },
    [authStore, verifyMutation],
  );

  const handleForgotPassword = useCallback(
    async (data: ForgotPasswordRequest) => {
      authStore.setLoading(true);
      authStore.clearError();
      try {
        const response = await forgotMutation.mutateAsync(data);
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          "Password reset request failed. Please try again.";
        authStore.setError(errorMessage);
        throw err;
      } finally {
        authStore.setLoading(false);
      }
    },
    [authStore, forgotMutation],
  );

  const handleResetPassword = useCallback(
    async (data: ResetPasswordRequest) => {
      authStore.setLoading(true);
      authStore.clearError();
      try {
        const response = await resetMutation.mutateAsync(data);
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          "Password reset failed. Please try again.";
        authStore.setError(errorMessage);
        throw err;
      } finally {
        authStore.setLoading(false);
      }
    },
    [authStore, resetMutation],
  );

  const logout = useCallback(() => {
    authStore.logout();
    initializeApiClient(null);
  }, [authStore]);

  return {
    // Store state
    user: authStore.user,
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    error: authStore.error,

    // Actions
    login: handleLogin,
    register: handleRegister,
    verifyEmail: handleVerifyEmail,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    logout,

    // Store setters (if needed directly)
    setError: authStore.setError,
    clearError: authStore.clearError,
  };
};
