import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { openAPISpecs } from "hono-openapi";
import type { JwtVariables } from "hono/jwt";
import { jwtMiddleware } from "./middleware/auth";
import { env } from "./lib/env";
import { v1Router } from "./v1";

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

// Initialize API docs
const initApiDocs = async () => {
  try {
    const { apiReference } = await import("@scalar/hono-api-reference");
    app.get(
      "/api/docs",
      apiReference({
        theme: "saturn",
        spec: { url: "/api/openapi" },
      })
    );
  } catch (error) {
    console.error("Failed to load API reference:", error);
  }
};

initApiDocs().catch(console.error);

// For local development
if (process.env.NODE_ENV !== "production") {
  const port = Number(process.env.PORT || 3000);
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode`
  );
  serve({
    fetch: app.fetch,
    port,
  });
}

export default app;
