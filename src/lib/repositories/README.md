# Repository Layer

## Purpose
Type-safe data access layer implementing the Repository pattern. Provides a clean abstraction over Prisma ORM with consistent error handling, validation, and performance optimization.

## Why Repository Pattern?
- **Testability**: Easy to mock for unit tests
- **Consistency**: Standardized CRUD operations across all entities
- **Performance**: Optimized queries with proper indexing and aggregation
- **Error Handling**: Structured error management with proper error types
- **Type Safety**: Full TypeScript coverage with runtime validation

## Structure

### `base.repository.ts`
- Common functionality shared across all repositories
- Pagination utilities and helpers
- Base error handling patterns

### Entity-Specific Repositories
- **`user.repository.ts`**: User management, authentication, family relationships
- **`family.repository.ts`**: Family management, invitations, member coordination  
- **`book.repository.ts`**: Books, reading progress, reviews, goals, sessions
- **`streaming.repository.ts`**: Movies/TV shows, viewing progress, episodes, goals

### `index.ts`
- Repository factory with singleton pattern
- Centralized access point: `repositories.user.findById(id)`
- Shared Prisma client instance

## Usage Examples

```typescript
// Get user with family info
const user = await repositories.user.findById(userId);

// Search books with pagination
const books = await repositories.book.findMany(
  { familyId, search: "Harry Potter" },
  { page: 1, limit: 10 }
);

// Get optimized user statistics (single query)
const stats = await repositories.book.getUserBookStats(userId);
```

## Performance Features
- **Strategic Indexing**: Optimized for common query patterns
- **Aggregation Queries**: Single queries for statistics (not N+1)
- **Pagination**: Efficient cursor and offset-based pagination
- **Selective Loading**: Include only needed relations