import { Access, User } from "../models";

/**
 * AccessWithUser Type
 * -------------------------
 * This type represents a User object that may optionally include
 * its related Access record.
 *
 * It is useful when performing queries that include user-access relationships,
 * for example when using Sequelize `include` to fetch both models together.
 */
export type AccessWithUser = User & { access?: Access};