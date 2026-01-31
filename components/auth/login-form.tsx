"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/utils/api/store/useAuth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const {
    login,
    isLoading: authLoading,
    error: authError,
    isAuthenticated,
    user,
  } = useAuth();
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState(false);

  useEffect(() => {
    console.log("Auth state changed:", { isAuthenticated, user, authLoading });
  }, [isAuthenticated, user, authLoading]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setSuccessMessage(true);
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, router]);

  async function onSubmit(values: LoginFormValues) {
    setLocalError(null);
    setSuccessMessage(false);

    try {
      const response = await login(values);
      console.log("Login response:", response);
      // Success! useEffect will handle redirect
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please check your credentials and try again.";
      setLocalError(errorMessage);
      form.setError("password", {
        message: errorMessage,
      });
    }
  }

  const handleBackClick = () => {
    router.back();
  };

  const displayError = localError || authError;
  const isLoading = authLoading;

  return (
    <div className="w-full max-w-sm">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="mb-8 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 group"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-900">
              Login Successful!
            </p>
            <p className="text-sm text-green-700">
              Redirecting to dashboard...
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {displayError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-900">Login Failed</p>
            <p className="text-sm text-red-700">{displayError}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Email Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="admin@argio.tech"
                    type="email"
                    disabled={isLoading}
                    autoComplete="email"
                    className="border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <Input
                      placeholder="••••••••"
                      type="password"
                      disabled={isLoading}
                      autoComplete="current-password"
                      className="pl-10 border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          Sign up here
        </Link>
      </div>
    </div>
  );
}
