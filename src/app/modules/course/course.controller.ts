import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CourseConstants } from './course.constants';
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

const findAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CourseConstants.courseFilterableFields);
  const paginationParams = pick(req.query, paginationFields);

  const result = await CourseService.findAll(filters, paginationParams);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const findOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CourseService.findOne(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course retrieved successfully',
    data: result,
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const courseData = req.body;

  const result = await CourseService.updateOne(id, courseData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CourseService.deleteOne(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const CourseController = {
  create,
  findAll,
  findOne,
  updateOne,
  deleteOne,
};
