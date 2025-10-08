import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  /** URL do seu servidor */
  baseURL: "https://black-post.vercel.app",
})

// Extraia os métodos do mesmo cliente
export const { signIn, signUp, useSession } = authClient
