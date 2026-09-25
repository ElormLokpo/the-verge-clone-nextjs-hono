import { env } from "bun";

const GOOGLE_AUTH_URL = env.GOOGLE_AUTH_URL!; 
const GOOGLE_USERINFO_URL = env.GOOGLE_USERINFO_URL!;


export function getGoogleAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID!,
    redirect_uri: env.GOOGLE_REDIRECT_URI!,
    response_type: "code",
    scope: "openid email profile",
    state,
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

interface GoogleTokens {
  access_token: string;
  id_token: string;
}

interface GoogleUser {
  sub: string;  
  email: string;
  name: string;
}

export async function exchangeCodeForTokens(code: string): Promise<GoogleTokens> {
  const res = await fetch(env.GOOGLE_TOKEN_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) throw new Error("Failed to exchange code");
  return res.json() as Promise<GoogleTokens>;
}

export async function getGoogleUser(accessToken: string): Promise<GoogleUser> {
  const res = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch Google user");
  return res.json() as Promise<GoogleUser>;
}