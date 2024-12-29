import { Hono } from "hono";
import type { JwtVariables } from "hono/jwt";
import { usersDocs } from "../docs/users.docs";
import { getUser } from "../controllers/users.controller";
import { describeRoute } from "hono-openapi";

const usersRouter = new Hono<{ Variables: JwtVariables }>();

usersRouter.get("/", describeRoute(usersDocs.getUser), getUser);

export { usersRouter };
