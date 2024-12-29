import { errorResponseSchema } from "@v1/schemas";
import { loginSchema, registerSchema } from "@v1/schemas/auth";

export const authDocs = {
  register: {
    description: "Register a new user",
    tags: ["auth"],
    requestBody: {
      description: "User registration details",
      content: {
        "application/json": {
          schema: registerSchema.body,
        },
      },
    },
    responses: {
      "201": {
        description: "User registered successfully",
        content: {
          "application/json": {
            schema: registerSchema.response,
          },
        },
      },
      "409": {
        description: "User already exists",
        content: {
          "application/json": {
            schema: errorResponseSchema,
          },
        },
      },
    },
  },
  login: {
    description: "Login user",
    tags: ["auth"],
    requestBody: {
      description: "User login details",
      content: {
        "application/json": {
          schema: loginSchema.body,
        },
      },
    },
    responses: {
      "200": {
        description: "User logged in successfully",
        content: {
          "application/json": {
            schema: loginSchema.response,
          },
        },
      },
      "401": {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: errorResponseSchema,
          },
        },
      },
    },
  },
};
