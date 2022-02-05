-- AlterTable
ALTER TABLE "disses" ADD COLUMN     "dissesId" TEXT;

-- AddForeignKey
ALTER TABLE "disses" ADD CONSTRAINT "disses_dissesId_fkey" FOREIGN KEY ("dissesId") REFERENCES "disses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
