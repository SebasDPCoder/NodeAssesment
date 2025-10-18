// Centralized Swagger schemas for the API
export const swaggerSchemas = {
    RegisterDto: {
        type: "object",
        required: ["document", "password", "full_name", "email"],
        properties: {
            document: { type: "string", description: "Unique document for the user", example: "1232322332" },
            password: { type: "string", description: "user password (will be hashed)", example: "pass123" },
            full_name: { type: "string", description: "Full name of the user", example: "Diomedes Diaz" },
            email: { type: "string", format: "email", description: "Unique email address", example: "diomedes@example.com" },
        }
    },
    LoginDto: {
        type: "object",
        required: ["document", "password"],
        properties: {
            document: { type: "string", description: "User document", example: "1232322332" },
            password: { type: "string", description: "user password", example: "pass123" }
        }
    },
    AuthResponseDto: {
        type: "object",
        properties: {
            token: { type: "string", description: "JWT token for authentication", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            user: {
                type: "object",
                properties: {
                    id_user: { type: "integer", example: 1 },
                    document: { type: "string", example: "davidmtz" },
                    full_name: { type: "string", example: "Diomedes Diaz" },
                    email: { type: "string", example: "diomedes@example.com" },
                    role: {
                        type: "object",
                        properties: {
                            id_role: { type: "integer", example: 2 },
                            name: { type: "string", example: "user" }
                        },
                        description: "Role object with id_role and name."
                    }
                },
                description: "user object with gender and role included."
            },
            message: { type: "string", example: "Login successful" }
        }
    },
    RegisterResponseDto: {
        type: "object",
        properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "user registered successfully" },
            user: {
                type: "object",
                properties: {
                    id_user: { type: "integer", example: 1 },
                    document: { type: "string", example: "1232322332" },
                    full_name: { type: "string", example: "Diomedes Diaz" },
                    email: { type: "string", example: "diomedes@example.com" },
                    role: {
                        type: "object",
                        properties: {
                            id_role: { type: "integer", example: 2 },
                            name: { type: "string", example: "user" }
                        },
                        description: "Role object with id_role and name."
                    }
                },
                description: "user object with role included."
            }
        }
    },
    userProfileDto: {
        type: "object",
        properties: {
            id_user: { type: "integer", example: 1 },
            access_id: { type: "integer", example: 10 },
            full_name: { type: "string", example: "David Martinez" },
            phone: { type: "string", description: "user's phone number (optional, no country code)", example: "3001112233" },
            email: { type: "string", example: "david@example.com" },
            birth_date: { type: "string", format: "date", example: "1995-05-20" },
            gender: {
                type: "object",
                properties: {
                    id_gender: { type: "integer", example: 1 },
                    name: { type: "string", example: "Male" }
                },
                description: "Gender object with id_gender and name."
            },
            role: {
                type: "object",
                properties: {
                    id_role: { type: "integer", example: 2 },
                    name: { type: "string", example: "user" }
                },
                description: "Role object with id_role and name."
            }
        }
    },
    ErrorResponseDto: {
        type: "object",
        properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Validation error" },
            errors: {
                type: "object",
                additionalProperties: { type: "string" },
                example: { email: "Email is required" }
            }
        }
    },
    CreateAddressDto: {
        type: "object",
        required: ["country", "department", "city", "postal_code", "street", "number"],
        properties: {
            country: { type: "string", description: "Country where the address is located", example: "Colombia" },
            department: { type: "string", description: "Department or state of the address", example: "Atlántico" },
            city: { type: "string", description: "City of the address", example: "Barranquilla" },
            postal_code: { type: "string", description: "Postal code of the address", example: "080001" },
            street: { type: "string", description: "Street name or avenue", example: "Calle 72" },
            number: { type: "string", description: "House, apartment, or building number", example: "No. 45-10" },
            is_active: { type: "boolean", description: "Whether the address is active (optional, defaults to true)", example: true }
        },
        description: "Data Transfer Object used to create a new address."
    },
    UpdateAddressDto: {
        type: "object",
        properties: {
            country: { type: "string", description: "Country where the address is located", example: "Colombia" },
            department: { type: "string", description: "Department or state of the address", example: "Atlántico" },
            city: { type: "string", description: "City of the address", example: "Barranquilla" },
            postal_code: { type: "string", description: "Postal code of the address", example: "080001" },
            street: { type: "string", description: "Street name or avenue", example: "Calle 72" },
            number: { type: "string", description: "House, apartment, or building number", example: "No. 45-10" },
            is_active: { type: "boolean", description: "Whether the address is active or inactive", example: true }
        },
        description: "Data Transfer Object used to update an existing address. All fields are optional."
    },
    AddressResponseDto: {
        type: "object",
        properties: {
            id_address: { type: "integer", description: "Unique identifier for the address", example: 1 },
            country: { type: "string", description: "Country where the address is located", example: "Colombia" },
            department: { type: "string", description: "Department or state of the address", example: "Atlántico" },
            city: { type: "string", description: "City of the address", example: "Barranquilla" },
            postal_code: { type: "string", description: "Postal code of the address", example: "080001" },
            street: { type: "string", description: "Street name or avenue", example: "Calle 72" },
            number: { type: "string", description: "House, apartment, or building number", example: "No. 45-10" },
            is_active: { type: "boolean", description: "Indicates whether the address is active or inactive", example: true },
            createdAt: { type: "string", format: "date-time", description: "Timestamp when the address was created", example: "2025-10-06T14:23:00.000Z" },
            updatedAt: { type: "string", format: "date-time", description: "Timestamp when the address was last updated", example: "2025-10-06T14:25:30.000Z" }
        },
        description: "Represents a full address record including its creation and update timestamps."
    },

    CreateCustomerDto: {
        type: "object",
        required: ["address_id", "full_name", "email"],
        properties: {
            address_id: {
                type: "integer",
                description: "Unique identifier of the address associated with the customer",
                example: 1,
            },
            full_name: {
                type: "string",
                description: "Full name of the customer",
                example: "Sebastián Pineda",
            },
            email: {
                type: "string",
                description: "Email address of the customer",
                example: "sebas.pineda@example.com",
            },
            is_active: {
                type: "boolean",
                description: "Indicates whether the customer account is active (optional, defaults to true)",
                example: true,
            },
        },
        description: "Data Transfer Object used to create a new customer.",
    },
    CreateProductDto: {
        type: "object",
        required: ["code", "name", "price"],
        properties: {
            code: {
                type: "string",
                description: "Unique product code used as identifier",
                example: "PRD-001",
            },
            name: {
                type: "string",
                description: "Name of the product",
                example: "Wireless Mouse",
            },
            price: {
                type: "number",
                description: "Unit price of the product",
                example: 49.99,
            },
            is_active: {
                type: "boolean",
                description: "Indicates whether the product is active (optional, defaults to true)",
                example: true,
            },
        },
        description: "Data Transfer Object used to create a new product.",
    }


};
