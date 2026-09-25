import { Context } from "hono";
import { db } from "../../db";
import { user } from "../../db/schema";
import { and, eq, isNull } from "drizzle-orm";
import auth from "./auth.oauth";


export const getActiveUsersService = async () => await db.select().from(user).where(isNull(user.deletedAt));


export const assignRoleToUserService = async (userId: string | undefined, role: "user" | "admin", c: Context) => {

    if (!["admin", "user"].includes(role)) {
        return c.json({ error: "Invalid role specified" }, 400);
    }

    const updated = await db
        .update(user)
        .set({ role, updatedAt: new Date() })
        .where(eq(user.id, userId))
        .returning();

    return updated[0];
}

export const getAllUsersService = async () => await db.select().from(user);

export const updateUserService = async (currentUser, body: { name?: string; image?: string }) => {
    const updatedUser = await db
        .update(user)
        .set({
            name: body.name ?? currentUser.name,
            image: body.image ?? currentUser.image,
            updatedAt: new Date(),
        })
        .where(eq(user.id, currentUser.id))
        .returning();

    return updatedUser[0];
}

export const changePasswordService = async (body: { currentPassword: string; newPassword: string; }, headers: Headers) => {


    try {
        await auth.api.changePassword({
            headers,
            body: {
                currentPassword: body.currentPassword,
                newPassword: body.newPassword,
                revokeOtherSessions: true,
            },
        })
    } catch (err) {
        return err;
    }
}


export const deleteUserService = async (userId: string | undefined, c: Context) => {
    const [softDeletedUser] = await db
        .update(user)
        .set({
            deletedAt: new Date(),
            updatedAt: new Date(),
        })
        .where(and(eq(user.id, userId), isNull(user.deletedAt)))
        .returning();

    if (!softDeletedUser) {
        return c.json({ error: "User not found or already deleted" }, 404);
    }

    return softDeletedUser;
}

export const restoreUserService = async (userId: string | undefined, c: Context) => {
    const [restoredUser] = await db
        .update(user)
        .set({
            deletedAt: null,
            updatedAt: new Date(),
        })
        .where(eq(user.id, userId))
        .returning();

    if (!restoredUser) {
        return c.json({ error: "User not found" }, 404);
    }

    return restoredUser;
}

