import { errorResponseSchema } from "../schemas";
import { getUserResponseSchema } from "../schemas/users";

export const usersDocs = {
  getUser: {
    description: "Get user profile",
    tags: ["users"],
    responses: {
      "200": {
        description: "User profile retrieved successfully",
        content: {
          "application/json": {
            schema: getUserResponseSchema,
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
