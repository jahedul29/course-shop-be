-- CreateEnum
CREATE TYPE "StudentEnrollmentStatusOptions" AS ENUM ('INPROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "enrollments" ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "StudentEnrollmentStatusOptions" NOT NULL DEFAULT 'INPROGRESS';
