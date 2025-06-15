-- CreateIndex
CREATE INDEX "activities_userId_idx" ON "activities"("userId");

-- CreateIndex
CREATE INDEX "activities_familyId_idx" ON "activities"("familyId");

-- CreateIndex
CREATE INDEX "activities_type_idx" ON "activities"("type");

-- CreateIndex
CREATE INDEX "activities_createdAt_idx" ON "activities"("createdAt");

-- CreateIndex
CREATE INDEX "activities_userId_createdAt_idx" ON "activities"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "activities_familyId_createdAt_idx" ON "activities"("familyId", "createdAt");

-- CreateIndex
CREATE INDEX "books_title_idx" ON "books"("title");

-- CreateIndex
CREATE INDEX "books_author_idx" ON "books"("author");

-- CreateIndex
CREATE INDEX "books_genre_idx" ON "books"("genre");

-- CreateIndex
CREATE INDEX "books_familyId_idx" ON "books"("familyId");

-- CreateIndex
CREATE INDEX "streaming_content_title_idx" ON "streaming_content"("title");

-- CreateIndex
CREATE INDEX "streaming_content_type_idx" ON "streaming_content"("type");

-- CreateIndex
CREATE INDEX "streaming_content_genre_idx" ON "streaming_content"("genre");

-- CreateIndex
CREATE INDEX "streaming_content_familyId_idx" ON "streaming_content"("familyId");

-- CreateIndex
CREATE INDEX "streaming_content_familyId_type_idx" ON "streaming_content"("familyId", "type");

-- CreateIndex
CREATE INDEX "user_books_userId_idx" ON "user_books"("userId");

-- CreateIndex
CREATE INDEX "user_books_status_idx" ON "user_books"("status");

-- CreateIndex
CREATE INDEX "user_books_userId_status_idx" ON "user_books"("userId", "status");

-- CreateIndex
CREATE INDEX "user_streaming_items_userId_idx" ON "user_streaming_items"("userId");

-- CreateIndex
CREATE INDEX "user_streaming_items_status_idx" ON "user_streaming_items"("status");

-- CreateIndex
CREATE INDEX "user_streaming_items_userId_status_idx" ON "user_streaming_items"("userId", "status");
