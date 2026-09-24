import { Context, Hono } from "hono";
import auth from "./auth.oauth";

export const authRoutes = new Hono()


authRoutes.on(["POST", "GET"], "/auth/*", (c: Context) => {
    return auth.handler(c.req.raw);
});

