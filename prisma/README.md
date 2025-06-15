# Database Schema & Migrations

## Purpose

Complete database schema for the Family App using Prisma ORM with SQLite. Supports multi-user families with books and streaming content management.

## Key Files

### `schema.prisma`

- **14 interconnected models** with proper relationships
- **Strategic indexing** for query performance
- **Enum-driven design** for consistent state management
- **SQLite optimized** but portable to PostgreSQL/MySQL

### `seed.ts`

- **Demo family data**: The Johnson Family
- **4 users** with different roles (parents + children)
- **Sample content**: Books and streaming items with progress
- Run with: `npm run db:seed`

### `/migrations`

- **Version-controlled schema evolution**
- **Automatic generation** with `npm run db:migrate`
- **Rollback capability** with migration history

## Database Design

### Core Architecture

```
Users (Authentication + Profiles)
├── Families (Multi-user households)
├── Books Domain (Reading management)
│   ├── Books → UserBooks → ReadingSessions
│   ├── BookReviews + ReadingGoals
└── Streaming Domain (Viewing management)
    ├── StreamingContent → Episodes
    ├── UserStreamingItems → WatchingSessions
    └── StreamingReviews + StreamingGoals
```

### Key Design Principles

- **Family-Centric**: All content belongs to families for privacy
- **Individual Progress**: Personal tracking on shared content
- **Goal Systems**: Reading and viewing targets with progress
- **Activity Feeds**: Social engagement within families

## Common Operations

```bash
# Set up database
npm run db:migrate

# Populate demo data
npm run db:seed

# Visual database browser
npm run db:studio

# Reset for development
npm run db:reset
```

## Performance Features

- **15+ strategic indexes** on frequently queried fields
- **Composite indexes** for complex query patterns
- **Time-based indexes** for analytics and reporting
- **Foreign key constraints** with proper cascade behaviors
