/**
 * API Error Response
 *
 * Represents validation or request errors returned
 * by the backend.
 *
 * Responsibilities:
 * - Stores the error message.
 * - Stores field validation errors.
 *
 * Relationship with the application:
 * - Used by API functions.
 * - Used by React Query error handling.
 * - Used by Forms to display validation messages.
 */
export interface ApiErrorResponse {
    message: string;

    errors: Record<string, string[]>;
}