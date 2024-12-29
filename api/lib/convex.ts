import { ConvexHttpClient } from "convex/browser";
import { env } from "@lib/env";

export const convexClient = new ConvexHttpClient(env.CONVEX_URL);
