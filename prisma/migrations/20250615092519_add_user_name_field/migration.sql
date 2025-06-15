/*
  Warnings:

  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "dateOfBirth" DATETIME,
    "profilePicture" TEXT,
    "bio" TEXT,
    "role" TEXT NOT NULL DEFAULT 'CHILD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "passwordHash" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "emailVerificationExpires" DATETIME,
    "passwordResetToken" TEXT,
    "passwordResetExpires" DATETIME,
    "familyId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastLoginAt" DATETIME,
    CONSTRAINT "users_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("bio", "createdAt", "dateOfBirth", "email", "emailVerificationExpires", "emailVerificationToken", "emailVerified", "familyId", "firstName", "id", "isActive", "lastLoginAt", "lastName", "passwordHash", "passwordResetExpires", "passwordResetToken", "profilePicture", "role", "updatedAt", "username") SELECT "bio", "createdAt", "dateOfBirth", "email", "emailVerificationExpires", "emailVerificationToken", "emailVerified", "familyId", "firstName", "id", "isActive", "lastLoginAt", "lastName", "passwordHash", "passwordResetExpires", "passwordResetToken", "profilePicture", "role", "updatedAt", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE INDEX "users_familyId_idx" ON "users"("familyId");
CREATE INDEX "users_role_isActive_idx" ON "users"("role", "isActive");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
