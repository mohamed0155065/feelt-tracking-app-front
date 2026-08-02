import { create } from "zustand";

/**
 * Vehicle Selection Store
 *
 * This Zustand store manages the currently selected vehicle
 * across the application.
 *
 * Responsibilities:
 * - Stores the ID of the selected vehicle.
 * - Provides actions to select or clear the current selection.
 *
 * Relationship with the application:
 * - Vehicle List updates the selected vehicle when the user clicks one.
 * - Map reads the selected vehicle ID to focus the corresponding marker.
 * - Vehicle List reads the selected vehicle ID to highlight
 *   the selected item.
 * - Vehicle Details uses the selected vehicle ID to display
 *   information about the selected vehicle.
 * - Any subscribed component automatically re-renders
 *   when the selected vehicle changes.
 */
interface VehicleSelectionState {
  /**
   * ID of the currently selected vehicle.
   *
   * null means no vehicle is selected.
   */
  selectedVehicleId: string | null;

  /**
   * Selects a vehicle by its ID.
   */
  selectVehicle: (id: string) => void;

  /**
   * Clears the current vehicle selection.
   */
  clearSelection: () => void;
}

export const useVehicleSelectionStore =
  create<VehicleSelectionState>((set) => ({
    /**
     * Initially, no vehicle is selected.
     */
    selectedVehicleId: null,

    /**
     * Updates the currently selected vehicle.
     *
     * The store keeps only the vehicle ID because the
     * complete vehicle data already exists in React Query.
     */
    selectVehicle: (id) =>
      set({
        selectedVehicleId: id,
      }),

    /**
     * Removes the current selection.
     */
    clearSelection: () =>
      set({
        selectedVehicleId: null,
      }),
  }));