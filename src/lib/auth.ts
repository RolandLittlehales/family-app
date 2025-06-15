import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './database';
import { UserRepository } from './repositories/user.repository';
import { EmailSchema, PasswordSchema } from './validation/schemas';

const userRepository = new UserRepository(prisma);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        // Validate input format
        const emailValidation = EmailSchema.safeParse(credentials.email);
        const passwordValidation = PasswordSchema.safeParse(credentials.password);

        if (!emailValidation.success) {
          throw new Error('Invalid email format');
        }

        if (!passwordValidation.success) {
          throw new Error('Invalid password format');
        }

        try {
          // Find user by email
          const user = await userRepository.findByEmail(credentials.email);
          
          if (!user || !user.passwordHash) {
            throw new Error('Invalid credentials');
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (!isPasswordValid) {
            throw new Error('Invalid credentials');
          }

          // Update last login
          await userRepository.updateLastLogin(user.id);

          // Return user object for session
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            familyId: user.familyId,
          };
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Include user info in JWT token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.familyId = user.familyId;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.familyId = token.familyId as string | null;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/auth/setup'
  },
  events: {
    async signIn({ user }) {
      // eslint-disable-next-line no-console
      console.log(`User ${user.email} signed in at ${new Date().toISOString()}`);
    },
    async signOut() {
      // eslint-disable-next-line no-console
      console.log(`User signed out at ${new Date().toISOString()}`);
    }
  },
  debug: process.env.NODE_ENV === 'development',
};