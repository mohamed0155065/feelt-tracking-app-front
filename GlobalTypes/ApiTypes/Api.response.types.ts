/**
 * API Response
 *
 * Represents the standard success response returned
 * by the backend API.
 *
 * Responsibilities:
 * - Wraps the response data.
 * - Provides a success flag.
 * - Provides a response message.
 *
 * Relationship with the application:
 * - Used by all Vehicles API functions.
 * - Shared across the Vehicles feature.
 */
export interface ApiResponse<T> {
    success: boolean;

    data: T;

    message: string;
}