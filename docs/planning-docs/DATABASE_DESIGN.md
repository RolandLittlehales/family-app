# Database Design - The Family App

## Technology Stack Recommendation

### Primary Option: PostgreSQL + Prisma ORM
**Rationale**: 
- PostgreSQL offers robust relational features needed for family relationships
- Prisma provides excellent TypeScript integration and type safety
- Supports both local development and production deployment
- Built-in migration system and schema management

### Alternative Options:
1. **Supabase** (PostgreSQL + Auth + Real-time)
2. **SQLite + Prisma** (for simpler deployment)
3. **PlanetScale + Prisma** (for serverless scaling)

## Database Schema Design

### Core Tables

#### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(512),
  role VARCHAR(50) DEFAULT 'member', -- 'admin', 'member', 'child'
  date_of_birth DATE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. Families Table
```sql
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  settings JSONB DEFAULT '{}', -- theme preferences, privacy settings, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. Family Members Table (Junction)
```sql
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member', -- 'admin', 'member', 'child'
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(family_id, user_id)
);
```

### Books Domain Tables

#### 4. Books Table
```sql
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  author VARCHAR(500),
  isbn VARCHAR(20),
  isbn13 VARCHAR(20),
  google_books_id VARCHAR(100),
  description TEXT,
  page_count INTEGER,
  published_date DATE,
  language VARCHAR(10) DEFAULT 'en',
  cover_image_url VARCHAR(512),
  genre VARCHAR(100),
  categories TEXT[], -- PostgreSQL array for multiple categories
  average_rating DECIMAL(3,2),
  ratings_count INTEGER DEFAULT 0,
  publisher VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes for performance
  INDEX idx_books_title ON books(title),
  INDEX idx_books_author ON books(author),
  INDEX idx_books_isbn ON books(isbn),
  INDEX idx_books_isbn13 ON books(isbn13)
);
```

#### 5. User Books Table (Reading Status)
```sql
CREATE TABLE user_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL, -- 'want_to_read', 'currently_reading', 'completed', 'did_not_finish'
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  notes TEXT,
  current_page INTEGER DEFAULT 0,
  start_date DATE,
  finish_date DATE,
  favorite BOOLEAN DEFAULT FALSE,
  private BOOLEAN DEFAULT FALSE, -- whether this is visible to other family members
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, book_id),
  INDEX idx_user_books_status ON user_books(status),
  INDEX idx_user_books_family ON user_books(family_id),
  INDEX idx_user_books_rating ON user_books(rating)
);
```

#### 6. Reading Sessions Table (For Progress Tracking)
```sql
CREATE TABLE reading_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_book_id UUID NOT NULL REFERENCES user_books(id) ON DELETE CASCADE,
  start_page INTEGER NOT NULL,
  end_page INTEGER NOT NULL,
  duration_minutes INTEGER, -- optional: how long they read
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Movies/TV Domain Tables

#### 7. Movies/Shows Table
```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'movie', 'tv_series', 'documentary', 'anime'
  tmdb_id INTEGER UNIQUE, -- The Movie Database ID
  imdb_id VARCHAR(20),
  description TEXT,
  release_date DATE,
  runtime_minutes INTEGER, -- for movies, average episode runtime for TV
  language VARCHAR(10) DEFAULT 'en',
  poster_url VARCHAR(512),
  backdrop_url VARCHAR(512),
  genres TEXT[], -- ['Action', 'Comedy', 'Drama']
  directors TEXT[],
  cast TEXT[],
  average_rating DECIMAL(3,2),
  ratings_count INTEGER DEFAULT 0,
  content_rating VARCHAR(10), -- 'G', 'PG', 'PG-13', 'R', etc.
  total_seasons INTEGER, -- for TV series
  total_episodes INTEGER, -- for TV series
  status VARCHAR(50), -- 'ended', 'ongoing', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_media_title ON media(title),
  INDEX idx_media_type ON media(type),
  INDEX idx_media_tmdb ON media(tmdb_id)
);
```

#### 8. User Media Table (Watching Status)
```sql
CREATE TABLE user_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL, -- 'want_to_watch', 'currently_watching', 'completed', 'dropped', 'on_hold'
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  notes TEXT,
  current_season INTEGER DEFAULT 1,
  current_episode INTEGER DEFAULT 1,
  total_watched_episodes INTEGER DEFAULT 0,
  start_date DATE,
  finish_date DATE,
  favorite BOOLEAN DEFAULT FALSE,
  private BOOLEAN DEFAULT FALSE,
  watch_priority INTEGER DEFAULT 3, -- 1 (high) to 5 (low)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, media_id),
  INDEX idx_user_media_status ON user_media(status),
  INDEX idx_user_media_family ON user_media(family_id),
  INDEX idx_user_media_priority ON user_media(watch_priority)
);
```

#### 9. Streaming Services Table
```sql
CREATE TABLE streaming_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  logo_url VARCHAR(512),
  website_url VARCHAR(255),
  color_hex VARCHAR(7), -- brand color like '#E50914' for Netflix
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed data
INSERT INTO streaming_services (name, logo_url, website_url, color_hex) VALUES
('Netflix', '/logos/netflix.png', 'https://netflix.com', '#E50914'),
('Disney+', '/logos/disney.png', 'https://disneyplus.com', '#113CCF'),
('Prime Video', '/logos/prime.png', 'https://primevideo.com', '#00A8E1'),
('Hulu', '/logos/hulu.png', 'https://hulu.com', '#1CE783'),
('HBO Max', '/logos/hbo.png', 'https://hbomax.com', '#B537F2'),
('Apple TV+', '/logos/apple.png', 'https://tv.apple.com', '#000000');
```

#### 10. Family Streaming Subscriptions Table
```sql
CREATE TABLE family_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES streaming_services(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  monthly_cost DECIMAL(8,2),
  billing_date INTEGER, -- day of month (1-31)
  shared_account BOOLEAN DEFAULT FALSE, -- sharing with others outside family
  login_email VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(family_id, service_id)
);
```

#### 11. Media Availability Table (Where to Watch)
```sql
CREATE TABLE media_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES streaming_services(id) ON DELETE CASCADE,
  available_until DATE, -- NULL if permanent
  is_free BOOLEAN DEFAULT FALSE, -- available without subscription
  rental_price DECIMAL(6,2), -- if available for rent
  purchase_price DECIMAL(6,2), -- if available for purchase
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(media_id, service_id),
  INDEX idx_availability_media ON media_availability(media_id),
  INDEX idx_availability_service ON media_availability(service_id)
);
```

### Shared Features Tables

#### 12. Tags Table (For Books and Media)
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  color_hex VARCHAR(7) DEFAULT '#6B7280',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(family_id, name),
  INDEX idx_tags_family ON tags(family_id)
);
```

#### 13. Item Tags Table (Junction for Books/Media Tags)
```sql
CREATE TABLE item_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  media_id UUID REFERENCES media(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CHECK ((book_id IS NOT NULL AND media_id IS NULL) OR (book_id IS NULL AND media_id IS NOT NULL)),
  UNIQUE(tag_id, book_id),
  UNIQUE(tag_id, media_id)
);
```

#### 14. Activity Log Table (For Family Activity Feed)
```sql
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL, -- 'book_added', 'book_completed', 'movie_watched', 'rating_added'
  entity_type VARCHAR(20) NOT NULL, -- 'book', 'media'
  entity_id UUID NOT NULL, -- references books.id or media.id
  metadata JSONB DEFAULT '{}', -- flexible data like rating, review snippet, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_activity_family ON activity_log(family_id),
  INDEX idx_activity_user ON activity_log(user_id),
  INDEX idx_activity_type ON activity_log(action_type),
  INDEX idx_activity_date ON activity_log(created_at)
);
```

#### 15. Family Goals Table
```sql
CREATE TABLE family_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  created_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'reading', 'watching'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_value INTEGER NOT NULL, -- books to read, hours to watch, etc.
  target_unit VARCHAR(20) NOT NULL, -- 'books', 'hours', 'episodes'
  deadline DATE,
  is_active BOOLEAN DEFAULT TRUE,
  is_individual BOOLEAN DEFAULT FALSE, -- false = family goal, true = individual goals
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 16. Goal Progress Table
```sql
CREATE TABLE goal_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES family_goals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  current_value INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(goal_id, user_id)
);
```

## Prisma Schema Equivalent

```prisma
// This would be in prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email           String    @unique
  name            String
  avatarUrl       String?   @map("avatar_url")
  role            String    @default("member")
  dateOfBirth     DateTime? @map("date_of_birth") @db.Date
  preferences     Json      @default("{}")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")

  // Relations
  familyMembers   FamilyMember[]
  userBooks       UserBook[]
  userMedia       UserMedia[]
  activityLog     ActivityLog[]
  createdGoals    FamilyGoal[]
  goalProgress    GoalProgress[]

  @@map("users")
}

model Family {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String
  description String?
  settings    Json     @default("{}")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // Relations
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
  id       String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  familyId String   @map("family_id") @db.Uuid
  userId   String   @map("user_id") @db.Uuid
  role     String   @default("member")
  joinedAt DateTime @default(now()) @map("joined_at")

  // Relations
  family Family @relation(fields: [familyId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([familyId, userId])
  @@map("family_members")
}

model Book {
  id             String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  title          String
  author         String?
  isbn           String?
  isbn13         String?
  googleBooksId  String?   @map("google_books_id")
  description    String?
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

  // Relations
  userBooks UserBook[]
  tags      ItemTag[]

  @@map("books")
}

model UserBook {
  id         String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId     String    @map("user_id") @db.Uuid
  bookId     String    @map("book_id") @db.Uuid
  familyId   String    @map("family_id") @db.Uuid
  status     String
  rating     Int?      @db.SmallInt
  review     String?
  notes      String?
  currentPage Int?     @default(0) @map("current_page")
  startDate  DateTime? @map("start_date") @db.Date
  finishDate DateTime? @map("finish_date") @db.Date
  favorite   Boolean   @default(false)
  private    Boolean   @default(false)
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime  @updatedAt @map("updated_at")

  // Relations
  user           User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  book           Book             @relation(fields: [bookId], references: [id], onDelete: Cascade)
  family         Family           @relation(fields: [familyId], references: [id], onDelete: Cascade)
  readingSessions ReadingSession[]

  @@unique([userId, bookId])
  @@map("user_books")
}

model ReadingSession {
  id              String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userBookId      String   @map("user_book_id") @db.Uuid
  startPage       Int      @map("start_page")
  endPage         Int      @map("end_page")
  durationMinutes Int?     @map("duration_minutes")
  sessionDate     DateTime @default(now()) @map("session_date") @db.Date
  notes           String?
  createdAt       DateTime @default(now()) @map("created_at")

  // Relations
  userBook UserBook @relation(fields: [userBookId], references: [id], onDelete: Cascade)

  @@map("reading_sessions")
}

// ... Additional models for Media, UserMedia, StreamingServices, etc.
// (Similar structure as shown in SQL above)
```

## Database Indexes Strategy

### Performance-Critical Indexes
1. **User lookup**: `users(email)` - for authentication
2. **Family queries**: `family_members(family_id, user_id)` - for authorization
3. **Books search**: `books(title, author, isbn)`
4. **User content**: `user_books(user_id, status)`, `user_media(user_id, status)`
5. **Activity feed**: `activity_log(family_id, created_at DESC)`

### Composite Indexes for Common Queries
```sql
-- Find all books for a family member by status
CREATE INDEX idx_user_books_user_status ON user_books(user_id, status);

-- Find all media for a family member by status
CREATE INDEX idx_user_media_user_status ON user_media(user_id, status);

-- Family activity feed with user info
CREATE INDEX idx_activity_family_date ON activity_log(family_id, created_at DESC);

-- Book search with filters
CREATE INDEX idx_books_search ON books(title, author, genre);
```

## Data Migration Strategy

### Phase 1: Core Setup
1. Create `users`, `families`, `family_members` tables
2. Set up authentication system
3. Create basic user management

### Phase 2: Books Domain
1. Create `books`, `user_books`, `reading_sessions` tables
2. Migrate existing static book data
3. Implement book CRUD operations

### Phase 3: Media Domain
1. Create `media`, `user_media`, `streaming_services` tables
2. Seed streaming services data
3. Implement watchlist functionality

### Phase 4: Advanced Features
1. Create `tags`, `activity_log`, `goals` tables
2. Implement family features
3. Add analytics and reporting

## Security Considerations

### Row Level Security (RLS)
```sql
-- Example: Users can only see their own family's data
ALTER TABLE user_books ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_books_family_policy ON user_books
  USING (family_id IN (
    SELECT family_id FROM family_members 
    WHERE user_id = auth.uid()
  ));
```

### Data Privacy
- Family members can mark items as `private`
- Child accounts have restricted access
- Admin users can manage family settings
- Data export capabilities for user privacy compliance

### Performance Monitoring
- Monitor slow queries with `pg_stat_statements`
- Set up connection pooling (PgBouncer)
- Implement read replicas for analytics queries
- Cache frequently accessed data (Redis)