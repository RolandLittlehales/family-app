import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./database"
import { EmailSchema, PasswordSchema } from "./validation/schemas"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Validate input format
        const emailValidation = EmailSchema.safeParse(credentials.email)
        const passwordValidation = PasswordSchema.safeParse(credentials.password)
        
        if (!emailValidation.success || !passwordValidation.success) {
          return null
        }

        // Find user in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { family: true }
        })

        if (!user || !user.passwordHash) {
          return null
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash)
        
        if (!isPasswordValid) {
          return null
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        })

        // Return user object for session
        return {
          id: user.id,
          email: user.email,
          name: user.firstName ? `${user.firstName} ${user.lastName}` : user.username || '',
          image: user.profilePicture,
          username: user.username || '',
          role: user.role,
          familyId: user.familyId || '',
          familyName: user.family?.name || ''
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add custom fields to JWT token
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
        token.familyId = user.familyId
        token.familyName = user.familyName
      }
      return token
    },
    async session({ session, token }) {
      // Add custom fields to session
      if (token) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.role = token.role as string
        session.user.familyId = token.familyId as string
        session.user.familyName = token.familyName as string
      }
      return session
    },
    async signIn({ user }) {
      // Allow sign in if user exists and is active
      if (user?.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id }
        })
        return dbUser?.isActive === true
      }
      return false
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
}