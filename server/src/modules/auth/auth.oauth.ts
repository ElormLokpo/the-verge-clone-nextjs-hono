import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from '../../config'
import { db } from '../../db'


export const auth = betterAuth({
    
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),

    trustedOrigins: ['http://localhost:5173'],

    emailAndPassword: {
        enabled: true,
    },
    
    baseURL: env.BETTER_AUTH_URL || "http://localhost:3000",
    secret: env.BETTER_AUTH_SECRET!,
    
    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
    },
})


export type AuthType = {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
}