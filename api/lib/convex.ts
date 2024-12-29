import { ConvexHttpClient } from "convex/browser";
import { env } from "./env";

export const convexClient = new ConvexHttpClient(env.CONVEX_URL);
