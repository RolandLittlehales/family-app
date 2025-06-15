import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      role: string
      familyId: string
      familyName: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    username: string
    role: string
    familyId: string
    familyName: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    username: string
    role: string
    familyId: string
    familyName: string
  }
}