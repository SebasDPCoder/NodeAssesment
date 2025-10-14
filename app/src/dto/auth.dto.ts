/**
 * Authentication DTOs
 * -------------------
 * This file defines the Data Transfer Objects (DTO) for authentication operations.
 *
 * DTOs are used to:
 *  - Standardize the data received or sent through the API.
 *  - Validate and type the objects that go into the controllers.
 *  - Avoid directly exposing the database models.
 */

/**
 * Data Transfer Object for user registration.
 *
 * @property {string} document - Unique document for login.
 * @property {string} password - User password (will be encrypted).
 * @property {string} fullname - Full name of the user.
 * @property {string} email - Unique email address of the user.
 */
export interface RegisterDto {
  document: string;
  password: string;
  fullname: string;
  email: string;
}

/**
 * Data Transfer Object for user login.
 *
 * @property {string} document - document for authentication.
 * @property {string} password - User password.
 *
 */
export interface LoginDto {
  document: string;
  password: string;
}

/**
 * Data Transfer Object for authentication response.
 *
 * @property {string} token - JWT token for authenticated requests.
 * @property {object} user - User information without sensitive data.
 * @property {string} message - Success message.
 *
 */
export interface AuthResponseDto {
  token: string;
  message: string;
  user: {
    id_user: number;
    document: string;
    fullname: string;
    email: string;
    id_role: number;
  };
}

/**
 * Data Transfer Object for user profile response.
 *
 * @property {number} id_user - Unique user identifier.
 * @property {string} document - document.
 * @property {string} fullname - Full name of the user.
 * @property {string} email - Email address.
 * @property {number} id_role - Role identifier.
 *
 */
export interface UserProfileDto {
  id_user: number;
  document: string;
  fullname: string;
  email: string;
  id_role: number;
}

/**
 * ErrorResponseDto
 * ----------------
 * TypeScript type for error responses returned by the API.
 *
 * This type matches the ErrorResponseDto schema in Swagger/OpenAPI documentation.
 * It is used for all error responses (validation, authentication, server errors, etc).
 *
 * @property {boolean} success - Always false for error responses.
 * @property {string} message - Human-readable error message.
 * @property {object} [errors] - Optional detailed field errors (e.g., { email: "Email is required" }).
 */
export type ErrorResponseDto = {
  success: false;
  message: string;
  errors?: { [key: string]: string };
}