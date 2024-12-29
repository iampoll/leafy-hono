import { Hono } from "hono";
import { authRouter } from "@v1/routes/auth.route";
import { usersRouter } from "@v1/routes/users.route";

const v1Router = new Hono();

v1Router.route("/", authRouter);
v1Router.route("/users", usersRouter);

export { v1Router };
