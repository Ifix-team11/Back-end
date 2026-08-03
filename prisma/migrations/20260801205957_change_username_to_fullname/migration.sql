-- Drop old username unique index
DROP INDEX "User_username_key";

-- Add new column temporarily nullable
ALTER TABLE "User"
ADD COLUMN "fullName" TEXT;

-- Copy username values into fullName
UPDATE "User"
SET "fullName" = "username";

-- Make fullName required
ALTER TABLE "User"
ALTER COLUMN "fullName" SET NOT NULL;

-- Remove old username column
ALTER TABLE "User"
DROP COLUMN "username";