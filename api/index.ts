import "./lib/env";
import { Hono } from "hono";
import { v1Router } from "./v1";
import { openAPISpecs } from "hono-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import type { JwtVariables } from "hono/jwt";
import { jwtMiddleware } from "./middleware/auth";
import { env } from "./lib/env";

const app = new Hono<{ Variables: JwtVariables }>();

app.use("*", jwtMiddleware);

app.route("/api/v1", v1Router);

app.get("/api/health", (c) => {
  return c.json({
    message: "OK",
    environment: env.NODE_ENV,
  });
});

app.get("/api", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.get(
  "/api/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Leafy API",
        version: "1.0.0",
        description: "Leafy API",
      },
      servers: [{ url: "http://localhost:3000", description: "Local Server" }],
    },
  })
);

app.get(
  "/api/docs",
  apiReference({
    theme: "saturn",
    spec: { url: "/api/openapi" },
  })
);

// For production (Vercel)
export const config = {
  runtime: "edge",
};

// For local development
if (env.NODE_ENV !== "production") {
  const { serve } = require("@hono/node-server");
  const port = env.PORT || 3000;
  console.log(`Server is running on port ${port} in ${env.NODE_ENV} mode`);
  serve({
    fetch: app.fetch,
    port,
  });
}

// For production (Vercel)
export default app;
