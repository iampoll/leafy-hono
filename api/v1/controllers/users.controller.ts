import type { Context } from "hono";
import { asyncHandler } from "../../lib/asyncHandler";
import { convexClient } from "../../lib/convex";
import { api } from "../../../convex/_generated/api";

export const getUser = asyncHandler(async (c: Context) => {
  const payload = c.get("jwtPayload");

  const user = await convexClient.query(api.users.getById, {
    userId: payload.userId,
  });

  return c.json({ user });
});
