import { create } from "zustand";

import { ConnectionStatus } from "../types/connection.types";

/**
 * Connection Store
 *
 * This Zustand store manages the current WebSocket connection
 * state for the live tracking feature.
 *
 * Responsibilities:
 * - Stores the current connection status.
 * - Provides actions to update the connection state.
 *
 * Relationship with the application:
 * - useLiveTracking updates the connection status whenever
 *   the WebSocket state changes.
 * - StatusBadge reads the connection status to display
 *   the current connection state.
 * - Any tracking component can subscribe to this store
 *   and automatically re-render when the connection changes.
 */
interface ConnectionState {
    connectionStatus: ConnectionStatus;

    setConnectionStatus: (status: ConnectionStatus) => void;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
    /**
     * Connection State
     *
     * The application starts disconnected until
     * the WebSocket connection is successfully established.
     */
    connectionStatus: "disconnected",

    /**
     * Connection Action
     *
     * Updates the current WebSocket connection status.
     *
     * Relationship with the application:
     * - Called by useLiveTracking.
     * - Notifies every subscribed component about
     *   the latest connection state.
     */
    setConnectionStatus: (status) =>
        set({
            connectionStatus: status,
        }),
}));