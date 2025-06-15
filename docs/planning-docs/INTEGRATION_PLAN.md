# Database & Authentication Integration Plan

## Overview

This document outlines how to integrate the database and authentication systems with the existing Family App pages, transforming static mockups into dynamic, data-driven functionality.

## Current State Analysis

### Existing Pages

1. **Home Page** (`/`) - Static welcome with navigation cards
2. **Books Page** (`/books`) - Static mockup with hardcoded stats and feature cards
3. **Streaming Page** (`/streaming`) - Static mockup with hardcoded stats and service previews

### Existing Components

- `Header.tsx` - Navigation with TODO comment for theme toggle
- `PageLayout.tsx` - Layout wrapper
- `Button.css.ts` - Button variants
- Vanilla-Extract theme system

## Phase 1: Authentication Integration

### 1.1 Layout and Provider Setup

#### Update Root Layout

```typescript
// src/app/layout.tsx - UPDATED
import type { Metadata } from "next";
import "./globals.css";
import { themeClass } from "../styles/theme.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Family App with Vanilla Extract",
  description: "A Next.js app configured with vanilla-extract CSS-in-JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={themeClass}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

#### Create Authentication Provider

```typescript
// src/components/providers/AuthProvider.tsx - NEW
"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
```

### 1.2 Update Header Component

#### Enhanced Header with Authentication

```typescript
// src/components/Header.tsx - UPDATED SECTIONS
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import * as styles from "./Header.css";

// ... existing interfaces and defaultNavItems ...

export function Header({
  navItems = defaultNavItems,
  logoText = "The Family",
  className = "",
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // ... existing functions ...

  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          {logoText}
        </Link>

        {/* Navigation only shown when authenticated */}
        {session && (
          <nav className={styles.nav}>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActiveLink(item.href) ? styles.activeNavLink : styles.navLink
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Auth Section */}
        <div className={styles.authSection}>
          {status === "loading" && (
            <div className={styles.authLoading}>Loading...</div>
          )}

          {status === "unauthenticated" && (
            <button
              className={styles.signInButton}
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}

          {session && (
            <div className={styles.userMenu}>
              <img
                src={session.user?.image || '/default-avatar.png'}
                alt={session.user?.name || 'User'}
                className={styles.userAvatar}
              />
              <span className={styles.userName}>{session.user?.name}</span>
              <button
                className={styles.signOutButton}
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button - only when authenticated */}
        {session && (
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {/* ... existing SVG ... */}
          </button>
        )}
      </div>

      {/* Mobile Menu - only when authenticated */}
      {session && (
        <div
          className={isMobileMenuOpen ? styles.mobileMenuOpen : styles.mobileMenu}
        >
          {/* ... existing mobile nav ... */}
        </div>
      )}
    </header>
  );
}
```

### 1.3 Route Protection

#### Create Protected Route Wrapper

```typescript
// src/components/auth/ProtectedRoute.tsx - NEW
"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      router.push("/auth/signin")
      return
    }

    // Check if user needs to complete family setup
    if (session.user && !session.user.family) {
      router.push("/onboarding")
      return
    }
  }, [session, status, router])

  if (status === "loading") {
    return fallback || <div>Loading...</div>
  }

  if (!session) {
    return fallback || <div>Redirecting to sign in...</div>
  }

  if (session.user && !session.user.family) {
    return fallback || <div>Setting up your family...</div>
  }

  return <>{children}</>
}
```

### 1.4 Update Page Layouts

#### Create Page Layout with Protection

```typescript
// src/components/PageLayout.tsx - UPDATED
import { ReactNode } from "react";
import { Header } from "./Header";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import * as styles from "./PageLayout.css";

export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  requireAuth?: boolean;
}

export function PageLayout({
  children,
  className = "",
  requireAuth = false
}: PageLayoutProps) {
  const content = (
    <div className={`${styles.layout} ${className}`}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );

  if (requireAuth) {
    return (
      <ProtectedRoute>
        {content}
      </ProtectedRoute>
    );
  }

  return content;
}
```

## Phase 2: Database Integration

### 2.1 Database Setup Files

#### Prisma Configuration

```javascript
// prisma/schema.prisma - NEW
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ... Full schema from DATABASE_DESIGN.md ...
```

#### Database Connection

```typescript
// src/lib/db.ts - NEW
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### 2.2 Data Access Layer

#### Books Service

```typescript
// src/lib/services/books.ts - NEW
import { prisma } from "@/lib/db";
import { BookStatus } from "@prisma/client";

export interface BookFilters {
  status?: BookStatus;
  userId?: string;
  familyId: string;
  search?: string;
}

export async function getFamilyBooks({
  familyId,
  userId,
  status,
  search,
}: BookFilters) {
  const where = {
    familyId,
    ...(userId && { userId }),
    ...(status && { status }),
    ...(search && {
      book: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { author: { contains: search, mode: "insensitive" } },
        ],
      },
    }),
  };

  return prisma.userBook.findMany({
    where,
    include: {
      book: true,
      user: {
        select: { id: true, name: true, image: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getFamilyBookStats(familyId: string) {
  const [total, currentlyReading, completed, wantToRead] = await Promise.all([
    prisma.userBook.count({ where: { familyId } }),
    prisma.userBook.count({
      where: { familyId, status: "CURRENTLY_READING" },
    }),
    prisma.userBook.count({
      where: { familyId, status: "COMPLETED" },
    }),
    prisma.userBook.count({
      where: { familyId, status: "WANT_TO_READ" },
    }),
  ]);

  return {
    total,
    currentlyReading,
    completed,
    wantToRead,
  };
}

export async function addBookToFamily(
  familyId: string,
  userId: string,
  bookData: {
    title: string;
    author?: string;
    isbn?: string;
    status: BookStatus;
  }
) {
  // First, create or find the book
  const book = await prisma.book.upsert({
    where: { isbn: bookData.isbn || `${bookData.title}-${bookData.author}` },
    update: {},
    create: {
      title: bookData.title,
      author: bookData.author,
      isbn: bookData.isbn,
    },
  });

  // Then, add it to the user's collection
  return prisma.userBook.create({
    data: {
      userId,
      bookId: book.id,
      familyId,
      status: bookData.status,
    },
    include: {
      book: true,
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  });
}
```

#### Media Service

```typescript
// src/lib/services/media.ts - NEW
import { prisma } from "@/lib/db";
import { MediaStatus, MediaType } from "@prisma/client";

export interface MediaFilters {
  status?: MediaStatus;
  type?: MediaType;
  userId?: string;
  familyId: string;
  search?: string;
}

export async function getFamilyMedia({
  familyId,
  userId,
  status,
  type,
  search,
}: MediaFilters) {
  const where = {
    familyId,
    ...(userId && { userId }),
    ...(status && { status }),
    ...(search && {
      media: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      },
    }),
    ...(type && { media: { type } }),
  };

  return prisma.userMedia.findMany({
    where,
    include: {
      media: true,
      user: {
        select: { id: true, name: true, image: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getFamilyMediaStats(familyId: string) {
  const [watchlist, currentlyWatching, completed, totalShows] =
    await Promise.all([
      prisma.userMedia.count({
        where: { familyId, status: "WANT_TO_WATCH" },
      }),
      prisma.userMedia.count({
        where: { familyId, status: "CURRENTLY_WATCHING" },
      }),
      prisma.userMedia.count({
        where: { familyId, status: "COMPLETED" },
      }),
      prisma.userMedia.count({ where: { familyId } }),
    ]);

  return {
    watchlist,
    currentlyWatching,
    completed,
    totalShows,
  };
}
```

## Phase 3: Page Transformations

### 3.1 Transform Books Page

#### Dynamic Books Page

```typescript
// src/app/books/page.tsx - UPDATED
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getFamilyBookStats, getFamilyBooks } from "@/lib/services/books";
import { PageLayout } from "@/components/PageLayout";
import { BooksStats } from "@/components/books/BooksStats";
import { BooksGrid } from "@/components/books/BooksGrid";
import { AddBookButton } from "@/components/books/AddBookButton";
import * as styles from "./page.css";

export const metadata: Metadata = {
  title: "Books - The Family App",
  description: "Discover and manage your family's book collection",
};

export default async function BooksPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.family) {
    return <div>Please complete family setup</div>;
  }

  const [stats, books] = await Promise.all([
    getFamilyBookStats(session.user.family.id),
    getFamilyBooks({ familyId: session.user.family.id }),
  ]);

  return (
    <PageLayout requireAuth>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Family Books</h1>
          <p className={styles.subtitle}>
            Welcome to your family's book collection. Here you can discover,
            organize, and track your reading adventures together.
          </p>
          <AddBookButton />
        </div>

        <BooksStats stats={stats} />
        <BooksGrid books={books} />
      </div>
    </PageLayout>
  );
}
```

#### Books Stats Component

```typescript
// src/components/books/BooksStats.tsx - NEW
import * as styles from "./BooksStats.css";

interface BooksStatsProps {
  stats: {
    total: number;
    currentlyReading: number;
    completed: number;
    wantToRead: number;
  };
}

export function BooksStats({ stats }: BooksStatsProps) {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <span className={styles.statNumber}>{stats.total}</span>
        <span className={styles.statLabel}>Total Books</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statNumber}>{stats.currentlyReading}</span>
        <span className={styles.statLabel}>Currently Reading</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statNumber}>{stats.completed}</span>
        <span className={styles.statLabel}>Completed</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statNumber}>{stats.wantToRead}</span>
        <span className={styles.statLabel}>Want to Read</span>
      </div>
    </div>
  );
}
```

### 3.2 Transform Streaming Page

#### Dynamic Streaming Page

```typescript
// src/app/streaming/page.tsx - UPDATED
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getFamilyMediaStats, getFamilyMedia } from "@/lib/services/media";
import { PageLayout } from "@/components/PageLayout";
import { StreamingStats } from "@/components/streaming/StreamingStats";
import { StreamingGrid } from "@/components/streaming/StreamingGrid";
import { AddMediaButton } from "@/components/streaming/AddMediaButton";
import * as styles from "./page.css";

export const metadata: Metadata = {
  title: "Streaming - The Family App",
  description: "Discover and manage your family's streaming content",
};

export default async function StreamingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.family) {
    return <div>Please complete family setup</div>;
  }

  const [stats, media] = await Promise.all([
    getFamilyMediaStats(session.user.family.id),
    getFamilyMedia({ familyId: session.user.family.id }),
  ]);

  return (
    <PageLayout requireAuth>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Family Streaming</h1>
          <p className={styles.subtitle}>
            Discover movies and shows to watch together. Keep track of what's on
            your family's watchlist and what you've enjoyed.
          </p>
          <AddMediaButton />
        </div>

        <StreamingStats stats={stats} />
        <StreamingGrid media={media} />
      </div>
    </PageLayout>
  );
}
```

### 3.3 Transform Home Page

#### Dynamic Home Page

```typescript
// src/app/page.tsx - UPDATED
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PageLayout } from "@/components/PageLayout";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { FamilyDashboard } from "@/components/home/FamilyDashboard";
import { NavigationCards } from "@/components/home/NavigationCards";
import * as styles from "./page.css";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <PageLayout>
        <WelcomeSection />
        <NavigationCards showSignIn />
      </PageLayout>
    );
  }

  if (!session.user.family) {
    return (
      <PageLayout requireAuth>
        <div className={styles.setupMessage}>
          <h1>Welcome to The Family App!</h1>
          <p>Let's set up your family profile to get started.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout requireAuth>
      <div className={styles.container}>
        <FamilyDashboard family={session.user.family} />
        <NavigationCards />
      </div>
    </PageLayout>
  );
}
```

## Phase 4: API Routes

### 4.1 Books API Routes

```typescript
// src/app/api/books/route.ts - NEW
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getFamilyBooks, addBookToFamily } from "@/lib/services/books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.family) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  try {
    const books = await getFamilyBooks({
      familyId: session.user.family.id,
      ...(status && { status }),
      ...(search && { search }),
    });

    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.family) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookData = await request.json();

    const book = await addBookToFamily(
      session.user.family.id,
      session.user.id,
      bookData
    );

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 });
  }
}
```

## Phase 5: Implementation Timeline

### Week 1: Authentication Foundation

- [ ] Install and configure NextAuth.js
- [ ] Set up database with Prisma
- [ ] Create authentication pages
- [ ] Update Header component
- [ ] Create ProtectedRoute wrapper

### Week 2: Database Integration

- [ ] Implement Prisma schema
- [ ] Create data access services
- [ ] Set up API routes
- [ ] Add error handling and validation

### Week 3: Books Page Transformation

- [ ] Transform Books page to use real data
- [ ] Create BooksStats component
- [ ] Create BooksGrid component
- [ ] Add AddBookButton functionality
- [ ] Implement search and filters

### Week 4: Streaming Page Transformation

- [ ] Transform Streaming page to use real data
- [ ] Create StreamingStats component
- [ ] Create StreamingGrid component
- [ ] Add AddMediaButton functionality
- [ ] Implement watchlist management

### Week 5: Home Page & Polish

- [ ] Transform Home page for authenticated users
- [ ] Create family dashboard
- [ ] Add loading states and error boundaries
- [ ] Test end-to-end functionality
- [ ] Performance optimization

## Testing Strategy

### Database Testing

```typescript
// __tests__/services/books.test.ts
import { getFamilyBooks, addBookToFamily } from "@/lib/services/books";
import { prisma } from "@/lib/db";

describe("Books Service", () => {
  beforeEach(async () => {
    // Clean up test data
    await prisma.userBook.deleteMany();
    await prisma.book.deleteMany();
  });

  it("should get family books", async () => {
    // Create test data
    const family = await prisma.family.create({
      data: { name: "Test Family" },
    });

    const books = await getFamilyBooks({ familyId: family.id });
    expect(books).toEqual([]);
  });
});
```

### Component Testing

```typescript
// __tests__/components/BooksStats.test.tsx
import { render, screen } from "@testing-library/react";
import { BooksStats } from "@/components/books/BooksStats";

describe("BooksStats", () => {
  it("should display book statistics", () => {
    const stats = {
      total: 24,
      currentlyReading: 3,
      completed: 18,
      wantToRead: 12,
    };

    render(<BooksStats stats={stats} />);

    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("Total Books")).toBeInTheDocument();
  });
});
```

This integration plan provides a comprehensive roadmap for transforming the static Family App into a fully functional, data-driven application with robust authentication and database integration.
