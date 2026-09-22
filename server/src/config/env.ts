import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().positive(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    ALLOWED_DOMAINS: z.string().transform((value) => value.split(",").map(domain => domain.trim()).filter(Boolean)),
    DATABASE_URL: z.string(),
});


export const env = envSchema.parse(process.env);