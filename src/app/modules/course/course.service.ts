/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { CourseConstants } from './course.constants';
import { ICourseFilterRequest } from './course.interface';

const create = async (payload: Course): Promise<Course | null> => {
  const { syllabus, ...courseData } = payload;
  const result = await prisma.course.create({
    data: {
      ...courseData,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      syllabus: syllabus as any,
    },
  });

  return result;
};

const findAll = async (
  filters: ICourseFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Course[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: any = [];

  if (searchTerm) {
    andConditions.push({
      OR: CourseConstants.courseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        console.log({ key });
        return {
          [key]: {
            equals: (filterData as any)[key],
            mode: 'insensitive',
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.CourseWhereInput = andConditions.length
    ? { AND: andConditions }
    : {};

  const result = await prisma.course.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.course.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const findOne = async (id: string) => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (result) {
    return result;
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
};

export const CourseService = {
  create,
  findAll,
  findOne,
};
