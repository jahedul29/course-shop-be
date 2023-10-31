import { z } from 'zod';
import { CourseConstants } from './course.constants';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    instructor: z.string({
      required_error: 'Instructor is required',
    }),
    description: z.string({}).optional(),
    enrollmentStatus: z.enum(
      [...CourseConstants.enrollmentStatusOptions] as [string, ...string[]],
      {
        required_error: 'Enrollment status is required',
      },
    ),
    thumbnail: z.string({
      required_error: 'Thumbnail is required',
    }),
    duration: z.string({
      required_error: 'Duration is required',
    }),
    schedule: z.string({
      required_error: 'Schedule is required',
    }),
    location: z.enum(
      [...CourseConstants.courseLocationOptions] as [string, ...string[]],
      {
        required_error: 'Location is required',
      },
    ),
    prerequisites: z.array(z.string({}), {
      required_error: 'Prerequisites is required',
    }),
    syllabus: z.array(
      z.object({
        week: z.number({
          required_error: 'Week is required',
        }),
        topic: z.string({
          required_error: 'Topic is required',
        }),
        content: z.string({
          required_error: 'Content is required',
        }),
      }),
      {
        required_error: 'Syllabus is required',
      },
    ),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(), // Make 'name' optional
    instructor: z.string().optional(), // Make 'instructor' optional
    description: z.string().optional(), // Make 'description' optional
    enrollmentStatus: z
      .enum([...CourseConstants.enrollmentStatusOptions] as [
        string,
        ...string[],
      ])
      .optional(), // Make 'enrollmentStatus' optional
    thumbnail: z.string().optional(), // Make 'thumbnail' optional
    duration: z.string().optional(), // Make 'duration' optional
    schedule: z.string().optional(), // Make 'schedule' optional
    location: z
      .enum([...CourseConstants.courseLocationOptions] as [string, ...string[]])
      .optional(), // Make 'location' optional
    prerequisites: z.array(z.string()).optional(), // Make 'prerequisites' optional
    syllabus: z
      .array(
        z.object({
          week: z.number({
            required_error: 'Week is required',
          }),
          topic: z.string({
            required_error: 'Topic is required',
          }),
          content: z.string({
            required_error: 'Content is required',
          }),
        }),
      )
      .optional(), // Make 'syllabus' optional
  }),
}); // Make the entire 'body' object optional

export const CourseZodValidation = {
  create,
  update,
};
