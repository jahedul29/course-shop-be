/*
  Warnings:

  - Changed the type of `syllabus` on the `courses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "syllabus",
ADD COLUMN     "syllabus" JSONB NOT NULL;
