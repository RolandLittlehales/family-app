-- AlterTable
ALTER TABLE "users" ADD COLUMN "emailVerificationExpires" DATETIME;

-- CreateIndex
CREATE INDEX "reading_sessions_userId_date_idx" ON "reading_sessions"("userId", "date");

-- CreateIndex
CREATE INDEX "reading_sessions_bookId_date_idx" ON "reading_sessions"("bookId", "date");

-- CreateIndex
CREATE INDEX "user_books_bookId_idx" ON "user_books"("bookId");

-- CreateIndex
CREATE INDEX "user_books_userId_updatedAt_idx" ON "user_books"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX "user_streaming_items_streamingContentId_idx" ON "user_streaming_items"("streamingContentId");

-- CreateIndex
CREATE INDEX "user_streaming_items_userId_updatedAt_idx" ON "user_streaming_items"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX "users_familyId_idx" ON "users"("familyId");

-- CreateIndex
CREATE INDEX "users_role_isActive_idx" ON "users"("role", "isActive");

-- CreateIndex
CREATE INDEX "watching_sessions_userId_date_idx" ON "watching_sessions"("userId", "date");

-- CreateIndex
CREATE INDEX "watching_sessions_streamingContentId_date_idx" ON "watching_sessions"("streamingContentId", "date");
