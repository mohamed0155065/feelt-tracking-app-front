import { Skeleton } from "@/components/Ui/skeleton";

/**
 * Dashboard Loading
 *
 * Displays a skeleton UI while the Dashboard
 * page is loading.
 *
 * Responsibilities:
 * - Displays placeholder content.
 * - Preserves the dashboard layout.
 *
 * Relationship with the application:
 * - Automatically rendered by Next.js App Router.
 * - Replaced by the Dashboard page once loading finishes.
 */
export default function Loading() {
    return (
        <div className="flex h-screen">
            <aside
                className="
          flex w-64 flex-col
          space-y-4
          border-l border-white/5
          bg-[#111827]
          p-4
        "
            >
                <Skeleton className="h-8 w-32" />

                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-12 w-full"
                    />
                ))}
            </aside>

            <main
                className="
          flex flex-1 flex-col
          space-y-6
          p-6
        "
            >
                <Skeleton className="h-16 w-full" />

                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-32"
                        />
                    ))}
                </div>

                <Skeleton className="h-96 w-full" />
            </main>
        </div>
    );
}