import { OpenAPIHono } from "@hono/zod-openapi";
import {
	loginHandler,
	logoutHandler,
	meHandler,
	refreshHandler,
	registerHandler,
} from "./auth.handlers";
import {
	loginRoute,
	logoutRoute,
	meRoute,
	refreshRoute,
	registerRoute,
} from "./auth.routes";

const authRouter = new OpenAPIHono();

authRouter.openapi(registerRoute, registerHandler);
authRouter.openapi(loginRoute, loginHandler);
authRouter.openapi(refreshRoute, refreshHandler);
authRouter.openapi(logoutRoute, logoutHandler);
authRouter.openapi(meRoute, meHandler);

export default authRouter;
