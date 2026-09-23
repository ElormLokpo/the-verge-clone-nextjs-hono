import { Hono } from "hono";

export const authRoutes = new Hono().basePath("/auth");


authRoutes.on(["POST", "GET"], "/*", (c) => {
    return c.json(c.req.raw);
});

