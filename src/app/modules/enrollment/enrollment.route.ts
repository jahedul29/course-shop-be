import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { EnrollmentController } from './enrollment.controller';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STUDENT),
  EnrollmentController.findAll,
);

router.post(
  '/enroll-into-course/:courseId/:userId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STUDENT),
  EnrollmentController.enrollIntoCourse,
);

router.post(
  '/mark-course-as-complete/:courseId/:userId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STUDENT),
  EnrollmentController.enrollIntoCourse,
);

export const EnrollmentRouter = router;
