import {
  PrismaClient,
  UserRole,
  BookStatus,
  StreamingStatus,
  ContentType,
} from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create a demo family
  const family = await prisma.family.create({
    data: {
      name: "The Johnson Family",
      description:
        "A loving family that enjoys reading and watching movies together",
      inviteCode: "JOHNSON123",
      isPrivate: false,
      maxMembers: 6,
    },
  });

  console.log("👨‍👩‍👧‍👦 Created family:", family.name);

  // Create demo users
  const passwordHash = await bcrypt.hash("password123", 10);

  const dad = await prisma.user.create({
    data: {
      email: "dad@johnson.com",
      username: "dadj",
      firstName: "John",
      lastName: "Johnson",
      name: "John Johnson", // NextAuth standard field
      dateOfBirth: new Date("1985-03-15"),
      role: UserRole.PARENT,
      passwordHash,
      emailVerified: new Date(), // DateTime, not boolean
      familyId: family.id,
      bio: "Father of three, loves science fiction and documentaries",
    },
  });

  const mom = await prisma.user.create({
    data: {
      email: "mom@johnson.com",
      username: "momj",
      firstName: "Sarah",
      lastName: "Johnson",
      name: "Sarah Johnson",
      dateOfBirth: new Date("1987-07-22"),
      role: UserRole.PARENT,
      passwordHash,
      emailVerified: new Date(),
      familyId: family.id,
      bio: "Mother, book lover, and streaming enthusiast",
    },
  });

  const child1 = await prisma.user.create({
    data: {
      email: "emma@johnson.com",
      username: "emmaj",
      firstName: "Emma",
      lastName: "Johnson",
      name: "Emma Johnson",
      dateOfBirth: new Date("2010-11-08"),
      role: UserRole.CHILD,
      passwordHash,
      emailVerified: new Date(),
      familyId: family.id,
      bio: "Loves fantasy books and animated movies",
    },
  });

  const child2 = await prisma.user.create({
    data: {
      email: "alex@johnson.com",
      username: "alexj",
      firstName: "Alex",
      lastName: "Johnson",
      name: "Alex Johnson",
      dateOfBirth: new Date("2012-05-14"),
      role: UserRole.CHILD,
      passwordHash,
      emailVerified: new Date(),
      familyId: family.id,
      bio: "Enjoys adventure stories and superhero shows",
    },
  });

  console.log(
    "👥 Created users:",
    [dad, mom, child1, child2].map(u => u.firstName).join(", ")
  );

  // Create sample books
  const books = [
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      isbn: "9780747532699",
      description: "The first book in the Harry Potter series",
      publishedDate: new Date("1997-06-26"),
      pageCount: 223,
      language: "English",
      publisher: "Bloomsbury",
      genre: "Fantasy",
      familyId: family.id,
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      isbn: "9780547928227",
      description: "A fantasy adventure novel",
      publishedDate: new Date("1937-09-21"),
      pageCount: 310,
      language: "English",
      publisher: "George Allen & Unwin",
      genre: "Fantasy",
      familyId: family.id,
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      isbn: "9780441013593",
      description: "Science fiction epic set in the distant future",
      publishedDate: new Date("1965-08-01"),
      pageCount: 688,
      language: "English",
      publisher: "Chilton Books",
      genre: "Science Fiction",
      familyId: family.id,
    },
    {
      title: "Wonder",
      author: "R.J. Palacio",
      isbn: "9780375869020",
      description: "A novel about a boy with facial differences",
      publishedDate: new Date("2012-02-14"),
      pageCount: 315,
      language: "English",
      publisher: "Knopf Books",
      genre: "Children's Fiction",
      familyId: family.id,
    },
  ];

  const createdBooks = await Promise.all(
    books.map(book => prisma.book.create({ data: book }))
  );

  console.log("📚 Created books:", createdBooks.length);

  // Create user-book relationships
  await prisma.userBook.createMany({
    data: [
      // Dad's books
      {
        userId: dad.id,
        bookId: createdBooks[2].id,
        status: BookStatus.COMPLETED,
        rating: 4.5,
        progress: 688,
      },
      {
        userId: dad.id,
        bookId: createdBooks[0].id,
        status: BookStatus.READING,
        progress: 150,
      },

      // Mom's books
      {
        userId: mom.id,
        bookId: createdBooks[0].id,
        status: BookStatus.COMPLETED,
        rating: 5.0,
        progress: 223,
      },
      {
        userId: mom.id,
        bookId: createdBooks[3].id,
        status: BookStatus.READING,
        progress: 200,
      },

      // Emma's books
      {
        userId: child1.id,
        bookId: createdBooks[0].id,
        status: BookStatus.COMPLETED,
        rating: 5.0,
        progress: 223,
      },
      {
        userId: child1.id,
        bookId: createdBooks[1].id,
        status: BookStatus.READING,
        progress: 100,
      },
      {
        userId: child1.id,
        bookId: createdBooks[3].id,
        status: BookStatus.WISHLIST,
      },

      // Alex's books
      {
        userId: child2.id,
        bookId: createdBooks[3].id,
        status: BookStatus.COMPLETED,
        rating: 4.8,
        progress: 315,
      },
      {
        userId: child2.id,
        bookId: createdBooks[0].id,
        status: BookStatus.WISHLIST,
      },
    ],
  });

  // Create streaming content
  const streamingContent = [
    {
      title: "Stranger Things",
      type: ContentType.TV_SERIES,
      description: "Supernatural drama series set in the 1980s",
      releaseDate: new Date("2016-07-15"),
      runtime: 50,
      genre: "Sci-Fi Drama",
      director: "The Duffer Brothers",
      totalSeasons: 4,
      totalEpisodes: 34,
      familyId: family.id,
    },
    {
      title: "The Incredibles",
      type: ContentType.MOVIE,
      description: "Animated superhero family film",
      releaseDate: new Date("2004-11-05"),
      runtime: 125,
      genre: "Animation",
      director: "Brad Bird",
      familyId: family.id,
    },
    {
      title: "Avatar: The Last Airbender",
      type: ContentType.ANIME,
      description: "Animated series about a young Avatar",
      releaseDate: new Date("2005-02-21"),
      runtime: 23,
      genre: "Animation",
      totalSeasons: 3,
      totalEpisodes: 61,
      familyId: family.id,
    },
    {
      title: "Planet Earth",
      type: ContentType.DOCUMENTARY,
      description: "Nature documentary series",
      releaseDate: new Date("2006-03-05"),
      runtime: 50,
      genre: "Documentary",
      director: "David Attenborough",
      totalSeasons: 1,
      totalEpisodes: 11,
      familyId: family.id,
    },
  ];

  const createdStreamingContent = await Promise.all(
    streamingContent.map(content =>
      prisma.streamingContent.create({ data: content })
    )
  );

  console.log("🎬 Created streaming content:", createdStreamingContent.length);

  // Create user streaming relationships
  await prisma.userStreamingItem.createMany({
    data: [
      // Dad's streaming
      {
        userId: dad.id,
        streamingContentId: createdStreamingContent[0].id,
        status: StreamingStatus.COMPLETED,
        rating: 4.5,
        progress: 34,
      },
      {
        userId: dad.id,
        streamingContentId: createdStreamingContent[3].id,
        status: StreamingStatus.WATCHING,
        progress: 7,
      },

      // Mom's streaming
      {
        userId: mom.id,
        streamingContentId: createdStreamingContent[0].id,
        status: StreamingStatus.COMPLETED,
        rating: 4.8,
        progress: 34,
      },
      {
        userId: mom.id,
        streamingContentId: createdStreamingContent[1].id,
        status: StreamingStatus.COMPLETED,
        rating: 5.0,
        progress: 100,
      },

      // Emma's streaming
      {
        userId: child1.id,
        streamingContentId: createdStreamingContent[2].id,
        status: StreamingStatus.WATCHING,
        progress: 45,
      },
      {
        userId: child1.id,
        streamingContentId: createdStreamingContent[1].id,
        status: StreamingStatus.COMPLETED,
        rating: 5.0,
        progress: 100,
      },

      // Alex's streaming
      {
        userId: child2.id,
        streamingContentId: createdStreamingContent[1].id,
        status: StreamingStatus.COMPLETED,
        rating: 4.9,
        progress: 100,
      },
      {
        userId: child2.id,
        streamingContentId: createdStreamingContent[2].id,
        status: StreamingStatus.WATCHLIST,
      },
    ],
  });

  // Create some reading goals
  const currentYear = new Date().getFullYear();
  await prisma.readingGoal.createMany({
    data: [
      {
        userId: dad.id,
        year: currentYear,
        type: "BOOKS",
        target: 12,
        current: 3,
      },
      {
        userId: mom.id,
        year: currentYear,
        type: "BOOKS",
        target: 24,
        current: 8,
      },
      {
        userId: child1.id,
        year: currentYear,
        type: "BOOKS",
        target: 15,
        current: 5,
      },
      {
        userId: child2.id,
        year: currentYear,
        type: "BOOKS",
        target: 10,
        current: 4,
      },
    ],
  });

  // Create some activities
  await prisma.activity.createMany({
    data: [
      {
        userId: mom.id,
        familyId: family.id,
        type: "book_completed",
        title: "Finished reading Harry Potter",
        description: "Sarah completed Harry Potter and the Philosopher's Stone",
        isPublic: true,
      },
      {
        userId: child1.id,
        familyId: family.id,
        type: "movie_watched",
        title: "Watched The Incredibles",
        description: "Emma finished watching The Incredibles",
        isPublic: true,
      },
      {
        userId: dad.id,
        familyId: family.id,
        type: "show_completed",
        title: "Finished Stranger Things",
        description: "John completed all seasons of Stranger Things",
        isPublic: true,
      },
    ],
  });

  console.log("✨ Seed completed successfully!");
  console.log("📊 Summary:");
  console.log(`   - 1 family created`);
  console.log(`   - 4 users created`);
  console.log(`   - ${createdBooks.length} books created`);
  console.log(
    `   - ${createdStreamingContent.length} streaming content created`
  );
  console.log(`   - Reading goals and activities created`);
  console.log("");
  console.log("🔐 Login credentials (all users):");
  console.log("   Password: password123");
  console.log(
    "   Users: dad@johnson.com, mom@johnson.com, emma@johnson.com, alex@johnson.com"
  );
}

main()
  .catch(e => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
