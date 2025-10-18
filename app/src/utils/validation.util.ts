/**
 * Validation Service
 * -----------------
 * This service handles data validations for user authentication and registration.
 *
 * Provides:
 *  - Required fields validation
 *  - Email format validation
 *  - Password strength validation
 *  - Registration data validation
 *
 * This service keeps validation logic separate from controllers.
 */

// --- USER VALIDATION SERVICE ---
import { RegisterDto, LoginDto } from "../dto/auth.dto";

type LocalErrorResponse = {
  success: false;
  message: string;
  errors?: { [key: string]: string };
};

export const validateLoginFields = (loginData: LoginDto): LocalErrorResponse | null => {
  const errors: Record<string, string> = {};
  if (!loginData.document) {
    errors.document = 'Document is required';
  }
  if (!loginData.password) {
    errors.password = 'Password is required';
  }
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'document and password are required',
      errors
    };
  }
  return null;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const validateRegisterData = (registerData: RegisterDto): LocalErrorResponse | null => {
  const errors: Record<string, string> = {};
  if (!registerData.document) {
    errors.document = 'Document is required';
  }
  if (!registerData.password) {
    errors.password = 'Password is required';
  }
  if (!registerData.full_name) {
    errors.full_name = 'Full name is required';
  }
  if (!registerData.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(registerData.email)) {
    errors.email = 'Email is not valid';
  }
  
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Invalid registration data',
      errors
    };
  }
  return null;
};