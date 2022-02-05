/*
  Warnings:

  - You are about to drop the column `dissesId` on the `disses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "disses" DROP CONSTRAINT "disses_dissesId_fkey";

-- AlterTable
ALTER TABLE "disses" DROP COLUMN "dissesId",
ADD COLUMN     "originalDiss" TEXT;

-- AddForeignKey
ALTER TABLE "disses" ADD CONSTRAINT "disses_originalDiss_fkey" FOREIGN KEY ("originalDiss") REFERENCES "disses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
