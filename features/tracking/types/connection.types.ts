/**
 * Represents all possible WebSocket connection states.
 *
 * These states are shared across the tracking feature
 * to ensure type safety and prevent invalid values.
 */
export type ConnectionStatus =
    | "connected"
    | "disconnected"
    | "reconnecting";