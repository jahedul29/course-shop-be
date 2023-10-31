import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseService } from './course.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const createData = req.body;

  const result = await CourseService.create(createData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course created successfully!',
    data: result,
  });
});

export const CourseController = {
  create,
};
