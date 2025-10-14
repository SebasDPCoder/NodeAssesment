import Access from "../models/access.model";
import Role from "../models/role.model";
import { RegisterDto } from "../dto/auth.dto";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../dto/user.dto";
/**
 * Finds an access record by document and returns the access along with the associated user.
 * @param document - Document to search for.
 * @returns The access record with the associated user, or null if not found.
 */
export const findByDocument = async (document: string) => {
    return Access.findOne({
        where: { document },
        include: [
            { model: User, as: "user", include: [ { model: require("../models/gender.model").default, as: "gender" } ] },
            { model: Role, as: "role" }
        ]
    });
};

/**
 * Finds a user by email address.
 * @param email - Email to search for.
 * @returns The user record, or null if not found.
 */
export const findByEmail = async (email: string) => {
    return User.findOne({ where: { email } });
};

/**
 * Creates both access and user in a single transaction.
 * By default, the user role is id 2 (adjust if your system uses a different id).
 * @param registerData - Registration data for the user.
 * @param hashedPassword - Hashed password for the access record.
 * @returns The created user and access records.
 */
export const createUserWithAccess = async (registerData: RegisterDto, hashedPassword: string) => {
    const roleId = (registerData as any).role_id || 2;
    const access = await Access.create({
        document: registerData.document,
        password: hashedPassword,
        role_id: roleId,
        is_active: true
    });
    // Recargar el access para incluir el role y el gender
    const accessWithRole = await Access.findByPk(access.id_access, { include: [ { model: Role, as: "role" } ] });
    const user = await User.create({
        access_id: access.id_access,
        fullname: registerData.fullname,
        email: registerData.email,
        is_active: true
    });
    // Recargar el user para incluir el gender
    const userWithGender = await User.findByPk(user.id_user, { include: [ { model: require("../models/gender.model").default, as: "gender" } ] });
    return { user: userWithGender, access: accessWithRole };
};

/**
 * Retrieves a user by their unique ID, including:
 *  - The associated access (with role object)
 *  - The associated gender object
 *
 * This ensures the profile endpoint always returns both role and gender as nested objects,
 * regardless of the user's role (admin, user, etc.).
 *
 * @param id_user - User's unique identifier.
 * @returns The user record with access (including role) and gender, or null if not found.
 */
export const getUserWithRoleById = async (id_user: number) => {
    return User.findByPk(id_user, {
        include: [
            {
                model: Access,
                as: "access",
                include: [
                    {
                        model: Role,
                        as: "role"
                    }
                ]
            },
        ]
    });
};



/**
 * Inserts a new user record into the database.
 * @param data - Data required to create the user (CreateSellerDto).
 * @returns {Promise<SellerResponseDto>} - The created user record.
 */
export const createUser = async (data: CreateSellerDto): Promise<SellerResponseDto> => {
    const newUser = await User.create({
        access_id: data.access_id,
        gender_id: data.gender_id,
        fullname: data.fullname,
        email: data.email,
        birth_date: data.birth_date,
        is_active: data.is_active ?? true,
    });
    return newUser.toJSON() as any;
};

/**
 * Retrieves all users from the 'user' table.
 * @returns {Promise<SellerResponseDto[]>} - List of all users.
 */
export const getUsers = async (): Promise<SellerResponseDto[]> => {
    const users = await User.findAll();
    return users.map((a) => a.toJSON() as SellerResponseDto);
};

/**
 * Retrieves all active users from the 'user' table.
 * @returns {Promise<SellerResponseDto[]>} - List of active users.
 */
export const getActiveUsers = async (): Promise<SellerResponseDto[]> => {
    const users = await User.findAll({ where: { is_active: true } });
    return users.map((a) => a.toJSON() as SellerResponseDto);
};

/**
 * Retrieves a user record by its unique ID.
 * @param id_user - Unique user identifier.
 * @returns {Promise<SellerResponseDto | null>} - The found user record or null if not found.
 */
export const getUserById = async (id_user: number): Promise<SellerResponseDto | null> => {
    const user = await User.findByPk(id_user);
    if (!user) {
        return null;
    }
    return user.toJSON() as SellerResponseDto;
};

/**
 * Updates an existing user record by its ID.
 * @param id_user - User identifier to update.
 * @param data - Data to update (UpdateSellerDto).
 * @returns {Promise<SellerResponseDto | null>} - The updated user record or null if not found.
 */
export const updateUser = async (id_user: number, data: UpdateSellerDto): Promise<SellerResponseDto | null> => {
    const [rowsAffected, users] = await User.update(data, {
        where: { id_user },
        returning: true,
    });
    if (rowsAffected > 0 && users.length > 0) {
        return users[0].toJSON() as SellerResponseDto;
    }
    return null;
};

/**
 * Performs a soft delete on a user record by marking it as inactive.
 * @param id_user - User identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteUser = async (id_user: number): Promise<boolean> => {
    const [rowsAffected] = await User.update(
        { is_active: false },
        { where: { id_user } }
    );
    return rowsAffected > 0;
};
