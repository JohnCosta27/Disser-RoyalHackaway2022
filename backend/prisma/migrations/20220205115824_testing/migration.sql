/*
  Warnings:

  - You are about to drop the `Testing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Testing";

-- CreateTable
CREATE TABLE "testing" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "testing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testing_email_key" ON "testing"("email");
