import { Book, UserBook, BookStatus, Prisma } from "../../generated/prisma";
import {
  BaseRepository,
  PaginationOptions,
  PaginatedResult,
  PaginationHelper,
} from "./base.repository";

export interface CreateBookData {
  title: string;
  author: string;
  isbn?: string;
  description?: string;
  publishedDate?: Date;
  pageCount?: number;
  language?: string;
  publisher?: string;
  genre?: string;
  coverImage?: string;
  googleBooksId?: string;
  openLibraryId?: string;
  familyId: string;
}

export interface UpdateBookData {
  title?: string;
  author?: string;
  isbn?: string;
  description?: string;
  publishedDate?: Date;
  pageCount?: number;
  language?: string;
  publisher?: string;
  genre?: string;
  coverImage?: string;
  googleBooksId?: string;
  openLibraryId?: string;
}

export interface BookFilters {
  familyId?: string;
  genre?: string;
  author?: string;
  language?: string;
  search?: string;
}

export interface CreateUserBookData {
  userId: string;
  bookId: string;
  status?: BookStatus;
  rating?: number;
  progress?: number;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
  isFavorite?: boolean;
}

export interface UpdateUserBookData {
  status?: BookStatus;
  rating?: number;
  progress?: number;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
  isFavorite?: boolean;
}

export class BookRepository extends BaseRepository {
  async create(data: CreateBookData): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async findById(id: string): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { id },
      include: {
        family: {
          select: {
            id: true,
            name: true,
          },
        },
        userBooks: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                profilePicture: true,
              },
            },
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                profilePicture: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            userBooks: true,
            reviews: true,
          },
        },
      },
    });
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { isbn },
    });
  }

  async findMany(
    filters: BookFilters = {},
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<Book>> {
    const { page, limit, skip, take } =
      PaginationHelper.getPaginationParams(pagination);

    const where: Prisma.BookWhereInput = {};

    if (filters.familyId) {
      where.familyId = filters.familyId;
    }

    if (filters.genre) {
      where.genre = { contains: filters.genre };
    }

    if (filters.author) {
      where.author = { contains: filters.author };
    }

    if (filters.language) {
      where.language = filters.language;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search } },
        { author: { contains: filters.search } },
        { description: { contains: filters.search } },
        { genre: { contains: filters.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take,
        include: {
          _count: {
            select: {
              userBooks: true,
              reviews: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data,
      pagination: PaginationHelper.calculatePagination(page, limit, total),
    };
  }

  async update(id: string, data: UpdateBookData): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Book> {
    return this.prisma.book.delete({
      where: { id },
    });
  }

  async addUserBook(data: CreateUserBookData): Promise<UserBook> {
    return this.prisma.userBook.create({
      data: {
        userId: data.userId,
        bookId: data.bookId,
        status: data.status || BookStatus.WISHLIST,
        rating: data.rating,
        progress: data.progress || 0,
        startDate: data.startDate,
        endDate: data.endDate,
        notes: data.notes,
        isFavorite: data.isFavorite || false,
      },
      include: {
        book: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });
  }

  async updateUserBook(
    userId: string,
    bookId: string,
    data: UpdateUserBookData
  ): Promise<UserBook> {
    return this.prisma.userBook.update({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
      data,
      include: {
        book: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });
  }

  async removeUserBook(userId: string, bookId: string): Promise<UserBook> {
    return this.prisma.userBook.delete({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });
  }

  async findUserBook(userId: string, bookId: string): Promise<UserBook | null> {
    return this.prisma.userBook.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
      include: {
        book: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });
  }

  async getUserBooks(
    userId: string,
    status?: BookStatus,
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<UserBook>> {
    const { page, limit, skip, take } =
      PaginationHelper.getPaginationParams(pagination);

    const where: Prisma.UserBookWhereInput = {
      userId,
    };

    if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      this.prisma.userBook.findMany({
        where,
        skip,
        take,
        include: {
          book: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      }),
      this.prisma.userBook.count({ where }),
    ]);

    return {
      data,
      pagination: PaginationHelper.calculatePagination(page, limit, total),
    };
  }

  async getFamilyBooks(
    familyId: string,
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<Book>> {
    return this.findMany({ familyId }, pagination);
  }

  async getPopularBooks(familyId: string, limit: number = 10): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: {
        familyId,
      },
      include: {
        _count: {
          select: {
            userBooks: true,
          },
        },
      },
      orderBy: {
        userBooks: {
          _count: "desc",
        },
      },
      take: limit,
    });
  }

  async getRecentBooks(familyId: string, limit: number = 10): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: {
        familyId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  async getUserBookStats(userId: string) {
    const stats = await this.prisma.userBook.groupBy({
      by: ["status"],
      where: { userId },
      _count: { status: true },
    });

    const result = {
      wishlist: 0,
      reading: 0,
      completed: 0,
      paused: 0,
      abandoned: 0,
      total: 0,
    };

    stats.forEach(stat => {
      const status = stat.status.toLowerCase() as keyof typeof result;
      if (status !== "total" && status in result) {
        result[status] = stat._count.status;
        result.total += stat._count.status;
      }
    });

    return result;
  }

  async searchBooks(
    query: string,
    familyId?: string,
    limit: number = 20
  ): Promise<Book[]> {
    const where: Prisma.BookWhereInput = {
      OR: [
        { title: { contains: query } },
        { author: { contains: query } },
        { description: { contains: query } },
        { genre: { contains: query } },
      ],
    };

    if (familyId) {
      where.familyId = familyId;
    }

    return this.prisma.book.findMany({
      where,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
