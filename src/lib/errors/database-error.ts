import { Prisma } from "../../generated/prisma";

export class DatabaseError extends Error {
  constructor(
    message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(resource: string, id?: string) {
    super(`${resource}${id ? ` with id ${id}` : ""} not found`);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export function handleDatabaseError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        // Unique constraint failed
        const target = error.meta?.target as string[] | undefined;
        const field = target?.[0] || "field";
        throw new ConflictError(`${field} already exists`);
      }

      case "P2025":
        // Record not found
        throw new NotFoundError("Record");

      case "P2003":
        // Foreign key constraint failed
        throw new ValidationError("Referenced record does not exist");

      case "P2014":
        // Required relation constraint failed
        throw new ValidationError("Required relationship is missing");

      case "P2000":
        // Value too long for column
        throw new ValidationError("Input value is too long");

      default:
        throw new DatabaseError(`Database error: ${error.message}`, error);
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new ValidationError(`Validation error: ${error.message}`);
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new DatabaseError(
      `Database connection error: ${error.message}`,
      error
    );
  }

  if (
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof ConflictError ||
    error instanceof UnauthorizedError
  ) {
    throw error;
  }

  // Unknown error
  throw new DatabaseError(`Unexpected database error: ${error}`, error);
}

export function withErrorHandling<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleDatabaseError(error);
    }
  };
}
