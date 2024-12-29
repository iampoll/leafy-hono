import { Context, Next } from "hono";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import { env } from "@lib/env";

const publicPaths = [
  "/api/v1/login",
  "/api/v1/register",
  "/api/health",
  "/api/docs",
  "/api/openapi",
  "/api",
  "/",
];

const jwtAuth = jwt({
  secret: env.JWT_SECRET,
  alg: "HS256",
});

export const jwtMiddleware = async (
  c: Context<{ Variables: JwtVariables }>,
  next: Next
) => {
  if (publicPaths.includes(c.req.path)) {
    return next();
  }

  return jwtAuth(c, next);
};
