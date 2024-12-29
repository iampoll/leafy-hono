import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { describeRoute } from "hono-openapi";
import { registerSchema, loginSchema } from "@v1/schemas/auth";
import { register, login } from "@v1/controllers/auth.controller";
import { authDocs } from "@v1/docs/auth.docs";

const authRouter = new Hono();

authRouter.post(
  "/register",
  describeRoute(authDocs.register),
  zValidator("json", registerSchema.zodBody),
  register
);

authRouter.post(
  "/login",
  describeRoute(authDocs.login),
  zValidator("json", loginSchema.zodBody),
  login
);

export { authRouter };
