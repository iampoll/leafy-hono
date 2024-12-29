import { ConvexError } from "convex/values";
import { Context } from "hono";
import { isApiError } from "./error";

type ControllerFunction = (c: Context) => Promise<Response>;

export const asyncHandler = (fn: ControllerFunction): ControllerFunction => {
  return async (c: Context) => {
    try {
      return await fn(c);
    } catch (error: unknown) {
      if (error instanceof ConvexError) {
        const status = error.data?.statusCode || 409;
        const message = error.data?.message || "Database operation failed";
        return c.json({ message, statusCode: status }, status);
      }

      if (isApiError(error)) {
        return c.json(
          {
            message: error.message,
            statusCode: error.statusCode,
          },
          error.statusCode as 400 | 401 | 403 | 404 | 409 | 500
        );
      }

      return c.json(
        {
          message:
            process.env.NODE_ENV === "production"
              ? "Internal Server Error"
              : error instanceof Error
                ? error.message
                : "Unknown error",
          statusCode: 500,
        },
        500
      );
    }
  };
};
