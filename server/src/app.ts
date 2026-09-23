import { Context, Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { env } from "./config";
import { db } from "./db";
import { sql } from "drizzle-orm";
import {authRoutes} from "./modules"

export const createApp = () => {
    const app = new Hono().basePath("/api/v1");

    app.use("*", logger());
    app.use("*", secureHeaders());
    app.use("*", cors({
        origin: (origin) => {
            if (!origin) return "*";
            return env.ALLOWED_DOMAINS.includes(origin) ? origin : "";
        },
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,

    }));

    app.all("/health", async (c: Context) => {
        try {
            await db.execute(sql`SELECT 1`);
            return c.json({ message: "Database ping successful" }, 200)

        } catch (err) {
            console.error(err);
            return c.json({ message: "Database ping unsucessful" }, 500)
        }
    });

    app.route("", authRoutes)

    return app;
}


export type App = ReturnType<typeof createApp>;