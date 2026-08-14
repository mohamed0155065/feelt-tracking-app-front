import { QueryClient } from "@tanstack/react-query";

/**
 * React Query Client
 *
 * Creates the application's shared QueryClient.
 *
 * Responsibilities:
 * - Configures global query behavior.
 * - Controls caching and refetching.
 * - Defines shared query defaults.
 *
 * Relationship with the application:
 * - Used by QueryProvider.
 * - Shared by every React Query hook.
 * - Provides server-state caching.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,

      gcTime: 5 * 60 * 1000,

      retry: 1,

      refetchOnWindowFocus: false,

      refetchOnReconnect: true,

      refetchOnMount: false,
    },
  },
});