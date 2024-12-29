import { sign } from "hono/jwt";

import { env } from "@lib/env";
import { Id } from "@convex/_generated/dataModel";

export const createToken = async (userId: Id<"users">) => {
  const ONE_HOUR = 60 * 60;
  const expiresIn = Math.floor(Date.now() / 1000) + ONE_HOUR;

  return await sign({ userId, expiresIn }, env.JWT_SECRET);
};
