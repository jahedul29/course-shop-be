"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentConstants = void 0;
const enrollmentFilterableFields = [
    'searchTerm',
    'courseId',
    'userId',
    'status',
];
const enrollmentSearchableFields = ['status'];
const studentEnrolledCourseRelationalFields = ['userId', 'courseId'];
const studentEnrolledCourseRelationalFieldsMapper = {
    userId: 'user',
    courseId: 'course',
};
exports.EnrollmentConstants = {
    studentEnrolledCourseRelationalFields,
    studentEnrolledCourseRelationalFieldsMapper,
    enrollmentFilterableFields,
    enrollmentSearchableFields,
};
