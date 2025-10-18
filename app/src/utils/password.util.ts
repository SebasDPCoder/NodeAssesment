/**
 * Password Service
 * ---------------
 * This service handles password encryption and validation operations.
 * 
 * It provides:
 *  - Password hashing using bcrypt
 *  - Password comparison for authentication
 *  - Password strength validation
 * 
 * This service follows security best practices for password handling.
 */

import bcrypt from 'bcrypt';
import { envConfig } from '../config/env';

/**
 * Hashes a plain text password using bcrypt.
 * 
 * @param password - Plain text password to hash
 * @returns Promise<string> - Hashed password
 * 
 * @example
 * const hashedPassword = await hashPassword('mySecurePassword123');
 * console.log(hashedPassword); // $2a$12$...
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(envConfig.BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Compares a plain text password with a hashed password.
 * 
 * @param password - Plain text password to compare
 * @param hashedPassword - Hashed password to compare against
 * @returns Promise<boolean> - True if passwords match, false otherwise
 * 
 * @example
 * const isValid = await comparePassword('myPassword', '$2a$12$...');
 * if (isValid) {
 *   console.log('Password is correct');
 * }
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    throw new Error(`Error comparing password: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

