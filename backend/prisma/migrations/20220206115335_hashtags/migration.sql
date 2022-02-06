-- CreateTable
CREATE TABLE "userTags" (
    "id" TEXT NOT NULL,
    "dissId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "userTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hashtags" (
    "id" TEXT NOT NULL,
    "hashtag" TEXT NOT NULL,
    "dissId" TEXT NOT NULL,

    CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userTags" ADD CONSTRAINT "userTags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTags" ADD CONSTRAINT "userTags_dissId_fkey" FOREIGN KEY ("dissId") REFERENCES "disses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hashtags" ADD CONSTRAINT "hashtags_dissId_fkey" FOREIGN KEY ("dissId") REFERENCES "disses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
