import { OpenAPIV3 } from "openapi-types";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const errorResponseSchema = zodToJsonSchema(
  z.object({
    message: z.string(),
    statusCode: z.number(),
  })
) as OpenAPIV3.SchemaObject;
