import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from '../../config'
import { db } from '../../db'
import { user } from '../../db/schema'
import * as schema from "../../db/schema";

export const auth = betterAuth({

    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: schema
    }),

    trustedOrigins: ['http://localhost:5173'],

    emailAndPassword: {
        enabled: true,
    },

    baseURL: env.BETTER_AUTH_URL || "http://localhost:5000/api/v1/auth",
    secret: env.BETTER_AUTH_SECRET!,

    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
    },

    advanced: {
        ipAddress: {
            ipAddressHeaders: ["x-forwarded-for", "x-real-ip"],
        },

        rateLimit: {
            enabled: process.env.NODE_ENV === "production",
        },
    },
})


export type AuthType = {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
}

export default auth;