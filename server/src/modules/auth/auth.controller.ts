import { Context } from "hono";
import { assignRoleToUserService, changePasswordService, deleteUserService, getActiveUsersService, getAllUsersService, restoreUserService, updateUserService } from "./auth.services";
import { ChangePasswordBody, UpdateUserBody, UserRoleType } from "./auth.types";


export const getAllUsersController = async (c: Context) => {
    const users = await getAllUsersService();
    return c.json({ users });
}

export const getActiveUsersController = async (c: Context) => {
    const users = await getActiveUsersService();
    return c.json({ users });
}

export const assignRoleToUserController = async (c: Context) => {
    const userId = c.req.param("id");
    const { role } = await c.req.json<{ role: UserRoleType }>();

    const updatedUser = await assignRoleToUserService(userId, role, c);

    return c.json({ message: "User role updated successfully", user: updatedUser });
}

export const updateUserController = async (c: Context) => {
    const currentUser = c.get("user");
    const body = await c.req.json<UpdateUserBody>();

    const updatedUser = await updateUserService(currentUser, body);

    return c.json({ message: "User updated successfully", user: updatedUser });
}

export const changePasswordController = async (c: Context) => {
    const body = await c.req.json<ChangePasswordBody>();
    const changedPassword = await changePasswordService(body, c.req.raw.headers);

    if (changedPassword instanceof Error) {
        return c.json(changedPassword.message, 400);
    }

    return c.json({ message: "Password updated successfully" });
}

export const deleteUserController = async (c: Context) => {
    const userId = c.req.param("id");

    const deletedUser = await deleteUserService(userId, c);

    return c.json({
        message: "User soft-deleted successfully",
        user: deletedUser
    });
}

export const restoreUserController = async (c: Context) => {
    const userId = c.req.param("id");

    const restoredUser = await restoreUserService(userId, c);

    return c.json({
        message: "User restored successfully",
        user: restoredUser
    });
}

export const getCurrentUserController = async (c: Context) => {
    const currentUser = c.get("user");
    return c.json({ user: currentUser });
}