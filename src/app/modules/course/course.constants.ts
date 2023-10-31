const enrollmentStatusOptions = ['open', 'closed', 'inprogress'];

const courseLocationOptions = ['online', 'onsite'];

const courseFilterableFields = [
  'searchTerm',
  'name',
  'enrollmentStatus',
  'duration',
  'location',
  'instructor',
];

const courseSearchableFields = [
  'id',
  'name',
  'instructor',
  'enrollmentStatus',
  'duration',
  'location',
];

export const CourseConstants = {
  enrollmentStatusOptions,
  courseLocationOptions,
  courseFilterableFields,
  courseSearchableFields,
};
