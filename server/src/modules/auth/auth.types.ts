export type Role = "user" | "admin" | "moderator";

export interface JWTPayload {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}


export interface AppVariables {
  user: AuthUser;
}


export type VerifyEmailInput = {
  email: string;
  code: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type ResetPasswordInput = {
  token: string;
  newPassword: string;
  email: string;
};

export type ServiceResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; status?: number };

