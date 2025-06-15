# Mock Implementation Examples

## Overview

This document provides concrete implementation examples and configuration files for the database and authentication system. These examples can be used as templates for the actual implementation.

## 1. Environment Configuration

### .env.local Example

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/family_app_dev"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-in-production"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Configuration (for email/password auth)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-app-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-specific-password"
EMAIL_FROM="noreply@family-app.com"

# Optional: Rate limiting (if using Upstash)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

### .env.production Example

```bash
# Production Database (e.g., Railway, Supabase, PlanetScale)
DATABASE_URL="postgresql://username:password@host:5432/family_app_prod"

# NextAuth.js Production
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="ultra-secure-production-secret"

# Production OAuth (same setup, different domains)
GOOGLE_CLIENT_ID="prod-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="prod-google-client-secret"

# Production Email Service (e.g., SendGrid, Resend)
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="noreply@your-domain.com"
```

## 2. Prisma Schema Implementation

### Complete Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// NextAuth.js required tables
model Account {
  id                String  @id @default(cuid())
  userId            String  @map("user_id")
  type              String
  provider          String
  providerAccountId String  @map("provider_account_id")
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model User {
  id              String    @id @default(cuid())
  name            String?
  email           String    @unique
  emailVerified   DateTime? @map("email_verified")
  image           String?
  dateOfBirth     DateTime? @map("date_of_birth") @db.Date
  preferences     Json      @default("{}")
  role            String    @default("member")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")

  accounts      Account[]
  sessions      Session[]
  familyMembers FamilyMember[]
  userBooks     UserBook[]
  userMedia     UserMedia[]
  activityLog   ActivityLog[]
  createdGoals  FamilyGoal[]
  goalProgress  GoalProgress[]

  @@map("users")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verificationtokens")
}

// Family Management
model Family {
  id          String   @id @default(cuid())
  name        String
  description String?
  settings    Json     @default("{}")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  members       FamilyMember[]
  userBooks     UserBook[]
  userMedia     UserMedia[]
  subscriptions FamilySubscription[]
  tags          Tag[]
  activityLog   ActivityLog[]
  goals         FamilyGoal[]

  @@map("families")
}

model FamilyMember {
  id       String   @id @default(cuid())
  familyId String   @map("family_id")
  userId   String   @map("user_id")
  role     String   @default("member") // admin, member, child
  joinedAt DateTime @default(now()) @map("joined_at")

  family Family @relation(fields: [familyId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([familyId, userId])
  @@map("family_members")
}

// Books Domain
model Book {
  id             String    @id @default(cuid())
  title          String
  author         String?
  isbn           String?   @unique
  isbn13         String?   @unique
  googleBooksId  String?   @unique @map("google_books_id")
  description    String?   @db.Text
  pageCount      Int?      @map("page_count")
  publishedDate  DateTime? @map("published_date") @db.Date
  language       String    @default("en")
  coverImageUrl  String?   @map("cover_image_url")
  genre          String?
  categories     String[]
  averageRating  Decimal?  @map("average_rating") @db.Decimal(3, 2)
  ratingsCount   Int       @default(0) @map("ratings_count")
  publisher      String?
  createdAt      DateTime  @default(now()) @map("created_at")
  updatedAt      DateTime  @updatedAt @map("updated_at")

  userBooks UserBook[]
  tags      ItemTag[]

  @@index([title])
  @@index([author])
  @@map("books")
}

enum BookStatus {
  WANT_TO_READ
  CURRENTLY_READING
  COMPLETED
  DID_NOT_FINISH
}

model UserBook {
  id          String     @id @default(cuid())
  userId      String     @map("user_id")
  bookId      String     @map("book_id")
  familyId    String     @map("family_id")
  status      BookStatus
  rating      Int?       @db.SmallInt // 1-5
  review      String?    @db.Text
  notes       String?    @db.Text
  currentPage Int?       @default(0) @map("current_page")
  startDate   DateTime?  @map("start_date") @db.Date
  finishDate  DateTime?  @map("finish_date") @db.Date
  favorite    Boolean    @default(false)
  private     Boolean    @default(false)
  createdAt   DateTime   @default(now()) @map("created_at")
  updatedAt   DateTime   @updatedAt @map("updated_at")

  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  book            Book             @relation(fields: [bookId], references: [id], onDelete: Cascade)
  family          Family           @relation(fields: [familyId], references: [id], onDelete: Cascade)
  readingSessions ReadingSession[]

  @@unique([userId, bookId])
  @@index([familyId, status])
  @@map("user_books")
}

model ReadingSession {
  id              String   @id @default(cuid())
  userBookId      String   @map("user_book_id")
  startPage       Int      @map("start_page")
  endPage         Int      @map("end_page")
  durationMinutes Int?     @map("duration_minutes")
  sessionDate     DateTime @default(now()) @map("session_date") @db.Date
  notes           String?  @db.Text
  createdAt       DateTime @default(now()) @map("created_at")

  userBook UserBook @relation(fields: [userBookId], references: [id], onDelete: Cascade)

  @@map("reading_sessions")
}

// Media/Streaming Domain
enum MediaType {
  MOVIE
  TV_SERIES
  DOCUMENTARY
  ANIME
}

enum MediaStatus {
  WANT_TO_WATCH
  CURRENTLY_WATCHING
  COMPLETED
  DROPPED
  ON_HOLD
}

model Media {
  id            String    @id @default(cuid())
  title         String
  type          MediaType
  tmdbId        Int?      @unique @map("tmdb_id")
  imdbId        String?   @unique @map("imdb_id")
  description   String?   @db.Text
  releaseDate   DateTime? @map("release_date") @db.Date
  runtime       Int?      // minutes
  language      String    @default("en")
  posterUrl     String?   @map("poster_url")
  backdropUrl   String?   @map("backdrop_url")
  genres        String[]
  directors     String[]
  cast          String[]
  averageRating Decimal?  @map("average_rating") @db.Decimal(3, 2)
  ratingsCount  Int       @default(0) @map("ratings_count")
  contentRating String?   @map("content_rating") // G, PG, PG-13, R, etc.
  totalSeasons  Int?      @map("total_seasons")
  totalEpisodes Int?      @map("total_episodes")
  status        String?   // ended, ongoing, cancelled
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  userMedia     UserMedia[]
  availability  MediaAvailability[]
  tags          ItemTag[]

  @@index([title])
  @@index([type])
  @@map("media")
}

model UserMedia {
  id                   String      @id @default(cuid())
  userId               String      @map("user_id")
  mediaId              String      @map("media_id")
  familyId             String      @map("family_id")
  status               MediaStatus
  rating               Int?        @db.SmallInt // 1-5
  review               String?     @db.Text
  notes                String?     @db.Text
  currentSeason        Int?        @default(1) @map("current_season")
  currentEpisode       Int?        @default(1) @map("current_episode")
  totalWatchedEpisodes Int?        @default(0) @map("total_watched_episodes")
  startDate            DateTime?   @map("start_date") @db.Date
  finishDate           DateTime?   @map("finish_date") @db.Date
  favorite             Boolean     @default(false)
  private              Boolean     @default(false)
  watchPriority        Int         @default(3) @map("watch_priority") // 1-5
  createdAt            DateTime    @default(now()) @map("created_at")
  updatedAt            DateTime    @updatedAt @map("updated_at")

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  media  Media  @relation(fields: [mediaId], references: [id], onDelete: Cascade)
  family Family @relation(fields: [familyId], references: [id], onDelete: Cascade)

  @@unique([userId, mediaId])
  @@index([familyId, status])
  @@map("user_media")
}

// Streaming Services
model StreamingService {
  id          String   @id @default(cuid())
  name        String   @unique
  logoUrl     String?  @map("logo_url")
  websiteUrl  String?  @map("website_url")
  colorHex    String?  @map("color_hex")
  createdAt   DateTime @default(now()) @map("created_at")

  subscriptions FamilySubscription[]
  availability  MediaAvailability[]

  @@map("streaming_services")
}

model FamilySubscription {
  id            String   @id @default(cuid())
  familyId      String   @map("family_id")
  serviceId     String   @map("service_id")
  isActive      Boolean  @default(true) @map("is_active")
  monthlyCost   Decimal? @map("monthly_cost") @db.Decimal(8, 2)
  billingDate   Int?     @map("billing_date") // day of month 1-31
  sharedAccount Boolean  @default(false) @map("shared_account")
  loginEmail    String?  @map("login_email")
  notes         String?  @db.Text
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  family  Family           @relation(fields: [familyId], references: [id], onDelete: Cascade)
  service StreamingService @relation(fields: [serviceId], references: [id], onDelete: Cascade)

  @@unique([familyId, serviceId])
  @@map("family_subscriptions")
}

model MediaAvailability {
  id            String   @id @default(cuid())
  mediaId       String   @map("media_id")
  serviceId     String   @map("service_id")
  availableUntil DateTime? @map("available_until") @db.Date
  isFree        Boolean  @default(false) @map("is_free")
  rentalPrice   Decimal? @map("rental_price") @db.Decimal(6, 2)
  purchasePrice Decimal? @map("purchase_price") @db.Decimal(6, 2)
  createdAt     DateTime @default(now()) @map("created_at")

  media   Media            @relation(fields: [mediaId], references: [id], onDelete: Cascade)
  service StreamingService @relation(fields: [serviceId], references: [id], onDelete: Cascade)

  @@unique([mediaId, serviceId])
  @@map("media_availability")
}

// Tags and Activity
model Tag {
  id        String   @id @default(cuid())
  familyId  String   @map("family_id")
  name      String
  colorHex  String   @default("#6B7280") @map("color_hex")
  createdAt DateTime @default(now()) @map("created_at")

  family Family    @relation(fields: [familyId], references: [id], onDelete: Cascade)
  items  ItemTag[]

  @@unique([familyId, name])
  @@map("tags")
}

model ItemTag {
  id      String  @id @default(cuid())
  tagId   String  @map("tag_id")
  bookId  String? @map("book_id")
  mediaId String? @map("media_id")

  tag   Tag    @relation(fields: [tagId], references: [id], onDelete: Cascade)
  book  Book?  @relation(fields: [bookId], references: [id], onDelete: Cascade)
  media Media? @relation(fields: [mediaId], references: [id], onDelete: Cascade)

  @@unique([tagId, bookId])
  @@unique([tagId, mediaId])
  @@map("item_tags")
}

model ActivityLog {
  id         String   @id @default(cuid())
  familyId   String   @map("family_id")
  userId     String   @map("user_id")
  actionType String   @map("action_type") // book_added, book_completed, etc.
  entityType String   @map("entity_type") // book, media
  entityId   String   @map("entity_id")
  metadata   Json     @default("{}")
  createdAt  DateTime @default(now()) @map("created_at")

  family Family @relation(fields: [familyId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([familyId, createdAt])
  @@map("activity_log")
}

// Goals
model FamilyGoal {
  id            String   @id @default(cuid())
  familyId      String   @map("family_id")
  createdByUserId String @map("created_by_user_id")
  type          String   // reading, watching
  title         String
  description   String?  @db.Text
  targetValue   Int      @map("target_value")
  targetUnit    String   @map("target_unit") // books, hours, episodes
  deadline      DateTime? @db.Date
  isActive      Boolean  @default(true) @map("is_active")
  isIndividual  Boolean  @default(false) @map("is_individual")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  family   Family         @relation(fields: [familyId], references: [id], onDelete: Cascade)
  creator  User           @relation(fields: [createdByUserId], references: [id], onDelete: Cascade)
  progress GoalProgress[]

  @@map("family_goals")
}

model GoalProgress {
  id           String   @id @default(cuid())
  goalId       String   @map("goal_id")
  userId       String   @map("user_id")
  currentValue Int      @default(0) @map("current_value")
  lastUpdated  DateTime @default(now()) @map("last_updated")

  goal FamilyGoal @relation(fields: [goalId], references: [id], onDelete: Cascade)
  user User       @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([goalId, userId])
  @@map("goal_progress")
}
```

## 3. NextAuth Configuration

### Complete Auth Configuration

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "./db";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      family?: {
        id: string;
        name: string;
        role: string;
      } | null;
    };
  }

  interface User {
    family?: {
      id: string;
      name: string;
      role: string;
    } | null;
  }
}

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
        port: Number(process.env.EMAIL_SERVER_PORT),
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
      if (session.user) {
        session.user.id = user.id;

        // Get family information
        const familyMember = await prisma.familyMember.findFirst({
          where: { userId: user.id },
          include: { family: true },
        });

        if (familyMember) {
          session.user.family = {
            id: familyMember.family.id,
            name: familyMember.family.name,
            role: familyMember.role,
          };
        }
      }

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Allow sign in
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after sign in
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/dashboard";
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-email",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser) {
        console.log(`New user registered: ${user.email}`);
        // You could trigger welcome email here
      }
    },
    async createUser({ user }) {
      console.log(`User created: ${user.email}`);
    },
  },
};
```

### API Route

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

## 4. Database Connection

### Prisma Client Setup

```typescript
// src/lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## 5. Data Services Examples

### Books Service

```typescript
// src/lib/services/books.ts
import { prisma } from "@/lib/db";
import { BookStatus, Prisma } from "@prisma/client";

export interface CreateBookData {
  title: string;
  author?: string;
  isbn?: string;
  description?: string;
  pageCount?: number;
  publishedDate?: Date;
  coverImageUrl?: string;
  genre?: string;
  categories?: string[];
}

export interface CreateUserBookData {
  status: BookStatus;
  rating?: number;
  review?: string;
  notes?: string;
  currentPage?: number;
  startDate?: Date;
  favorite?: boolean;
  private?: boolean;
}

export async function createBookWithUserBook(
  userId: string,
  familyId: string,
  bookData: CreateBookData,
  userBookData: CreateUserBookData
) {
  try {
    return await prisma.$transaction(async tx => {
      // First, try to find existing book by ISBN or title+author
      let book = null;

      if (bookData.isbn) {
        book = await tx.book.findUnique({
          where: { isbn: bookData.isbn },
        });
      }

      if (!book && bookData.title && bookData.author) {
        book = await tx.book.findFirst({
          where: {
            title: { equals: bookData.title, mode: "insensitive" },
            author: { equals: bookData.author, mode: "insensitive" },
          },
        });
      }

      // Create book if it doesn't exist
      if (!book) {
        book = await tx.book.create({
          data: bookData,
        });
      }

      // Create user book entry
      const userBook = await tx.userBook.create({
        data: {
          userId,
          bookId: book.id,
          familyId,
          ...userBookData,
        },
        include: {
          book: true,
          user: {
            select: { id: true, name: true, image: true },
          },
        },
      });

      // Log activity
      await tx.activityLog.create({
        data: {
          familyId,
          userId,
          actionType: "book_added",
          entityType: "book",
          entityId: book.id,
          metadata: {
            title: book.title,
            status: userBookData.status,
            rating: userBookData.rating,
          },
        },
      });

      return userBook;
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("You have already added this book to your collection");
      }
    }
    throw error;
  }
}

export async function updateUserBookStatus(
  userBookId: string,
  userId: string,
  status: BookStatus,
  additionalData?: {
    rating?: number;
    review?: string;
    finishDate?: Date;
    currentPage?: number;
  }
) {
  const userBook = await prisma.userBook.findFirst({
    where: {
      id: userBookId,
      userId, // Ensure user owns this book
    },
    include: { book: true },
  });

  if (!userBook) {
    throw new Error("Book not found or access denied");
  }

  const updatedUserBook = await prisma.userBook.update({
    where: { id: userBookId },
    data: {
      status,
      ...additionalData,
      ...(status === BookStatus.COMPLETED &&
        !additionalData?.finishDate && {
          finishDate: new Date(),
        }),
    },
    include: {
      book: true,
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  // Log activity for status changes
  if (status === BookStatus.COMPLETED) {
    await prisma.activityLog.create({
      data: {
        familyId: userBook.familyId,
        userId,
        actionType: "book_completed",
        entityType: "book",
        entityId: userBook.book.id,
        metadata: {
          title: userBook.book.title,
          rating: additionalData?.rating,
        },
      },
    });
  }

  return updatedUserBook;
}

export async function getFamilyBooksWithStats(familyId: string) {
  const [books, stats] = await Promise.all([
    prisma.userBook.findMany({
      where: { familyId, private: false },
      include: {
        book: true,
        user: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 20, // Limit for performance
    }),

    prisma.userBook.groupBy({
      by: ["status"],
      where: { familyId },
      _count: { status: true },
    }),
  ]);

  const statsMap = stats.reduce(
    (acc, stat) => {
      acc[stat.status] = stat._count.status;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    books,
    stats: {
      total: stats.reduce((sum, stat) => sum + stat._count.status, 0),
      wantToRead: statsMap[BookStatus.WANT_TO_READ] || 0,
      currentlyReading: statsMap[BookStatus.CURRENTLY_READING] || 0,
      completed: statsMap[BookStatus.COMPLETED] || 0,
      didNotFinish: statsMap[BookStatus.DID_NOT_FINISH] || 0,
    },
  };
}
```

## 6. Component Examples

### Books Stats Component

```typescript
// src/components/books/BooksStats.tsx
import { motion } from "framer-motion"
import * as styles from "./BooksStats.css"

interface BooksStatsProps {
  stats: {
    total: number
    wantToRead: number
    currentlyReading: number
    completed: number
    didNotFinish: number
  }
  isLoading?: boolean
}

export function BooksStats({ stats, isLoading }: BooksStatsProps) {
  if (isLoading) {
    return (
      <div className={styles.statsContainer}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statSkeleton} />
          </div>
        ))}
      </div>
    )
  }

  const statItems = [
    {
      value: stats.total,
      label: "Total Books",
      color: "#0070f3",
      icon: "📚"
    },
    {
      value: stats.currentlyReading,
      label: "Currently Reading",
      color: "#10b981",
      icon: "📖"
    },
    {
      value: stats.completed,
      label: "Completed",
      color: "#f59e0b",
      icon: "✅"
    },
    {
      value: stats.wantToRead,
      label: "Want to Read",
      color: "#8b5cf6",
      icon: "🎯"
    }
  ]

  return (
    <div className={styles.statsContainer}>
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{ borderColor: stat.color }}
        >
          <div className={styles.statIcon}>{stat.icon}</div>
          <span className={styles.statNumber} style={{ color: stat.color }}>
            {stat.value}
          </span>
          <span className={styles.statLabel}>{stat.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
```

### Add Book Form

```typescript
// src/components/books/AddBookForm.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { BookStatus } from "@prisma/client"
import * as styles from "./AddBookForm.css"

interface AddBookFormProps {
  onClose: () => void
  onSuccess?: (book: any) => void
}

export function AddBookForm({ onClose, onSuccess }: AddBookFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    status: BookStatus.WANT_TO_READ,
    rating: "",
    review: "",
    notes: "",
    currentPage: "",
    private: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.family) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book: {
            title: formData.title,
            author: formData.author || undefined,
            isbn: formData.isbn || undefined,
          },
          userBook: {
            status: formData.status,
            rating: formData.rating ? parseInt(formData.rating) : undefined,
            review: formData.review || undefined,
            notes: formData.notes || undefined,
            currentPage: formData.currentPage ? parseInt(formData.currentPage) : undefined,
            private: formData.private,
            ...(formData.status === BookStatus.CURRENTLY_READING && {
              startDate: new Date()
            })
          }
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add book")
      }

      const book = await response.json()
      onSuccess?.(book)
      onClose()
      router.refresh() // Refresh server components
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Add New Book</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="author">Author</label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="isbn">ISBN</label>
            <input
              id="isbn"
              type="text"
              value={formData.isbn}
              onChange={(e) => setFormData(prev => ({ ...prev, isbn: e.target.value }))}
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="status">Reading Status *</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as BookStatus }))}
              required
              disabled={isLoading}
            >
              <option value={BookStatus.WANT_TO_READ}>Want to Read</option>
              <option value={BookStatus.CURRENTLY_READING}>Currently Reading</option>
              <option value={BookStatus.COMPLETED}>Completed</option>
            </select>
          </div>

          {formData.status === BookStatus.CURRENTLY_READING && (
            <div className={styles.field}>
              <label htmlFor="currentPage">Current Page</label>
              <input
                id="currentPage"
                type="number"
                min="0"
                value={formData.currentPage}
                onChange={(e) => setFormData(prev => ({ ...prev, currentPage: e.target.value }))}
                disabled={isLoading}
              />
            </div>
          )}

          {formData.status === BookStatus.COMPLETED && (
            <div className={styles.field}>
              <label htmlFor="rating">Rating (1-5)</label>
              <select
                id="rating"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                disabled={isLoading}
              >
                <option value="">No Rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="review">Review</label>
            <textarea
              id="review"
              value={formData.review}
              onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="notes">Personal Notes</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={2}
              disabled={isLoading}
            />
          </div>

          <div className={styles.checkboxField}>
            <label>
              <input
                type="checkbox"
                checked={formData.private}
                onChange={(e) => setFormData(prev => ({ ...prev, private: e.target.checked }))}
                disabled={isLoading}
              />
              Keep this book private (only you can see it)
            </label>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !formData.title.trim()}
            >
              {isLoading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
```

## 7. Package.json Updates

### Required Dependencies

```json
{
  "dependencies": {
    "@auth/prisma-adapter": "^2.7.4",
    "@prisma/client": "^6.1.0",
    "next-auth": "^4.24.10",
    "prisma": "^6.1.0",
    "zod": "^3.24.1",
    "framer-motion": "^12.0.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "bcryptjs": "^2.4.3"
  },
  "scripts": {
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

## 8. Database Seeding

### Seed Script

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed streaming services
  const streamingServices = [
    {
      name: "Netflix",
      logoUrl: "/logos/netflix.png",
      websiteUrl: "https://netflix.com",
      colorHex: "#E50914",
    },
    {
      name: "Disney+",
      logoUrl: "/logos/disney.png",
      websiteUrl: "https://disneyplus.com",
      colorHex: "#113CCF",
    },
    {
      name: "Prime Video",
      logoUrl: "/logos/prime.png",
      websiteUrl: "https://primevideo.com",
      colorHex: "#00A8E1",
    },
    {
      name: "Hulu",
      logoUrl: "/logos/hulu.png",
      websiteUrl: "https://hulu.com",
      colorHex: "#1CE783",
    },
    {
      name: "HBO Max",
      logoUrl: "/logos/hbo.png",
      websiteUrl: "https://hbomax.com",
      colorHex: "#B537F2",
    },
    {
      name: "Apple TV+",
      logoUrl: "/logos/apple.png",
      websiteUrl: "https://tv.apple.com",
      colorHex: "#000000",
    },
  ];

  for (const service of streamingServices) {
    await prisma.streamingService.upsert({
      where: { name: service.name },
      update: {},
      create: service,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

This comprehensive mock implementation provides all the concrete examples needed to implement the database and authentication system for the Family App.
