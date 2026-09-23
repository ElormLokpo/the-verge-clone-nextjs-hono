import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().positive(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    ALLOWED_DOMAINS: z.string().transform((value) => value.split(",").map(domain => domain.trim()).filter(Boolean)),
    DATABASE_URL: z.string().min(1, { message: "Database url is required" }),

    GOOGLE_CLIENT_ID: z.string().min(1, { message: "Google client id is required" }),
    GOOGLE_CLIENT_SECRET: z.string().min(1, { message: "Google client secret is required" }),

    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string()
});


export const env = envSchema.parse(process.env);