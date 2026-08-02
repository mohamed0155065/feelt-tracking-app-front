"use client";

import { useDashboardStore } from "../../dashboard/store//useDashboardStore";

/**
 * Connection Status
 *
 * Displays the current WebSocket connection state.
 *
 * Responsibilities:
 * - Reads the connection status.
 * - Displays the current connection state.
 *
 * Relationship with the application:
 * - Reads the connection status from useDashboardStore.
 * - Updated by useLiveTracking.
 * - Displayed inside the Navbar.
 */
export function ConnectionStatus() {
    const connectionStatus = useDashboardStore(
        (state) => state.connectionStatus
    );

    const config = {
        connected: {
            label: "Connected",
            color: "bg-green-500",
        },

        disconnected: {
            label: "Disconnected",
            color: "bg-red-500",
        },

        reconnecting: {
            label: "Reconnecting...",
            color: "bg-yellow-500",
        },
    };

    const status = config[connectionStatus];

    return (
        <div className="flex items-center gap-2">
            <span
                className={`h-2.5 w-2.5 rounded-full ${status.color}`}
            />

            <span className="text-sm text-gray-300">
                {status.label}
            </span>
        </div>
    );
}