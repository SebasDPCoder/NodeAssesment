import { Access, User } from "../models";

export type AccessWithUser = Access & { user?: User };