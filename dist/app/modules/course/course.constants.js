"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseConstants = void 0;
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
exports.CourseConstants = {
    enrollmentStatusOptions,
    courseLocationOptions,
    courseFilterableFields,
    courseSearchableFields,
};
