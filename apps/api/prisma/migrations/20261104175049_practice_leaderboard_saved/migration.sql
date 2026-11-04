-- AlterEnum
ALTER TYPE "ExamType" ADD VALUE 'PRACTICE';

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "ownerId" TEXT;

-- CreateTable
CREATE TABLE "SavedCircular" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "circularId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedCircular_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedCircular_circularId_idx" ON "SavedCircular"("circularId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedCircular_userId_circularId_key" ON "SavedCircular"("userId", "circularId");

-- CreateIndex
CREATE INDEX "Exam_ownerId_idx" ON "Exam"("ownerId");

-- AddForeignKey
ALTER TABLE "SavedCircular" ADD CONSTRAINT "SavedCircular_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedCircular" ADD CONSTRAINT "SavedCircular_circularId_fkey" FOREIGN KEY ("circularId") REFERENCES "JobCircular"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
