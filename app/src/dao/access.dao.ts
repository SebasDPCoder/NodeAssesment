/**
 * Access DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the `access` entity (singular).
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import Access from "../models/access.model";
import { CreateAccessDto, UpdateAccessDto, AccessResponseDto } from "../dto/access.dto";

/**
 * Inserts a new access record into the database.
 * @param data - Data required to create the access (CreateAccessDto).
 * @returns {Promise<AccessResponseDto>} - The created access record.
 */
export const createAccess = async (data: CreateAccessDto): Promise<AccessResponseDto> => {
    const access = await Access.create({
        role_id: data.role_id,
        document: data.document,
        password: data.password,
        is_active: data.is_active ?? true, // default value if not provided
    });
    return access.toJSON() as unknown as AccessResponseDto;
};
/**
 * Retrieves all active access records from the 'access' table.
 * @returns {Promise<AccessResponseDto[]>} - List of active access records.
 */
export const getActiveAccess = async (): Promise<AccessResponseDto[]> => {
    const accessList = await Access.findAll({ where: { is_active: true } });
    return accessList.map((a: any) => a.toJSON() as unknown as AccessResponseDto);
};

/**
 * Retrieves an access record by its ID.
 * @param id_access - Unique access identifier.
 * @returns {Promise<AccessResponseDto | null>} - The found access record or null if not found.
 */
export const getAccessById = async (id_access: number): Promise<AccessResponseDto | null> => {
    const access = await Access.findByPk(id_access);
    return access ? (access.toJSON() as unknown as AccessResponseDto) : null;
};

/**
 * Retrieves an active access record by its document.
 * This is a common operation for login authentication.
 * @param document - The unique document.
 * @returns {Promise<AccessResponseDto | null>} - The found access record or null.
 */
export const getActiveAccessByDocument = async (document: string): Promise<AccessResponseDto | null> => {
    const access = await Access.findOne({
        where: {
            document: document,
            is_active: true
        }
    });
    return access ? (access.toJSON() as unknown as AccessResponseDto) : null;
};

/**
 * Updates an existing access record by its ID.
 * @param id_access - Access identifier to update.
 * @param data - Data to update (UpdateAccessDto).
 * @returns {Promise<AccessResponseDto | null>} - The updated access record or null if not found.
 */
export const updateAccess = async (id_access: number, data: UpdateAccessDto): Promise<AccessResponseDto | null> => {
    const [rowsAffected, [updatedAccess]] = await Access.update(data, {
        where: { id_access },
        returning: true,
    });
    if (rowsAffected === 0) {
        return null;
    }
    return updatedAccess.toJSON() as unknown as AccessResponseDto;
};

/**
 * Performs a soft delete on an access record by marking it as inactive.
 * @param id_access - Access identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteAccess = async (id_access: number): Promise<boolean> => {
    const [rowsAffected] = await Access.update(
        { is_active: false },
        { where: { id_access } }
    );
    return rowsAffected > 0;
};