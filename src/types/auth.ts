import { DefaultSession, DefaultUser } from 'next-auth';
import { UserRole } from '../generated/prisma';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      familyId: string | null;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    role: UserRole;
    familyId: string | null;
  }
}

// Extend the built-in JWT types
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    familyId: string | null;
  }
}

// Auth-related form types
export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FamilySetupFormData {
  familyName: string;
  inviteCode?: string;
}

export interface PasswordResetFormData {
  email: string;
}

export interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

// Authentication result types
export interface AuthResult {
  success: boolean;
  message?: string;
  redirectTo?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    familyId: string | null;
  };
}

export interface AuthError {
  type: 'CredentialsSignin' | 'CallbackRouteError' | 'SessionRequired' | 'AccessDenied';
  message: string;
}

// Route protection types
export interface RouteConfig {
  path: string;
  requireAuth: boolean;
  allowedRoles?: UserRole[];
  redirect?: string;
}

// Session user type helper
export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  familyId: string | null;
};

// Family invitation types
export interface FamilyInvitation {
  familyId: string;
  familyName: string;
  inviteCode: string;
  expiresAt: Date;
  createdBy: string;
}

export interface JoinFamilyResult {
  success: boolean;
  message: string;
  familyId?: string;
  familyName?: string;
}