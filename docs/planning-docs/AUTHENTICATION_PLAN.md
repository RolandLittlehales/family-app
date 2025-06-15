# Authentication Strategy - The Family App

## Technology Stack Recommendation

### Primary Option: NextAuth.js v5 (Auth.js)

**Rationale**:

- Native Next.js integration with App Router support
- Multiple provider support (Google, Apple, Email)
- Built-in session management
- TypeScript support
- Middleware support for route protection
- Database session storage with Prisma adapter

### Alternative Options:

1. **Clerk** - More features but paid service
2. **Supabase Auth** - If using Supabase for database
3. **Firebase Auth** - Google ecosystem integration
4. **Custom JWT implementation** - Maximum control but more complexity

## Authentication Flow Design

### User Journey

#### 1. New Family Setup

```
1. User visits app → Redirected to /auth/signin
2. User signs up with email/Google → Account created
3. User creates family profile → Becomes family admin
4. User gets welcome tour → Directed to dashboard
5. User can invite other family members
```

#### 2. Family Member Invitation

```
1. Admin sends invitation link/email
2. Invitee clicks link → Redirected to /auth/join?token=xyz
3. Invitee signs up/signs in → Account created/linked
4. System adds user to family → Role assigned
5. User gets onboarding for existing family
```

#### 3. Returning User

```
1. User visits app → Check session
2. If authenticated → Redirect to dashboard
3. If not authenticated → Redirect to /auth/signin
4. User signs in → Session created → Dashboard
```

### Authentication Providers

#### Primary: Email + Password

- Simple email/password registration
- Email verification required
- Password reset functionality
- Account recovery options

#### Secondary: OAuth Providers

- **Google OAuth** - Most popular for families
- **Apple Sign In** - iOS users
- **Microsoft OAuth** - Optional for Office 365 families

## Implementation Architecture

### File Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── join/
│   │   │   └── page.tsx          # Family invitation acceptance
│   │   ├── verify-email/
│   │   │   └── page.tsx
│   │   └── error/
│   │       └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── dashboard/
│   │   └── page.tsx              # Protected route
│   └── onboarding/
│       └── page.tsx              # New user setup
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── auth-helpers.ts           # Authentication utilities
│   ├── db.ts                     # Database connection
│   └── validations/
│       └── auth.ts               # Zod schemas for auth
├── components/
│   ├── auth/
│   │   ├── SignInForm.tsx
│   │   ├── SignUpForm.tsx
│   │   ├── FamilySetup.tsx
│   │   └── ProtectedRoute.tsx
│   └── providers/
│       └── AuthProvider.tsx
├── middleware.ts                 # Route protection
└── types/
    └── auth.ts                   # TypeScript types
```

### NextAuth Configuration

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Add family information to session
      const familyMember = await prisma.familyMember.findFirst({
        where: { userId: user.id },
        include: { family: true },
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          family: familyMember?.family || null,
          role: familyMember?.role || null,
        },
      };
    },
    async signIn({ user, account, profile }) {
      // Custom sign-in logic
      if (account?.provider === "google") {
        // Handle Google sign-in
        return true;
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error",
    verifyRequest: "/auth/verify-email",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser) {
        // Track new user registration
        console.log(`New user registered: ${user.email}`);
      }
    },
  },
};
```

### Route Protection Middleware

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Additional middleware logic
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Redirect to family setup if user has no family
    if (token && !token.family && pathname.startsWith("/dashboard")) {
      return Response.redirect(new URL("/onboarding", req.url));
    }

    // Admin-only routes
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return Response.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes
        if (pathname.startsWith("/auth") || pathname === "/") {
          return true;
        }

        // Protected routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/books/:path*",
    "/streaming/:path*",
    "/admin/:path*",
    "/api/:path*",
  ],
};
```

## Database Integration

### NextAuth Database Tables

NextAuth will automatically create these tables:

- `accounts` - OAuth provider accounts
- `sessions` - User sessions
- `users` - Basic user information
- `verification_tokens` - Email verification tokens

### Custom Extensions

We'll extend the default schema to integrate with our family system:

```typescript
// This extends the default NextAuth user model
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?

  // Our custom fields
  dateOfBirth   DateTime? @db.Date
  preferences   Json      @default("{}")
  role          String    @default("member")

  // Relations
  accounts      Account[]
  sessions      Session[]
  familyMembers FamilyMember[]
  userBooks     UserBook[]
  userMedia     UserMedia[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

## Family Management System

### Family Creation Flow

```typescript
// lib/auth-helpers.ts
export async function createFamily(
  userId: string,
  familyData: {
    name: string;
    description?: string;
  }
) {
  const family = await prisma.family.create({
    data: {
      name: familyData.name,
      description: familyData.description,
      members: {
        create: {
          userId,
          role: "admin",
        },
      },
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  return family;
}
```

### Family Invitation System

```typescript
// lib/invitations.ts
import jwt from "jsonwebtoken";

export async function createFamilyInvitation(
  familyId: string,
  inviterUserId: string,
  email: string
) {
  // Create invitation token
  const token = jwt.sign(
    { familyId, email, inviterUserId },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: "7d" }
  );

  // Store invitation in database
  const invitation = await prisma.familyInvitation.create({
    data: {
      familyId,
      email,
      token,
      invitedBy: inviterUserId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  // Send invitation email
  await sendInvitationEmail(email, token, familyId);

  return invitation;
}

export async function acceptFamilyInvitation(token: string, userId: string) {
  // Verify token
  const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
    familyId: string;
    email: string;
    inviterUserId: string;
  };

  // Check if invitation exists and is valid
  const invitation = await prisma.familyInvitation.findUnique({
    where: { token },
    include: { family: true },
  });

  if (!invitation || invitation.expiresAt < new Date()) {
    throw new Error("Invalid or expired invitation");
  }

  // Add user to family
  await prisma.familyMember.create({
    data: {
      familyId: invitation.familyId,
      userId,
      role: "member",
    },
  });

  // Mark invitation as used
  await prisma.familyInvitation.update({
    where: { token },
    data: { usedAt: new Date() },
  });

  return invitation.family;
}
```

## Authorization System

### Role-Based Access Control

```typescript
// lib/permissions.ts
export enum FamilyRole {
  ADMIN = "admin",
  MEMBER = "member",
  CHILD = "child",
}

export const permissions = {
  [FamilyRole.ADMIN]: [
    "family.manage",
    "members.invite",
    "members.remove",
    "content.manage",
    "settings.edit",
  ],
  [FamilyRole.MEMBER]: ["content.add", "content.edit_own", "profile.edit"],
  [FamilyRole.CHILD]: [
    "content.view",
    "content.add_with_approval",
    "profile.edit_limited",
  ],
};

export function hasPermission(role: string, permission: string): boolean {
  return permissions[role as FamilyRole]?.includes(permission) || false;
}

// Usage in API routes
export function requirePermission(permission: string) {
  return async (req: Request, user: User) => {
    const familyMember = await getFamilyMember(user.id);
    if (!hasPermission(familyMember.role, permission)) {
      throw new Error("Insufficient permissions");
    }
  };
}
```

### Data Access Control

```typescript
// lib/data-access.ts
export async function getFamilyBooks(userId: string, familyId: string) {
  // Verify user belongs to family
  const familyMember = await prisma.familyMember.findUnique({
    where: {
      userId_familyId: {
        userId,
        familyId,
      },
    },
  });

  if (!familyMember) {
    throw new Error("Access denied");
  }

  // Return books for this family, respecting privacy settings
  return prisma.userBook.findMany({
    where: {
      familyId,
      OR: [
        { private: false },
        { userId }, // User can always see their own private items
      ],
    },
    include: {
      book: true,
      user: true,
    },
  });
}
```

## Security Implementation

### Environment Variables

```bash
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/family_app"

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@family-app.com
```

### Rate Limiting

```typescript
// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function rateLimitCheck(identifier: string) {
  const { success, limit, reset, remaining } =
    await ratelimit.limit(identifier);

  if (!success) {
    throw new Error("Rate limit exceeded");
  }

  return { limit, reset, remaining };
}
```

### CSRF Protection

```typescript
// Built into NextAuth.js, but additional protection for API routes
import { csrfToken } from "next-auth/react"

// In forms
<input type="hidden" name="csrfToken" value={await csrfToken()} />
```

## Testing Strategy

### Authentication Tests

```typescript
// __tests__/auth.test.ts
import { createMocks } from "node-mocks-http";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

describe("Authentication", () => {
  it("should create family on first sign-in", async () => {
    // Test family creation flow
  });

  it("should handle family invitations", async () => {
    // Test invitation flow
  });

  it("should enforce role-based permissions", async () => {
    // Test permission system
  });
});
```

### Integration with Existing Pages

The authentication system will be integrated into existing pages through:

1. **Layout Updates**: Add authentication provider wrapper
2. **Route Protection**: Middleware to protect dashboard routes
3. **User Context**: Provide user/family context to components
4. **API Integration**: Secure API routes with session validation

This authentication plan provides a robust foundation for the family app while maintaining security and user experience best practices.
