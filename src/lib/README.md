# /src/lib - Core Library

## Purpose

Core business logic and data access layer for the Family App. This directory contains reusable, framework-agnostic code that can be shared across different parts of the application.

## Structure

### `/repositories`

Data access layer using the Repository pattern. Provides type-safe, testable interfaces to the database through Prisma ORM.

### `/validation`

Input validation schemas using Zod. Ensures data integrity and type safety at the application boundary.

### `/errors`

Centralized error handling with structured error types. Converts database and validation errors into user-friendly messages.

### `database.ts`

Prisma client configuration and database utilities including health checks and connection management.

## Why This Structure?

- **Separation of Concerns**: Database logic separated from UI and API layers
- **Testability**: Repository pattern enables easy mocking and unit testing
- **Type Safety**: Full TypeScript coverage with runtime validation
- **Reusability**: Framework-agnostic code can be used in different contexts
