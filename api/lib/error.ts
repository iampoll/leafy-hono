export type ApiErrorType = {
  message: string;
  statusCode: number;
  data?: unknown;
  stack?: string;
};

export const createError = (
  message: string,
  statusCode: number,
  data?: unknown
): ApiErrorType & Error => {
  const error = new Error(message) as ApiErrorType & Error;
  error.statusCode = statusCode;
  error.data = data;
  return error;
};

export const createApiError = {
  badRequest: (message = "Bad Request", data?: unknown) =>
    createError(message, 400, data),

  unauthorized: (
    message = "Please login to access this resource",
    data?: unknown
  ) => createError(message, 401, data),

  forbidden: (
    message = "You don't have permission to access this resource",
    data?: unknown
  ) => createError(message, 403, data),

  notFound: (message = "Resource not found", data?: unknown) =>
    createError(message, 404, data),

  conflict: (message = "Resource already exists", data?: unknown) =>
    createError(message, 409, data),

  internal: (message = "Internal Server Error", data?: unknown) =>
    createError(message, 500, data),
};

export const isApiError = (error: unknown): error is ApiErrorType & Error => {
  return (
    error instanceof Error &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
  );
};
