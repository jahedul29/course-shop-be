const enrollmentFilterableFields = [
  'searchTerm',
  'courseId',
  'userId',
  'status',
];

const enrollmentSearchableFields = ['status'];

const studentEnrolledCourseRelationalFields = ['userId', 'courseId'];

const studentEnrolledCourseRelationalFieldsMapper: {
  [key: string]: string;
} = {
  userId: 'user',
  courseId: 'course',
};

export const EnrollmentConstants = {
  studentEnrolledCourseRelationalFields,
  studentEnrolledCourseRelationalFieldsMapper,
  enrollmentFilterableFields,
  enrollmentSearchableFields,
};
