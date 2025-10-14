/**
 * Address DAO
 * ----------------
 * This file contains the Data Access Object (DAO) functions for the address entity (singular).
 *
 * The DAO pattern encapsulates database access logic, separating it from
 * controllers and ensuring better code organization.
 */

import Address from "../models/address.model";
import { CreateAddressDto, UpdateAddressDto, AddressResponseDto } from "../dto/address.dto";

/**
 * A consistent DTO that reflects the database structure for responses.
 * This is used to ensure the DAO returns a standardized object that
 * matches the ORM model's attributes, avoiding inconsistencies.
 */

/**
 * Inserts a new address record into the database.
 * @param data - Data required to create the address (CreateAddressesDto).
 * @returns {Promise<AddressResponseDto>} - The created address record.
 */
export const createAddress = async (data: CreateAddressDto): Promise<AddressResponseDto> => {
    const newAddress = await Address.create({
        country: data.country,
        department: data.department,
        city: data.city,
        postal_code: data.postal_code,
        street: data.street,
        number: data.number,
        is_active: data.is_active || true,
    });
    return newAddress.toJSON() as AddressResponseDto;
};

/**
 * Retrieves all active addresses from the 'address' table.
 * @returns {Promise<AddressResponseDto[]>} - List of active addresses.
 */
export const getActiveAddress = async (): Promise<AddressResponseDto[]> => {
    const address = await Address.findAll({ where: { is_active: true } });

    return address.map((a: any) => a.toJSON() as AddressResponseDto);
};

/**
 * Retrieves an address record by its unique ID.
 * @param id_address - Unique address identifier.
 * @returns {Promise<AddressResponseDto | null>} - The found address record or null if not found.
 */
export const getAddressById = async (id_address: number): Promise<AddressResponseDto | null> => {
    const address = await Address.findByPk(id_address);

    if (!address) {
        return null;
    }
    return address ? (address.toJSON() as AddressResponseDto): null;
};

/**
 * Updates an existing address record by its ID.
 * @param id_address - Address identifier to update.
 * @param data - Data to update (UpdateAddressDto).
 * @returns {Promise<AddressResponseDto | null>} - The updated address record or null if not found.
 */
export const updateAddress = async (id_address: number, data: UpdateAddressDto): Promise<AddressResponseDto | null> => {
    const [rowsAffected, [updatedAddress]] = await Address.update(data, {
        where: { id_address },
        returning: true,
    });

    if (rowsAffected === 0) {
        return null;
    }
    return updatedAddress.toJSON() as AddressResponseDto;
};

/**
 * Performs a soft delete on an address record by marking it as inactive.
 * @param id_address - Address identifier to soft delete.
 * @returns {Promise<boolean>} - True if the record was updated, false otherwise.
 */
export const softDeleteAddress = async (id_address: number): Promise<boolean> => {
    const [rowsAffected] = await Address.update(
        { is_active: false },
        { where: { id_address } }
    );

    return rowsAffected > 0;
};
