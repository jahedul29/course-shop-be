/* eslint-disable @typescript-eslint/no-explicit-any */
import { Enrollment, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { EnrollmentConstants } from './enrollment.contants';
import { IEnrollmentFilterRequest } from './enrollment.interface';

const enrollIntoCourse = async (
  courseId: string,
  userId: string,
): Promise<Enrollment | null> => {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course does not exist');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  const existingEnrollment = await prisma.enrollment.findFirst({
    where: {
      courseId,
      userId,
    },
  });

  if (existingEnrollment) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student already enrolled in this course',
    );
  }

  const enrollment = await prisma.enrollment.create({
    data: {
      courseId: courseId,
      userId: userId,
    },
    include: {
      course: true,
      user: true,
    },
  });

  return enrollment;
};

const findAll = async (
  filters: IEnrollmentFilterRequest,
  options: IPaginationOptions,
  user: any,
): Promise<IGenericResponse<Enrollment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: any = [];

  if (searchTerm) {
    andConditions.push({
      OR: EnrollmentConstants.enrollmentSearchableFields.map(field => ({
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
        if (
          EnrollmentConstants.studentEnrolledCourseRelationalFields.includes(
            key,
          )
        ) {
          return {
            [EnrollmentConstants.studentEnrolledCourseRelationalFieldsMapper[
              key
            ]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
              mode: 'insensitive',
            },
          };
        }
      }),
    });
  }

  if (user.role === ENUM_USER_ROLE.STUDENT) {
    andConditions.push({
      userId: user.userId,
    });
  }

  const whereConditions: Prisma.EnrollmentWhereInput = andConditions.length
    ? { AND: andConditions }
    : {};

  const result = await prisma.enrollment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      course: true,
      user: true,
    },
  });

  const total = await prisma.enrollment.count({
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

const markCourseAsComplete = async (
  courseId: string,
  userId: string,
): Promise<Enrollment | null> => {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course does not exist');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  const existingEnrollment = await prisma.enrollment.findFirst({
    where: {
      courseId,
      userId,
    },
  });

  if (!existingEnrollment) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student not enrolled in this course',
    );
  }

  const result = await prisma.enrollment.update({
    where: {
      id: existingEnrollment.id,
    },
    data: {
      status: 'completed',
      progress: 100,
    },
  });

  return result;
};

export const EnrollmentService = {
  enrollIntoCourse,
  findAll,
  markCourseAsComplete,
};
