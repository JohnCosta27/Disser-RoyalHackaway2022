/*
  Warnings:

  - You are about to drop the `testing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "testing";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disses" (
    "id" TEXT NOT NULL,
    "diss" TEXT NOT NULL,

    CONSTRAINT "disses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
