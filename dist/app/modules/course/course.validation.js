"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseZodValidation = void 0;
const zod_1 = require("zod");
const course_constants_1 = require("./course.constants");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        instructor: zod_1.z.string({
            required_error: 'Instructor is required',
        }),
        description: zod_1.z.string({}).optional(),
        enrollmentStatus: zod_1.z.enum([...course_constants_1.CourseConstants.enrollmentStatusOptions], {
            required_error: 'Enrollment status is required',
        }),
        thumbnail: zod_1.z.string({
            required_error: 'Thumbnail is required',
        }),
        duration: zod_1.z.string({
            required_error: 'Duration is required',
        }),
        schedule: zod_1.z.string({
            required_error: 'Schedule is required',
        }),
        location: zod_1.z.enum([...course_constants_1.CourseConstants.courseLocationOptions], {
            required_error: 'Location is required',
        }),
        prerequisites: zod_1.z.array(zod_1.z.string({}), {
            required_error: 'Prerequisites is required',
        }),
        syllabus: zod_1.z.array(zod_1.z.object({
            week: zod_1.z.number({
                required_error: 'Week is required',
            }),
            topic: zod_1.z.string({
                required_error: 'Topic is required',
            }),
            content: zod_1.z.string({
                required_error: 'Content is required',
            }),
        }), {
            required_error: 'Syllabus is required',
        }),
    }),
});
exports.CourseZodValidation = {
    create,
};
