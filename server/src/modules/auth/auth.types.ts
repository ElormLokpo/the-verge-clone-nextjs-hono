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