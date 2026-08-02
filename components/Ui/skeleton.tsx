import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Skeleton
 *
 * UI primitive used across the app for loading placeholders.
 *
 * Why it lives in components/ui:
 * - It is not tied to any domain feature.
 * - It can be reused in Vehicles, Drivers, History, Dashboard, etc.
 * - Keeps feature components clean and focused on business logic.
 */

export type SkeletonProps = React.ComponentPropsWithoutRef<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "animate-pulse rounded-md bg-gray-700/50",
                "pointer-events-none select-none",
                className
            )}
            {...props}
        />
    );
}