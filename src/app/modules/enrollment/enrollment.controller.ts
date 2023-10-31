/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { EnrollmentConstants } from './enrollment.contants';
import { EnrollmentService } from './enrollment.service';

const enrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId, userId } = req.params;

  const result = await EnrollmentService.enrollIntoCourse(courseId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student enrolled into course successfully!',
    data: result,
  });
});

const findAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(
    req.query,
    EnrollmentConstants.enrollmentFilterableFields,
  );
  const paginationParams = pick(req.query, paginationFields);
  const user = req.user as any;

  const result = await EnrollmentService.findAll(
    filters,
    paginationParams,
    user,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Enrollments retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const markCourseAsComplete = catchAsync(async (req: Request, res: Response) => {
  const { courseId, userId } = req.params;

  const result = await EnrollmentService.markCourseAsComplete(courseId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course marked as completed successfully!',
    data: result,
  });
});

export const EnrollmentController = {
  enrollIntoCourse,
  findAll,
  markCourseAsComplete,
};
