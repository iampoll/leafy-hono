import { z } from "zod";
import { OpenAPIV3 } from "openapi-types";
import { zodToJsonSchema } from "zod-to-json-schema";

const registerBodySchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least 1 special character"
    ),
});

const registerResponseSchema = z.object({
  message: z.string(),
  userId: z.string(),
});

export const registerSchema = {
  body: zodToJsonSchema(registerBodySchema) as OpenAPIV3.SchemaObject,
  response: zodToJsonSchema(registerResponseSchema) as OpenAPIV3.SchemaObject,
  zodBody: registerBodySchema,
  zodResponse: registerResponseSchema,
};
