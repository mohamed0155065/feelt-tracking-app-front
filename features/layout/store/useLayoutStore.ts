import { create } from "zustand";
/**
 * Layout Global Store
 *
 * This Zustand store manages the shared layout state that is used
 * across multiple layout components.
 *
 * Responsibilities:
 * - Controls the Sidebar visibility.
 * - Provides actions to open, close, or toggle the Sidebar.
 *
 * Relationship with the application:
 * - Navbar updates the sidebar state when the menu button is clicked.
 * - Sidebar reads the sidebar state to determine whether it should
 *   be expanded or collapsed.
 * - Any layout component can subscribe to this store and automatically
 *   re-render when the sidebar state changes.
 */

interface LayoutState {
    sidebarOpen: boolean;

    toggleSidebar: () => void;

    setSidebarOpen: (open: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
    sidebarOpen: true,

    toggleSidebar: () =>
        set((state) => ({
            sidebarOpen: !state.sidebarOpen,
        })),

    setSidebarOpen: (open) =>
        set({
            sidebarOpen: open,
        }),
}));