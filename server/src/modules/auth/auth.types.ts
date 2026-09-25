import auth from "./auth.oauth"

export type UserIdType = string | undefined
export type UserType = typeof auth.$Infer.Session.user
export type UserRoleType = "user" | "admin";
export type UpdateUserBody = { name?: string; image?: string }
export type ChangePasswordBody = { currentPassword: string; newPassword: string }