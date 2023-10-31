/*
  Warnings:

  - The `enrollmentStatus` column on the `courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `location` column on the `courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `enrollments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "enrollmentStatus",
ADD COLUMN     "enrollmentStatus" TEXT NOT NULL DEFAULT 'open',
DROP COLUMN "location",
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'online';

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'inprogress';

-- DropEnum
DROP TYPE "EnrollmentStatusOptions";

-- DropEnum
DROP TYPE "LocationOptions";

-- DropEnum
DROP TYPE "StudentEnrollmentStatusOptions";
