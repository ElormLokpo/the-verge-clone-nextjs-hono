import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { env } from '../../config'
import { db } from '../../db'
import { user } from '../../db/schema'
import * as schema from "../../db/schema";
import { admin, openAPI } from "better-auth/plugins";

export const auth = betterAuth({

    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: schema
    }),

    trustedOrigins: ['http://localhost:5173'],

   
    baseURL: env.BETTER_AUTH_URL || "http://localhost:5000",
    basePath: "/api/v1/auth",
    secret: env.BETTER_AUTH_SECRET!,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, 
    async sendResetPassword({ user, url }) {
      console.log(`[Email Mock] Reset password for ${user.email}: ${url}`);
      
    },
  },

  
  emailVerification: {
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      console.log(`[Email Mock] Verify email for ${user.email}: ${url}`);
     
    },
  },

 
  
  plugins: [
    admin({
      defaultRole: "user",
      adminRole: "admin",
    }),
  ],

  
  session: {
    expiresIn: 60 * 60 * 24 * 7, 
    updateAge: 60 * 60 * 24, 
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, 
    },
  },

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