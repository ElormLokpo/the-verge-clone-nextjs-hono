import type { Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import * as authService from "./";
import { COOKIE_NAME, COOKIE_OPTIONS, Role } from "./";



export async function register(c: Context) {
    const { email, password, name, role } = await c.req.json<{
        email: string;
        password: string;
        name: string,
        role: Role
    }>();

    if (!email || !password) {
        return c.json({ error: "Email and password are required" }, 400);
    }

    const { user, token } = await authService.registerUserService(name, role, email, password);

    setCookie(c, COOKIE_NAME, token, COOKIE_OPTIONS);
    return c.json({ user, token }, 201);
}

export async function login(c: Context) {
    const { email, password } = await c.req.json<{
        email: string;
        password: string;
    }>();

    const { user, token } = await authService.loginUserService(email, password);

    setCookie(c, COOKIE_NAME, token, COOKIE_OPTIONS);
    return c.json({ user, token });
}

export async function deleteUser(c: Context) {
    const userId = c.req.param("id");

    const deletedUser = await authService.deleteUserService(userId as string, c);

    return c.json({
        message: "User soft-deleted successfully",
        user: deletedUser
    });
}

export async function logout(c: Context) {
    deleteCookie(c, COOKIE_NAME);
    return c.json({ message: "Logged out" });
}

export async function me(c: Context) {

    const user = c.get("user");
    return c.json({ user });
}

export async function resendVerification(c: Context) {
    const user = c.get("user");
    const { email } = await c.req.json<{ email: string }>();


    const result = await authService.generateAndSendVerificationCodeService(user.id, email);

    if (!result.success) {
        return c.json({ error: result.error }, 400);
    }

    return c.json({ message: "Verification code sent" });
}

export async function verifyEmail(c: Context) {
    const body = await c.req.json<authService.VerifyEmailInput>();

   
    if (!body.email || !body.code) {
        return c.json({ error: "Email and code are required" }, 400);
    }

    const result = await authService.verifyEmailCodeService(body);

    if (!result.success) {
        return c.json({ error: result.error }, 400);
    }

    return c.json({ message: "Email verified successfully" });
}