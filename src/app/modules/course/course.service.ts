import { Course } from '@prisma/client';
import prisma from '../../../shared/prisma';

const create = async (payload: Course): Promise<Course | null> => {
  const { syllabus, ...courseData } = payload;
  const result = await prisma.course.create({
    data: {
      ...courseData,
      syllabus: syllabus as any,
    },
  });

  return result;
};

export const CourseService = {
  create,
};
