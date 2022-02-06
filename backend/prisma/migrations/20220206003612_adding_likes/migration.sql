-- CreateTable
CREATE TABLE "dissesLikes" (
    "id" TEXT NOT NULL,
    "dissId" TEXT NOT NULL,

    CONSTRAINT "dissesLikes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dissesLikes" ADD CONSTRAINT "dissesLikes_dissId_fkey" FOREIGN KEY ("dissId") REFERENCES "disses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
