import { PrismaClient, BookStatus } from "../../../src/generated/prisma";
import { BookRepository } from "../../../src/lib/repositories/book.repository";
import { UserRepository } from "../../../src/lib/repositories/user.repository";
import { FamilyRepository } from "../../../src/lib/repositories/family.repository";
import bcrypt from "bcryptjs";

describe("BookRepository", () => {
  let prisma: PrismaClient;
  let bookRepository: BookRepository;
  let userRepository: UserRepository;
  let familyRepository: FamilyRepository;
  let testFamily: any;
  let testUser: any;

  beforeAll(async () => {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: "file:./test.db",
        },
      },
    });

    bookRepository = new BookRepository(prisma);
    userRepository = new UserRepository(prisma);
    familyRepository = new FamilyRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean up
    await prisma.userBook.deleteMany();
    await prisma.bookReview.deleteMany();
    await prisma.book.deleteMany();
    await prisma.user.deleteMany();
    await prisma.family.deleteMany();

    // Create test family and user
    testFamily = await familyRepository.create({
      name: "Test Family",
      inviteCode: "TEST123",
    });

    testUser = await userRepository.create({
      email: "test@example.com",
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      passwordHash: await bcrypt.hash("password123", 10),
      familyId: testFamily.id,
    });
  });

  describe("create", () => {
    it("should create a new book", async () => {
      const bookData = {
        title: "Test Book",
        author: "Test Author",
        isbn: "9781234567890",
        description: "A test book",
        pageCount: 300,
        genre: "Fiction",
        familyId: testFamily.id,
      };

      const book = await bookRepository.create(bookData);

      expect(book).toBeDefined();
      expect(book.title).toBe(bookData.title);
      expect(book.author).toBe(bookData.author);
      expect(book.isbn).toBe(bookData.isbn);
      expect(book.familyId).toBe(testFamily.id);
    });

    it("should throw error for duplicate ISBN", async () => {
      const bookData = {
        title: "Test Book 1",
        author: "Test Author",
        isbn: "9781234567890",
        familyId: testFamily.id,
      };

      await bookRepository.create(bookData);

      const duplicateBook = {
        title: "Test Book 2",
        author: "Different Author",
        isbn: "9781234567890",
        familyId: testFamily.id,
      };

      await expect(bookRepository.create(duplicateBook)).rejects.toThrow();
    });
  });

  describe("findById", () => {
    it("should find book by id with related data", async () => {
      const bookData = {
        title: "Find Book",
        author: "Find Author",
        familyId: testFamily.id,
      };

      const createdBook = await bookRepository.create(bookData);
      const foundBook = await bookRepository.findById(createdBook.id);

      expect(foundBook).toBeDefined();
      expect(foundBook!.id).toBe(createdBook.id);
      expect(foundBook!.familyId).toBe(testFamily.id);
    });

    it("should return null for non-existent id", async () => {
      const foundBook = await bookRepository.findById("non-existent-id");
      expect(foundBook).toBeNull();
    });
  });

  describe("findByIsbn", () => {
    it("should find book by ISBN", async () => {
      const bookData = {
        title: "ISBN Book",
        author: "ISBN Author",
        isbn: "9787654321098",
        familyId: testFamily.id,
      };

      await bookRepository.create(bookData);
      const foundBook = await bookRepository.findByIsbn(bookData.isbn!);

      expect(foundBook).toBeDefined();
      expect(foundBook!.isbn).toBe(bookData.isbn);
    });
  });

  describe("findMany", () => {
    beforeEach(async () => {
      // Create test books
      const books = [
        {
          title: "Fiction Book",
          author: "Fiction Author",
          genre: "Fiction",
          familyId: testFamily.id,
        },
        {
          title: "Science Book",
          author: "Science Author",
          genre: "Science",
          familyId: testFamily.id,
        },
        {
          title: "Another Fiction",
          author: "Another Author",
          genre: "Fiction",
          familyId: testFamily.id,
        },
      ];

      for (const bookData of books) {
        await bookRepository.create(bookData);
      }
    });

    it("should return all books with pagination", async () => {
      const result = await bookRepository.findMany({ familyId: testFamily.id });

      expect(result.data).toHaveLength(3);
      expect(result.pagination.total).toBe(3);
    });

    it("should filter by genre", async () => {
      const result = await bookRepository.findMany({
        familyId: testFamily.id,
        genre: "Fiction",
      });

      expect(result.data).toHaveLength(2);
      expect(result.data.every(book => book.genre?.includes("Fiction"))).toBe(
        true
      );
    });

    it("should search by title", async () => {
      const result = await bookRepository.findMany({
        familyId: testFamily.id,
        search: "Science",
      });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].title).toBe("Science Book");
    });
  });

  describe("User Book operations", () => {
    let testBook: any;

    beforeEach(async () => {
      testBook = await bookRepository.create({
        title: "User Book Test",
        author: "Test Author",
        familyId: testFamily.id,
      });
    });

    it("should add book to user library", async () => {
      const userBookData = {
        userId: testUser.id,
        bookId: testBook.id,
        status: BookStatus.READING,
        progress: 50,
      };

      const userBook = await bookRepository.addUserBook(userBookData);

      expect(userBook).toBeDefined();
      expect(userBook.userId).toBe(testUser.id);
      expect(userBook.bookId).toBe(testBook.id);
      expect(userBook.status).toBe(BookStatus.READING);
      expect(userBook.progress).toBe(50);
    });

    it("should update user book", async () => {
      await bookRepository.addUserBook({
        userId: testUser.id,
        bookId: testBook.id,
        status: BookStatus.READING,
        progress: 50,
      });

      const updatedUserBook = await bookRepository.updateUserBook(
        testUser.id,
        testBook.id,
        {
          status: BookStatus.COMPLETED,
          progress: 300,
          rating: 4.5,
        }
      );

      expect(updatedUserBook.status).toBe(BookStatus.COMPLETED);
      expect(updatedUserBook.progress).toBe(300);
      expect(updatedUserBook.rating).toBe(4.5);
    });

    it("should find user book", async () => {
      await bookRepository.addUserBook({
        userId: testUser.id,
        bookId: testBook.id,
        status: BookStatus.WISHLIST,
      });

      const userBook = await bookRepository.findUserBook(
        testUser.id,
        testBook.id
      );

      expect(userBook).toBeDefined();
      expect(userBook!.status).toBe(BookStatus.WISHLIST);
    });

    it("should get user books by status", async () => {
      // Add multiple books with different statuses
      const books = await Promise.all([
        bookRepository.create({
          title: "Book 1",
          author: "Author 1",
          familyId: testFamily.id,
        }),
        bookRepository.create({
          title: "Book 2",
          author: "Author 2",
          familyId: testFamily.id,
        }),
      ]);

      await bookRepository.addUserBook({
        userId: testUser.id,
        bookId: books[0].id,
        status: BookStatus.READING,
      });

      await bookRepository.addUserBook({
        userId: testUser.id,
        bookId: books[1].id,
        status: BookStatus.COMPLETED,
      });

      const readingBooks = await bookRepository.getUserBooks(
        testUser.id,
        BookStatus.READING
      );
      const allBooks = await bookRepository.getUserBooks(testUser.id);

      expect(readingBooks.data).toHaveLength(1);
      expect(readingBooks.data[0].status).toBe(BookStatus.READING);
      expect(allBooks.data).toHaveLength(2);
    });

    it("should remove user book", async () => {
      await bookRepository.addUserBook({
        userId: testUser.id,
        bookId: testBook.id,
        status: BookStatus.WISHLIST,
      });

      await bookRepository.removeUserBook(testUser.id, testBook.id);

      const userBook = await bookRepository.findUserBook(
        testUser.id,
        testBook.id
      );
      expect(userBook).toBeNull();
    });
  });

  describe("getUserBookStats", () => {
    beforeEach(async () => {
      // Create books with different statuses
      const books = await Promise.all([
        bookRepository.create({
          title: "Wishlist Book",
          author: "Author",
          familyId: testFamily.id,
        }),
        bookRepository.create({
          title: "Reading Book",
          author: "Author",
          familyId: testFamily.id,
        }),
        bookRepository.create({
          title: "Completed Book",
          author: "Author",
          familyId: testFamily.id,
        }),
      ]);

      await bookRepository.addUserBook({
        userId: testUser.id,
        bookId: books[0].id,
        status: BookStatus.WISHLIST,
      });

      await bookRepository.addUserBook({
        userId: testUser.id,
        bookId: books[1].id,
        status: BookStatus.READING,
      });

      await bookRepository.addUserBook({
        userId: testUser.id,
        bookId: books[2].id,
        status: BookStatus.COMPLETED,
      });
    });

    it("should return correct user book statistics", async () => {
      const stats = await bookRepository.getUserBookStats(testUser.id);

      expect(stats.wishlist).toBe(1);
      expect(stats.reading).toBe(1);
      expect(stats.completed).toBe(1);
      expect(stats.paused).toBe(0);
      expect(stats.abandoned).toBe(0);
      expect(stats.total).toBe(3);
    });
  });

  describe("searchBooks", () => {
    beforeEach(async () => {
      const books = [
        {
          title: "Harry Potter",
          author: "J.K. Rowling",
          genre: "Fantasy",
          familyId: testFamily.id,
        },
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          genre: "Fantasy",
          familyId: testFamily.id,
        },
        {
          title: "Dune",
          author: "Frank Herbert",
          genre: "Science Fiction",
          familyId: testFamily.id,
        },
      ];

      for (const bookData of books) {
        await bookRepository.create(bookData);
      }
    });

    it("should search books by title", async () => {
      const results = await bookRepository.searchBooks("Harry", testFamily.id);

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe("Harry Potter");
    });

    it("should search books by author", async () => {
      const results = await bookRepository.searchBooks(
        "Tolkien",
        testFamily.id
      );

      expect(results).toHaveLength(1);
      expect(results[0].author).toBe("J.R.R. Tolkien");
    });

    it("should search books by genre", async () => {
      const results = await bookRepository.searchBooks(
        "Fantasy",
        testFamily.id
      );

      expect(results).toHaveLength(2);
    });
  });
});
