import { OpenAPIHono } from "@hono/zod-openapi";
import { loginHandler, registerHandler } from "./auth.handlers";
import { loginRoute, registerRoute } from "./auth.routes";

const authRouter = new OpenAPIHono();

authRouter.openapi(registerRoute, registerHandler);
authRouter.openapi(loginRoute, loginHandler);

export default authRouter;
