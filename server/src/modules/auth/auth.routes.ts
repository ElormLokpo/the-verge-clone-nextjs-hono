import { Hono } from "hono";
import * as authController from "./auth.controller";
import { type AppVariables } from "./auth.types";
import { authMiddleware, requireRole } from "./auth.middleware";
import { findOrCreateOAuthUser } from "./auth.services";
import {
  getGoogleAuthUrl,
  getGoogleUser,
  exchangeCodeForTokens,
} from "./auth.oauth";
import { setCookie } from "hono/cookie";
import {
  env,
  loginSchema,
  registerSchema,
  emailSchema,
  verifyEmailSchema,
  zValidator,
  resetPasswordSchema,
} from "../../config";

export const auth = new Hono<{ Variables: AppVariables }>();

auth.post("/register", zValidator(registerSchema), authController.register);
auth.post("/login", zValidator(loginSchema), authController.login);
auth.post("/logout", authController.logout);
auth.get("/me", authMiddleware, authController.me);

auth.post(
  "/verify-email",
  zValidator(verifyEmailSchema),
  authMiddleware,
  authController.verifyEmail,
);
auth.post(
  "/resend-verification",
  zValidator(emailSchema),
  authMiddleware,
  authController.resendVerification,
);

auth.post(
  "/forgot-password",
  zValidator(emailSchema),
  authController.forgotPassword,
);
auth.post(
  "/reset-password",
  zValidator(resetPasswordSchema),
  authController.resetPassword,
);

auth.delete(
  "/delete-user/:id",
  authMiddleware,
  requireRole("admin"),
  authController.deleteUser,
);

auth.get("/google", (c) => {
  const state = crypto.randomUUID();
  return c.redirect(getGoogleAuthUrl(state));
});

auth.get("/google/callback", async (c) => {
  const code = c.req.query("code");
  if (!code) return c.json({ error: "No code provided" }, 400);

  const tokens = await exchangeCodeForTokens(code);
  const googleUser = await getGoogleUser(tokens.access_token);

  const { token } = await findOrCreateOAuthUser(
    googleUser.email,
    googleUser.sub,
    "google",
  );

  setCookie(c, "auth_token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return c.redirect(
    env.NODE_ENV === "production"
      ? env.FRONTEND_URL_PROD
      : env.FRONTEND_URL_LOCAL + "/dashboard",
  );
});
