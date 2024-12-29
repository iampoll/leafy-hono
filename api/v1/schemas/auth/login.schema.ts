import { z } from "zod";
import { OpenAPIV3 } from "openapi-types";
import { zodToJsonSchema } from "zod-to-json-schema";

const loginBodySchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});

const loginResponseSchema = z.object({
  message: z.string(),
  accessToken: z.string(),
});

export const loginSchema = {
  body: zodToJsonSchema(loginBodySchema) as OpenAPIV3.SchemaObject,
  response: zodToJsonSchema(loginResponseSchema) as OpenAPIV3.SchemaObject,
  zodBody: loginBodySchema,
  zodResponse: loginResponseSchema,
};
