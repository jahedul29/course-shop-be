import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseZodValidation } from './course.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CourseZodValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  CourseController.create,
);

router.get('/', CourseController.findAll);
router.get('/:id', CourseController.findOne);

router.patch(
  '/:id',
  validateRequest(CourseZodValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  CourseController.updateOne,
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), CourseController.deleteOne);

export const CourseRouter = router;
