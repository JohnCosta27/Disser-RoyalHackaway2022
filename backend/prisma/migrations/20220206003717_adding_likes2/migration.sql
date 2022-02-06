/*
  Warnings:

  - Added the required column `userId` to the `dissesLikes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dissesLikes" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "dissesLikes" ADD CONSTRAINT "dissesLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
