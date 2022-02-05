/*
  Warnings:

  - Added the required column `userId` to the `disses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "disses" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "disses" ADD CONSTRAINT "disses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
