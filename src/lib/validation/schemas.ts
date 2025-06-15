import { z } from 'zod';
import { UserRole, BookStatus, StreamingStatus, ContentType } from '../../generated/prisma';

// Common validation schemas
export const IdSchema = z.string().cuid();
export const EmailSchema = z.string().email();
export const UsernameSchema = z.string().min(2).max(50).regex(/^[a-zA-Z0-9_-]+$/);
export const PasswordSchema = z.string().min(8).max(128);
export const RatingSchema = z.number().min(1).max(5);
export const InviteCodeSchema = z.string().length(8).regex(/^[A-Z0-9]+$/);

// User validation schemas
export const CreateUserSchema = z.object({
  email: EmailSchema,
  username: UsernameSchema,
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  passwordHash: z.string().min(1),
  role: z.nativeEnum(UserRole).optional(),
  dateOfBirth: z.date().optional(),
  profilePicture: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  familyId: IdSchema.optional(),
});

export const UpdateUserSchema = CreateUserSchema.partial().omit({ passwordHash: true });

// Family validation schemas
export const CreateFamilySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  inviteCode: InviteCodeSchema,
  isPrivate: z.boolean().optional(),
  maxMembers: z.number().min(1).max(50).optional(),
});

export const UpdateFamilySchema = CreateFamilySchema.partial();

// Book validation schemas
export const CreateBookSchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  isbn: z.string().optional(),
  description: z.string().max(2000).optional(),
  publishedDate: z.date().optional(),
  pageCount: z.number().min(1).optional(),
  language: z.string().max(50).optional(),
  publisher: z.string().max(255).optional(),
  genre: z.string().max(100).optional(),
  coverImage: z.string().url().optional(),
  googleBooksId: z.string().optional(),
  openLibraryId: z.string().optional(),
  familyId: IdSchema,
});

export const UpdateBookSchema = CreateBookSchema.partial().omit({ familyId: true });

export const CreateUserBookSchema = z.object({
  userId: IdSchema,
  bookId: IdSchema,
  status: z.nativeEnum(BookStatus).optional(),
  rating: RatingSchema.optional(),
  progress: z.number().min(0).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  notes: z.string().max(1000).optional(),
  isFavorite: z.boolean().optional(),
});

export const UpdateUserBookSchema = CreateUserBookSchema.partial().omit({ userId: true, bookId: true });

// Streaming validation schemas
export const CreateStreamingContentSchema = z.object({
  title: z.string().min(1).max(255),
  type: z.nativeEnum(ContentType),
  description: z.string().max(2000).optional(),
  releaseDate: z.date().optional(),
  runtime: z.number().min(1).optional(),
  genre: z.string().max(100).optional(),
  director: z.string().max(255).optional(),
  cast: z.string().optional(),
  posterImage: z.string().url().optional(),
  backdropImage: z.string().url().optional(),
  tmdbId: z.string().optional(),
  imdbId: z.string().optional(),
  totalSeasons: z.number().min(1).optional(),
  totalEpisodes: z.number().min(1).optional(),
  familyId: IdSchema,
});

export const UpdateStreamingContentSchema = CreateStreamingContentSchema.partial().omit({ familyId: true });

export const CreateUserStreamingItemSchema = z.object({
  userId: IdSchema,
  streamingContentId: IdSchema,
  status: z.nativeEnum(StreamingStatus).optional(),
  rating: RatingSchema.optional(),
  progress: z.number().min(0).optional(),
  currentSeason: z.number().min(1).optional(),
  currentEpisode: z.number().min(1).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  notes: z.string().max(1000).optional(),
  isFavorite: z.boolean().optional(),
});

export const UpdateUserStreamingItemSchema = CreateUserStreamingItemSchema.partial().omit({ 
  userId: true, 
  streamingContentId: true 
});

// Pagination validation
export const PaginationSchema = z.object({
  page: z.number().min(1).max(1000).optional(),
  limit: z.number().min(1).max(100).optional(),
});

// Search validation
export const SearchSchema = z.object({
  query: z.string().min(1).max(100),
  familyId: IdSchema.optional(),
  limit: z.number().min(1).max(50).optional(),
});

// Reading session validation
export const CreateReadingSessionSchema = z.object({
  userId: IdSchema,
  bookId: IdSchema,
  startPage: z.number().min(1),
  endPage: z.number().min(1),
  duration: z.number().min(1),
  date: z.date(),
  notes: z.string().max(500).optional(),
}).refine((data) => data.endPage >= data.startPage, {
  message: "End page must be greater than or equal to start page",
  path: ["endPage"],
});

// Watching session validation
export const CreateWatchingSessionSchema = z.object({
  userId: IdSchema,
  streamingContentId: IdSchema.optional(),
  episodeId: IdSchema.optional(),
  duration: z.number().min(1),
  date: z.date(),
  notes: z.string().max(500).optional(),
}).refine((data) => (data.streamingContentId && !data.episodeId) || (!data.streamingContentId && data.episodeId), {
  message: "Either streamingContentId or episodeId must be provided, but not both",
  path: ["streamingContentId"],
});

// Helper function for validation
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Validation error: ${result.error.errors.map(e => e.message).join(', ')}`);
  }
  return result.data;
}