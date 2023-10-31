import { EnrollmentStatusOptions } from '@prisma/client';

export type ICourseFilterRequest = {
  searchTerm?: string;
  enrollmentStatus?: EnrollmentStatusOptions;
  duration?: string;
  location?: string;
  instructor?: string;
};
