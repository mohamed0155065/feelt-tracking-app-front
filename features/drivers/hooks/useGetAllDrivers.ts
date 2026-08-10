/**
 * Get All Drivers Query Hook
 *
 * Manages fetching and caching the drivers list.
 *
 * Responsibilities:
 *
 * - Fetches all drivers.
 * - Manages loading and error states.
 * - Caches driver data using React Query.
 * - Refetches drivers when the query is invalidated.
 *
 * Relationship with the application:
 *
 * - Uses getAllDrivers() from driverApi.ts.
 * - Provides driver data to the UI.
 * - Shares the ["drivers"] query cache with driver mutations.
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllDrivers } from "../api/driverApi";

export function useGetAllDrivers() {
    return useQuery({
        queryKey: ["drivers"],

        queryFn: getAllDrivers,
    });
}
