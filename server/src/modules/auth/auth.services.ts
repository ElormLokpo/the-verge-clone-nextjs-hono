import bcrypt from "bcryptjs";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "../../db"
import { users, type NewUser, type User } from "../../db/schema";
import { signToken, JWTPayload, Role } from "./";
import { Context } from "hono";


export async function registerUserService(name: string, role: Role, email: string, password: string) {
    const existing = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (existing) {
        throw new Error("Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [user] = await db
        .insert(users)
        .values({ email, passwordHash, role: role  ?? "user", name } satisfies NewUser)
        .returning();

    const token = await signToken(buildPayload(user));
    return { user: sanitize(user), token };
}


export async function loginUserService(email: string, password: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (!user || !user.passwordHash) {
        throw new Error("Invalid credentials");
    }

    if (user.deleteAt){
        throw new Error("Account has been deleted");
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error("Invalid credentials");

    const token = await signToken(buildPayload(user));
    return { user: sanitize(user), token };
}


export async function findOrCreateOAuthUserService(
    email: string,
    oauthId: string,
    provider: "google"
) {
    let user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (!user) {
        [user] = await db
            .insert(users)
            .values({ email, oauthProvider: provider, oauthId, role: "user" })
            .returning();
    }

    const token = await signToken(buildPayload(user));
    return { user: sanitize(user), token };
}

export async function deleteUserService(userId: string, c: Context) {
    const [softDeletedUser] = await db
        .update(users)
        .set({
            deleteAt: new Date(),
            updatedAt: new Date(),
        })
        .where(and(eq(users.id, userId), isNull(users.deleteAt)))        
        .returning();           

        if (!softDeletedUser) {
            return c.json({ error: "User not found or already deleted" }, 404);
        }

        return softDeletedUser;
}


function buildPayload(user: User): JWTPayload {
    return { sub: user.id, email: user.email, role: user.role as Role };
}

function sanitize(user: User) {
    const { passwordHash, ...safe } = user;
    return safe;
}