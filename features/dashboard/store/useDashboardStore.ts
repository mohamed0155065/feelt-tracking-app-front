import { create } from "zustand";

import { ConnectionStatus } from "@/features/tracking/types/connection.types";

/**
 * Dashboard Global Store
 *
 * This Zustand store manages the shared dashboard UI state
 * that is accessed by multiple components.
 *
 * Responsibilities:
 * - Controls the Sidebar visibility.
 * - Stores the selected vehicle.
 * - Tracks the WebSocket connection status.
 *
 * Relationship with the application:
 * - Navbar updates the Sidebar state.
 * - Sidebar reads the Sidebar visibility.
 * - VehicleList updates the selected vehicle.
 * - Map reads the selected vehicle.
 * - useLiveTracking updates the connection status.
 * - Any subscribed component automatically re-renders
 *   when its selected state changes.
 */
interface DashboardState {
    /* -------------------------------------------------------------------------- */
    /*                                  UI State                                  */
    /* -------------------------------------------------------------------------- */

    /**
     * Controls whether the Sidebar is visible.
     */
    sidebarOpen: boolean;

    /**
     * Stores the currently selected vehicle.
     *
     * Used to synchronize the Vehicle List and Map.
     */
    selectedVehicleId: number | null;

    /**
     * Represents the current WebSocket connection state.
     */
    connectionStatus: ConnectionStatus;

    /* -------------------------------------------------------------------------- */
    /*                                  Actions                                   */
    /* -------------------------------------------------------------------------- */

    /**
     * Toggles the Sidebar visibility.
     */
    toggleSidebar: () => void;

    /**
     * Opens or closes the Sidebar explicitly.
     */
    setSidebarOpen: (open: boolean) => void;

    /**
     * Updates the currently selected vehicle.
     */
    setSelectedVehicleId: (id: number | null) => void;

    /**
     * Updates the WebSocket connection status.
     */
    setConnectionStatus: (status: ConnectionStatus) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    /* -------------------------------------------------------------------------- */
    /*                                  Initial State                             */
    /* -------------------------------------------------------------------------- */

    sidebarOpen: true,

    selectedVehicleId: null,

    connectionStatus: "disconnected",

    /* -------------------------------------------------------------------------- */
    /*                                   Actions                                  */
    /* -------------------------------------------------------------------------- */

    toggleSidebar: () =>
        set((state) => ({
            sidebarOpen: !state.sidebarOpen,
        })),

    setSidebarOpen: (open) =>
        set({
            sidebarOpen: open,
        }),

    setSelectedVehicleId: (id) =>
        set({
            selectedVehicleId: id,
        }),

    setConnectionStatus: (status) =>
        set({
            connectionStatus: status,
        }),
}));