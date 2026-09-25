import { createMiddleware } from "hono/factory";
import { auth } from "./auth.oauth";
import { db } from "../../db";
import { user } from "../../db/schema";
import { and, eq, isNull } from "drizzle-orm";

export interface AuthContext {
  user: typeof auth.$Infer.Session.user;
  session: typeof auth.$Infer.Session.session;
}


export const requireAuth = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized: Invalid or expired session" }, 401);
  }

  const [dbUser] = await db
    .select()
    .from(user)
    .where(and(eq(user.id, session.user.id), isNull(user.deletedAt)));

  if (!dbUser) {
    return c.json({ error: "Account has been deactivated or deleted" }, 401);
  }

  if (!session.user.emailVerified) {
    return c.json({ error: "Forbidden: Please verify your email first" }, 403);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});


export const requireRole = (allowedRoles: string[]) => {
  return createMiddleware(async (c, next) => {
    const user = c.get("user") as typeof auth.$Infer.Session.user;

    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      return c.json({ error: "Forbidden: Insufficient permissions" }, 403);
    }

    await next();
  });
};