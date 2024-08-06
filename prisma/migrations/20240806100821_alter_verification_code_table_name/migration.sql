/*
  Warnings:

  - You are about to drop the `VerificationConde` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VerificationConde" DROP CONSTRAINT "VerificationConde_userId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "quantity" SET DEFAULT 1;

-- DropTable
DROP TABLE "VerificationConde";

-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_userId_key" ON "VerificationCode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_userId_code_key" ON "VerificationCode"("userId", "code");

-- AddForeignKey
ALTER TABLE "VerificationCode" ADD CONSTRAINT "VerificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
