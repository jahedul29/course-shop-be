export type ICourseFilterRequest = {
  searchTerm?: string;
  enrollmentStatus?: 'open' | 'closed' | 'inprogress';
  duration?: string;
  location?: string;
  instructor?: string;
};
