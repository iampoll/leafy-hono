import { Context } from "hono";

import { api } from "../../../convex/_generated/api";
import { convexClient } from "../../lib/convex";

import { asyncHandler } from "../../lib/asyncHandler";
import { hashPassword, comparePasswords } from "../../lib/password";
import { createToken } from "../../lib/jwt";
import { createApiError } from "../../lib/error";

export const register = asyncHandler(async (c: Context) => {
  const body = await c.req.json();
  const { email, password } = body;

  const hashedPassword = await hashPassword(password);

  const { userId } = await convexClient.mutation(api.auth.register, {
    email,
    hashedPassword,
  });

  return c.json({ message: "Register successful", userId }, 201);
});

export const login = asyncHandler(async (c: Context) => {
  const body = await c.req.json();
  const { email, password } = body;

  const { user } = await convexClient.mutation(api.auth.login, { email });

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw createApiError.unauthorized("Invalid credentials");
  }

  const token = await createToken(user._id);

  return c.json(
    {
      message: "Login successful",
      accessToken: token,
    },
    200
  );
});
