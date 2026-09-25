import { Context, Hono } from "hono";
import auth from "./auth.oauth";
import { requireAuth, requireRole } from "./auth.middleware";
import { assignRoleToUserController, changePasswordController, deleteUserController, getActiveUsersController, getAllUsersController, getCurrentUserController, restoreUserController, updateUserController } from "./auth.controller";

export const authRoutes = new Hono()


authRoutes.on(["POST", "GET"], "/auth/*", (c: Context) => {
    console.log("--> Request URL seen by Better Auth:", c.req.raw.url);
    return auth.handler(c.req.raw);
});


authRoutes.get("/auth/all-users", requireRole(["admin"]), getAllUsersController);
authRoutes.get("/auth/active-users", requireRole(["admin"]), getActiveUsersController);

authRoutes.patch("/auth/:id/role", requireRole(["admin"]), assignRoleToUserController);
authRoutes.delete("/auth/delete-user/:id", requireRole(["admin"]), deleteUserController);
authRoutes.post("/auth/restore-user/:id", requireRole(["admin"]), restoreUserController);


authRoutes.post("/auth/change-password", requireAuth, changePasswordController);
authRoutes.patch("/auth/update-user", requireAuth, updateUserController);
authRoutes.get("/auth/me", requireAuth, getCurrentUserController);