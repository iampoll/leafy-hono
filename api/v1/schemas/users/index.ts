import { OpenAPIV3 } from "openapi-types";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const getUserResponseSchema = zodToJsonSchema(
  z.object({
    id: z.string(),
    name: z.optional(z.string()),
    email: z.string(),
    isOnboarded: z.boolean(),
    nameSlug: z.optional(z.string()),
  })
) as OpenAPIV3.SchemaObject;
