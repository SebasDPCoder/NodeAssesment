/**
 * Auth Controller
 * --------------
 * Handles user authentication and profile management.
 *
 * Features:
 *  - User registration (with strong password validation)
 *  - User login (returns JWT and user with role object)
 *  - Authenticated user profile retrieval (returns user and role)
 *
 * All responses and validations follow DTOs and Swagger documentation.
 * Clean code: all data access is in DAO, all responses use DTOs, and role is always included as an object.
 */


// --- Imports ---
import { Request, Response } from "express";
import * as userDao from "../dao/user.dao";
import { hashPassword, comparePassword, validatePasswordStrength } from "../services/password.service";
import { generateToken, verifyToken, extractTokenFromHeader } from "../services/jwt.service";
import { validateRegisterData, validateLoginFields } from "../services/validation.service";
import { RegisterDto, LoginDto, AuthResponseDto, ErrorResponseDto } from "../dto/auth.dto";
import Access from "../models/access.model";



// --- Helpers ---
/**
 * Builds the standard authentication response (token + user info + message).
 *
 * @param user - User entity
 * @param access - Access entity (must include role)
 * @param message - Response message
 * @returns {AuthResponseDto} - Standardized authentication response (user includes role object)
 */
function buildAuthResponse({ user, access }: { user: any; access: any }, message: string): AuthResponseDto {
  const accessAny = access as any;
  const userAny = user as any;
  return {
    token: generateToken({
      id_user: userAny.id_user,
      document: accessAny.document,
      role_id: accessAny.role_id
    }),
    user: ({
      id_user: userAny.id_user,
      document: accessAny.document,
      fullname: userAny.fullname,
      email: userAny.email,
      role: accessAny.role ? {
        id_role: accessAny.role.id_role,
        name: accessAny.role.name
      } : undefined
    } as any),
    message
  };
}


/**
 * Registers a new user.
 * Steps:
 *  - Validates registration data (DTO)
 *  - Checks for duplicate document and email
 *  - Validates password strength (strong password required)
 *  - Hashes password
 *  - Creates user and access records (DAO)
 *  - Returns user data with role object (no token)
 */
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const registerData: RegisterDto = req.body;
    const validationError = validateRegisterData(registerData);
    if (validationError) return res.status(400).json(validationError as ErrorResponseDto);

    // Check for duplicate document
    const existingAccess = await userDao.findByDocument(registerData.document);
    if (existingAccess) {
      return res.status(409).json({ success: false, message: 'Document already exists' } as ErrorResponseDto);
    }
    // Check for duplicate email
    const existingEmail = await userDao.findByEmail(registerData.email);
    if (existingEmail) {
      return res.status(409).json({ success: false, message: 'Email is already registered' } as ErrorResponseDto);
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(registerData.password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet security requirements',
        errors: { password: passwordValidation.errors.join('; ') }
      } as ErrorResponseDto);
    }

    // Create access and user
    const hashedPassword = await hashPassword(registerData.password);
    const { user, access } = await userDao.createUserWithAccess(registerData, hashedPassword);
    const accessAny = access as any;
    const userAny = user as any;
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id_user: userAny.id_user,
        document: accessAny.document,
        fullname: userAny.fullname,
        email: userAny.email,
        role: accessAny.role ? {
          id_role: accessAny.role.id_role,
          name: accessAny.role.name
        } : undefined
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during registration',
      errors: { server: error instanceof Error ? error.message : 'Unknown error' }
    } as ErrorResponseDto);
  }
};


/**
 * Authenticates a user (login).
 * Steps:
 *  - Validates login data (DTO)
 *  - Finds access and user (DAO, includes role)
 *  - Checks status and password
 *  - Returns token and user data (user includes role object)
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const loginData: LoginDto = req.body;
    const validationError: any = validateLoginFields(loginData);
    if (validationError) return res.status(400).json(validationError as ErrorResponseDto);

    const access = await userDao.findByDocument(loginData.document) as Access & { user?: any };
    if (!access || !access.user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' } as ErrorResponseDto);
    }
    if (!access.is_active) {
      return res.status(403).json({ success: false, message: 'Account is deactivated' } as ErrorResponseDto);
    }
    const isPasswordValid = await comparePassword(loginData.password, access.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' } as ErrorResponseDto);
    }
    return res.status(200).json(buildAuthResponse({ user: access.user, access }, 'Login successful'));
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during login',
      errors: { server: error instanceof Error ? error.message : 'Unknown error' }
    } as ErrorResponseDto);
  }
};


/**
 * Retrieves the authenticated user profile.
 * Steps:
 *  - Extracts and verifies token
 *  - Finds user by ID (DAO, includes access and role)
 *  - Returns user profile data including role (no sensitive fields, always as object)
 */
export const getProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization token required' } as ErrorResponseDto);
    }
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' } as ErrorResponseDto);
    }
    // Ensure the payload contains id_user
    const userId = (payload as any).id_user;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Invalid token: id_user not present' } as ErrorResponseDto);
    }
    // Get user with access and role in one query, cast to any for nested access
    const user: any = await userDao.getUserWithRoleById(userId);
    if (!user || !user.access || !user.access.role) {
      return res.status(404).json({ success: false, message: 'User or role not found' } as ErrorResponseDto);
    }
    const userProfile = {
      id_user: user.id_user,
      access_id: user.access_id,
      fullname: user.fullname,
      email: user.email,
      birth_date: user.birth_date,
      role: user.access.role ? {
        id_role: user.access.role.id_role,
        name: user.access.role.name
      } : undefined
    };
    return res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: userProfile
    });
  } catch (error) {
    console.error('Error retrieving profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving profile',
      errors: { server: error instanceof Error ? error.message : 'Unknown error' }
    } as ErrorResponseDto);
  }
};