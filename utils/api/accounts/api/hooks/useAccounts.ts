import { useMutation } from "@tanstack/react-query";
import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "../types";
import { accountsAPI } from "../accountsAPI";

export const accountKeys = {
  all: ["accounts"] as const,
  login: () => [...accountKeys.all, "login"] as const,
  register: () => [...accountKeys.all, "register"] as const,
  verify: () => [...accountKeys.all, "verify"] as const,
  forgot: () => [...accountKeys.all, "forgot"] as const,
  reset: () => [...accountKeys.all, "reset"] as const,
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => accountsAPI.login(data),
    mutationKey: accountKeys.login(),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => accountsAPI.register(data),
    mutationKey: accountKeys.register(),
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => accountsAPI.verifyEmail(data),
    mutationKey: accountKeys.verify(),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      accountsAPI.forgotPassword(data),
    mutationKey: accountKeys.forgot(),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => accountsAPI.resetPassword(data),
    mutationKey: accountKeys.reset(),
  });
};
