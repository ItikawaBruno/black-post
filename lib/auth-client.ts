import { createAuthClient } from "better-auth/react"

// Use a public env var for the client base URL so we can configure it in Vercel.
// If NEXT_PUBLIC_BETTER_AUTH_URL is not set, the client will call the same origin.
const clientBaseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

export const authClient = clientBaseUrl
    ? createAuthClient({ baseURL: clientBaseUrl })
    : createAuthClient();

export const { signIn, signUp, useSession } = authClient;